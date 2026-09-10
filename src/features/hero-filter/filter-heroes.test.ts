import { describe, expect, test } from 'bun:test';
import { heroes } from '../../data/heroes';
import type { Hero, WorldSkill } from '../../types/hero';
import { createEmptyFilters, filterHeroes, heroHasEffect, summarizeEffects } from './filter-heroes';

function createHero(overrides: Partial<Hero> = {}): Hero {
  return {
    id: 'fixture',
    name: '測試角色',
    faction: 'truth',
    rarity: 'ssr',
    positions: ['captain'],
    tacticalRoles: ['general'],
    worldSkills: [],
    tags: [],
    synergyPartnerIds: [],
    ...overrides,
  };
}

describe('world skill effects', () => {
  test('matches either effect from one world skill', () => {
    const hero = createHero({
      worldSkills: [{
        slot: 1,
        description: '複合效果',
        effects: [
          { type: 'normalAttackDamageUp', value: 20, unit: 'percent' },
          { type: 'skillDamageUp', value: 10, unit: 'percent' },
        ],
      }],
    });

    expect(heroHasEffect(hero, 'normalAttackDamageUp')).toBe(true);
    expect(heroHasEffect(hero, 'skillDamageUp')).toBe(true);
  });

  test('allows the same effect across multiple skills', () => {
    const repeatedSkills: WorldSkill[] = [1, 2].map((slot) => ({
      slot: slot as 1 | 2,
      description: '普攻傷害增加 20%',
      effects: [{ type: 'normalAttackDamageUp', value: 20, unit: 'percent' }],
    }));
    const hero = createHero({ worldSkills: repeatedSkills });

    expect(heroHasEffect(hero, 'normalAttackDamageUp')).toBe(true);
    expect(summarizeEffects(hero)).toEqual([
      { effect: repeatedSkills[0]!.effects[0]!, count: 2 },
    ]);
  });

  test('supports three identical world skills without duplicating filter results', () => {
    const repeatedEffect = { type: 'normalAttackDamageUp' as const, value: 20, unit: 'percent' as const };
    const hero = createHero({
      worldSkills: ([1, 2, 3] as const).map((slot) => ({
        slot,
        description: '普攻傷害增加 20%',
        effects: [repeatedEffect],
      })),
    });

    const result = filterHeroes([hero], {
      ...createEmptyFilters(),
      effectTypes: ['normalAttackDamageUp'],
    });

    expect(hero.worldSkills).toHaveLength(3);
    expect(result).toEqual([hero]);
  });

  test('uses OR within effect filters and AND between categories', () => {
    const result = filterHeroes(heroes, {
      ...createEmptyFilters(),
      factions: ['truth'],
      effectTypes: ['normalAttackDamageUp', 'skillDamageUp'],
    });

    expect(result.length).toBeGreaterThan(0);
    expect(result.every((hero) => hero.faction === 'truth')).toBe(true);
    expect(result.every((hero) =>
      heroHasEffect(hero, 'normalAttackDamageUp') || heroHasEffect(hero, 'skillDamageUp')
    )).toBe(true);
  });

  test('does not mutate the input order', () => {
    const idsBefore = heroes.map((hero) => hero.id);
    filterHeroes(heroes, createEmptyFilters());
    expect(heroes.map((hero) => hero.id)).toEqual(idsBefore);
  });
});

describe('pre-refactor filter regression counts', () => {
  const cases = [
    ['factions', 'truth', 7], ['factions', 'prowess', 6], ['factions', 'passion', 9],
    ['factions', 'wealth', 6], ['factions', 'glory', 7],
    ['positions', 'captain', 15], ['positions', 'striker', 10], ['positions', 'defender', 10],
    ['tacticalRoles', 'rally', 3], ['tacticalRoles', 'siege', 1], ['tacticalRoles', 'garrison', 2],
    ['tacticalRoles', 'assault', 11], ['tacticalRoles', 'stamina', 1], ['tacticalRoles', 'general', 5],
    ['effectTypes', 'normalAttackDamageUp', 14], ['effectTypes', 'skillDamageUp', 12],
    ['effectTypes', 'playerDamageUp', 7], ['effectTypes', 'normalAttackDamageDown', 11],
    ['effectTypes', 'skillDamageDown', 6], ['effectTypes', 'marchSpeedUp', 3],
    ['effectTypes', 'soloCapacityUp', 6], ['effectTypes', 'rallyCapacityUp', 3],
    ['effectTypes', 'garrisonDamagePerSecond', 2], ['effectTypes', 'buildingDamagePerSecond', 1],
    ['effectTypes', 'headquartersDamagePerSecond', 1],
    ['tags', '新手適合', 7], ['tags', '低課適合', 5], ['tags', '重課專屬', 2], ['tags', '祈願', 9],
  ] as const;

  test.each(cases)('%s=%s returns %i heroes', (group, value, expected) => {
    const filters = createEmptyFilters();
    (filters[group] as string[]).push(value);
    expect(filterHeroes(heroes, filters)).toHaveLength(expected);
  });
});

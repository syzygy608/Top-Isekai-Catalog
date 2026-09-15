import { expect, test } from 'bun:test';
import { appendHeroSource, collectHero } from './add-hero';
import { resolveHeroes } from '../src/data/resolve-heroes';
import type { HeroRecord, SkillDefinition } from '../src/types/hero';

const catalog: Record<string, SkillDefinition> = {
  s01: { description: '普攻傷害增加 20%', effects: [{ type: 'normalAttackDamageUp', value: 20, unit: 'percent' }] },
  s02: { description: '技能傷害增加 10%', effects: [{ type: 'skillDamageUp', value: 10, unit: 'percent' }] },
};

function fixture(): HeroRecord {
  return { id: 'new', name: '新英雄', faction: 'truth', rarity: 'ssr', positions: ['captain'], tacticalRoles: [], tags: [], synergyPartnerIds: [], worldSkillIds: ['s01', 's01', 's02'] };
}

test('wizard selects three skills and permits the same skill multiple times', async () => {
  const answers = ['new', '新英雄', '1', '2', '1', '', '1', '1', '2', '祈願'];
  const hero = await collectHero(() => {
    const next = answers.shift();
    if (next === undefined) throw new Error('Unexpected prompt');
    return next;
  }, [], catalog);
  expect(hero.worldSkillIds).toEqual(['s01', 's01', 's02']);
  expect(hero.tags).toEqual(['祈願']);
  expect(resolveHeroes([hero], catalog)[0]!.worldSkills.map((skill) => skill.slot)).toEqual([1, 2, 3]);
  expect(answers).toHaveLength(0);
});

test('append preserves source and validates references before writing', () => {
  const source = "import type { HeroRecord } from '../types/hero';\n// Keep comment\nexport const heroRecords = [\n] satisfies HeroRecord[];\n";
  const output = appendHeroSource(source, fixture(), [], catalog);
  expect(output).toContain('// Keep comment');
  const data = output.slice(output.indexOf('= [') + 2, output.lastIndexOf(' satisfies'));
  expect(JSON.parse(data)).toEqual([fixture()]);
  expect(() => appendHeroSource(source, fixture(), [fixture()], catalog)).toThrow('duplicate hero id');
  expect(() => appendHeroSource(source, { ...fixture(), worldSkillIds: ['s99', 's01', 's02'] }, [], catalog)).toThrow('missing world skill');
  expect(() => appendHeroSource('unexpected format', fixture(), [], catalog)).toThrow('格式');
});

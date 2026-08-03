import type { EffectType, Hero, HeroFilters, WorldSkillEffect } from '../../types/hero';

export function createEmptyFilters(): HeroFilters {
  return {
    factions: [],
    positions: [],
    tacticalRoles: [],
    effectTypes: [],
    tags: [],
  };
}

export function heroHasEffect(hero: Hero, effectType: EffectType): boolean {
  return hero.worldSkills.some((skill) =>
    skill.effects.some((effect) => effect.type === effectType)
  );
}

export function filterHeroes(heroes: readonly Hero[], filters: HeroFilters): Hero[] {
  return heroes.filter((hero) => {
    const matchFaction = filters.factions.length === 0 || filters.factions.includes(hero.faction);
    const matchPosition = filters.positions.length === 0 ||
      filters.positions.some((position) => hero.positions.includes(position));
    const matchTacticalRole = filters.tacticalRoles.length === 0 ||
      filters.tacticalRoles.some((role) => hero.tacticalRoles.includes(role));
    const matchEffect = filters.effectTypes.length === 0 ||
      filters.effectTypes.some((effectType) => heroHasEffect(hero, effectType));
    const matchTag = filters.tags.length === 0 ||
      filters.tags.some((tag) => hero.tags.includes(tag));

    return matchFaction && matchPosition && matchTacticalRole && matchEffect && matchTag;
  });
}

export interface EffectSummary {
  effect: WorldSkillEffect;
  count: number;
}

export function summarizeEffects(hero: Hero): EffectSummary[] {
  const summaries = new Map<string, EffectSummary>();

  for (const skill of hero.worldSkills) {
    for (const effect of skill.effects) {
      const key = JSON.stringify({
        type: effect.type,
        value: effect.value ?? null,
        unit: effect.unit ?? null,
        target: effect.target ?? null,
        condition: effect.condition ?? null,
      });
      const current = summaries.get(key);

      if (current) current.count += 1;
      else summaries.set(key, { effect, count: 1 });
    }
  }

  return [...summaries.values()];
}

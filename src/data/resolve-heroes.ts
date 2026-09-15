import type { Hero, HeroRecord, SkillDefinition, WorldSkill } from '../types/hero';

export function resolveHeroes(
  records: readonly HeroRecord[],
  catalog: Readonly<Record<string, SkillDefinition>>,
): Hero[] {
  return records.map((record) => {
    const worldSkills = record.worldSkillIds.map((skillId, index): WorldSkill => {
      const definition = catalog[skillId];
      if (!definition) throw new Error(`${record.id} references missing world skill ${skillId}`);
      return {
        slot: (index + 1) as 1 | 2 | 3,
        description: definition.description,
        effects: definition.effects.map((effect) => ({ ...effect })),
      };
    });
    return {
      id: record.id,
      name: record.name,
      faction: record.faction,
      rarity: record.rarity,
      positions: [...record.positions],
      tacticalRoles: [...record.tacticalRoles],
      tags: [...record.tags],
      synergyPartnerIds: [...record.synergyPartnerIds],
      worldSkills,
    };
  });
}

import { expect, test } from 'bun:test';
import { heroRecords } from './hero-records';
import { heroes } from './heroes';
import { resolveHeroes } from './resolve-heroes';
import { skillCatalog } from './skill-catalog';

test('expanded heroes preserve 37 records and all 111 skill slots', () => {
  expect(heroRecords).toHaveLength(37);
  expect(Object.keys(skillCatalog)).toHaveLength(21);
  expect(heroes.flatMap((hero) => hero.worldSkills)).toHaveLength(111);
  expect(heroes.every((hero) => hero.worldSkills.map((skill) => skill.slot).join(',') === '1,2,3')).toBe(true);
});

test('reused skill ID retains three separate slots and does not mutate definitions', () => {
  const first = heroRecords[0]!;
  const record = { ...first, worldSkillIds: ['s01', 's01', 's01'] };
  const before = structuredClone(skillCatalog.s01);
  const [hero] = resolveHeroes([record], skillCatalog);
  expect(hero!.worldSkills).toHaveLength(3);
  expect(hero!.worldSkills.map((skill) => skill.description)).toEqual([before.description, before.description, before.description]);
  hero!.worldSkills[0]!.effects[0]!.value = 999;
  expect(skillCatalog.s01).toEqual(before);
});

test('same description with different effects remains distinct', () => {
  expect(skillCatalog.s06.description).toBe(skillCatalog.s19.description);
  expect(skillCatalog.s06.effects).not.toEqual(skillCatalog.s19.effects);
});

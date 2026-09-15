import { expect, test } from 'bun:test';
import { heroes } from '../src/data/heroes';
import { heroRecords } from '../src/data/hero-records';
import { skillCatalog } from '../src/data/skill-catalog';
import type { Hero } from '../src/types/hero';
import { validateHeroes, validateStoredData } from './validate-heroes';

test('accepts current data including repeated effects', () => {
  expect(validateHeroes(heroes)).toEqual([]);
  expect(validateStoredData(heroRecords, skillCatalog)).toEqual([]);
});

test('stored data validates references but allows identical IDs in different slots', () => {
  const record = structuredClone(heroRecords[0]!);
  record.worldSkillIds = [record.worldSkillIds[0]!, record.worldSkillIds[0]!, record.worldSkillIds[0]!];
  expect(validateStoredData([record], skillCatalog)).toEqual([]);
  record.worldSkillIds[1] = 'missing';
  expect(validateStoredData([record], skillCatalog).some((error) => error.includes('missing world skill'))).toBe(true);
});

test('stored catalog rejects invalid effect values and codes', () => {
  const invalid = structuredClone(skillCatalog) as Record<string, unknown>;
  invalid['s01'] = { description: '測試技能', effects: [{ type: 'unknownEffect', value: Number.NaN }] };
  const errors = validateStoredData(heroRecords, invalid);
  expect(errors.some((error) => error.includes('invalid effect type'))).toBe(true);
});

test('reports duplicate ids, slots, invalid effects and missing partners', () => {
  const invalid = structuredClone(heroes) as unknown[];
  const first = invalid[0] as Record<string, unknown>;
  const second = invalid[1] as Record<string, unknown>;
  second.id = first.id;

  const skills = first.worldSkills as Array<Record<string, unknown>>;
  skills[1]!.slot = skills[0]!.slot;
  const effects = skills[0]!.effects as Array<Record<string, unknown>>;
  effects[0]!.type = 'unknownEffect';
  first.synergyPartnerIds = ['missing-id'];

  const errors = validateHeroes(invalid);
  expect(errors.some((error) => error.includes('duplicate hero id'))).toBe(true);
  expect(errors.some((error) => error.includes('duplicate world skill slot'))).toBe(true);
  expect(errors.some((error) => error.includes('invalid effect type'))).toBe(true);
  expect(errors.some((error) => error.includes('missing synergy partner'))).toBe(true);
});

test('does not reject identical world skills in different slots', () => {
  const repeated: Hero = structuredClone(heroes[0]!);
  const skill = repeated.worldSkills[0]!;
  repeated.worldSkills = ([1, 2, 3] as const).map((slot) => ({ ...structuredClone(skill), slot }));
  expect(validateHeroes([repeated])).toEqual([]);
});

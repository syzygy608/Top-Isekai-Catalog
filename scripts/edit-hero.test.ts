import { expect, test } from 'bun:test';
import { editHero, replaceHeroSource } from './edit-hero';
import type { HeroRecord, SkillDefinition } from '../src/types/hero';

const catalog: Record<string, SkillDefinition> = {
  s01: { description: '效果一', effects: [] },
  s02: { description: '效果二', effects: [] },
};
const original: HeroRecord = { id: 'Hero', name: '舊名稱', faction: 'truth', rarity: 'ssr', positions: ['captain'], tacticalRoles: [], worldSkillIds: ['s01', 's01', 's01'], tags: [], synergyPartnerIds: [] };

test('editing keeps blanks and changes one slot without merging repeated skills', async () => {
  const answers = ['', '', '2', '', '新標籤'];
  const updated = await editHero(() => answers.shift()!, original, catalog);
  expect(updated.worldSkillIds).toEqual(['s01', 's02', 's01']);
  expect(updated.name).toBe(original.name);
  expect(updated.tags).toEqual(['新標籤']);
  expect(original.worldSkillIds).toEqual(['s01', 's01', 's01']);
});

test('replacement validates and changes only selected record', () => {
  const format = (value: HeroRecord) => JSON.stringify(value, null, 2).split('\n').map((line) => `  ${line}`).join('\n');
  const source = `export const heroRecords = [\n${format(original)}\n] satisfies HeroRecord[];`;
  const updated = { ...original, worldSkillIds: ['s02', 's01', 's01'] };
  expect(replaceHeroSource(source, original, updated, [original], catalog)).toContain('"s02"');
  expect(() => replaceHeroSource(source, original, { ...updated, worldSkillIds: ['missing'] }, [original], catalog)).toThrow('three world skill IDs');
});

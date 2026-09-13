import { expect, test } from 'bun:test';
import { appendHeroSource, collectHero } from './add-hero';
import type { Hero } from '../src/types/hero';

function fixture(): Hero {
  return { id: 'new', name: '新英雄', faction: 'truth', rarity: 'ssr', positions: ['captain'], tacticalRoles: [], tags: [], synergyPartnerIds: [], worldSkills: ([1, 2, 3] as const).map((slot) => ({ slot, description: '相同技能', effects: [] })) };
}

test('wizard accepts blank optional answers and preserves repeated effects', async () => {
  const answers = ['new', '新英雄', '1', '2', '1', '', '相同技能', '2', '20', '1', '', '', 'y', '2', '20', '1', '', '', '', '相同技能', '', '相同技能', '', '祈願'];
  const hero = await collectHero(() => {
    const next = answers.shift();
    if (next === undefined) throw new Error('Unexpected prompt');
    return next;
  }, []);
  expect(hero.worldSkills).toHaveLength(3);
  expect(hero.worldSkills[0]!.effects[0]!.target).toBeUndefined();
  expect(hero.worldSkills[0]!.effects[0]!.condition).toBeUndefined();
  expect(hero.worldSkills[0]!.effects).toHaveLength(2);
  expect(hero.worldSkills[0]!.effects[0]).toEqual(hero.worldSkills[0]!.effects[1]);
  expect(hero.tags).toEqual(['祈願']);
  expect(answers).toHaveLength(0);
});

test('wizard advances to the next skill when add-another answer is blank', async () => {
  const prompts: string[] = [];
  const answers = ['new', '新英雄', '1', '2', '1', '', '技能一', '1', '1800', '1', '', '每 10 秒', '', '技能二', '', '技能三', '', ''];
  const hero = await collectHero((message) => {
    prompts.push(message);
    const next = answers.shift();
    if (next === undefined) throw new Error('Unexpected prompt');
    return next;
  }, []);
  expect(hero.worldSkills[0]!.effects).toHaveLength(1);
  expect(hero.worldSkills[1]!.description).toBe('技能二');
  expect(prompts.filter((message) => message.includes('世界技能 1：選擇效果'))).toHaveLength(1);
  expect(answers).toHaveLength(0);
});

test('wizard removes optional wrapping quotes from skill descriptions', async () => {
  const answers = ['new', '新英雄', '1', '2', '1', '', '"技能一"', '', "'技能二'", '', '技能三', '', ''];
  const hero = await collectHero(() => {
    const next = answers.shift();
    if (next === undefined) throw new Error('Unexpected prompt');
    return next;
  }, []);
  expect(hero.worldSkills.map((skill) => skill.description)).toEqual(['技能一', '技能二', '技能三']);
});

test('append preserves existing source comments and generates valid data', () => {
  const source = "import type { Hero } from '../types/hero';\n// Keep this comment\nexport const heroes = [\n] satisfies Hero[];\n";
  const output = appendHeroSource(source, fixture(), []);
  expect(output).toContain('// Keep this comment');
  const data = output.slice(output.indexOf('= [') + 2, output.lastIndexOf(' satisfies'));
  expect(JSON.parse(data)).toEqual([fixture()]);
});

test('append rejects duplicate IDs and unknown partners before writing', () => {
  const source = 'export const heroes = [] satisfies Hero[];';
  expect(() => appendHeroSource(source, fixture(), [fixture()])).toThrow('duplicate hero id');
  expect(() => appendHeroSource(source, { ...fixture(), synergyPartnerIds: ['missing'] }, [])).toThrow('missing synergy partner');
  expect(() => appendHeroSource('unexpected format', fixture(), [])).toThrow('格式');
});

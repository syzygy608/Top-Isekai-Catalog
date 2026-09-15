import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { heroRecords } from '../src/data/hero-records';
import { skillCatalog } from '../src/data/skill-catalog';
import { factionLabels, positionLabels, rarityLabels, tacticalRoleLabels } from '../src/data/labels';
import { FACTIONS, POSITIONS, RARITIES, TACTICAL_ROLES } from '../src/types/hero';
import type { HeroRecord, SkillDefinition } from '../src/types/hero';
import { validateStoredData } from './validate-heroes';

type Ask = (message: string) => string | Promise<string>;

export async function collectHero(
  ask: Ask,
  existing: readonly HeroRecord[],
  catalog: Readonly<Record<string, SkillDefinition>>,
): Promise<HeroRecord> {
  async function required(message: string): Promise<string> {
    for (;;) {
      const value = (await ask(message)).trim();
      if (value) return value;
      console.log('此欄位不能留空。');
    }
  }

  async function choose<T extends string>(
    message: string,
    values: readonly T[],
    labels: Record<T, string>,
    multiple = false,
    optional = false,
  ): Promise<T[]> {
    for (;;) {
      const answer = (await ask(`${message}\n${values.map((value, index) => `${index + 1}. ${labels[value]}`).join('\n')}\n${multiple ? '可用逗號分隔多個編號' : '輸入一個編號'}${optional ? '，留空略過' : ''}：`)).trim();
      if (!answer && optional) return [];
      const indexes = answer.split(/[,，]/).map((part) => /^\d+$/.test(part.trim()) ? Number(part.trim()) - 1 : -1);
      if ((!multiple && indexes.length !== 1) || indexes.some((index) => index < 0 || index >= values.length)) {
        console.log('請輸入選單中的有效編號。');
        continue;
      }
      return multiple ? [...new Set(indexes.map((index) => values[index]!))] : [values[indexes[0]!]!];
    }
  }

  let id: string;
  for (;;) {
    id = await required('英雄 ID（例如 Talia，不可與現有角色重複）：');
    if (!existing.some((hero) => hero.id === id)) break;
    console.log('此 ID 已存在，請使用另一個 ID。');
  }

  const skillIds = Object.keys(catalog);
  if (!skillIds.length) throw new Error('技能庫是空的，無法選擇世界技能。');
  const skillLabels = Object.fromEntries(skillIds.map((skillId) => [skillId, `${skillId}｜${catalog[skillId]!.description}`]));

  const hero: HeroRecord = {
    id,
    name: await required('顯示名稱（例如 塔莉婭 Talia）：'),
    faction: (await choose('陣營', FACTIONS, factionLabels))[0]!,
    rarity: (await choose('稀有度', RARITIES, rarityLabels))[0]!,
    positions: await choose('定位', POSITIONS, positionLabels, true),
    tacticalRoles: await choose('戰術場景', TACTICAL_ROLES, tacticalRoleLabels, true, true),
    worldSkillIds: [],
    tags: [],
    synergyPartnerIds: [],
  };
  console.log('同一技能可以選三次；每次選擇仍保留對應的技能位置。');
  for (const slot of [1, 2, 3]) {
    hero.worldSkillIds.push((await choose(`世界技能 ${slot}`, skillIds, skillLabels))[0]!);
  }
  hero.tags = [...new Set((await ask('標籤（以逗號分隔，可留空）：')).split(/[,，]/).map((tag) => tag.trim()).filter(Boolean))];
  if (existing.length > 0) {
    hero.synergyPartnerIds = await choose('搭檔角色', existing.map((item) => item.id),
      Object.fromEntries(existing.map((item) => [item.id, item.name])), true, true);
  }
  return hero;
}

export function appendHeroSource(
  source: string,
  hero: HeroRecord,
  existing: readonly HeroRecord[],
  catalog: Readonly<Record<string, SkillDefinition>>,
): string {
  const errors = validateStoredData([...existing, hero], catalog);
  if (errors.length) throw new Error(errors.join('\n'));
  const ending = /\s*\]\s+satisfies HeroRecord\[\];?\s*$/;
  const match = ending.exec(source);
  if (!match) throw new Error('角色檔案格式已改變，取消寫入。');
  const prefix = source.slice(0, match.index).trimEnd();
  const separator = prefix.endsWith('[') || prefix.endsWith(',') ? '' : ',';
  const entry = JSON.stringify(hero, null, 2).split('\n').map((line) => `  ${line}`).join('\n');
  return `${prefix}${separator}\n${entry}\n] satisfies HeroRecord[];\n`;
}

if (import.meta.main) {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('新增英雄精靈：選擇既有世界技能，按 Ctrl+C 可取消。');
    const path = new URL('../src/data/hero-records.ts', import.meta.url);
    const original = await readFile(path, 'utf8');
    const ask: Ask = (message) => readline.question(`${message} `);
    const hero = await collectHero(ask, heroRecords, skillCatalog);
    const updated = appendHeroSource(original, hero, heroRecords, skillCatalog);
    console.log('\n請確認新增資料：\n' + JSON.stringify(hero, null, 2));
    if ((await ask('確認新增？輸入 y 儲存，其他輸入取消：')).trim().toLowerCase() !== 'y') {
      console.log('已取消，沒有寫入角色資料。');
    } else {
      if (await readFile(path, 'utf8') !== original) throw new Error('輸入期間角色檔案已被修改，請重新執行。');
      const backup = new URL(`../src/data/hero-records.ts.${Date.now()}.bak`, import.meta.url);
      await copyFile(path, backup, constants.COPYFILE_EXCL);
      await writeFile(path, updated);
      console.log(`已新增 ${hero.name}。原始資料備份：${backup.pathname}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message.includes('readline') || message.includes('closed') ? '已取消，沒有寫入角色資料。' : message);
    process.exitCode = 1;
  } finally {
    readline.close();
  }
}

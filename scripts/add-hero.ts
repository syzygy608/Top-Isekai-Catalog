import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { heroes } from '../src/data/heroes';
import { effectTypeLabels, factionLabels, positionLabels, rarityLabels, tacticalRoleLabels } from '../src/data/labels';
import { EFFECT_TYPES, EFFECT_UNITS, FACTIONS, POSITIONS, RARITIES, TACTICAL_ROLES } from '../src/types/hero';
import type { Hero, WorldSkillEffect } from '../src/types/hero';
import { validateHeroes } from './validate-heroes';

type Ask = (message: string) => string | Promise<string>;

export async function collectHero(ask: Ask, existing: readonly Hero[]): Promise<Hero> {
  async function required(message: string): Promise<string> {
    for (;;) {
      const value = (await ask(message)).trim();
      if (value) return value;
      console.log('此欄位不能留空。');
    }
  }

  async function choose<T extends string>(message: string, values: readonly T[], labels: Record<T, string>, multiple = false, optional = false): Promise<T[]> {
    for (;;) {
      const answer = (await ask(`${message}\n${values.map((value, index) => `${index + 1}. ${labels[value]}`).join('\n')}\n${multiple ? '可用逗號分隔多個編號' : '輸入一個編號'}${optional ? '，留空略過' : ''}：`)).trim();
      if (!answer && optional) return [];
      const indexes = answer.split(/[,，]/).map((part) => /^\d+$/.test(part.trim()) ? Number(part.trim()) - 1 : -1);
      if ((!multiple && indexes.length !== 1) || indexes.some((index) => index < 0 || index >= values.length)) {
        console.log('請輸入選單中的有效編號。');
        continue;
      }
      return [...new Set(indexes.map((index) => values[index]!))];
    }
  }

  let id: string;
  for (;;) {
    id = await required('英雄 ID（例如 Talia，不可與現有角色重複）：');
    if (!existing.some((hero) => hero.id === id)) break;
    console.log('此 ID 已存在，請使用另一個 ID。');
  }
  const hero: Hero = {
    id,
    name: await required('顯示名稱（例如 塔莉婭 Talia）：'),
    faction: (await choose('陣營', FACTIONS, factionLabels))[0]!,
    rarity: (await choose('稀有度', RARITIES, rarityLabels))[0]!,
    positions: await choose('定位', POSITIONS, positionLabels, true),
    tacticalRoles: await choose('戰術場景', TACTICAL_ROLES, tacticalRoleLabels, true, true),
    worldSkills: [],
    tags: [],
    synergyPartnerIds: [],
  };

  for (const slot of [1, 2, 3] as const) {
    const description = (await required(`世界技能 ${slot}：請輸入完整原始說明：`))
      .replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, '$1$2');
    const effects: WorldSkillEffect[] = [];
    let addAnotherEffect = true;
    while (addAnotherEffect) {
      const type = (await choose(`世界技能 ${slot}：選擇效果；若沒有結構化效果可留空`, EFFECT_TYPES, effectTypeLabels, false, true))[0];
      if (!type) break;
      const effect: WorldSkillEffect = { type };
      for (;;) {
        const value = (await ask('效果數值（例如 20，不含 %；沒有數值可留空）：')).trim();
        if (!value) break;
        if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) || !Number.isFinite(Number(value))) {
          console.log('請輸入有效數字。');
          continue;
        }
        effect.value = Number(value);
        break;
      }
      const unit = (await choose('數值單位', EFFECT_UNITS, { percent: '百分比 %', flat: '固定數值', seconds: '秒' }, false, true))[0];
      if (unit) effect.unit = unit;
      const target = (await ask('效果對象（可留空）：')).trim();
      const condition = (await ask('生效條件（例如 每 10 秒；可留空）：')).trim();
      if (target) effect.target = target;
      if (condition) effect.condition = condition;
      effects.push(effect);
      addAnotherEffect = (await ask('是否為這個技能新增另一個效果？輸入 y 繼續，直接按 Enter 完成：'))
        .trim()
        .toLowerCase() === 'y';
    }
    console.log(`世界技能 ${slot} 輸入完成，共 ${effects.length} 個效果。`);
    hero.worldSkills.push({ slot, description, effects });
  }

  hero.tags = [...new Set((await ask('標籤（以逗號分隔，可留空）：')).split(/[,，]/).map((tag) => tag.trim()).filter(Boolean))];
  if (existing.length > 0) {
    hero.synergyPartnerIds = await choose('搭檔角色', existing.map((item) => item.id), Object.fromEntries(existing.map((item) => [item.id, item.name])), true, true);
  }
  return hero;
}

export function appendHeroSource(source: string, hero: Hero, existing: readonly Hero[]): string {
  const errors = validateHeroes([...existing, hero]);
  if (errors.length) throw new Error(errors.join('\n'));
  const ending = /\s*\]\s+satisfies Hero\[\];?\s*$/;
  const match = ending.exec(source);
  if (!match) throw new Error('角色檔案格式已改變，取消寫入。');
  const prefix = source.slice(0, match.index).trimEnd();
  const separator = prefix.endsWith('[') || prefix.endsWith(',') ? '' : ',';
  const entry = JSON.stringify(hero, null, 2).split('\n').map((line) => `  ${line}`).join('\n');
  return `${prefix}${separator}\n${entry}\n] satisfies Hero[];\n`;
}

if (import.meta.main) {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('新增英雄精靈：依提示選擇編號，三個世界技能會分別保留。按 Ctrl+C 可取消。');
    const path = new URL('../src/data/heroes.ts', import.meta.url);
    const original = await readFile(path, 'utf8');
    const ask: Ask = (message) => readline.question(`${message} `);
    const hero = await collectHero(ask, heroes);
    const updated = appendHeroSource(original, hero, heroes);
    console.log('\n請確認新增資料：\n' + JSON.stringify(hero, null, 2));
    if ((await ask('確認新增？輸入 y 儲存，其他輸入取消：')).trim().toLowerCase() !== 'y') {
      console.log('已取消，沒有寫入角色資料。');
    } else {
      if (await readFile(path, 'utf8') !== original) throw new Error('輸入期間角色檔案已被修改，請重新執行。');
      const backup = new URL(`../src/data/heroes.ts.${Date.now()}.bak`, import.meta.url);
      await copyFile(path, backup, constants.COPYFILE_EXCL);
      await writeFile(path, updated);
      console.log(`已新增 ${hero.name}。原始資料備份：${backup.pathname}\n可執行 bun run dev 預覽。`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message.includes('readline') || message.includes('closed') ? '已取消，沒有寫入角色資料。' : message);
    process.exitCode = 1;
  } finally {
    readline.close();
  }
}

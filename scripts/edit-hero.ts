import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { heroRecords } from '../src/data/hero-records';
import { skillCatalog } from '../src/data/skill-catalog';
import type { HeroRecord, SkillDefinition } from '../src/types/hero';
import { validateStoredData } from './validate-heroes';

type Ask = (message: string) => string | Promise<string>;

export async function editHero(
  ask: Ask,
  record: HeroRecord,
  catalog: Readonly<Record<string, SkillDefinition>>,
): Promise<HeroRecord> {
  const updated = structuredClone(record);
  const name = (await ask(`名稱 [${record.name}]，留空維持原值：`)).trim();
  if (name) updated.name = name;

  const ids = Object.keys(catalog);
  for (const [index, currentId] of record.worldSkillIds.entries()) {
    for (;;) {
      const answer = (await ask(`世界技能 ${index + 1} [${currentId}｜${catalog[currentId]?.description ?? '不存在'}]\n${ids.map((id, option) => `${option + 1}. ${id}｜${catalog[id]!.description}`).join('\n')}\n輸入新技能編號，留空維持原值：`)).trim();
      if (!answer) break;
      const choice = /^\d+$/.test(answer) ? ids[Number(answer) - 1] : undefined;
      if (!choice) {
        console.log('請輸入選單中的有效編號。');
        continue;
      }
      updated.worldSkillIds[index] = choice;
      break;
    }
  }

  const tags = (await ask(`標籤 [${record.tags.join('、')}]，輸入以逗號分隔的新清單；留空維持原值：`)).trim();
  if (tags) updated.tags = [...new Set(tags.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean))];
  return updated;
}

export function replaceHeroSource(
  source: string,
  previous: HeroRecord,
  updated: HeroRecord,
  all: readonly HeroRecord[],
  catalog: Readonly<Record<string, SkillDefinition>>,
): string {
  const nextRecords = all.map((record) => record.id === previous.id ? updated : record);
  const errors = validateStoredData(nextRecords, catalog);
  if (errors.length) throw new Error(errors.join('\n'));
  const format = (record: HeroRecord) => JSON.stringify(record, null, 2).split('\n').map((line) => `  ${line}`).join('\n');
  const oldText = format(previous);
  if (source.split(oldText).length !== 2) throw new Error('找不到唯一的原始英雄資料，取消寫入。');
  return source.replace(oldText, format(updated));
}

if (import.meta.main) {
  const readline = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const path = new URL('../src/data/hero-records.ts', import.meta.url);
    const original = await readFile(path, 'utf8');
    const ask: Ask = (message) => readline.question(`${message} `);
    const answer = (await ask(`選擇要編輯的英雄：\n${heroRecords.map((record, index) => `${index + 1}. ${record.name} (${record.id})`).join('\n')}\n輸入編號：`)).trim();
    const index = /^\d+$/.test(answer) ? Number(answer) - 1 : -1;
    const previous = heroRecords[index];
    if (!previous) throw new Error('英雄編號無效，沒有修改資料。');
    const updated = await editHero(ask, previous, skillCatalog);
    const next = replaceHeroSource(original, previous, updated, heroRecords, skillCatalog);
    console.log('\n請確認更新資料：\n' + JSON.stringify(updated, null, 2));
    if ((await ask('確認儲存？輸入 y 儲存，其他輸入取消：')).trim().toLowerCase() !== 'y') {
      console.log('已取消，沒有修改資料。');
    } else {
      if (await readFile(path, 'utf8') !== original) throw new Error('輸入期間角色檔案已被修改，請重新執行。');
      const backup = new URL(`../src/data/hero-records.ts.${Date.now()}.bak`, import.meta.url);
      await copyFile(path, backup, constants.COPYFILE_EXCL);
      await writeFile(path, next);
      console.log(`已更新 ${updated.name}。原始資料備份：${backup.pathname}`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  } finally {
    readline.close();
  }
}

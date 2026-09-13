# Top Isekai Catalog

最強異世界同伴圖鑑，可依陣營、角色定位、戰術場景、世界技能效果與標籤篩選角色。

## 開始使用

本專案使用 Bun 1.3.14。

```bash
bun install
bun run dev
```

開發伺服器預設位址為 `http://localhost:3000`。

## 新增英雄

在專案根目錄執行：

```bash
bun run hero:add
```

中文互動精靈會依序要求輸入：

1. 英雄 ID 與顯示名稱。
2. 陣營、稀有度、定位與戰術場景。
3. 三個世界技能的原始說明。
4. 每個技能的零個或多個結構化效果。
5. 標籤與搭檔角色。

選單使用數字編號；多選欄位可以輸入 `1,3`。輸入一個效果後，程式會詢問是否新增另一個效果：輸入 `y` 可繼續新增，直接按 Enter 就會完成目前技能並前往下一個技能。

標示「可留空」或「留空略過」的欄位可直接按 Enter。若技能說明誤加成對的單引號或雙引號，工具會在儲存前自動移除。

最後會顯示完整英雄資料。輸入 `y` 才會寫入 [src/data/heroes.ts](src/data/heroes.ts)，其他輸入會取消。成功寫入前，工具會檢查英雄 ID、固定代碼、技能 slot、效果資料及搭檔關係，並建立附有時間戳的 `.bak` 備份。

### 技能資料原則

- 每位英雄固定保存三個世界技能，對應 slot 1、2、3。
- `description` 是畫面顯示的完整原始文字。
- `effects` 用於篩選，需與說明文字分別輸入。
- 同一技能可以包含多個效果。
- 不同技能可以保存完全相同的效果，不會被合併或刪除。
- 新增標籤不會自動建立新的首頁篩選按鈕。

新增完成後，建議執行：

```bash
bun run check
bun run dev
```

若新英雄改變既有篩選結果數量，請同步更新 [篩選回歸測試](src/features/hero-filter/filter-heroes.test.ts)。

## 常用指令

| 指令 | 用途 |
|---|---|
| `bun run hero:add` | 啟動新增英雄互動精靈 |
| `bun run dev` | 啟動開發伺服器 |
| `bun run validate:data` | 驗證英雄、技能、效果及搭檔資料 |
| `bun run typecheck` | 執行 TypeScript 型別檢查 |
| `bun run lint` | 檢查程式碼品質 |
| `bun test` | 執行自動測試 |
| `bun run build` | 建立正式版本至 `dist/` |
| `bun run check` | 執行全部品質檢查及建置 |

## 資料結構

- [英雄與世界技能型別](src/types/hero.ts)
- [英雄資料](src/data/heroes.ts)
- [中文標籤對照](src/data/labels.ts)
- [資料驗證工具](scripts/validate-heroes.ts)
- [新增英雄工具](scripts/add-hero.ts)

## Changelog

### 2026-09-12

- 新增 `bun run hero:add` 中文互動精靈。
- 新增英雄前會驗證資料並顯示完整預覽，確認後才寫入。
- 寫入前自動備份原始英雄資料。
- 加入新增流程、重複效果與錯誤資料測試。

### 2026-08-03

- 將英雄資料及 React 畫面遷移至 TypeScript。
- 分離角色定位與戰術場景，定位代碼改為 `captain`、`striker`、`defender`。
- 建立保留技能順序的 `worldSkills` 結構，支援多效果與合法重複效果。
- 抽出篩選、效果查詢與摘要函式，並拆分 React 元件。
- 加入資料驗證、型別檢查、ESLint、自動測試與 CI。
- 改善清除條件、結果摘要、鍵盤操作與行動版體驗。
- 將介面更新為紫、青、洋紅霓虹色系的異次元風格。

### 2026-07-28

- Initial release.

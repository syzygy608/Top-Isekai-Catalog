# Top Isekai Catalog

最強異世界同伴圖鑑，可依陣營、角色定位、戰術場景、世界技能效果與標籤篩選角色。

## 開始使用

本專案使用 Bun。

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
3. 從既有技能庫選擇世界技能 1、2、3。
4. 標籤與搭檔角色。

選單使用數字編號；多選欄位可以輸入 `1,3`。三個技能各選一次，可以選相同技能 ID 三次。每個 ID 旁都顯示技能文字，無須重新輸入效果或數值。

標示「可留空」或「留空略過」的欄位可直接按 Enter。

最後會顯示完整英雄資料。輸入 `y` 才會寫入 [角色資料](src/data/hero-records.ts)，其他輸入會取消。成功寫入前，工具會檢查英雄 ID、技能 ID 及搭檔關係，並建立附有時間戳的 `.bak` 備份。

## 編輯英雄

執行 `bun run hero:edit`，選擇角色後可修改名稱、三個技能位置與標籤。編輯時直接按 Enter 會維持原值；預覽確認後輸入 `y` 才會儲存，原始資料也會備份。

若要修改陣營、稀有度、定位、戰術場景或搭檔，可直接編輯 [角色資料](src/data/hero-records.ts)。每個英雄的 `worldSkillIds` 依序代表技能 1、2、3，例如 `['s01', 's08', 's08']`；重複引用會顯示兩個獨立技能位置。

若遇到技能庫沒有的新技能，先在 [技能庫](src/data/skill-catalog.ts) 新增一個未使用的 ID，填入 `description` 與 `effects`，再於新增或編輯精靈中選取。修改既有技能庫定義會同時影響所有引用它的英雄；只想調整單一英雄時，請新增一個新 ID 並替換該英雄的引用。

### 技能資料原則

- 每位英雄保存三個技能 ID，陣列順序對應 slot 1、2、3。
- 技能庫保存完整原始說明與篩選用的效果資料；一個技能可以包含多個效果。
- 重複選用同一個 ID 是合法資料，畫面仍會分別顯示三個技能位置。
- 技能庫依完整說明與效果區分定義。即使說明文字相同，只要結構化效果不同，也可以保存不同 ID。
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
| `bun run hero:edit` | 啟動編輯英雄互動精靈 |
| `bun run dev` | 啟動開發伺服器 |
| `bun run validate:data` | 驗證英雄、技能、效果及搭檔資料 |
| `bun run typecheck` | 執行 TypeScript 型別檢查 |
| `bun run lint` | 檢查程式碼品質 |
| `bun test` | 執行自動測試 |
| `bun run build` | 建立正式版本至 `dist/` |
| `bun run check` | 執行全部品質檢查及建置 |

## 資料結構

- [英雄與世界技能型別](src/types/hero.ts)
- [角色資料與三個技能 ID](src/data/hero-records.ts)
- [共用世界技能庫](src/data/skill-catalog.ts)
- [角色資料展開函式](src/data/resolve-heroes.ts)
- [中文標籤對照](src/data/labels.ts)
- [資料驗證工具](scripts/validate-heroes.ts)
- [新增英雄工具](scripts/add-hero.ts)
- [編輯英雄工具](scripts/edit-hero.ts)

## Changelog

### 2026-09-15

- 將 37 位英雄的 111 個技能位置整理為 21 種共用技能定義；角色只保存三個技能 ID。
- 新增精靈改為選取既有技能，並加入 `bun run hero:edit` 編輯精靈。
- 技能資料在執行時依角色的技能位置展開，原有顯示與篩選內容不變。

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

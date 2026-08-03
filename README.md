# Top Isekai Catalog

最強異世界同伴圖鑑。可依陣營、角色定位、戰術場景、世界技能效果與標籤篩選角色。

## 開發

```bash
bun install
bun run dev
```

## 品質檢查

```bash
bun run check
```

`check` 會依序驗證角色資料、TypeScript 型別、lint、測試與正式建置。單獨指令包括：

- `bun run validate:data`：檢查角色 ID、固定代碼、世界技能 slot/effect 與搭檔關係。
- `bun run typecheck`：執行 TypeScript 嚴格型別檢查。
- `bun test`：執行篩選與資料驗證測試。
- `bun run build`：建立正式版網站至 `dist/`。

## CHANGELOG

- 2026/07/28 First release

- 2026/08/03 
  完成 Top Isekai Catalog 全面重構：將角色資料遷移至 TypeScript，分離角色定位與戰術場景，定位代碼更新為 captain、striker、defender，並以中文 label mapping 顯示；建立保留技能順序的 worldSkills 結構，支援單一技能多效果及不同技能間的合法重複效果，同時統一效果名稱與搭檔角色 ID；抽出角色篩選、效果查詢及摘要函式，維持同分類 OR、不同分類 AND 的篩選規則；拆分 React 元件並改善清除條件、結果摘要、鍵盤操作與行動版體驗；加入角色資料驗證、TypeScript 型別檢查、ESLint、37 項自動測試、CI、重構前基準及專案文件；整體介面則更新為紫、青、洋紅霓虹色系的異次元風格，加入宇宙網格、傳送門頁首、玻璃化篩選面板、能量邊框角色卡與 reduced-motion 支援。

  With Codex

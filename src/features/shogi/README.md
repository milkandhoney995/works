# features/shogi フォルダ

## 概要

このフォルダは UI（React Components）から完全に独立した将棋ロジック層 を表します。

- 盤面表現
- 駒の移動ルール
- 王手・詰み関連判定
- 状態遷移（Reducer）

を責務ごとに分離し、UIからは reducer / state / public API のみを参照する設計を目指しています。

### 各フォルダ・ファイルの役割
- `board`: 盤面(board.ts)、駒(pieces.ts)の定義（静的データ）
- `check`: 王手、打歩詰めなどの局面評価
- `move`: 自殺手を除く、(成り駒を含む)各駒の合法手などの盤面評価
- `rules`: 駒の移動・成り、打ち駒、選択解除の処理
- `state`: 将棋の状態管理。State / Reducer（UIと接続される唯一の層）
- `utils`: 汎用ヘルパー
- `index.ts`: Public API

## フォルダ構成
```
src/features/shogi/
├── board/
│   ├── board.ts
│   └── pieces.ts
├── check/
│   ├── findKingPosition.ts
│   ├── isKingInCheck.ts
│   └── isUchifuzume.ts
├── domain
│   └── shogiRules.ts
├── move/
│   ├── applyMove.ts
│   ├── generateLegalMoves.ts
│   ├── moveGenerators.ts
│   └── moveRules.ts
├── state/
│   ├── shogiReducer.ts
│   ├── shogiState.ts
│   └── types.ts
├── usecases
│   ├── cancelSelection.ts
│   ├── dropPiece.ts
│   ├── movePiece.ts
│   ├── promotePiece.ts
│   ├── selectCell.ts
│   └── selectHandPiece.ts
├── utils/
│   ├── shogiHelpers.ts
│   └── evaluateCheckState.ts
└── index.ts
```

## レイヤ別 詳細説明
### `board/`

静的データ定義のみ

- `board.ts`
  - 初期盤面`initialBoard`
  - 状態やロジックへの依存なし
- `pieces.ts`
  - 表示名・成り対応などのマッピング

### `check/`

局面評価（王手・詰み）

- `findKingPosition.ts`
  - 玉の探索（純粋関数）
- `isKingInCheck.ts`
  - 王手判定
  - `moveRules`に依存（攻撃可能判定）
- `isUchifuzume.ts`
  - 打歩詰め判定
  - `state`/`move`に依存

### `move/`

駒単体の「動けるマス」を計算する

- `moveGenerators.ts`
  - step / ray 移動の汎用ロジック
- `moveRules.ts`
  - `board`、`utils` のみ依存
- `applyMoves.ts`
  - 盤面に移動を適用（純粋関数）
- `generateLegalMoves.ts`
  - 自殺手を除外
  - `check`に依存

### `domain`

将棋ルールに基づく State 遷移
- `shogiRules.ts`
  - 駒移動
  - 成り判定
  - 打ち駒処理

### `state/`

UI とロジックの接続点

- `shogiState.ts`
  - State / Action 定義
- `shogiState.ts`
  - UIイベント → ルール呼び出し

### `usecases/`

UIイベントごとのロジック

- `selectCell.ts`
  - セル選択時
- `selectHandPiece.ts`
  - 持ち駒選択時
- `movePiece.ts`
  - 駒移動時
- `promotePiece.ts`
  - 成り
- `dropPiece.ts`
  - 駒を打つ時
- `cancelSelection.ts`
  - 選択解除時

### `utils/`

汎用ヘルパー

- 盤面コピー
- 陣営判定
- 二歩・強制成などの補助関数
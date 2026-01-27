# features/shogi フォルダ

## 概要

このフォルダは**UI（React Components）から完全に独立した将棋ロジック層** を表します。

UIは**public API（`index.ts`）と reducer / state のみ** を参照し、
将棋のルール・局面評価・探索ロジックの詳細を一切知りません。

本レイヤでは、以下を責務ごとに分離します。

- 盤面・駒の**静的定義**
- 駒単体の移動可能マス計算（擬似合法手）
- 王手・打歩詰めなどの**局面評価**
- 将棋ルールに基づく**状態遷移**
- UIイベント単位の**ユースケース**

将来的な機能追加（詰み判定、千日手、AI探索）にも耐えられる構造を目的としています。

---

## 設計方針

- Reducerの責務は最小にとどめる
  - 「どのイベントを呼ぶか」を決めるだけ
- ユースケースは UIイベント単位
  - UIの関心事（クリック・選択・操作）と 1:1
- ルール・探索・評価は純粋関数
  - テスト容易性・再利用性を最優先
- 依存方向は一方向
  - `board → move → check → domain/usecases → state`

---

## フォルダ構成

```
src/features/shogi/
├── model/
│   ├── rules
│   ├── board.ts
│   └── pieces.ts
├── judge/
│   ├── findKing.ts
│   ├── check.ts
│   └── uchifuzume.ts
├── move/
│   ├── applyMove.ts
│   ├── generateLegalMoves.ts
│   ├── generators.ts
│   └── rules.ts
├── state/
│   ├── shogiReducer.ts
│   ├── shogiState.ts
│   └── types.ts
├── usecases/
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

---

## レイヤー別 詳細説明

### ドメイン層

#### `model/`

将棋というゲームを成立させる最小単位
**完全に静的な定義のみ**を置くレイヤー

- 状態を持たない
- 他レイヤーへの依存なし

##### `board.ts`
- 初期盤面 `initialBoard`

##### `pieces.ts`
- 駒の表示名マップ
- 成り・不成の対応表

##### `rules.ts`
- 駒移動
- 成り判定
- 打ち駒処理
- 捕獲処理

※ reducer から直接呼ばれない（usecases経由のみ）

---

#### `move/`

**駒単体の「動けるマス」を計算するレイヤー**

- 状態（State）を一切持たない
- 盤面を入力 → マスの配列を出力

##### `generators.ts`
- step / ray 移動の汎用ロジック

##### `rules.ts`
- 駒種別ごとの移動ルール
- `board` / `utils` のみ依存

##### `applyMove.ts`
- 盤面に移動を適用する純粋関数

##### `generateLegalMoves.ts`
- 擬似合法手から **自殺手を除外**
- `check` レイヤーに依存

---

#### `judge/`

**局面評価レイヤー**

- 王手・打歩詰めなど「盤面の意味」を判定
- State の書き換えは行わない

##### `findKing.ts`
- 玉の位置探索（純粋関数）

##### `check.ts`
- 王手判定
- `rules` を利用した攻撃可能判定

##### `uchifuzume.ts`
- 打歩詰め判定
- `state` / `move` に依存（例外的に重め）

---
### アプリケーション層

#### `usecases/`

**UIイベント単位のアプリケーションロジック**

- reducer から呼ばれる唯一の層
- 複数ルール・評価を組み合わせる

##### `selectCell.ts`
- 盤面セル選択
- 合法手計算

##### `selectHandPiece.ts`
- 持ち駒選択
- 打てるマスの計算

##### `movePiece.ts`
- 駒移動
- 王手状態再評価

##### `promotePiece.ts`
- 成り / 不成の確定

##### `dropPiece.ts`
- 打ち駒
- 二歩・打歩詰め・王手回避判定

##### `cancelSelection.ts`
- 選択解除

---
### 状態管理

#### `state/`

**UI とロジックの接続点**

##### `shogiState.ts`
- `ShogiState`
- `ShogiAction`
- 初期状態定義

##### `shogiReducer.ts`
- UIイベントをユースケースにルーティング
- 将棋ルールの詳細は持たない

##### `types.ts`
- Position / Hands / PendingPromotion などの共通型

---
### 汎用関数

#### `utils/`

**将棋に依存するが、どのレイヤーにも属さない汎用処理**

##### `shogiHelpers.ts`
- 陣営判定
- 二歩判定
- 強制成り判定
- 盤面コピー

##### `evaluateCheckState.ts`
- 局面確定後の評価
  - 王手状態
  - 玉の位置

---
### Public API 定義
#### `index.ts`

**Public API 定義**

- UI からの import 入口を 1 箇所に集約
- 内部構造変更に強くするためのバリア

---

## 補足

- この構成は DDD / Clean Architecture を将棋ドメイン向けに軽量化したもの
- 将来AI対戦などを追加する場合は、新たにレイヤーを追加するだけで対応可能

---

## ゴール

- reducerを読めば、**UIイベントの流れが一瞬でわかる**
- 将棋ルールはドメイン層に閉じ込める
- 将棋以外の機能を `features/` に追加しても問題ない構造
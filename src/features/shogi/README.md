# features/shogi フォルダ

## 役割

features/shogiフォルダ配下には、UIから独立したロジック層のコードを配置します。

### 各フォルダ・ファイルの役割
- `board`: 盤面(board.ts)、駒定義(pieces.ts)
- `check`: 王手、打歩詰め判定
- `move`: 自殺手を除く、(成り駒を含む)各駒の合法手の設定
- `rules`: 駒の移動・成り、打ち駒、選択解除の処理
- `state`: 将棋の状態管理
- `utils`: ヘルパー関数
- `index.ts`: import元を1か所に固定

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
├── move/
│   ├── applyMove.ts
│   ├── getLegalMoves.ts
│   ├── moveGenerators.ts
│   └── moveRules.ts
├── rules/
│   └── shogiRules.ts
├── state/
│   ├── shogiReducer.ts
│   ├── shogiState.ts
│   └── types.ts
├── utils/
│   ├── shogiHelpers.ts
│   └── withCheckState.ts
└── index.ts
```
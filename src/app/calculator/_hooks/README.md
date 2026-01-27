# calculator / hooks

Calculator ページ専用のカスタム hooks を管理するディレクトリです。
UI ロジックと計算ロジックを分離し、`useCalculator` が統合窓口（Facade）として機能します。

---

## 構成
```
_hooks/
├── useCalculator.ts # UI 向け Facade
├── useCalculatorState.ts # 計算ロジック・状態管理
├── useCalculatorKeyboard.ts # キーボード入力処理
└── formatDisplay.ts # 表示フォーマット（純関数）
```


---

## 各ファイルの責務

### useCalculatorState
- 数値入力
- 演算子選択
- 計算処理
- Calculator の状態管理
- UI / DOM 非依存

---

### useCalculatorKeyboard
- キーボード入力の監視
- 入力イベントを状態操作に変換
- 表示・計算ロジックを持たない

---

### formatDisplay
- 数値表示フォーマット
- 副作用なしの純関数

---

### useCalculator（Facade）
- 上記 hooks を統合
- UI に必要な API のみを公開
- 内部構造変更が UI に影響しない設計

---

## 依存関係

```
useCalculator
├── useCalculatorState
├── useCalculatorKeyboard
└── formatDisplay
```

UI コンポーネントは `useCalculator` のみを利用します。

---

## 設計方針

- 責務分離
- 副作用（Keyboard）の局所化
- Facade による API 安定化
- App Router における画面専用ロジックの明示
# プロジェクト名（例: My Personal Apps）

このリポジトリは、個人開発用の学習・実験用アプリ群をまとめたプロジェクトです。
Next.js 16（App Router）と React 19、TypeScript を使用しています。

## 目次
- [概要](#概要)
- [アプリ一覧](#アプリ一覧)
- [技術スタック](#技術スタック)
- [セットアップ方法](#セットアップ方法)
- [ディレクトリ構成](#ディレクトリ構成)
- [ライセンス](#ライセンス)

---

## 概要
このプロジェクトでは以下の小アプリを作成しています：

- 計算機アプリ (`calculator`)
- 瞑想タイマーアプリ (`meditationApp`)
- 将棋ゲーム (`shogi`)
- Todo リストアプリ (`todoList`)

学習目的で、それぞれ React コンポーネントやフック、グローバルステート管理を使い分けています。

---

## アプリ一覧

### Calculator
- 簡単な電卓アプリ
- 四則演算対応
- `src/app/calculator` 配下に実装

### Meditation App
- 瞑想用タイマーアプリ
- カウントダウンタイマー、開始/停止機能あり
- `src/app/meditationApp` 配下に実装

### Shogi
- ブラウザ上で動作する将棋ゲーム
- 駒の移動ルールや持ち駒対応
- `src/app/shogi` と `src/components/shogi` に実装

### Todo List
- タスク管理アプリ
- Todo の追加・削除・完了マーク対応
- `src/app/todoList` と `src/components/todoList` に実装

---

## 技術スタック
- [Next.js 16](https://nextjs.org/)（App Router）
- [React 19](https://react.dev/)
- TypeScript
- SCSS モジュールによるスタイリング
- Zustand / Redux などの状態管理（`store` フォルダ内）

---

## セットアップ方法

1. リポジトリをクローン
```bash
git clone <リポジトリURL>
cd <プロジェクトフォルダ>
```

2. 依存パッケージをインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm run dev
```

4. ブラウザで[http://localhost:3000](http://localhost:3000)にアクセス

## ディレクトリ構成
```
src
├── app
│   ├── calculator
│   │   ├── _components
│   │   │   └── CalculatorButton.tsx
│   │   ├── _data
│   │   │   └── calculatorButton.ts
│   │   ├── _hooks
│   │   │   └── useCalculator.ts
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── meditationApp
│   │   ├── _components
│   │   │   ├── CircleProgress.tsx
│   │   │   ├── Player.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   ├── SoundPicker.tsx
│   │   │   └── TimeSelector.tsx
│   │   ├── _data
│   │   │   ├── soundOptions.ts
│   │   │   └── timeOptions.ts
│   │   ├── _hooks
│   │   │   └── useMeditationTimer.ts
│   │   ├── page.module.scss
│   │   └── page.tsx
│   ├── page.module.scss
│   ├── page.tsx
│   ├── shogi
│   │   ├── _components
│   │   │   ├── Board.tsx
│   │   │   ├── Cell.tsx
│   │   │   ├── Hands.tsx
│   │   │   └── ShogiBoardWithPromotion.tsx
│   │   ├── _data
│   │   │   ├── board.ts
│   │   │   └── pieces.ts
│   │   ├── _hooks
│   │   │   └── useShogi.ts
│   │   ├── page.module.scss
│   │   └── page.tsx
│   └── todoList
│       ├── _components
│       │   ├── AddTodo
│       │   │   ├── AddTodo.module.scss
│       │   │   └── AddTodo.tsx
│       │   └── TodoItem
│       │       ├── TodoItem.module.scss
│       │       └── TodoItem.tsx
│       ├── page.module.scss
│       └── page.tsx
├── components
│   ├── Providers.tsx
│   └── card
│       ├── card.module.scss
│       └── index.tsx
├── data
│   └── cards.ts
├── features
│   └── shogi
│       ├── judge
│       │   ├── findKing.ts
│       │   ├── check.ts
│       │   ├── evaluateCheck.ts
│       │   └── uchifuzume.ts
│       ├── move
│       │   ├── applyMove.ts
│       │   ├── generateLegalMoves.ts
│       │   ├── generators.ts
│       │   └── rules.ts
│       ├── rules
│       │   └── shogiRules.ts
│       └── state
│           ├── shogiReducer.ts
│           ├── shogiState.ts
│           └── types.ts
├── store
│   ├── index.ts
│   └── todoSlice.ts
```

※ 詳細はコード内コメント参照。

## ライセンス
MIT License
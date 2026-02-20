# JSBook - JavaScript Learning Platform

このディレクトリは、JavaScriptの学習リソースを提供するアプリケーションです。

## フォルダ構成

```
jsbook/
├── _components/          # UIコンポーネント
│   ├── Layout.tsx       # メインレイアウト
│   ├── Sidebar.tsx      # サイドバーナビゲーション
│   ├── TopicCard.tsx    # トピックカード
│   ├── MarkdownContent.tsx  # Markdownレンダラー
│   └── markdown.module.scss # スタイル
├── _content/            # Markdown コンテンツファイル
│   ├── basics.md        # 基本文法
│   ├── dom.md           # DOM操作
│   ├── events.md        # イベント処理
│   ├── arrays.md        # 配列とメソッド
│   └── advanced.md      # 高度なトピック
├── _data/               # データ定義
│   └── topics.ts        # トピック一覧
├── _utils/              # ユーティリティ
│   ├── markdown.ts      # ファイル読み込み
│   └── markdownParser.ts # Markdown パーサー
├── [topic]/             # 動的ルート
│   └── page.tsx         # トピック詳細ページ
└── page.tsx             # トップページ
```

## コンテンツ

### 基本文法 (basics.md)
- 変数宣言（var, let, const）
- データ型（プリミティブ型、オブジェクト型）
- 演算子（算術、比較、論理）
- 制御構文（if, switch, ループ）
- 関数（関数宣言、関数式、アロー関数）
- スコープとクロージャ
- テンプレートリテラル

### DOM操作 (dom.md)
- DOMの基本概念
- 要素の取得（getElementById, querySelector など）
- 要素の内容変更（textContent, innerHTML）
- 属性操作（getAttribute, setAttribute）
- クラス操作（classList）
- スタイル操作（style, getComputedStyle）
- 要素の作成と追加
- 要素の削除
- 要素の関係性にアクセス
- 実践的な例とパフォーマンスのヒント

### イベント (events.md)
- イベントの種類（マウス、キーボード、フォーム、ウィンドウ）
- イベントリスナーの追加（addEventListener）
- イベントオブジェクトの使用
- イベント制御（preventDefault, stopPropagation）
- イベントリスナーの削除
- イベント委譲
- キーボードショートカット
- デバウンスとスロットリング

### 配列とメソッド (arrays.md)
- 配列の基本操作（push, pop, shift, unshift）
- 配列の変更メソッド（splice, sort, reverse）
- 配列の変更しないメソッド（slice, concat, join）
- 反復処理メソッド（forEach, map, filter, reduce）
- 検索メソッド（find, findIndex, some, every, includes）
- indexOf と lastIndexOf
- 配列の展開（flat, flatMap）

### 高度なトピック (advanced.md)
- 非同期処理（コールバック、Promise、async/await）
- オブジェクト指向（クラス、継承）
- 関数型プログラミング（compose, map, filter, reduce）
- デストラクチャリング
- スプレッド演算子とレスト演算子
- クロージャとモジュールパターン
- thisバインディング
- プロトタイプ
- ジェネレータ

## 使用技術

- **フレームワーク**: Next.js 14+
- **言語**: TypeScript
- **スタイリング**: SCSS モジュール
- **マークダウン処理**: カスタム Markdown パーサー

## ページ構成

### トップページ (`/jsbook`)
- トピック一覧表示
- サイドバーナビゲーション
- ウェルカムメッセージ

### トピック詳細ページ (`/jsbook/[topic]`)
- Markdown コンテンツの表示
- 前後のトピックへのナビゲーション
- 主要な見出しのインデックス表示（オプション）

## コンポーネント

### Layout.tsx
メインのレイアウトコンポーネント。サイドバーとメインコンテンツエリアを管理します。

### Sidebar.tsx
ナビゲーション用サイドバー。トピック一覧を表示し、現在のトピックをハイライトします。

### TopicCard.tsx
トピック情報をカード形式で表示するコンポーネント。

### MarkdownContent.tsx
Markdown テキストをレンダリングするコンポーネント。CSS スタイルの適用とセキュリティ対応。

## Markdown スタイル

生成された HTML には以下のスタイルが適用されます：

- **見出し**: 階層的なサイズと線スタイル
- **コードブロック**: シンタックスハイライト対応
- **リスト**: 順序付き・順序なしリストのサポート
- **テーブル**: 読みやすいテーブルスタイル
- **リンク**: ホバー効果付き
- **引用**: 左側のボーダーと斜体スタイル

## 拡張方法

### 新しいトピックを追加する

1. `_content/` に新しい Markdown ファイルを作成
   ```
   _content/your-topic.md
   ```

2. `_data/topics.ts` にトピックを登録
   ```typescript
   { slug: 'your-topic', title: 'Your Topic Title' }
   ```

3. Markdown ファイルに内容を記述

### スタイルをカスタマイズする

`_components/markdown.module.scss` を編集して、Markdown の各要素のスタイルを変更できます。

## 実装の詳細

### Markdown の読み込み

`_utils/markdown.ts` で提供される関数を使用して、ファイルシステムから Markdown を読み込みます。

### Markdown → HTML 変換

`_utils/markdownParser.ts` のカスタムパーサーで、Markdown を HTML に変換します。

### セキュリティ

`dangerouslySetInnerHTML` を使用しているため、信頼されたコンテンツのみを表示してください。ユーザー入力は適切にサニタイズしてください。

## 今後の改善案

- [ ] Markdown ライブラリの統合（remark など）
- [ ] トピック内の検索機能
- [ ] 関連トピックのリンク表示
- [ ] 進捗管理機能（ユーザーが完了したトピックを記録）
- [ ] コード実行環境の統合
- [ ] コメント機能
- [ ] シャープ色分け（コード言語別）
- [ ] 目次の自動生成
- [ ] 多言語対応

## ライセンス

このコンテンツは学習目的で自由に使用できます。

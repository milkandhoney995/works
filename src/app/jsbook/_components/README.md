# Components

このディレクトリは、JSBook アプリケーション向けの React コンポーネントを格納しています。

## Layout.tsx

メインのレイアウトコンポーネント。サイドバーナビゲーションとメインコンテンツエリアを提供します。

### Props

```typescript
interface LayoutProps {
  children: React.ReactNode;
  activeSlug?: string;  // 現在のトピック slug（ハイライト用）
}
```

### 機能

- レスポンシブサイドバー（モバイルサイズで非表示）
- トピック一覧のナビゲーション
- 現在のトピックをハイライト表示
- ホームリンク

### 使用例

```typescript
import { Layout } from './_components/Layout';

export default function Page() {
  return (
    <Layout activeSlug="basics">
      <h1>コンテンツ</h1>
      <p>ここにコンテンツが入ります</p>
    </Layout>
  );
}
```

## Sidebar.tsx（オプション）

サイドバーコンポーネント。Layout に統合されています。

## TopicCard.tsx（オプション）

トピック情報をカード形式で表示するコンポーネント。

## MarkdownContent.tsx

Markdown コンテンツをレンダリングするコンポーネント。

### Props

```typescript
interface MarkdownProps {
  children: ReactNode;
}

interface HTMLContentProps {
  html: string;
}
```

### 機能

- Markdown スタイリング
- HTML コンテンツレンダリング
- 適切なタイポグラフィ

### 使用例

```typescript
import { HTMLContent } from './_components/MarkdownContent';

export default function Topic() {
  const html = markdownToHtml(markdown);
  return <HTMLContent html={html} />;
}
```

## markdown.module.scss

すべての Markdown レンダリング用スタイルを定義します。

### スタイル対象

- `h1`, `h2`, `h3`, `h4`, `h5`, `h6` - 見出し
- `p` - 段落
- `code`, `pre` - コード
- `strong`, `em` - テキスト装飾
- `ul`, `ol`, `li` - リスト
- `blockquote` - 引用
- `table` - テーブル
- `a` - リンク
- `img` - 画像
- `hr` - 水平線

## layout.module.scss

レイアウトコンポーネント用のスタイルを定義します。

### クラス

- `.container` - メインコンテナ（flex ラッアウト）
- `.sidebar` - サイドバー
- `.main` - メインコンテンツエリア
- `.nav` - ナビゲーション
- `.topicList` - トピック一覧
- `.active` - アクティブ状態

## ベストプラクティス

1. **コンポーネントの責任分離**: 各コンポーネントは 1 つの責任に焦点を当てる
2. **Props の型定義**: すべての Props に TypeScript 型を定義
3. **再利用性**: コンポーネントを汎用的に設計
4. **アクセシビリティ**: セマンティック HTML を使用

## 今後の拡張候補

- [ ] トピック検索コンポーネント
- [ ] テーブル of Contents（目次）コンポーネント
- [ ] コード実行環境
- [ ] コメント機能
- [ ] ダークモード対応

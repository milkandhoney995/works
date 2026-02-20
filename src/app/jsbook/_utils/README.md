# Utils

このディレクトリは、JSBook アプリケーション向けのユーティリティ関数を格納しています。

## markdown.ts

ファイルシステムから Markdown ファイルを読み込むヘルパー関数を提供しています。

### 関数

#### getMarkdownContent(topic: string): string

指定したトピックの Markdown コンテンツを読み込みます。

```typescript
const content = getMarkdownContent('basics');
console.log(content); // "# JavaScript 基本文法\n\n..."
```

#### getAllTopicSlugs(): string[]

利用可能なすべてのトピック slug を取得します。

```typescript
const slugs = getAllTopicSlugs();
console.log(slugs); // ['basics', 'dom', 'events', 'arrays', 'advanced']
```

## markdownParser.ts

Markdown テキストを HTML に変換する簡易パーサーを提供しています。

### 関数

#### markdownToHtml(markdown: string): string

Markdown テキストを HTML に変換します。

```typescript
const markdown = '# タイトル\n\nこれは**太字**です。';
const html = markdownToHtml(markdown);
// '<h1>タイトル</h1><p>これは<strong>太字</strong>です。</p>'
```

### サポートされている Markdown 要素

- **見出し**: `#`, `##`, `###` など
- **太字**: `**text**` または `__text__`
- **斜体**: `*text*` または `_text_`
- **コード**: インラインコード `` `code` ``、コードブロック ` ```code``` `
- **リスト**: 順序付き（`1.`）、順序なし（`-` または `*`）
- **リンク**: `[text](url)`
- **テーブル**: パイプ（`|`）で区切られたテーブル
- **水平線**: `---`
- **引用**: `>`（将来実装予定）

### 注意事項

- これは簡易パーサーです
- 複雑な Markdown 構文には対応していない可能性があります
- 本番環境では、`remark` や `marked` などの成熟したライブラリの使用を検討してください

## 使用例

### API ルートでの使用

```typescript
import { getMarkdownContent } from '../_utils/markdown';
import { markdownToHtml } from '../_utils/markdownParser';

const markdown = getMarkdownContent('basics');
const html = markdownToHtml(markdown);
// クライアントに HTML を返す
```

### クライアントコンポーネントでの使用

```typescript
import { markdownToHtml } from '../_utils/markdownParser';

const html = markdownToHtml(markdownText);
return <div dangerouslySetInnerHTML={{ __html: html }} />;
```

## セキュリティに関する注意

`dangerouslySetInnerHTML` を使用しているため、ユーザーからの入力を直接使用しないでください。

## 今後の改善

- [ ] より高度な Markdown 機能のサポート
- [ ] シンタックスハイライト
- [ ] 目次の自動生成
- [ ] フットノート対応
- [ ] LaTeX 数式対応

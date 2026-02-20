# Data Files

このディレクトリは、JSBook アプリケーションで使用されるデータ定義ファイルを格納しています。

## topics.ts

JSBook のすべてのトピック一覧を定義しています。

```typescript
export const topics = [
  { slug: 'basics', title: 'JavaScript 基本文法' },
  { slug: 'dom', title: 'DOM操作' },
  { slug: 'events', title: 'イベント' },
  { slug: 'arrays', title: '配列とメソッド' },
  { slug: 'advanced', title: 'JavaScriptの高度なトピック' },
];
```

### プロパティ

- **slug**: URL パスで使用される識別子。対応する Markdown ファイル名と一致する必要があります
- **title**: UI に表示されるトピックのタイトル

### 新しいトピックを追加する場合

1. ここに新しいエントリを追加
2. `_content/${slug}.md` に対応する Markdown ファイルを作成
3. API ルート（`/api/jsbook/${slug}`）で自動的に利用可能に

## 命名規則

- slug は kebab-case（英語、小文字、ハイフン区切り）
- ファイル名は slug と完全に一致

## ベストプラクティス

- すべてのトピックは同じカテゴリレベルで扱う
- サブカテゴリが必要な場合は、階層構造の追加を検討
- slug は安定性を保つため、一度設定したら変更しない

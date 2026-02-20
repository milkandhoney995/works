import fs from 'fs';
import path from 'path';

/**
 * 指定されたトピックのMarkdownコンテンツを取得する関数
 * - トピックはsrc/app/jsbook/_contentディレクトリ内の.mdファイル名に対応
 * - ファイルが存在しない場合は空文字を返す
 * 例: getMarkdownContent('basic-syntax')はsrc/app/jsbook/_content/basic-syntax.mdの内容を返す
 * @param topic - トピックのスラッグ（例: 'basic-syntax'）
 * @returns トピックのMarkdownコンテンツ、存在しない場合は空文字
 */
export function getMarkdownContent(topic: string): string {
  const filePath = path.join(
    process.cwd(),
    'src/app/jsbook/_content',
    `${topic}.md`
  );
  
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    return '';
  }
}

export function getAllTopicSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'src/app/jsbook/_content');
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace('.md', ''));
}

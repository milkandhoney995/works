// Markdown parser and converter
// 簡易的なMarkdownをHTMLに変換

export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // コードブロック
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (match, lang, code) => {
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code class="language-${lang}">${escapedCode}</code></pre>`;
    }
  );

  // インラインコード
  html = html.replace(
    /`([^`]+)`/g,
    '<code>$1</code>'
  );

  // 見出し
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // 太字
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 斜体
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // リスト（順序付き）
  html = html.replace(
    /^\d+\.\s(.*?)$/gm,
    '<li>$1</li>'
  );
  html = html.replace(
    /(<li>.*?<\/li>)/s,
    '<ol>$1</ol>'
  );

  // リスト（順序なし）
  html = html.replace(
    /^[-*]\s(.*?)$/gm,
    '<li>$1</li>'
  );
  html = html.replace(
    /(<li>.*?<\/li>)/s,
    (match) => {
      if (!match.includes('<ol>')) {
        return `<ul>${match}</ul>`;
      }
      return match;
    }
  );

  // テーブル（簡易版）
  html = html.replace(
    /\|(.+?)\|/g,
    (match) => {
      const cells = match
        .split('|')
        .filter((cell) => cell.trim())
        .map((cell) => `<td>${cell.trim()}</td>`)
        .join('');
      return `<tr>${cells}</tr>`;
    }
  );
  html = html.replace(
    /(<tr>.*?<\/tr>)/s,
    '<table>$1</table>'
  );

  // リンク
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2">$1</a>'
  );

  // 水平線
  html = html.replace(/^---$/gm, '<hr />');

  // 段落
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(#|<h)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre|<ul|<ol|<table)/g, '$1');
  html = html.replace(/(<\/pre>|<\/ul>|<\/ol>|<\/table>)<\/p>/g, '$1');

  return html;
}

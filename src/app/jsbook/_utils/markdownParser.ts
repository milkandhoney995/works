// Markdown parser and converter
// より堅牢なMarkdownをHTMLに変換

export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Step 1: Protect code blocks from further processing
  const codeBlocks: string[] = [];
  html = html.replace(/```([\s\S]*?)```/g, (match) => {
    const index = codeBlocks.length;
    codeBlocks.push(match);
    return `<!-- CODE_BLOCK_${index} -->`;
  });

  // Step 2: 見出し（見出しは段落の前に処理）
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Step 3: 水平線
  html = html.replace(/^---+$/gm, '<hr />');

  // Step 4: リスト（順序付き）
  html = html.replace(/^(\d+\.\s.+?)(?=\n(?:\d+\.|[^\d]|$))/gm, (match) => {
    const items = match.split('\n').map((line) => {
      const itemMatch = line.match(/^\d+\.\s(.+)$/);
      return itemMatch ? `<li>${itemMatch[1]}</li>` : '';
    }).join('');
    return `<ol>\n${items}\n</ol>`;
  });

  // Step 5: リスト（順序なし）
  html = html.replace(/^([-*]\s.+?)(?=\n(?:[-*]\s|[^-*]|$))/gm, (match) => {
    const items = match.split('\n').map((line) => {
      const itemMatch = line.match(/^[-*]\s(.+)$/);
      return itemMatch ? `<li>${itemMatch[1]}</li>` : '';
    }).join('');
    return `<ul>\n${items}\n</ul>`;
  });

  // Step 6: 段落（コードブロックとリストを保護）
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inParagraph = false;
  let paragraphLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines and structural elements
    if (!trimmed || trimmed.startsWith('<') || trimmed.startsWith('<!--')) {
      if (inParagraph && paragraphLines.length > 0) {
        processedLines.push(`<p>${paragraphLines.join(' ')}</p>`);
        paragraphLines = [];
        inParagraph = false;
      }
      if (trimmed) {
        processedLines.push(line);
      }
    } else {
      inParagraph = true;
      paragraphLines.push(trimmed);
    }
  }

  if (inParagraph && paragraphLines.length > 0) {
    processedLines.push(`<p>${paragraphLines.join(' ')}</p>`);
  }

  html = processedLines.join('\n');

  // Step 7: インラインコード
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Step 8: 太字
  html = html.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

  // Step 9: 斜体
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

  // Step 10: リンク
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');

  // Step 11: Code blocks 復元
  codeBlocks.forEach((block, index) => {
    const lang = block.match(/```(\w*)/)?.[1] || '';
    const code = block
      .replace(/^```\w*\n?/, '')
      .replace(/\n?```$/, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const replacement = `<pre><code class="language-${lang}">${code}</code></pre>`;
    html = html.replace(`<!-- CODE_BLOCK_${index} -->`, replacement);
  });

  return html;
}

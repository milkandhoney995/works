/**
 * マークダウンをHTMLに変換する軽量な関数 Lightweight Markdown to HTML converter tailored for JSBook
* - ヘッディング、段落、リスト、コードブロック、インラインコード、強調、リンクをサポート Headings, paragraphs, lists, code blocks, inline code, emphasis, and links supported
* - コードブロックはHTMLエスケープされ、言語クラスが付与される Code blocks are HTML-escaped and can have language classes
* - 余分な空行は段落の区切りとして処理される Extra blank lines are treated as paragraph breaks
* - 追加のMarkdown機能は必要に応じて拡張可能 Additional Markdown features can be added as needed
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  // Normalize newlines
  let src = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Collect code blocks and replace with placeholders that won't be touched
  const codeBlocks: Array<{ lang: string; code: string }> = [];

  // Helper to create placeholder (avoid characters matched by inline rules)
  const placeholder = (i: number) => `<!--CODEBLOCK${i}-->`;

  // 1) Fenced backtick ```lang\n...\n``` (allow optional final newline)
  src = src.replace(/```([^\n]*)\n([\s\S]*?)\n?```/g, (_m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: (lang || '').trim(), code });
    return placeholder(idx);
  });

  // 2) Fenced tildes ~~~lang\n...\n~~~
  src = src.replace(/~~~([^\n]*)\n([\s\S]*?)\n?~~~/g, (_m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: (lang || '').trim(), code });
    return placeholder(idx);
  });

  // 3) Indented code blocks: consecutive lines starting with 4 spaces or a tab
  src = src.replace(/(^(?:(?: {4}|\t).*(?:\n|$))+)/gm, (m) => {
    const code = m
      .split('\n')
      .map((ln) => ln.replace(/^(?: {4}|\t)/, ''))
      .join('\n')
      .replace(/\n$/, '');
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: '', code });
    return placeholder(idx);
  });

  // Process block-level elements
  // Headings
  src = src.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
  src = src.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  src = src.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  src = src.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  src = src.replace(/^---+$/gm, '<hr />');

  // Ordered lists 順番付きリスト
  src = src.replace(/(^(?:\d+\.\s+.*(?:\n|$))+)/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .map((l) => l.replace(/^\d+\.\s+/, ''))
      .map((it) => `<li>${it}</li>`)
      .join('');
    return `<ol>${items}</ol>`;
  });

  // Unordered lists
  src = src.replace(/(^(?:[-*]\s+.*(?:\n|$))+)/gm, (block) => {
    const items = block
      .trim()
      .split('\n')
      .map((l) => l.replace(/^[-*]\s+/, ''))
      .map((it) => `<li>${it}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  // Paragraphs: join non-block lines into <p>
  const lines = src.split('\n');
  const outLines: string[] = [];
  let para: string[] = [];
  const flushPara = () => {
    if (para.length) {
      outLines.push(`<p>${para.join(' ')}</p>`);
      para = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushPara();
      continue;
    }
    // If it's a block element or a placeholder, flush paragraph and emit raw line
    if (line.startsWith('<') || line.startsWith('<!--CODEBLOCK')) {
      flushPara();
      outLines.push(line);
      continue;
    }
    para.push(line);
  }
  flushPara();
  let html = outLines.join('\n');

  // Inline formatting
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold **text** or __text__
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  // Italic *text* or _text_
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  // Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Restore code blocks (escape HTML inside)
  codeBlocks.forEach(({ lang, code }, i) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const classAttr = lang ? ` class="language-${lang}"` : '';
    html = html.replace(placeholder(i), `<pre><code${classAttr}>${escaped}</code></pre>`);
  });

  return html;
}

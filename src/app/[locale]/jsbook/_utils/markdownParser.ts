/**
 * マークダウンをHTMLに変換する軽量な関数
 * - ヘッディング、段落、リスト、コードブロック、インラインコード、強調、リンクをサポート
 * - コードブロックはHTMLエスケープされ、言語クラスが付与される
 * - 余分な空行は段落の区切りとして処理される
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';

  let src = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  const codeBlocks: Array<{ lang: string; code: string }> = [];
  const placeholder = (i: number) => `<!--CODEBLOCK${i}-->`;

  // 1) Fenced backtick
  src = src.replace(/```([^\n]*)\n([\s\S]*?)\n?```/g, (_m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: (lang || '').trim(), code });
    return placeholder(idx);
  });

  // 2) Fenced tildes
  src = src.replace(/~~~([^\n]*)\n([\s\S]*?)\n?~~~/g, (_m, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: (lang || '').trim(), code });
    return placeholder(idx);
  });

  // 3) Indented code blocks
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

  // Headings
  src = src.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
  src = src.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  // h2: add id via slugify
  function slugify(str: string): string {
    return str
      .normalize('NFKC')
      .replace(/[^a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase()
      .replace(/^-+|-+$/g, '');
  }
  src = src.replace(/^##\s+(.*)$/gm, (_m, title) => {
    const id = slugify(title.trim());
    return `<h2 id="${id}">${title}</h2>`;
  });
  src = src.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  src = src.replace(/^---+$/gm, '<hr />');

  // Ordered lists
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

  // Tables
  src = src.replace(/(^\|.*\n\|[ \t]*[:\- \t|]+\n(?:\|.*\n?)+)/gm, (block) => {
    const lines = block.trim().split('\n');
    if (lines.length < 2) return block;

    const splitRow = (line: string) => line.replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
    const headerCells = splitRow(lines[0]);
    const bodyLines = lines.slice(2);

    const thead = `<thead><tr>${headerCells.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
    const tbody = bodyLines.map(r => {
      const cells = splitRow(r);
      return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    }).join('');

    return `<table>${thead}<tbody>${tbody}</tbody></table>`;
  });

  // Paragraphs
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
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Restore code blocks
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

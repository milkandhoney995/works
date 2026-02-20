import fs from 'fs';
import path from 'path';

export function getMarkdownContent(topic: string, lang: 'ja' | 'en' = 'ja'): string {
  const basePath = path.join(process.cwd(), 'src/app/jsbook/_content');
  
  const enPath = path.join(basePath, `${topic}.en.md`);
  const jaPath = path.join(basePath, `${topic}.md`);

  try {
    if (lang === 'en') {
      if (fs.existsSync(enPath)) return fs.readFileSync(enPath, 'utf-8');
      if (fs.existsSync(jaPath)) return fs.readFileSync(jaPath, 'utf-8');
      return '';
    }

    if (fs.existsSync(jaPath)) return fs.readFileSync(jaPath, 'utf-8');
    if (fs.existsSync(enPath)) return fs.readFileSync(enPath, 'utf-8');
    return '';
  } catch (error) {
    return '';
  }
}

export function getAllTopicSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'src/app/jsbook/_content');
  const files = fs.readdirSync(contentDir);
  const slugs = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.en\.md$|\.md$/g, ''));
  return Array.from(new Set(slugs));
}

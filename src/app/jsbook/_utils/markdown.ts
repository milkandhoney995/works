import fs from 'fs';
import path from 'path';

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

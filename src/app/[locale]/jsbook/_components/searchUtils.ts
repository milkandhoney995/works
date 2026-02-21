import { topics } from '../_data/topics';

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  context: string;
  type: 'topic' | 'content';
  matchStart: number;
}

export function searchTopics(query: string, locale: string = 'en'): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  topics.forEach((topic, index) => {
    const titleObj = topic.title as any;
    const title = titleObj[locale] || titleObj.ja;
    const titleLower = title.toLowerCase();

    if (titleLower.includes(lowerQuery)) {
      const matchStart = titleLower.indexOf(lowerQuery);
      results.push({
        id: `topic-${topic.slug}`,
        slug: topic.slug,
        title: title,
        context: title,
        type: 'topic',
        matchStart: matchStart,
      });
    }
  });

  return results;
}

export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '$1');
}

export function getContextSnippet(text: string, query: string, contextLength: number = 50): string {
  if (!query.trim()) return text.substring(0, contextLength);

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return text.substring(0, contextLength);
  }

  const start = Math.max(0, matchIndex - contextLength);
  const end = Math.min(text.length, matchIndex + query.length + contextLength);
  const snippet = text.substring(start, end);

  return (start > 0 ? '...' : '') + snippet + (end < text.length ? '...' : '');
}

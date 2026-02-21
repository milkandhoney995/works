let cachedTopics: any[] | null = null;

export async function fetchTopics(locale: string = 'en') {
  if (typeof window === 'undefined') return [];
  if (cachedTopics) return cachedTopics;
  const res = await fetch(`/api/jsbook/topics?locale=${locale}`);
  const data = await res.json();
  cachedTopics = data;
  return data;
}

export interface SearchResult {
  id: string;
  slug: string;
  title: string;
  context: string;
  type: 'topic' | 'content';
  matchStart: number;
}

export async function searchTopics(query: string, locale: string = 'en'): Promise<SearchResult[]> {
  console.log('[searchTopics] query:', query, 'locale:', locale);
  if (!query.trim()) return [];

  let topics: any[] = [];
  if (typeof window !== 'undefined') {
    topics = await fetchTopics(locale);
    console.log('[searchTopics] fetched topics:', topics.length);
  } else {
    const { getAllTopics } = await import('./getAllTopics');
    topics = getAllTopics(locale);
    console.log('[searchTopics] server topics:', topics.length);
  }

  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  topics.forEach((topic) => {
    if (!topic.title || typeof topic.title !== 'string') {
      console.warn('[searchTopics] Skipping topic with missing or invalid title:', topic);
      return;
    }
    const titleLower = topic.title.toLowerCase();
    // Search in title
    if (titleLower.includes(lowerQuery)) {
      const matchStart = titleLower.indexOf(lowerQuery);
      results.push({
        id: `topic-${topic.slug}`,
        slug: topic.slug,
        title: topic.title,
        context: topic.title,
        type: 'topic',
        matchStart,
      });
    }
    // Search in content (h2, p, pre) using markdown regex
    if (topic.content) {
      // h2: ## Heading
      const h2Regex = /^##\s+(.+)$/gim;
      let match;
      let h2Index = 0;
      while ((match = h2Regex.exec(topic.content)) !== null) {
        const text = match[1];
        const textLower = text.toLowerCase();
        if (textLower.includes(lowerQuery)) {
          results.push({
            id: `h2-${topic.slug}-${h2Index}`,
            slug: topic.slug,
            title: topic.title,
            context: text,
            type: 'content',
            matchStart: textLower.indexOf(lowerQuery),
          });
        }
        h2Index++;
      }
      // p: paragraphs (lines not starting with #, >, -, *, or whitespace)
      const pRegex = /^(?![#>\-\*\s]).*\S.*$/gim;
      let pIndex = 0;
      while ((match = pRegex.exec(topic.content)) !== null) {
        const text = match[0];
        const textLower = text.toLowerCase();
        if (textLower.includes(lowerQuery)) {
          results.push({
            id: `p-${topic.slug}-${pIndex}`,
            slug: topic.slug,
            title: topic.title,
            context: text,
            type: 'content',
            matchStart: textLower.indexOf(lowerQuery),
          });
        }
        pIndex++;
      }
      // pre: code blocks ```
      const preRegex = /```[a-zA-Z]*\n([\s\S]*?)```/gm;
      let preIndex = 0;
      while ((match = preRegex.exec(topic.content)) !== null) {
        const text = match[1];
        const textLower = text.toLowerCase();
        if (textLower.includes(lowerQuery)) {
          results.push({
            id: `pre-${topic.slug}-${preIndex}`,
            slug: topic.slug,
            title: topic.title,
            context: text,
            type: 'content',
            matchStart: textLower.indexOf(lowerQuery),
          });
        }
        preIndex++;
      }
    }
  });

  console.log('[searchTopics] results:', results.length, results);
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

import { topics } from '../_data/topics';
import { getMarkdownContent } from '../_utils/markdown';

export interface TopicData {
  slug: string;
  title: string;
  content: string;
}

export function getAllTopics(locale: string = 'en'): TopicData[] {
  return topics.map((topic) => {
    const titleObj = topic.title as any;
    const title = titleObj[locale] || titleObj.ja;
    const content = getMarkdownContent(topic.slug, locale as 'ja' | 'en');
    return {
      slug: topic.slug,
      title,
      content,
    };
  });
}

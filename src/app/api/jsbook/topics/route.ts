import { NextResponse } from 'next/server';
import { topics } from '../../../jsbook/_data/topics';
import { getMarkdownContent } from '../../../jsbook/_utils/markdown';

/**
 * GET /api/jsbook/topics?locale=en
 * すべてのトピックのslug、タイトル、マークダウンコンテンツを返すAPIエンドポイント
 * @queryParam {string} locale - 'en' または 'ja' (デフォルトは 'en')
 * @returns {Array} トピックの配列
 * レスポンス:
 * [
 *   {
 *     slug: string,
 *     title: string,
 *     content: string
 *   },
 *   ...
 * ]
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';

  const data = topics.map((topic) => {
    const titleObj = topic.title as any;
    const title = titleObj[locale] || titleObj.ja;
    const content = getMarkdownContent(topic.slug); // topic.slugに基づいてマークダウンコンテンツを取得
    if (!content) {
      console.error(`No content found for topic: ${topic.slug}`);
    }
    return {
      slug: topic.slug,
      title,
      content,
    };
  });

  if (!data.length) {
    console.error('No topics data returned from API');
  }

  return NextResponse.json(data);
}

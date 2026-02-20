import Link from 'next/link';
import { topics } from '../_data/topics';
import { Layout } from '../_components/Layout';
import { getMarkdownContent } from '../_utils/markdown';
import styles from './page.module.scss';
import markdownStyles from '../_components/markdown.module.scss';
import { markdownToHtml } from '../_utils/markdownParser';

interface TopicPageProps {
  params: { topic: string } | Promise<{ topic: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  // Resolve params if Next.js provides a Promise
  let resolvedParams: { topic: string };
  if (params instanceof Promise) {
    resolvedParams = await params;
  } else {
    resolvedParams = params as { topic: string };
  }

  const currentSlug = resolvedParams?.topic || '';
  const topic = topics.find((t) => t.slug === currentSlug);
  const topicIndex = topics.findIndex((t) => t.slug === currentSlug);
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;

  if (!topic) {
    return (
      <Layout>
        <div className={styles.notFound}>
          <h1>トピックが見つかりません</h1>
          <p>申し訳ございません。指定されたトピックが見つかりませんでした。</p>
          <Link href="/jsbook">トップページに戻る</Link>
        </div>
      </Layout>
    );
  }

  // Server-side: read Markdown and convert to HTML so code blocks are present in initial HTML
  const markdown = getMarkdownContent(currentSlug);
  const content = markdown ? markdownToHtml(markdown) : '';

  return (
    <Layout activeSlug={currentSlug}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/jsbook" className={styles.backLink}>
            ← トップに戻る
          </Link>
        </header>

        {content ? (
          <article
            className={`${styles.content} ${markdownStyles.markdown}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className={styles.notFound}>
            <p>コンテンツが見つかりませんでした。</p>
          </div>
        )}

        <nav className={styles.navigation}>
          <div className={styles.navItem}>
            {prevTopic ? (
              <Link href={`/jsbook/${prevTopic.slug}`} className={styles.navLink}>
                ← 前のトピック
                <span>{prevTopic.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
          <div className={styles.navItem}>
            {nextTopic ? (
              <Link href={`/jsbook/${nextTopic.slug}`} className={styles.navLink}>
                次のトピック →
                <span>{nextTopic.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </div>
    </Layout>
  );
}
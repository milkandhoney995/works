'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { topics } from '../_data/topics';
import { Layout } from '../_components/Layout';
import { markdownToHtml } from '../_utils/markdownParser';
import { getMarkdownContent } from '../_utils/markdown';
import styles from './page.module.scss';

interface TopicPageProps {
  params: { topic: string };
}

const TopicPage = ({ params }: TopicPageProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const topic = topics.find((t) => t.slug === params.topic);
  const topicIndex = topics.findIndex((t) => t.slug === params.topic);
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;

  useEffect(() => {
    if (!topic) {
      setLoading(false);
      return;
    }

    // Markdown ファイルを読み込む
    const loadContent = async () => {
      try {
        const response = await fetch(`/api/jsbook/${topic.slug}`);
        if (response.ok) {
          const markdown = await response.text();
          const html = markdownToHtml(markdown);
          setContent(html);
        }
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [topic]);

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

  return (
    <Layout activeSlug={params.topic}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/jsbook" className={styles.backLink}>
            ← トップに戻る
          </Link>
          <h1>{topic.title}</h1>
        </header>

        {loading ? (
          <div className={styles.loading}>
            <p>読み込み中...</p>
          </div>
        ) : (
          <article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
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
};

export default TopicPage;
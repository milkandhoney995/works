'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { topics } from '../_data/topics';
import { Layout } from '../_components/Layout';
import { markdownToHtml } from '../_utils/markdownParser';
import styles from './page.module.scss';

interface TopicPageProps {
  params: { topic: string };
}

const TopicPage = ({ params }: TopicPageProps) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [currentSlug, setCurrentSlug] = useState<string>('');

  useEffect(() => {
    // params がPromiseの場合は await する
    const resolveParams = async () => {
      if (params && typeof params === 'object') {
        if (params instanceof Promise) {
          const resolvedParams = await params;
          setCurrentSlug(resolvedParams.topic);
        } else if ('topic' in params) {
          setCurrentSlug((params as { topic: string }).topic);
        }
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!currentSlug) return;

    const topic = topics.find((t) => t.slug === currentSlug);
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
        } else {
          console.error(`Failed to fetch content: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentSlug]);

  const topic = topics.find((t) => t.slug === currentSlug);
  const topicIndex = topics.findIndex((t) => t.slug === currentSlug);
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;

  if (!topic && !loading) {
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

  if (!topic) {
    return (
      <Layout>
        <div className={styles.loading}>
          <p>読み込み中...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout activeSlug={currentSlug}>
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
        ) : content ? (
          <article
            className={styles.content}
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
};

export default TopicPage;
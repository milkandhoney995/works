import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { topics } from '../_data/topics';
import { getMarkdownContent } from '../_utils/markdown';
import styles from './page.module.scss';
import markdownStyles from '../_components/markdown.module.scss';
import { markdownToHtml } from '../_utils/markdownParser';

interface TopicPageProps {
  params: Promise<{ locale: string; topic: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { locale, topic: currentSlug } = await params;
  const t = await getTranslations('jsbook');

  const topic = topics.find((t) => t.slug === currentSlug);
  const topicIndex = topics.findIndex((t) => t.slug === currentSlug);
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;

  const markdown = getMarkdownContent(currentSlug, locale as 'ja' | 'en');
  const content = markdown ? markdownToHtml(markdown) : '';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={`/${locale}/jsbook`} className={styles.backLink}>
          ← {t('goHome')}
        </Link>
      </header>

      {!topic ? (
        <div className={styles.notFound}>
          <h1>{t('notFound')}</h1>
          <p>{t('notFoundMessage')}</p>
          <Link href={`/${locale}/jsbook`}>{t('goHome')}</Link>
        </div>
      ) : content ? (
        <article
          className={`${styles.content} ${markdownStyles.markdown}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div className={styles.notFound}>
          <p>{t('contentNotFound')}</p>
        </div>
      )}

      <nav className={styles.navigation}>
        <div className={styles.navItem}>
          {prevTopic ? (
            <Link href={`/${locale}/jsbook/${prevTopic.slug}`} className={styles.navLink}>
              ← {t('previous')}
              <span>{(prevTopic.title as any)[locale] || (prevTopic.title as any).ja}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
        <div className={styles.navItem}>
          {nextTopic ? (
            <Link href={`/${locale}/jsbook/${nextTopic.slug}`} className={styles.navLink}>
              {t('next')} →
              <span>{(nextTopic.title as any)[locale] || (nextTopic.title as any).ja}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </div>
  );
}

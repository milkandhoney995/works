'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import styles from './topicCard.module.scss';

interface TopicCardProps {
  slug: string;
  title: { ja: string; en: string };
}

export function TopicCard({ slug, title }: TopicCardProps) {
  const t = useTranslations('jsbook');
  const locale = useLocale();

  return (
    <Link href={`/${locale}/jsbook/${slug}`} className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{typeof title === 'string' ? title : title.ja}</h3>
        <p className={styles.description}>
          {t('learnTopic')} <span className={styles.arrow}>→</span>
        </p>
      </div>
    </Link>
  );
}

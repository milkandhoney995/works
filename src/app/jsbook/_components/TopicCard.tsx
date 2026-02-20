'use client';

import Link from 'next/link';
import styles from './topicCard.module.scss';

interface TopicCardProps {
  slug: string;
  title: string;
}

export function TopicCard({ slug, title }: TopicCardProps) {
  return (
    <Link href={`/jsbook/${slug}`} className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          このトピックについて学ぶ <span className={styles.arrow}>→</span>
        </p>
      </div>
    </Link>
  );
}

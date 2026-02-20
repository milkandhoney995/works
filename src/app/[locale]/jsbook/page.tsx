'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './page.module.scss';
import { topics } from './_data/topics';
import { TopicCard } from './_components/TopicCard';

export default function JSBookPage() {
  const t = useTranslations('jsbook');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
      </header>

      <section className={styles.intro}>
        <h2>{t('about')}</h2>
        <p>{t('aboutText')}</p>
        <p>{t('aboutText')}</p>
        <p>{t('aboutText1')}</p>
      </section>

      <section className={styles.topics}>
        <h2>{t('topics')}</h2>
        <div className={styles.topicGrid}>
          {topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              slug={topic.slug}
            />
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <h2>{t('features')}</h2>
        <ul>
          <li>📚 <strong>{t('coverage')}</strong>{t('coverageText')}</li>
          <li>💻 <strong>{t('practicalCode')}</strong>{t('practicalCodeText')}</li>
          <li>🎯 <strong>{t('clearExplanations')}</strong>{t('clearExplanationsText')}</li>
          <li>🔗 <strong>{t('bestPractices')}</strong>{t('bestPracticesText')}</li>
        </ul>
      </section>

      <section className={styles.getStarted}>
        <h2>{t('getStarted')}</h2>
        <p>{t('getStartedText')}</p>
        <Link href={`/jsbook/${topics[0].slug}`} className={styles.cta}>
          {t('startLearning')}
        </Link>
      </section>
    </div>
  );
}

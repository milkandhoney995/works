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
        <p>左側のサイドバーから学びたいトピックを選んで、学習を進めてください。各トピックは実践的なコード例とともに説明されています。</p>
      </section>

      <section className={styles.topics}>
        <h2>{t('topics')}</h2>
        <div className={styles.topicGrid}>
          {topics.map((topic) => (
            <TopicCard
              key={topic.slug}
              slug={topic.slug}
              title={(topic.title as any)}
            />
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <h2>{t('features')}</h2>
        <ul>
          <li>📚 <strong>包括的なカバレッジ</strong> - 基本から応用まで幅広い内容</li>
          <li>💻 <strong>実践的なコード例</strong> - すぐに使える実装パターン</li>
          <li>🎯 <strong>明確で簡潔な説明</strong> - 複雑な概念を分かりやすく</li>
          <li>🔗 <strong>相互参照</strong> - 関連トピック間のナビゲーション</li>
          <li>⚡ <strong>ベストプラクティス</strong> - 本番環境対応の実装方法</li>
        </ul>
      </section>

      <section className={styles.getStarted}>
        <h2>{t('getStarted')}</h2>
        <p>
          左側のサイドバーから「JavaScript 基本文法」を選んでスタートするか、興味のあるトピックをクリックしてください。
        </p>
        <Link href={`/jsbook/${topics[0].slug}`} className={styles.cta}>
          {t('startLearning')}
        </Link>
      </section>
    </div>
  );
}

'use client';

import Link from 'next/link';
import styles from './page.module.scss';
import { topics } from './_data/topics';
import { Layout } from './_components/Layout';

const JSBookPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>JavaScript Primer</h1>
          <p className={styles.subtitle}>
            JavaScriptの基礎から応用まで、包括的に学べるリソース集
          </p>
        </header>

        <section className={styles.intro}>
          <h2>このコースについて</h2>
          <p>
            このJavaScript Primerは、初心者から中級者向けの包括的な学習リソースです。
            JavaScriptの基本的な構文から始まり、DOM操作、イベント処理、
            関数型プログラミング、非同期処理など、実務的なスキルまで幅広くカバーしています。
          </p>
          <p>
            左側のサイドバーから学びたいトピックを選んで、学習を進めてください。
            各トピックは実践的なコード例とともに説明されています。
          </p>
        </section>

        <section className={styles.topics}>
          <h2>学習トピック</h2>
          <div className={styles.topicGrid}>
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/jsbook/${topic.slug}`}
                className={styles.topicCard}
              >
                <h3>{topic.title}</h3>
                <p>このトピックについて学ぶ →</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.features}>
          <h2>このコースの特徴</h2>
          <ul>
            <li>📚 <strong>包括的なカバレッジ</strong> - 基本から応用まで幅広い内容</li>
            <li>💻 <strong>実践的なコード例</strong> - すぐに使える実装パターン</li>
            <li>🎯 <strong>明確で簡潔な説明</strong> - 複雑な概念を分かりやすく</li>
            <li>🔗 <strong>相互参照</strong> - 関連トピック間のナビゲーション</li>
            <li>⚡ <strong>ベストプラクティス</strong> - 本番環境対応の実装方法</li>
          </ul>
        </section>

        <section className={styles.getStarted}>
          <h2>始めましょう</h2>
          <p>
            左側のサイドバーから「JavaScript 基本文法」を選んでスタートするか、
            興味のあるトピックをクリックしてください。
          </p>
          <Link href={`/jsbook/${topics[0].slug}`} className={styles.cta}>
            基本文法から学ぶ
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default JSBookPage;
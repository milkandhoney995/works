'use client';

import React from 'react';
import Link from 'next/link';
import { topics } from '../_data/topics';
import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  activeSlug?: string;
}

export function Layout({ children, activeSlug }: LayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <h2>JavaScript Primer</h2>
        </div>
        <nav className={styles.nav}>
          <Link href="/jsbook" className={styles.homeLink}>
            ホーム
          </Link>
          <hr />
          <h3>トピック一覧</h3>
          <ul className={styles.topicList}>
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/jsbook/${topic.slug}`}
                  className={
                    activeSlug === topic.slug ? styles.active : ''
                  }
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

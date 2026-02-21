'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { topics } from '../_data/topics';
import { SearchInput } from './SearchInput';
import styles from './layout.module.scss';

interface SidebarProps {
  activeSlug?: string;
}

export function Sidebar({ activeSlug }: SidebarProps) {
  const t = useTranslations('jsbook');
  const item = useTranslations('jsbook.slugs');
  const locale = useLocale();
  const pathname = usePathname();

  // Extract the topic slug from the pathname if activeSlug is not provided
  const currentSlug = activeSlug || pathname.split('/').pop();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h2>{t('title')}</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link
              href={`/en/jsbook`}
              className={styles.langButton}
              style={{ fontWeight: locale === 'en' ? 'bold' : 'normal' }}
            >
              EN
            </Link>
            <Link
              href={`/ja/jsbook`}
              className={styles.langButton}
              style={{ fontWeight: locale === 'ja' ? 'bold' : 'normal' }}
            >
              日本語
            </Link>
          </div>
        </div>
      </div>
      <SearchInput />
      <nav className={styles.nav}>
        <Link href={`/${locale}/jsbook`} className={styles.homeLink}>
          {t('home')}
        </Link>
        <hr />
        <h3>{t('topicList')}</h3>
        <ul className={styles.topicList}>
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/${locale}/jsbook/${topic.slug}`}
                className={
                  currentSlug === topic.slug ? styles.active : ''
                }
              >
                {item(topic.slug)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

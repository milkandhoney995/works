'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import styles from './layout.module.scss';
import CodeHighlighter from './CodeHighlighter';

interface LayoutProps {
  children: React.ReactNode;
  activeSlug?: string;
}

export function Layout({ children, activeSlug }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Sidebar activeSlug={activeSlug} />
      <main className={styles.main}>
        {children}
      </main>
      <CodeHighlighter />
    </div>
  );
}

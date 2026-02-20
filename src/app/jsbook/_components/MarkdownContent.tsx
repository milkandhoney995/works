'use client';

import { ReactNode } from 'react';
import styles from './markdown.module.scss';

interface MarkdownProps {
  children: ReactNode;
}

export function MarkdownContent({ children }: MarkdownProps) {
  return <div className={styles.markdown}>{children}</div>;
}

// リッチテキスト用のHTMLレンダラーコンポーネント
export function HTMLContent({ html }: { html: string }) {
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

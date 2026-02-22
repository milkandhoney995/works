'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { HamburgerMenu } from './HamburgerMenu';
import { useState } from 'react';
import styles from './layout.module.scss';
import CodeHighlighter from './CodeHighlighter';

interface LayoutProps {
  children: React.ReactNode;
  activeSlug?: string;
}

export function Layout({ children, activeSlug }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleHamburger = () => setSidebarOpen((v) => !v);
  const handleOverlay = () => setSidebarOpen(false);
  return (
    <div className={styles.container}>
      <HamburgerMenu open={sidebarOpen} onClick={handleHamburger} />
      {/* Overlay for mobile menu */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={handleOverlay} aria-hidden="true" />
      )}
      <Sidebar activeSlug={activeSlug} open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className={styles.main}>
        {children}
      </main>
      <CodeHighlighter />
    </div>
  );
}

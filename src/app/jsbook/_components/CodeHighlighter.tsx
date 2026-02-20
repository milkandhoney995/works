'use client';

import { useEffect } from 'react';

/**
 * コードブロックをハイライトするためのコンポーネント
 * - クライアントサイドでhighlight.jsを動的に読み込み、コードブロックをハイライトする
 * - サーバーサイドでは何もレンダリングしない
 * - highlight.jsのスタイルはCDNから読み込む
 * CodeHighlighter component that dynamically loads highlight.js on the client side to highlight code blocks. It does not render anything on the server side and loads the highlight.js stylesheet from a CDN.
 */
export default function CodeHighlighter() {
  useEffect(() => {
    // Inject highlight.js stylesheet
    // highlight.jsのスタイルをCDNから読み込む
    const cssHref = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/github.min.css';
    const scriptSrc = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js';

    if (!document.querySelector(`link[href="${cssHref}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssHref;
      document.head.appendChild(link);
    }

    let mounted = true;
    const loadScript = () => {
      if ((window as any).hljs) {
        (window as any).hljs.highlightAll();
        return;
      }
      const s = document.createElement('script');
      s.src = scriptSrc;
      s.async = true;
      s.onload = () => {
        if (!mounted) return;
        try {
          (window as any).hljs.highlightAll();
        } catch (e) {
          // ignore
        }
      };
      document.body.appendChild(s);
    };

    loadScript();
    return () => { mounted = false; };
  }, []);

  return null;
}

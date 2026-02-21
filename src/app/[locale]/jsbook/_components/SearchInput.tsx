'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { searchTopics, highlightMatch, getContextSnippet } from './searchUtils';
import styles from './searchInput.module.scss';

export function SearchInput() {
  const locale = useLocale();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchTopics('', locale));
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newResults = searchTopics(query, locale);
    setResults(newResults);
    setIsOpen(query.trim().length > 0 && newResults.length > 0);
  }, [query, locale]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReset = () => {
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchContainer}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim().length > 0 && setIsOpen(true)}
        className={styles.searchInput}
        aria-label="Search JSBook topics"
      />
      {query && (
        <button
          onClick={handleReset}
          className={styles.clearButton}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}

      {isOpen && results.length > 0 && (
        <div ref={dropdownRef} className={styles.dropdown}>
          <ul className={styles.resultsList}>
            {results.map((result) => (
              <li key={result.id}>
                <Link
                  href={`/${locale}/jsbook/${result.slug}`}
                  className={styles.resultLink}
                  onClick={() => {
                    setQuery('');
                    setIsOpen(false);
                  }}
                >
                  <div className={styles.resultTitle}>
                    {highlightMatch(result.title, query)}
                  </div>
                  {result.type === 'content' && (
                    <div className={styles.resultContext}>
                      {highlightMatch(
                        getContextSnippet(result.context, query, 40),
                        query
                      )}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query && isOpen === false && results.length === 0 && (
        <div className={styles.noResults}>
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}

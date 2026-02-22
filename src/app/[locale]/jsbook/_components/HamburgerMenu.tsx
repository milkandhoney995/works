import React from 'react';
import styles from './layout.module.scss';

interface HamburgerMenuProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ open, onClick, className = '' }) => (
  <button
    className={`${styles.hamburger} ${open ? styles.open : ''} ${className}`}
    aria-label="Toggle menu"
    aria-expanded={open}
    onClick={onClick}
    type="button"
  >
    <span>-</span>
    <span>-</span>
    <span>-</span>
  </button>
);

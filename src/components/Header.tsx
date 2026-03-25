import React from 'react';
import type { Tab } from './Layout';
import { useApp } from '../context/AppContext';
import styles from '../styles/CSS/Header.module.css';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'upload',  label: 'Add Item'       },
  { id: 'closet',  label: 'My Closet'      },
  { id: 'outfits', label: 'Generate Outfit' },
  { id: 'settings',label: 'Settings'       },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const { closet } = useApp();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          Ward<span className={styles.logoAccent}>robe</span>
        </div>
        <div className={styles.tagline}>Your Digital Closet</div>
      </div>

      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`${styles.navBtn} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
            {tab.id === 'closet' && closet.length > 0 && (
              <span className={styles.badge}>{closet.length}</span>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
};

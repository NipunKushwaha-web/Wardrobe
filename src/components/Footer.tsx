import React from 'react';
import styles from '../styles/CSS/Footer.module.css';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <a
      href="https://instagram.com/thakurxnipun"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.footerLink}
    >
      <span className={styles.icon}>✦</span>
      Coded by @thakurxnipun
    </a>
  </footer>
);

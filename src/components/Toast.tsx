import React from 'react';
import { useApp } from '../context/AppContext';
import styles from '../styles/CSS/Toast.module.css';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  return (
    <div
      className={`${styles.toast} ${toast.visible ? styles.visible : ''}`}
      role="status"
      aria-live="polite"
    >
      {toast.message}
    </div>
  );
};

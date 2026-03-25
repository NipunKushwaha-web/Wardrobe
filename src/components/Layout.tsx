import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toast } from './Toast';
import { AddItemTab } from './AddItemTab';
import { ClosetTab } from './ClosetTab';
import { OutfitsTab } from './OutfitsTab';
import { SettingsTab } from './SettingsTab';
import { useTheme } from '../hooks/useTheme';
import styles from '../styles/CSS/Layout.module.css';

export type Tab = 'upload' | 'closet' | 'outfits' | 'settings';

export const Layout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  useTheme();

  return (
    <div className={styles.app}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={styles.main}>
        {activeTab === 'upload'   && <AddItemTab />}
        {activeTab === 'closet'   && <ClosetTab />}
        {activeTab === 'outfits'  && <OutfitsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

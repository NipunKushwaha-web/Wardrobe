import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { COLOR_SWATCHES, DEFAULT_CATEGORIES } from '../utils/constants';
import type { Category, AppSettings } from '../types';
import styles from '../styles/CSS/SettingsTab.module.css';

export const SettingsTab: React.FC = () => {
  const { settings, updateSettings, showToast } = useApp();
  // Keep draft in sync with settings if settings changes outside
  const [draft, setDraft] = useState<AppSettings>({
    ...settings,
    categories: [...settings.categories],
  });
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatEmoji, setNewCatEmoji] = useState('');

  // Sync local draft state to latest settings changes (edge case fix)
  useEffect(() => {
    setDraft({
      ...settings,
      categories: [...settings.categories],
    });
  }, [settings]);

  const setPrimary = (hex: string, name: string) => {
    setDraft(prev => ({
      ...prev,
      primaryColor: hex,
      primaryColorName: name,
    }));
  };

  // For future: if you want to toggle category visibility
  // Currently hidden
  // const toggleCat = (id: string) => {
  //   setDraft(d => ({
  //     ...d,
  //     categories: d.categories.map(c => c.id === id ? { ...c, _hidden: !c._hidden } : c),
  //   }));
  // };

  const addCategory = () => {
    if (!newCatLabel.trim()) {
      showToast('Enter a category name');
      return;
    }
    const id = newCatLabel.trim().toLowerCase().replace(/\s+/g, '-');
    if (draft.categories.some(c => c.id === id)) {
      showToast('Category already exists');
      return;
    }
    const emoji = newCatEmoji.trim() || '🏷️';
    // Limit emoji to 2 unicode characters to prevent broken icons
    setDraft(prev => ({
      ...prev,
      categories: [
        ...prev.categories,
        { id, label: newCatLabel.trim(), emoji: emoji.slice(0, 2) },
      ],
    }));
    setNewCatLabel('');
    setNewCatEmoji('');
  };

  const removeCustomCat = (id: string) => {
    // Only allow deleting non-default categories
    if (DEFAULT_CATEGORIES.some(c => c.id === id)) {
      showToast('Cannot remove default category');
      return;
    }
    setDraft(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c.id !== id),
    }));
  };

  const isDefault = (id: string) => DEFAULT_CATEGORIES.some(c => c.id === id);

  const handleSave = () => {
    // Check for duplicate category IDs before saving (defensive)
    const ids = draft.categories.map(c => c.id);
    const uniqueIds = new Set(ids);
    if (uniqueIds.size < ids.length) {
      showToast('Duplicate categories found');
      return;
    }
    updateSettings({
      ...draft,
      // Always trim label values and sanitize custom categories
      categories: draft.categories.map(c => ({
        ...c,
        label: c.label.trim(),
        emoji: (c.emoji || '🏷️').slice(0, 2),
      })),
    });
    showToast('✓ Settings saved');
  };

  const handleReset = () => {
    const reset: AppSettings = {
      primaryColor: '#b5522b',
      primaryColorName: 'Rust',
      categories: DEFAULT_CATEGORIES.map(c => ({ ...c })), // ensure no reference bugs
    };
    setDraft(reset);
    updateSettings(reset);
    showToast('Settings reset');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Settings</h2>
        <div className={styles.headerActions}>
          <button
            className={styles.btnReset}
            onClick={handleReset}
            type="button"
            tabIndex={0}
          >
            Reset Defaults
          </button>
          <button
            className={styles.btnSave}
            onClick={handleSave}
            type="button"
            tabIndex={0}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Primary Color */}
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>Accent Color</h3>
          <p className={styles.cardDesc}>
            Controls highlights, active states and badges throughout the app.
          </p>
          <div className={styles.colorPreview}>
            <div
              className={styles.colorSwatch}
              style={{ background: draft.primaryColor }}
            />
            <span className={styles.colorLabel}>
              {draft.primaryColorName}
            </span>
          </div>
          <div className={styles.swatches}>
            {COLOR_SWATCHES.map(s => (
              <button
                key={s.hex}
                className={`${styles.swatch} ${draft.primaryColor === s.hex ? styles.swatchActive : ''}`}
                style={{ background: s.hex }}
                onClick={() => setPrimary(s.hex, s.name)}
                title={s.name}
                type="button"
                aria-label={s.name}
              />
            ))}
          </div>
          <div
            className={styles.previewBar}
            style={{ background: draft.primaryColor }}
          />
        </section>

        {/* Categories */}
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>Categories</h3>
          <p className={styles.cardDesc}>
            Manage which clothing categories appear in your wardrobe.
          </p>

          <div className={styles.catList}>
            {draft.categories.map(cat => (
              <div key={cat.id} className={styles.catRow}>
                <span className={styles.catEmoji}>{cat.emoji}</span>
                <span className={styles.catLabel}>{cat.label}</span>
                <div className={styles.catActions}>
                  {!isDefault(cat.id) && (
                    <button
                      className={styles.catRemove}
                      onClick={() => removeCustomCat(cat.id)}
                      type="button"
                      aria-label={`Remove ${cat.label}`}
                      tabIndex={0}
                    >
                      ✕
                    </button>
                  )}
                  {isDefault(cat.id) && (
                    <span className={styles.catDefault}>default</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add new */}
          <div className={styles.addCat}>
            <input
              className={styles.addInput}
              placeholder="New category name"
              value={newCatLabel}
              onChange={e => setNewCatLabel(e.target.value)}
              onKeyDown={e =>
                (e.key === 'Enter' || e.key === 'NumpadEnter') && addCategory()
              }
              maxLength={32}
              aria-label="New category name"
            />
            <input
              className={`${styles.addInput} ${styles.emojiInput}`}
              placeholder="🏷️"
              value={newCatEmoji}
              onChange={e => setNewCatEmoji(e.target.value)}
              maxLength={2}
              aria-label="Category emoji"
              inputMode="text"
              pattern="[\u0000-\uFFFF]{1,2}"
            />
            <button
              className={styles.addBtn}
              onClick={addCategory}
              type="button"
              tabIndex={0}
              aria-label="Add category"
            >
              + Add
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

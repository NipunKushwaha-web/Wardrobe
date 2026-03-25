import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useFileUpload } from '../hooks/useFileUpload';
import { UploadZone } from './UploadZone';
import { COLOR_SWATCHES, SEASONS } from '../utils/constants';
import type { Season } from '../types';
import styles from '../styles/CSS/AddItemTab.module.css';

export const AddItemTab: React.FC = () => {
  const { settings, addItem, showToast } = useApp();
  const upload = useFileUpload();

  const [name, setName]           = useState('');
  const [category, setCategory]   = useState('');
  const [color, setColor]         = useState('');
  const [colorName, setColorName] = useState('');
  const [season, setSeason]       = useState<Season>('Any Season');

  const handleSubmit = () => {
    if (!name.trim())  { showToast('Please name this piece');    return; }
    if (!category)     { showToast('Please select a category');  return; }

    addItem({
      name: name.trim(),
      category,
      color: color || '#8b7d6b',
      colorName: colorName || 'Neutral',
      season,
      image: upload.imageData,
    });

    // Reset
    setName(''); setCategory(''); setColor(''); setColorName(''); setSeason('Any Season');
    upload.reset();
    showToast('✓ Added to wardrobe');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <UploadZone {...upload} />
      </div>

      <div className={styles.right}>
        <h2 className={styles.heading}>Catalogue this piece</h2>

        {/* Name */}
        <div className={styles.group}>
          <label className={styles.label} htmlFor="item-name">Item Name</label>
          <input
            id="item-name"
            className={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Linen Blazer"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {/* Category */}
        <div className={styles.group}>
          <label className={styles.label}>Category</label>
          <div className={styles.catGrid}>
            {settings.categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.catChip} ${category === cat.id ? styles.catSelected : ''}`}
                onClick={() => setCategory(cat.id)}
                type="button"
              >
                <span className={styles.catEmoji}>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className={styles.group}>
          <label className={styles.label} htmlFor="item-color">Primary Color</label>
          <div className={styles.swatches} id="item-color">
            {Array.isArray(COLOR_SWATCHES) && COLOR_SWATCHES.length > 0 ? (
              COLOR_SWATCHES.map(s => (
                <button
                  key={s.hex}
                  className={`${styles.swatch} ${color === s.hex ? styles.swatchSelected : ''}`}
                  style={{ background: s.hex }}
                  onClick={() => { setColor(s.hex); setColorName(s.name); }}
                  title={s.name}
                  type="button"
                  aria-label={s.name}
                />
              ))
            ) : (
              <span className={styles.noColors}>No color swatches available.</span>
            )}
          </div>
          {colorName && <span className={styles.colorName}>{colorName}</span>}
        </div>

        {/* Season */}
        <div className={styles.group}>
          <label className={styles.label} htmlFor="item-season">Season</label>
          <select
            id="item-season"
            className={styles.select}
            value={season}
            onChange={e => setSeason(e.target.value as Season)}
          >
            {SEASONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <button className={styles.btnAdd} onClick={handleSubmit} type="button">
          <span className={styles.btnIcon}>+</span> Add to Wardrobe
        </button>
      </div>
    </div>
  );
};

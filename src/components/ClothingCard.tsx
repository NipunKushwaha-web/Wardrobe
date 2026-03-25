import React, { useState } from 'react';
import type { ClothingItem, Category } from '../types';
import styles from '../styles/CSS/ClothingCard.module.css';

interface ClothingCardProps {
  item: ClothingItem;
  categories: Category[];
  onDelete: (id: string | number) => void; // accept either type for id, for flexibility
}

export const ClothingCard: React.FC<ClothingCardProps> = ({ item, categories, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  // Debug: Defensive null check for categories, item, and category id type
  const cat = categories?.find(c => String(c.id) === String(item.category));

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid="clothing-card"
    >
      <div className={styles.imgWrap}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.name || cat?.label || 'Clothing item'}
            className={styles.img}
            loading="lazy"
            onError={e => {
              // Debug: fallback in case image fails to load
              (e.target as HTMLImageElement).style.display = 'none';
              // Optionally could show emoji fallback here if desired
            }}
          />
        ) : (
          <span className={styles.emoji} aria-label={cat?.label || 'Clothing'} role="img">
            {cat?.emoji ?? '👔'}
          </span>
        )}
        <button
          className={`${styles.deleteBtn} ${hovered ? styles.deleteBtnVisible : ''}`}
          onClick={e => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          aria-label={`Remove ${item.name || 'item'}`}
          type="button"
          tabIndex={0}
        >
          ✕
        </button>
        <div className={`${styles.overlay} ${hovered ? styles.overlayVisible : ''}`} />
      </div>
      <div className={styles.info}>
        <div className={styles.name} title={item.name}>{item.name || 'Unnamed'}</div>
        <div className={styles.meta}>
          <span
            className={styles.dot}
            style={{
              background: item.color ? item.color : 'var(--fallback-color, #ccc)',
            }}
            title={item.color}
          />
          {/* Use category label or ID, handle missing/empty gracefully */}
          {(cat?.label || item.category || 'Unknown')}
          {/* Only add season if it's non-empty, not 'Any Season', and exists */}
          {item.season && item.season !== 'Any Season' ? ` · ${item.season}` : ''}
        </div>
      </div>
    </div>
  );
};

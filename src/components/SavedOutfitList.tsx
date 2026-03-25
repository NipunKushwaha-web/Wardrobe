import React from 'react';
import type { Outfit, Category } from '../types';
import styles from '../styles/CSS/SavedOutfitList.module.css';

interface SavedOutfitListProps {
  outfits: Outfit[];
  categories: Category[];
  onSelect: (outfit: Outfit) => void;
}

export const SavedOutfitList: React.FC<SavedOutfitListProps> = ({ outfits, categories, onSelect }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <span>Saved Outfits</span>
      <span className={styles.badge}>{outfits.length}</span>
    </div>

    <div className={styles.list}>
      {outfits.length === 0 ? (
        <div className={styles.empty}>No outfits saved yet</div>
      ) : (
        outfits.map((outfit, i) => {
          const cat = (id: string) => categories.find(c => c.id === id);
          return (
            <button
              key={outfit.id}
              className={styles.item}
              onClick={() => onSelect(outfit)}
              type="button"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className={styles.itemName}>{outfit.name}</div>
              <div className={styles.itemMeta}>{outfit.pieces.length} piece{outfit.pieces.length !== 1 ? 's' : ''}</div>
              <div className={styles.thumbs}>
                {outfit.pieces.map(p => (
                  <div key={p.id} className={styles.thumb}>
                    {p.image
                      ? <img src={p.image} alt={p.name} />
                      : <span>{cat(p.category)?.emoji ?? '👔'}</span>
                    }
                  </div>
                ))}
              </div>
            </button>
          );
        })
      )}
    </div>
  </div>
);

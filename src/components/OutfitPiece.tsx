import React from 'react';
import type { ClothingItem, Category } from '../types';
import styles from '../styles/CSS/OutfitPiece.module.css';

interface OutfitPieceProps {
  item: ClothingItem;
  categories: Category[];
  animDelay?: number;
}

export const OutfitPiece: React.FC<OutfitPieceProps> = ({ item, categories, animDelay = 0 }) => {
  const cat = categories.find(c => c.id === item.category);
  return (
    <div className={styles.piece} style={{ animationDelay: `${animDelay}s` }}>
      <div className={styles.imgBox}>
        {item.image
          ? <img src={item.image} alt={item.name} className={styles.img} />
          : <span className={styles.emoji}>{cat?.emoji ?? '👔'}</span>
        }
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.catTag}>
          <span className={styles.dot} style={{ background: item.color }} />
          {item.category}
        </div>
      </div>
    </div>
  );
};

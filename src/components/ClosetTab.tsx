import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ClothingCard } from './ClothingCard';
import styles from '../styles/CSS/ClosetTab.module.css';

export const ClosetTab: React.FC = () => {
  const { closet, settings, deleteItem, showToast } = useApp();
  const [filter, setFilter] = useState<string>('all');

  // Safety: ensure settings.categories exists
  const categories = settings?.categories ?? [];

  // Memoize filtered array for perf
  const filtered = useMemo(() => {
    if (filter === 'all') return closet;
    return closet.filter(i => i.category === filter);
  }, [closet, filter]);

  // Defensive: handleDelete accepts both string and number for id
  const handleDelete = (id: string | number) => {
    deleteItem(id);
    showToast('Item removed');
  };

  return (
    <div className={styles.wrapper} data-testid="closet-tab">
      <div className={styles.header}>
        <h2 className={styles.title}>My Wardrobe</h2>
        <span className={styles.count}>
          {closet.length} piece{closet.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className={styles.filterBar}>
        <button
          className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
          onClick={() => setFilter('all')}
          type="button"
        >All</button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${filter === cat.id ? styles.active : ''}`}
            onClick={() => setFilter(cat.id)}
            type="button"
            aria-pressed={filter === cat.id}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            {filter === 'all'
              ? '🪞'
              : categories.find(c => c.id === filter)?.emoji ?? '✦'}
          </div>
          <div className={styles.emptyTitle}>
            {filter === 'all'
              ? 'Your wardrobe is empty'
              : `No ${categories.find(c => c.id === filter)?.label ?? filter} yet`}
          </div>
          <div className={styles.emptySub}>Add clothing items to begin</div>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item, i) => (
            <div key={item.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <ClothingCard
                item={item}
                categories={categories}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

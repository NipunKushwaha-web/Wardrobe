import React, { useState, useCallback, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { OutfitPiece } from './OutfitPiece';
import { SavedOutfitList } from './SavedOutfitList';
import { generateRandomOutfit } from '../utils/outfitGenerator';
import type { Outfit } from '../types';
import styles from '../styles/CSS/OutfitsTab.module.css';

export const OutfitsTab: React.FC = () => {
  const { closet, savedOutfits, settings, saveOutfit, showToast } = useApp();
  const [currentOutfit, setCurrentOutfit] = useState<Outfit | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);

  // If the current outfit (selected or generated) is already present in savedOutfits, reflect this in alreadySaved state
  useEffect(() => {
    if (!currentOutfit) {
      setAlreadySaved(false);
      return;
    }
    const exists = savedOutfits.some(outfit => outfit.id === currentOutfit.id);
    setAlreadySaved(exists);
  }, [currentOutfit, savedOutfits]);

  const handleGenerate = useCallback(() => {
    if (!closet || closet.length === 0) {
      showToast('Add some clothes first!');
      return;
    }

    if (!settings.categories || settings.categories.length === 0) {
      showToast('No outfit categories configured.');
      return;
    }

    setSpinning(true);
    setAlreadySaved(false);

    setTimeout(() => {
      const catIds = settings.categories.map(c => c.id);
      const outfit = generateRandomOutfit(closet, catIds);
      if (!outfit || !outfit.pieces || outfit.pieces.length === 0) {
        showToast('Could not generate a valid outfit.');
        setSpinning(false);
        setCurrentOutfit(null);
        return;
      }
      setCurrentOutfit(outfit);
      setSpinning(false);
    }, 380);
  }, [closet, settings.categories, showToast]);

  const handleSave = useCallback(() => {
    if (!currentOutfit || alreadySaved) return;
    saveOutfit(currentOutfit);
    setAlreadySaved(true);
    showToast('✓ Outfit saved');
  }, [currentOutfit, alreadySaved, saveOutfit, showToast]);

  const handleSelect = useCallback((outfit: Outfit) => {
    setCurrentOutfit(outfit);
    setAlreadySaved(true);
  }, []);

  return (
    <div className={styles.wrapper} data-testid="outfits-tab">
      {/* Left: generator */}
      <div className={styles.left}>
        <div className={styles.display}>
          <div className={styles.displayTop}>
            <div>
              <h2 className={styles.displayTitle}>Today's Look</h2>
              <div className={styles.displaySub}>Randomly curated from your wardrobe</div>
            </div>
            {currentOutfit && (
              <div className={styles.outfitName}>{currentOutfit.name}</div>
            )}
          </div>

          {spinning ? (
            <div className={styles.spinState}>
              <div className={styles.spinRing} />
              <div className={styles.spinRingOuter} />
              <span className={styles.spinText}>Styling…</span>
            </div>
          ) : currentOutfit ? (
            <div className={styles.piecesGrid}>
              {currentOutfit.pieces.map((piece, i) => (
                <OutfitPiece
                  key={`${currentOutfit.id}-${piece.id}`}
                  item={piece}
                  categories={settings.categories}
                  animDelay={i * 0.08}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyPrompt}>
              <div className={styles.emptyOrb} />
              <div className={styles.emptyTitle}>Ready to style you</div>
              <div className={styles.emptySub}>Hit generate to discover your outfit</div>
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={`${styles.btnGenerate} ${spinning ? styles.generating : ''}`}
              onClick={handleGenerate}
              disabled={spinning}
              type="button"
              data-testid="generate-btn"
            >
              <span className={`${styles.spinIcon} ${spinning ? styles.spinIconActive : ''}`}>↻</span>
              {spinning ? 'Styling…' : 'Generate Random Outfit'}
            </button>
            <button
              className={`${styles.btnSave} ${alreadySaved ? styles.btnSaved : ''}`}
              onClick={handleSave}
              disabled={!currentOutfit || alreadySaved}
              type="button"
              data-testid="save-btn"
            >
              {alreadySaved ? '✓ Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Right: saved list */}
      <div className={styles.right}>
        <SavedOutfitList
          outfits={savedOutfits}
          categories={settings.categories}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

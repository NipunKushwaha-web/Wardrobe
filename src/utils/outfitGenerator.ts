import type { ClothingItem, Outfit } from '../types';
import { OUTFIT_NAMES } from './constants';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function byCategory(closet: ClothingItem[], cat: string): ClothingItem[] {
  return closet.filter(i => i.category === cat);
}

export function generateRandomOutfit(closet: ClothingItem[], categories: string[]): Outfit | null {
  if (closet.length === 0) return null;

  const pieces: ClothingItem[] = [];
  const hasCat = (cat: string) => categories.includes(cat) && byCategory(closet, cat).length > 0;

  const useDress =
    hasCat('dresses') &&
    (Math.random() > 0.5 || (!hasCat('tops') && !hasCat('bottoms')));

  if (useDress) {
    pieces.push(pick(byCategory(closet, 'dresses')));
  } else {
    if (hasCat('tops'))    pieces.push(pick(byCategory(closet, 'tops')));
    if (hasCat('bottoms')) pieces.push(pick(byCategory(closet, 'bottoms')));
  }

  if (hasCat('outerwear') && Math.random() > 0.4)
    pieces.push(pick(byCategory(closet, 'outerwear')));

  if (hasCat('shoes'))
    pieces.push(pick(byCategory(closet, 'shoes')));

  if (hasCat('accessories') && Math.random() > 0.5)
    pieces.push(pick(byCategory(closet, 'accessories')));

  // Fallback: just pick random items
  if (pieces.length === 0) {
    const shuffled = [...closet].sort(() => Math.random() - 0.5);
    pieces.push(...shuffled.slice(0, Math.min(3, shuffled.length)));
  }

  return { id: Date.now(), name: pick(OUTFIT_NAMES), pieces };
}

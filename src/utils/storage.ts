import type { ClothingItem, Outfit, AppSettings } from '../types';
import { DEFAULT_SETTINGS } from './constants';

const KEYS = {
  CLOSET:   'wardrobe-closet',
  OUTFITS:  'wardrobe-outfits',
  SETTINGS: 'wardrobe-settings',
};

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full — silently ignore
  }
}

export const storage = {
  getCloset:      (): ClothingItem[]  => safeGet<ClothingItem[]>(KEYS.CLOSET,   []),
  saveCloset:     (items: ClothingItem[])  => safeSet(KEYS.CLOSET,   items),
  getOutfits:     (): Outfit[]        => safeGet<Outfit[]>(KEYS.OUTFITS,  []),
  saveOutfits:    (outfits: Outfit[]) => safeSet(KEYS.OUTFITS,  outfits),
  getSettings:    (): AppSettings     => safeGet<AppSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS),
  saveSettings:   (s: AppSettings)    => safeSet(KEYS.SETTINGS, s),
};

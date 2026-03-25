import React, {
  createContext, useContext, useState, useCallback, useEffect, useRef,
  type ReactNode,
} from 'react';
import type { ClothingItem, Outfit, AppSettings } from '../types';
import { storage } from '../utils/storage';
import { DEFAULT_SETTINGS } from '../utils/constants';

/* ── Toast State ───────────────────────────────────────── */
interface ToastState {
  message: string;
  visible: boolean;
}

/* ── Context Interface ─────────────────────────────────── */
interface AppContextValue {
  closet: ClothingItem[];
  savedOutfits: Outfit[];
  settings: AppSettings;
  addItem: (item: Omit<ClothingItem, 'id'>) => void;
  deleteItem: (id: string | number) => void; // Accept both string and number types
  saveOutfit: (outfit: Outfit) => void;
  updateSettings: (s: AppSettings) => void;
  toast: ToastState;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [closet, setCloset]             = useState<ClothingItem[]>(() => {
    try {
      const result = storage.getCloset();
      if (Array.isArray(result)) return result;
      return [];
    } catch (e) {
      console.error('Failed to fetch closet from storage:', e);
      return [];
    }
  });
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>(() => {
    try {
      const result = storage.getOutfits();
      if (Array.isArray(result)) return result;
      return [];
    } catch (e) {
      console.error('Failed to fetch outfits from storage:', e);
      return [];
    }
  });
  const [settings, setSettings]         = useState<AppSettings>(() => {
    try {
      const st = storage.getSettings();
      return { ...DEFAULT_SETTINGS, ...st };
    } catch (e) {
      console.error('Failed to fetch settings from storage:', e);
      return { ...DEFAULT_SETTINGS };
    }
  });
  const [toast, setToast]               = useState<ToastState>({ message: '', visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist closet to storage
  useEffect(() => {
    try {
      storage.saveCloset(closet);
    } catch (e) {
      console.error('Failed to save closet:', e);
    }
  }, [closet]);

  // Persist outfits to storage
  useEffect(() => {
    try {
      storage.saveOutfits(savedOutfits);
    } catch (e) {
      console.error('Failed to save outfits:', e);
    }
  }, [savedOutfits]);

  // Persist settings to storage
  useEffect(() => {
    try {
      storage.saveSettings(settings);
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  // Add clothing item - ids are always Date.now(), ensure type is number for stored items
  const addItem = useCallback((item: Omit<ClothingItem, 'id'>) => {
    setCloset(prev => [
      ...prev,
      { ...item, id: Date.now() }
    ]);
  }, []);

  // Accept id as string or number, compare using String conversion for robust filter
  const deleteItem = useCallback((id: string | number) => {
    setCloset(prev =>
      prev.filter(i => String(i.id) !== String(id))
    );
  }, []);

  // Prevent duplicate outfits by id, allow both string/number types for id
  const saveOutfit = useCallback((outfit: Outfit) => {
    setSavedOutfits(prev => {
      if (prev.some(o => String(o.id) === String(outfit.id))) return prev;
      return [outfit, ...prev];
    });
  }, []);

  const updateSettings = useCallback((s: AppSettings) => {
    setSettings(s);
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast(old => ({ ...old, visible: false })),
      2400
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        closet,
        savedOutfits,
        settings,
        addItem,
        deleteItem,
        saveOutfit,
        updateSettings,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

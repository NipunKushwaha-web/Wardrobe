export type Season = 'Any Season' | 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export interface Category {
  id: string | number; // Accept both string and number, for flexibility
  label: string;
  emoji: string;
  _hidden?: boolean;
}

export interface ColorSwatch {
  hex: string;
  name: string;
}

export interface ClothingItem {
  id: string | number; // Accept both string and number for robustness
  name: string;
  category: string | number; // Accept both type, as UI uses String(category.id)
  color: string;
  colorName: string;
  season: Season;
  image: string | null;
}

export interface Outfit {
  id: string | number; // Allow both string and number for consistency
  name: string;
  pieces: ClothingItem[];
}

export interface AppSettings {
  primaryColor: string;
  primaryColorName: string;
  categories: Category[];
}

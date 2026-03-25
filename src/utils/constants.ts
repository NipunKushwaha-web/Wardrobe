import type { ColorSwatch, Category, AppSettings } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'tops',        label: 'Tops',        emoji: '👕' },
  { id: 'bottoms',     label: 'Bottoms',     emoji: '👖' },
  { id: 'outerwear',   label: 'Outerwear',   emoji: '🧥' },
  { id: 'dresses',     label: 'Dresses',     emoji: '👗' },
  { id: 'shoes',       label: 'Shoes',       emoji: '👟' },
  { id: 'accessories', label: 'Accessories', emoji: '👜' },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  { hex: '#1c1a17', name: 'Ebony' },
  { hex: '#f5f0e8', name: 'Ivory' },
  { hex: '#8b7d6b', name: 'Taupe' },
  { hex: '#b5522b', name: 'Rust' },
  { hex: '#7a8c6e', name: 'Sage' },
  { hex: '#c4897a', name: 'Dusty Rose' },
  { hex: '#4a6fa5', name: 'Cobalt' },
  { hex: '#9b59b6', name: 'Amethyst' },
  { hex: '#e8c54a', name: 'Amber' },
  { hex: '#c9b99a', name: 'Sand' },
  { hex: '#e07b6b', name: 'Terracotta' },
  { hex: '#3d7a6e', name: 'Teal' },
];

export const OUTFIT_NAMES: string[] = [
  'Morning Reverie',   'Golden Hour Edit',   'Studio Sunday',
  'Market Day',        'The Understated',    'Easy Elegance',
  'Soft Power',        'Weekend Wanderer',   'The Considered',
  'Afternoon Errands', 'City Stroll',        'Literary Afternoon',
  'Dusk Rendezvous',   'Editorial Moment',   'The Quiet Luxury',
  'Patio Drift',       'Museum Morning',     'Evening Understory',
];

export const SEASONS = ['Any Season', 'Spring', 'Summer', 'Autumn', 'Winter'] as const;

export const DEFAULT_SETTINGS: AppSettings = {
  primaryColor: '#b5522b',
  primaryColorName: 'Rust',
  categories: DEFAULT_CATEGORIES,
};

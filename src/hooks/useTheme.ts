import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

/** Syncs the CSS custom property --primary to the settings primaryColor. */
export function useTheme() {
  const { settings } = useApp();

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', settings.primaryColor);
  }, [settings.primaryColor]);
}

import { themeConfig, type ThemeOption } from '../config';

// Get initial theme (for server-side rendering)
export function getInitialTheme(): ThemeOption {
  // During SSR, prefer light theme
  if (typeof window === 'undefined') {
    return themeConfig.default;
  }
  
  // Check localStorage
  const savedTheme = localStorage.getItem(themeConfig.storageKey) as ThemeOption;
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  
  // Check user preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return themeConfig.default;
}

// Toggle theme
export function toggleTheme(currentTheme: ThemeOption): ThemeOption {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Notify the document about theme change
  const event = new CustomEvent('themeChange', {
    detail: { theme: newTheme }
  });
  document.dispatchEvent(event);
  
  return newTheme;
}
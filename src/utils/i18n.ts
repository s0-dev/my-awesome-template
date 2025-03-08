import { i18nConfig, type SupportedLanguage } from '../config';
import en from '../locales/en.json';
import es from '../locales/es.json';

// Type for translations
type TranslationsType = Record<string, any>;

// Translations object
const translations: Record<SupportedLanguage, TranslationsType> = {
  en,
  es,
};

// Get language from URL
export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang && i18nConfig.supportedLanguages.includes(lang as SupportedLanguage)) {
    return lang as SupportedLanguage;
  }
  return i18nConfig.defaultLanguage;
}

// Get preferred language based on localStorage and browser settings
export function getPreferredLanguage(): SupportedLanguage {
  // In SSR, return default language
  if (typeof window === 'undefined') {
    return i18nConfig.defaultLanguage;
  }

  // Check localStorage
  const saved = localStorage.getItem(i18nConfig.storageKey);
  if (saved && i18nConfig.supportedLanguages.includes(saved as SupportedLanguage)) {
    return saved as SupportedLanguage;
  }

  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'es') return 'es';
  
  return i18nConfig.defaultLanguage;
}

// Access nested translation properties using dot notation
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((prev, curr) => {
    return prev && prev[curr] !== undefined ? prev[curr] : undefined;
  }, obj) || path;
}

// Use translations in components
export function useTranslations(lang: SupportedLanguage) {
  return function t(key: string): string {
    return getNestedValue(translations[lang], key);
  };
}

// Create language URL
export function createLanguageUrl(currentPath: string, newLang: SupportedLanguage): string {
  const pathSegments = currentPath.split('/').filter(Boolean);
  const currentLang = pathSegments[0];
  
  if (i18nConfig.supportedLanguages.includes(currentLang as SupportedLanguage)) {
    pathSegments[0] = newLang;
  } else {
    pathSegments.unshift(newLang);
  }
  
  return `/${pathSegments.join('/')}`;
}
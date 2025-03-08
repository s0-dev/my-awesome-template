// Language configuration
export type SupportedLanguage = 'en' | 'es';

export const i18nConfig = {
  defaultLanguage: 'en' as SupportedLanguage,
  supportedLanguages: ['en', 'es'] as SupportedLanguage[],
  storageKey: 'preferredLanguage',
  
  // Language metadata, include the language you preffer
  languages: {
    en: {
      name: 'English',
      locale: 'en-US',
      dir: 'ltr',
    },
    es: {
      name: 'Español',
      locale: 'es-ES',
      dir: 'ltr',
    }
  }
};

// Theme configuration
export type ThemeOption = 'light' | 'dark';

export const themeConfig = {
  default: 'light' as ThemeOption,
  storageKey: 'theme',
};

// Site configuration
export const siteConfig = {
  name: 'Your Site Name',
  description: 'A description of your site',
  url: 'https://yoursite.com', // Replace with your actual URL
  defaultImage: '/images/og-image.jpg',
};

// Export all configurations as a single object
const config = {
  i18n: i18nConfig,
  theme: themeConfig,
  site: siteConfig,
};

export default config;
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations.js';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'panchganga-language';
const supportedLanguages = ['en', 'mr'];

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
  return supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = language === 'mr' ? 'mr' : 'en';
    document.documentElement.classList.toggle('lang-mr', language === 'mr');
    document.documentElement.classList.toggle('lang-en', language === 'en');
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(() => {
    const t = (key) => {
      return key.split('.').reduce((entry, part) => entry?.[part], translations[language]) ?? key;
    };

    const pick = (entry) => {
      if (!entry) return '';
      if (typeof entry === 'string') return entry;
      const val = entry[language];
      if (typeof val === 'string' && val.trim().length > 0) return val;
      return entry.en ?? entry.mr ?? '';
    };

    return { language, setLanguage, t, pick, isMarathi: language === 'mr' };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}

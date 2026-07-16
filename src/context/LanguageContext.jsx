import { createContext, useContext, useMemo, useState } from 'react';
import { translations } from '../i18n/translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const value = useMemo(() => {
    const t = (key) => {
      return key.split('.').reduce((entry, part) => entry?.[part], translations[language]) ?? key;
    };

    const pick = (entry) => {
      if (!entry) return '';
      if (typeof entry === 'string') return entry;
      return entry[language] ?? entry.en ?? '';
    };

    return { language, setLanguage, t, pick };
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

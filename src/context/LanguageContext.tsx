import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types/index.ts';
import { translations } from '../data/translations.ts';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('cvp_lang') as Language;
    return saved && ['en', 'mr', 'hi', 'gu'].includes(saved) ? saved : 'mr'; // default Marathi as per screens
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cvp_lang', lang);
  };

  const t = (key: string): string => {
    const langDict = translations[language] || translations['en'];
    if (langDict[key]) return langDict[key];
    const fallback = translations['en'][key];
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

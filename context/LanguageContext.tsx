
import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { translations } from '../i18n/translations';

type Locale = 'ar' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: typeof translations.ar; 
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<Locale>('ar');

  const value = useMemo(() => {
    return {
      locale,
      setLocale,
      translations: translations[locale]
    };
  }, [locale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

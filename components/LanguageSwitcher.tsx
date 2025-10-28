
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const LanguageSwitcher = () => {
  const { locale, setLocale } = useTranslation();

  const toggleLanguage = () => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="bg-primary hover:bg-highlight text-accent font-semibold hover:text-primary py-2 px-4 border border-accent hover:border-transparent rounded-lg transition-all duration-300"
    >
      {locale === 'ar' ? 'English' : 'العربية'}
    </button>
  );
};

export default LanguageSwitcher;

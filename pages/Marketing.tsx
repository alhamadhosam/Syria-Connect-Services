
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Marketing = () => {
  const { translations } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-highlight">{translations.marketingPage.title}</h1>
      <div className="max-w-4xl mx-auto">
        <img src="https://picsum.photos/seed/marketing/1200/600" alt="E-Marketing" className="rounded-lg shadow-xl mb-8" />
        <p className="text-lg md:text-xl text-accent mb-10">
          {translations.marketingPage.description}
        </p>
        <button
          className="bg-highlight text-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105"
        >
          {translations.marketingPage.cta}
        </button>
      </div>
    </div>
  );
};

export default Marketing;

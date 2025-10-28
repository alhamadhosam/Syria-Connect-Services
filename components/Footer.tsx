
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const Footer = () => {
  const { translations } = useTranslation();

  return (
    <footer className="bg-secondary border-t border-gray-700 mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <p>{translations.footer.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;

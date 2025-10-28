
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import { MenuIcon, XIcon, UserIcon } from './icons';

const Header = () => {
  const { translations, locale } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: translations.nav.home, path: "/" },
    { name: translations.nav.realEstate, path: "/real-estate" },
    { name: translations.nav.transportation, path: "/transportation" },
    { name: translations.nav.hotels, path: "/hotels" },
    { name: translations.nav.tourism, path: "/tourism" },
    { name: translations.nav.medical, path: "/medical" },
    { name: translations.nav.governmentServices, path: "/government-services" },
    { name: translations.nav.marketing, path: "/marketing" },
  ];

  const linkClasses = (path: string) => 
    `block py-2 px-3 rounded transition-colors duration-300 ${
      location.pathname === path
        ? 'text-highlight bg-secondary'
        : 'text-accent hover:bg-secondary hover:text-highlight'
    }`;
  
  const mobileLinkClasses = (path: string) => 
    `block py-3 px-4 text-lg rounded transition-colors duration-300 ${
      location.pathname === path
        ? 'text-highlight bg-secondary'
        : 'text-accent hover:bg-secondary hover:text-highlight'
    }`;

  return (
    <header className="bg-secondary shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold text-highlight">
              {translations.appName}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ms-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={linkClasses(link.path)}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/account" className={`p-2 rounded-full transition-colors duration-300 ${location.pathname === '/account' ? 'bg-highlight text-primary' : 'text-accent hover:bg-gray-700 hover:text-highlight'}`} aria-label={translations.nav.account}>
                <UserIcon />
            </Link>
          </div>
          <div className="md:hidden flex items-center">
             <Link to="/account" className={`p-2 rounded-full transition-colors duration-300 mr-2 ${location.pathname === '/account' ? 'bg-highlight text-primary' : 'text-accent hover:bg-gray-700 hover:text-highlight'}`} aria-label={translations.nav.account}>
                <UserIcon />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:text-highlight hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={mobileLinkClasses(link.path)}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <div className="px-3 pt-4 pb-2">
                <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from './hooks/useTranslation';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RealEstate from './pages/RealEstate';
import Transportation from './pages/Transportation';
import Hotels from './pages/Hotels';
import Tourism from './pages/Tourism';
import Medical from './pages/Medical';
import Marketing from './pages/Marketing';
import Account from './pages/Account';
import GovernmentServices from './pages/GovernmentServices';

function App() {
  const { locale } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.body.className = locale === 'ar' ? 'font-cairo' : 'font-sans';
  }, [locale]);

  return (
    <HashRouter>
      <div className="bg-primary text-accent min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/real-estate" element={<RealEstate />} />
            <Route path="/transportation" element={<Transportation />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/tourism" element={<Tourism />} />
            <Route path="/medical" element={<Medical />} />
            <Route path="/government-services" element={<GovernmentServices />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
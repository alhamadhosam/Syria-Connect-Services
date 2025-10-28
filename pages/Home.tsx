
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { RealEstateIcon, TransportationIcon, HotelIcon, TourismIcon, MedicalIcon, MarketingIcon, GovernmentIcon } from '../components/icons';

const ServiceCard = ({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) => (
  <Link to={link} className="block bg-secondary p-8 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 group">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-center mb-2 text-highlight group-hover:text-yellow-300">{title}</h3>
    <p className="text-center text-gray-400">{description}</p>
  </Link>
);

const Home = () => {
  const { translations } = useTranslation();

  const services = [
    {
      icon: <RealEstateIcon />,
      title: translations.services.realEstate.title,
      description: translations.services.realEstate.description,
      link: "/real-estate"
    },
    {
      icon: <TransportationIcon />,
      title: translations.services.transportation.title,
      description: translations.services.transportation.description,
      link: "/transportation"
    },
    {
      icon: <HotelIcon />,
      title: translations.services.hotels.title,
      description: translations.services.hotels.description,
      link: "/hotels"
    },
    {
      icon: <TourismIcon />,
      title: translations.services.tourism.title,
      description: translations.services.tourism.description,
      link: "/tourism"
    },
    {
        icon: <MedicalIcon />,
        title: translations.services.medical.title,
        description: translations.services.medical.description,
        link: "/medical"
    },
    {
      icon: <GovernmentIcon />,
      title: translations.services.government.title,
      description: translations.services.government.description,
      link: "/government-services"
    },
    {
      icon: <MarketingIcon />,
      title: translations.services.marketing.title,
      description: translations.services.marketing.description,
      link: "/marketing"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-highlight mb-4 leading-tight">
          {translations.hero.title}
        </h1>
        <p className="text-lg md:text-xl text-accent max-w-3xl mx-auto mb-8">
          {translations.hero.subtitle}
        </p>
        <Link 
          to="/real-estate" 
          className="bg-highlight text-primary font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105"
        >
          {translations.hero.cta}
        </Link>
      </div>

      {/* Services Section */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{translations.services.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
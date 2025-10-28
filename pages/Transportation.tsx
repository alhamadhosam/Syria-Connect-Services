import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Shipment } from '../types';
import { TruckIcon, BoxIcon, TransportationIcon } from '../components/icons';

const ShipmentCard = ({ shipment }: { shipment: Shipment }) => {
  const { translations, locale } = useTranslation();

  const truckSizeMap = {
    small: translations.transportationPage.sizeSmall,
    medium: translations.transportationPage.sizeMedium,
    large: translations.transportationPage.sizeLarge,
  };

  const formattedPrice = new Intl.NumberFormat(locale === 'ar' ? 'ar-SY' : 'en-US').format(shipment.price);
  const currencyLabel = shipment.currency === 'SYP' ? translations.transportationPage.syp : translations.transportationPage.usd;

  return (
    <div className="bg-secondary rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <div>
        <img className="w-full h-48 object-cover" src={shipment.imageUrl} alt={shipment.companyName} />
        <div className="p-6">
          <h3 className="text-xl font-bold text-highlight mb-4">{shipment.companyName}</h3>
          <div className="space-y-3 text-accent">
            <div className="flex items-center">
              <BoxIcon />
              <span className="ms-3"><span className="font-semibold text-gray-400">{translations.transportationPage.cargoType}:</span> {shipment.cargoType}</span>
            </div>
            <div className="flex items-center">
              <TruckIcon />
              <span className="ms-3"><span className="font-semibold text-gray-400">{translations.transportationPage.truckSize}:</span> {truckSizeMap[shipment.truckSize]}</span>
            </div>
            <div className="flex items-center">
                <div className="w-5 h-5 flex justify-center items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                </div>
              <span className="ms-3">
                <span className="font-semibold text-gray-400">{translations.transportationPage.origin}:</span> {shipment.origin} &rarr; <span className="font-semibold text-gray-400">{translations.transportationPage.destination}:</span> {shipment.destination}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 bg-primary mt-4 flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">{translations.transportationPage.price}</p>
          <p className="text-xl font-bold text-highlight">{formattedPrice} {currencyLabel}</p>
        </div>
        <button className="bg-highlight text-primary font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-300">
          {translations.transportationPage.cta}
        </button>
      </div>
    </div>
  );
};

const Transportation = () => {
  const { translations } = useTranslation();

  const shipments: Shipment[] = [
    { id: 1, companyName: 'شركة الفهد للنقل', cargoType: 'مواد بناء', truckSize: 'large', price: 5000000, currency: 'SYP', origin: 'ميناء اللاذقية', destination: 'دمشق', imageUrl: 'https://picsum.photos/seed/truck1/600/400' },
    { id: 2, companyName: 'النسر السريع للشحن', cargoType: 'أثاث منزلي', truckSize: 'medium', price: 200, currency: 'USD', origin: 'حلب', destination: 'حمص', imageUrl: 'https://picsum.photos/seed/truck2/600/400' },
    { id: 3, companyName: 'نقل آمن', cargoType: 'مواد غذائية مبردة', truckSize: 'small', price: 1500000, currency: 'SYP', origin: 'معبر نصيب الحدودي', destination: 'درعا', imageUrl: 'https://picsum.photos/seed/truck3/600/400' },
    { id: 4, companyName: 'شحن الشام الدولي', cargoType: 'ألبسة ومنسوجات', truckSize: 'large', price: 350, currency: 'USD', origin: 'دمشق', destination: 'بيروت', imageUrl: 'https://picsum.photos/seed/truck4/600/400' },
    { id: 5, companyName: 'نقل الخيرات', cargoType: 'خضروات وفواكه', truckSize: 'medium', price: 2200000, currency: 'SYP', origin: 'طرطوس', destination: 'حلب', imageUrl: 'https://picsum.photos/seed/truck5/600/400' },
    { id: 6, companyName: 'البرق للشحن', cargoType: 'إلكترونيات', truckSize: 'small', price: 120, currency: 'USD', origin: 'مطار دمشق الدولي', destination: 'دمشق', imageUrl: 'https://picsum.photos/seed/truck6/600/400' },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-highlight">{translations.transportationPage.title}</h1>
        <p className="text-lg md:text-xl text-accent max-w-3xl mx-auto">
          {translations.transportationPage.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shipments.map(shipment => (
          <ShipmentCard key={shipment.id} shipment={shipment} />
        ))}
      </div>
    </div>
  );
};

export default Transportation;
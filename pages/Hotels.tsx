
import React, { useState, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Hotel } from '../types';
import { StarIcon, XIcon, CalendarIcon, SparklesIcon } from '../components/icons';

const HotelCard = ({ hotel, onBook }: { hotel: Hotel; onBook: (hotel: Hotel) => void }) => {
  const { translations, locale } = useTranslation();
  
  const formattedPrice = new Intl.NumberFormat(locale === 'ar' ? 'ar-SY' : 'en-US', {
      style: 'currency',
      currency: 'SYP',
      minimumFractionDigits: 0
  }).format(hotel.pricePerNight);

  return (
    <div className="bg-secondary rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <div>
        <img className="w-full h-56 object-cover" src={hotel.imageUrl} alt={hotel.name} />
        <div className="p-6">
          <h3 className="text-xl font-bold text-highlight mb-1">{hotel.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{hotel.location}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} className={`w-5 h-5 ${index < hotel.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
              ))}
              <span className="ms-2 text-gray-300">{hotel.rating.toFixed(1)} {translations.hotelsPage.rating}</span>
            </div>
            <p className="text-lg font-bold text-highlight">{formattedPrice} <span className="text-sm font-normal text-gray-400">{translations.hotelsPage.perNight}</span></p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
            onClick={() => onBook(hotel)}
            className="w-full bg-highlight text-primary font-bold py-2 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300"
        >
            {translations.hotelsPage.bookNow}
        </button>
      </div>
    </div>
  );
};

const BookingModal = ({ hotel, onClose, onConfirm }: { hotel: Hotel; onClose: () => void; onConfirm: () => void; }) => {
    const { translations, locale } = useTranslation();
    const [days, setDays] = useState(1);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    
    const services = [
        { id: 'breakfast', name: translations.hotelsPage.services.breakfast, price: 50000 },
        { id: 'wifi', name: translations.hotelsPage.services.wifi, price: 0 },
        { id: 'pool', name: translations.hotelsPage.services.pool, price: 75000 },
        { id: 'gym', name: translations.hotelsPage.services.gym, price: 40000 },
    ];

    const handleServiceChange = (serviceId: string) => {
        setSelectedServices(prev => 
            prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
        );
    };

    const totalPrice = useMemo(() => {
        const servicesCost = services
            .filter(s => selectedServices.includes(s.id))
            .reduce((total, s) => total + s.price, 0);
        return (hotel.pricePerNight + servicesCost) * days;
    }, [days, selectedServices, hotel.pricePerNight, services]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat(locale === 'ar' ? 'ar-SY' : 'en-US', {
            style: 'currency',
            currency: 'SYP',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-secondary rounded-lg shadow-2xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="p-6 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-400 hover:text-white transition-colors">
                        <XIcon />
                    </button>
                    <h2 className="text-2xl font-bold text-highlight mb-4">{translations.hotelsPage.bookingDetails}</h2>
                </div>

                <div className="p-6 border-t border-b border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <img src={hotel.imageUrl} alt={hotel.name} className="w-full sm:w-1/3 h-40 object-cover rounded-lg"/>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-accent">{hotel.name}</h3>
                            <p className="text-gray-400">{hotel.location}</p>
                            
                            <div className="mt-4">
                                <label htmlFor="days" className="block text-sm font-medium text-gray-300 mb-2 flex items-center"><CalendarIcon className="w-5 h-5 me-2"/>{translations.hotelsPage.numberOfDays}</label>
                                <input 
                                    type="number" 
                                    id="days" 
                                    value={days} 
                                    onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-full bg-primary text-accent rounded-md border-gray-600 focus:ring-highlight focus:border-highlight"
                                />
                            </div>
                        </div>
                    </div>

                     <div className="mt-6">
                        <h4 className="text-md font-medium text-gray-300 mb-3 flex items-center"><SparklesIcon className="w-5 h-5 me-2"/>{translations.hotelsPage.selectServices}</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {services.map(service => (
                                <label key={service.id} className="flex items-center space-x-3 rtl:space-x-reverse bg-primary p-3 rounded-lg cursor-pointer hover:bg-gray-800">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedServices.includes(service.id)}
                                        onChange={() => handleServiceChange(service.id)}
                                        className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-highlight focus:ring-highlight focus:ring-2"
                                    />
                                    <span className="text-accent">{service.name} <span className="text-gray-400 text-sm">({formatCurrency(service.price)})</span></span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-bold text-accent">{translations.hotelsPage.totalPrice}</span>
                        <span className="text-3xl font-extrabold text-highlight">{formatCurrency(totalPrice)}</span>
                    </div>
                    <button
                        onClick={onConfirm}
                        className="w-full bg-highlight text-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300 text-lg"
                    >
                        {translations.hotelsPage.confirmBooking}
                    </button>
                </div>
            </div>
        </div>
    )
}


const Hotels = () => {
  const { translations } = useTranslation();
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const handleOpenModal = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };
  
  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

  const handleConfirmBooking = () => {
    alert(translations.hotelsPage.bookingSuccess);
    handleCloseModal();
  }

  const hotels: Hotel[] = [
    { id: 1, name: 'فندق الفور سيزونز', location: 'دمشق, سوريا', pricePerNight: 800000, rating: 5.0, imageUrl: 'https://picsum.photos/seed/hotel1/600/400' },
    { id: 2, name: 'فندق شيراتون حلب', location: 'حلب, سوريا', pricePerNight: 650000, rating: 4.8, imageUrl: 'https://picsum.photos/seed/hotel2/600/400' },
    { id: 3, name: 'فندق بيت الوالي', location: 'دمشق القديمة, سوريا', pricePerNight: 550000, rating: 4.7, imageUrl: 'https://picsum.photos/seed/hotel3/600/400' },
    { id: 4, name: 'منتجع أفاميا روتانا', location: 'اللاذقية, سوريا', pricePerNight: 700000, rating: 4.9, imageUrl: 'https://picsum.photos/seed/hotel4/600/400' },
    { id: 5, name: 'فندق داما روز', location: 'دمشق, سوريا', pricePerNight: 600000, rating: 4.5, imageUrl: 'https://picsum.photos/seed/hotel5/600/400' },
    { id: 6, name: 'فندق السفير', location: 'حمص, سوريا', pricePerNight: 450000, rating: 4.2, imageUrl: 'https://picsum.photos/seed/hotel6/600/400' },
  ];

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-highlight">{translations.hotelsPage.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} onBook={handleOpenModal} />
        ))}
      </div>
      {selectedHotel && <BookingModal hotel={selectedHotel} onClose={handleCloseModal} onConfirm={handleConfirmBooking} />}
    </div>
  );
};

export default Hotels;
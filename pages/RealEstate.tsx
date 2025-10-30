import React, { useState, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Property } from '../types';
import { BedIcon, BathIcon, AreaIcon, FloorIcon, DocumentIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '../components/icons';

const governorateKeys = [
  'damascus', 'rif_dimashq', 'quneitra', 'daraa', 'suwayda', 'homs', 'tartus', 'latakia', 'hama', 'idlib', 'aleppo', 'raqqa', 'deir_ez_zor', 'hasakah'
] as const;

const PropertyCard = ({ property }: { property: Property }) => {
  const { translations, locale } = useTranslation();

  const formattedPrice = new Intl.NumberFormat(locale === 'ar' ? 'ar-SY' : 'en-US', {
      style: 'currency',
      currency: property.price.currency,
      maximumFractionDigits: 0,
  }).format(property.price.amount);

  return (
    <div className="bg-secondary rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <div>
        <img className="w-full h-56 object-cover" src={property.imageUrl} alt={property.title} />
        <div className="p-5">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="text-xl font-bold text-highlight">{property.title}</h3>
                    <p className="text-gray-400 text-sm">{property.location}</p>
                </div>
                 <p className={`flex-shrink-0 ml-4 rtl:mr-4 rtl:ml-0 inline-block px-3 py-1 text-sm font-semibold rounded-full ${property.type === 'sale' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                    {property.type === 'sale' ? translations.realEstatePage.forSale : translations.realEstatePage.forRent}
                </p>
            </div>
            
            <p className="text-2xl font-bold text-highlight mb-4">{formattedPrice}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-300 mb-4 text-center">
                <div className="flex flex-col items-center"><BedIcon /><span className="mt-1 text-sm">{property.beds} {translations.realEstatePage.beds}</span></div>
                <div className="flex flex-col items-center"><BathIcon /><span className="mt-1 text-sm">{property.baths} {translations.realEstatePage.baths}</span></div>
                <div className="flex flex-col items-center"><AreaIcon /><span className="mt-1 text-sm">{property.area} m²</span></div>
                <div className="flex flex-col items-center"><FloorIcon /><span className="mt-1 text-sm">{property.floor === 0 ? translations.realEstatePage.basement : `${translations.realEstatePage.floor} ${property.floor}`}</span></div>
            </div>

            <div className="flex items-center text-gray-300 p-2 bg-primary rounded-md">
                <DocumentIcon />
                <span className="ms-3 text-sm"><span className="font-semibold">{translations.realEstatePage.ownership}:</span> {property.ownership}</span>
            </div>
        </div>
      </div>
      <div className="p-4 grid grid-cols-3 gap-2 border-t border-gray-700">
        <a href={property.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gray-600 text-accent font-bold py-2 px-3 rounded-lg hover:bg-gray-500 transition-colors duration-300 text-sm">
          <MapPinIcon /> {translations.realEstatePage.viewOnMap}
        </a>
        <a href={`tel:${property.contactNumber}`} className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-500 transition-colors duration-300 text-sm">
          <PhoneIcon /> {translations.realEstatePage.call}
        </a>
        <a href={`https://wa.me/${property.contactNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-400 transition-colors duration-300 text-sm">
          <WhatsAppIcon /> {translations.realEstatePage.whatsapp}
        </a>
      </div>
    </div>
  );
};

const Filters = ({ filters, setFilters, maxValues, governorates }: { filters: any, setFilters: any, maxValues: any, governorates: {key: string, name: string}[] }) => {
    const { translations } = useTranslation();
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleCurrencyChange = (currency: 'SYP' | 'USD') => {
        setFilters({ ...filters, currency });
    };

    const resetFilters = () => {
        setFilters({
            price: maxValues.price[filters.currency],
            area: maxValues.area,
            floor: 'all',
            governorate: 'all',
            currency: filters.currency,
        });
    };

    return (
        <div className="bg-secondary p-4 rounded-lg mb-8 shadow-md">
            <h2 className="text-xl font-bold text-accent mb-4">{translations.realEstatePage.filtersTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 invisible">Currency</label>
                    <div className="flex bg-primary rounded-lg p-1">
                        <button onClick={() => handleCurrencyChange('SYP')} className={`w-1/2 rounded-md py-2 text-sm font-bold transition-colors ${filters.currency === 'SYP' ? 'bg-highlight text-primary' : 'bg-transparent text-accent'}`}>{translations.realEstatePage.syp}</button>
                        <button onClick={() => handleCurrencyChange('USD')} className={`w-1/2 rounded-md py-2 text-sm font-bold transition-colors ${filters.currency === 'USD' ? 'bg-highlight text-primary' : 'bg-transparent text-accent'}`}>{translations.realEstatePage.usd}</button>
                    </div>
                </div>
                <div>
                    <label htmlFor="governorate" className="block text-sm font-medium text-gray-300 mb-1">{translations.realEstatePage.governorate}</label>
                    <select name="governorate" id="governorate" value={filters.governorate} onChange={handleFilterChange} className="w-full bg-primary text-accent rounded-md border-gray-600 focus:ring-highlight focus:border-highlight text-sm">
                        <option value="all">{translations.realEstatePage.allGovernorates}</option>
                        {governorates.map(g => (
                            <option key={g.key} value={g.key}>{g.name}</option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">{translations.realEstatePage.priceRange}</label>
                    <input type="range" name="price" id="price" min="0" max={maxValues.price[filters.currency]} value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-highlight" />
                    <div className="text-xs text-gray-400 text-center mt-1">{new Intl.NumberFormat().format(filters.price)} {filters.currency}</div>
                </div>
                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">{translations.realEstatePage.areaRange}</label>
                    <input type="range" name="area" id="area" min="0" max={maxValues.area} value={filters.area} onChange={handleFilterChange} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-highlight" />
                    <div className="text-xs text-gray-400 text-center mt-1">{filters.area} m²</div>
                </div>
                <div>
                    <label htmlFor="floor" className="block text-sm font-medium text-gray-300 mb-1">{translations.realEstatePage.floorNumber}</label>
                    <select name="floor" id="floor" value={filters.floor} onChange={handleFilterChange} className="w-full bg-primary text-accent rounded-md border-gray-600 focus:ring-highlight focus:border-highlight text-sm">
                        <option value="all">{translations.realEstatePage.allFloors}</option>
                        <option value="0">{translations.realEstatePage.basement}</option>
                        {[...Array(8).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                    </select>
                </div>
            </div>
            <div className="mt-4 text-center">
                <button onClick={resetFilters} className="text-sm text-gray-400 hover:text-highlight transition-colors">{translations.realEstatePage.resetFilters}</button>
            </div>
        </div>
    );
};

const RealEstate = () => {
  // FIX: Destructure `locale` from `useTranslation` to use it for displaying a message when no properties are found.
  const { translations, locale } = useTranslation();

  const governorates = governorateKeys.map(key => ({
    key,
    name: translations.governorates[key]
  }));

  const properties: Property[] = [
    { id: 1, title: 'فيلا في المالكي', type: 'sale', price: { amount: 900000000, currency: 'SYP' }, location: 'دمشق, سوريا', governorate: 'damascus', imageUrl: 'https://picsum.photos/seed/villa1/600/400', beds: 5, baths: 6, area: 550, floor: 0, ownership: 'طابو أخضر', googleMapsLink: 'https://goo.gl/maps/xyz123', contactNumber: '+963912345671' },
    { id: 2, title: 'شقة في الشهباء', type: 'rent', price: { amount: 2500000, currency: 'SYP' }, location: 'حلب, سوريا', governorate: 'aleppo', imageUrl: 'https://picsum.photos/seed/apt1/600/400', beds: 3, baths: 2, area: 180, floor: 3, ownership: 'عقد إيجار سنوي', googleMapsLink: 'https://goo.gl/maps/xyz123', contactNumber: '+963912345672' },
    { id: 3, title: 'شقة مطلة على البحر', type: 'sale', price: { amount: 90000, currency: 'USD' }, location: 'اللاذقية, سوريا', governorate: 'latakia', imageUrl: 'https://picsum.photos/seed/apt2/600/400', beds: 4, baths: 3, area: 220, floor: 5, ownership: 'طابو أخضر', googleMapsLink: 'https://goo.gl/maps/xyz123', contactNumber: '+963912345673' },
    { id: 4, title: 'منزل في حي الوعر', type: 'rent', price: { amount: 1200000, currency: 'SYP' }, location: 'حمص, سوريا', governorate: 'homs', imageUrl: 'https://picsum.photos/seed/house1/600/400', beds: 3, baths: 2, area: 250, floor: 0, ownership: 'عقد إيجار سنوي', googleMapsLink: 'https://goo.gl/maps/xyz123', contactNumber: '+963912345674' },
    { id: 5, title: 'طابق في مشروع دمر', type: 'sale', price: { amount: 150000, currency: 'USD' }, location: 'دمشق, سوريا', governorate: 'rif_dimashq', imageUrl: 'https://picsum.photos/seed/penthouse/600/400', beds: 4, baths: 5, area: 300, floor: 7, ownership: 'حكم محكمة', googleMapsLink: 'https://goo.gl/maps/xyz123', contactNumber: '+963912345675' },
    { id: 6, title: 'استوديو في باب توما', type: 'rent', price: { amount: 250, currency: 'USD' }, location: 'دمشق, سوريا', governorate: 'damascus', imageUrl: 'https://picsum.photos/seed/studio/600/400', beds: 1, baths: 1, area: 75, floor: 2, ownership: 'عقد إيجار سنوي', googleMapsLink: 'https://goo.gl/maps/xyz123', contactNumber: '+963912345676' },
  ];

  const maxValues = {
    price: {
        SYP: Math.max(...properties.filter(p=>p.price.currency === 'SYP').map(p => p.price.amount), 1000000000),
        USD: Math.max(...properties.filter(p=>p.price.currency === 'USD').map(p => p.price.amount), 200000)
    },
    area: Math.max(...properties.map(p => p.area), 600)
  };

  const [filters, setFilters] = useState({
    price: maxValues.price.SYP,
    area: maxValues.area,
    floor: 'all',
    governorate: 'all',
    currency: 'SYP' as 'SYP' | 'USD'
  });

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      return p.price.currency === filters.currency &&
             p.price.amount <= filters.price &&
             p.area <= filters.area &&
             (filters.floor === 'all' || p.floor.toString() === filters.floor) &&
             (filters.governorate === 'all' || p.governorate === filters.governorate);
    });
  }, [properties, filters]);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-highlight">{translations.realEstatePage.title}</h1>
      <Filters filters={filters} setFilters={setFilters} maxValues={maxValues} governorates={governorates} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">{locale === 'ar' ? 'لا توجد عقارات تطابق معايير البحث الحالية.' : 'No properties match the current filter criteria.'}</p>
        )}
      </div>
    </div>
  );
};

export default RealEstate;
import React, { useState, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { TouristSite, TravelAgency } from '../types';
import { MapPinIcon, PhoneIcon, WhatsAppIcon, XIcon, BriefcaseIcon } from '../components/icons';


const governorateKeys = [
  'damascus', 'rif_dimashq', 'quneitra', 'daraa', 'suwayda', 'homs', 'tartus', 'latakia', 'hama', 'idlib', 'aleppo', 'raqqa', 'deir_ez_zor', 'hasakah'
] as const;

const AgencyBookingModal = ({ site, agencies, onClose }: { site: TouristSite | null; agencies: TravelAgency[]; onClose: () => void; }) => {
    const { translations } = useTranslation();
    
    if (!site) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-secondary rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-6 relative border-b border-gray-700">
                    <button onClick={onClose} className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-400 hover:text-white transition-colors">
                        <XIcon />
                    </button>
                    <h2 className="text-2xl font-bold text-highlight">{translations.tourismPage.agenciesTitle} <span className="text-accent">{site.name}</span></h2>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="space-y-4">
                        {agencies.map(agency => (
                            <div key={agency.id} className="bg-primary p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <img src={agency.logoUrl} alt={agency.name} className="w-16 h-16 object-contain rounded-full bg-white p-1" />
                                    <h3 className="text-lg font-bold text-accent">{agency.name}</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a href={`tel:${agency.contactNumber}`} className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors duration-300 text-sm">
                                        <PhoneIcon /> {translations.realEstatePage.call}
                                    </a>
                                    <a href={`https://wa.me/${agency.contactNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-400 transition-colors duration-300 text-sm">
                                        <WhatsAppIcon /> {translations.realEstatePage.whatsapp}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const TouristSiteCard = ({ site, onPlanTrip }: { site: TouristSite; onPlanTrip: (site: TouristSite) => void; }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const { translations } = useTranslation();

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImage((prev) => (prev + 1) % site.imageUrls.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImage((prev) => (prev - 1 + site.imageUrls.length) % site.imageUrls.length);
  };
  
  const goToImage = (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrentImage(index);
  }

  return (
    <div className="bg-secondary rounded-lg shadow-lg overflow-hidden group flex flex-col justify-between">
      <div>
        <div className="relative">
          <img className="w-full h-64 object-cover transition-all duration-300" src={site.imageUrls[currentImage]} alt={site.name} />
          
          {site.imageUrls.length > 1 && (
            <>
              <button 
                onClick={prevImage} 
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous Image"
              >
                &#10094;
              </button>
              <button 
                onClick={nextImage} 
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next Image"
              >
                &#10095;
              </button>
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-1">{site.name}</h3>
              <p className="text-gray-300">{site.location}</p>
            </div>
          </div>

          {site.imageUrls.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {site.imageUrls.map((_, index) => (
                      <button 
                          key={index} 
                          onClick={(e) => goToImage(index, e)} 
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${currentImage === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                          aria-label={`Go to image ${index + 1}`}
                      ></button>
                  ))}
              </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-gray-400">{site.description}</p>
        </div>
      </div>
       <div className="p-4 grid grid-cols-2 gap-2 border-t border-gray-700 mt-auto">
          <a href={site.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gray-600 text-accent font-bold py-2 px-3 rounded-lg hover:bg-gray-500 transition-colors duration-300 text-sm">
              <MapPinIcon /> {translations.realEstatePage.viewOnMap}
          </a>
          <button onClick={() => onPlanTrip(site)} className="flex items-center justify-center gap-2 bg-highlight text-primary font-bold py-2 px-3 rounded-lg hover:bg-yellow-300 transition-colors duration-300 text-sm">
              <BriefcaseIcon /> {translations.tourismPage.planYourTrip}
          </button>
      </div>
    </div>
  );
};

const Tourism = () => {
  const { translations, locale } = useTranslation();
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [selectedSite, setSelectedSite] = useState<TouristSite | null>(null);

  const governorates = governorateKeys.map(key => ({
    key,
    name: translations.governorates[key]
  }));
  
  const travelAgencies: TravelAgency[] = [
    { id: 1, name: 'أجنحة الشام للسياحة', logoUrl: 'https://picsum.photos/seed/agency1/100/100', contactNumber: '+963987654321' },
    { id: 2, name: 'السورية للسفر والسياحة', logoUrl: 'https://picsum.photos/seed/agency2/100/100', contactNumber: '+963987654322' },
    { id: 3, name: 'مكتب زنوبيا السياحي', logoUrl: 'https://picsum.photos/seed/agency3/100/100', contactNumber: '+963987654323' },
    { id: 4, name: 'نجمة الشرق للسياحة', logoUrl: 'https://picsum.photos/seed/agency4/100/100', contactNumber: '+963987654324' },
  ];

  const sites: TouristSite[] = [
    { 
      id: 1, 
      name: 'الجامع الأموي', 
      location: 'دمشق القديمة', 
      governorate: 'damascus',
      description: 'تحفة معمارية إسلامية في قلب دمشق القديمة، وواحد من أكبر وأقدم المساجد في العالم.', 
      imageUrls: [
          'https://picsum.photos/seed/umayyad1/800/600',
          'https://picsum.photos/seed/umayyad2/800/600',
          'https://picsum.photos/seed/umayyad3/800/600',
      ],
      googleMapsLink: 'https://www.google.com/maps/place/Umayyad+Mosque'
    },
    { 
      id: 2, 
      name: 'مدينة تدمر الأثرية', 
      location: 'بادية الشام', 
      governorate: 'homs',
      description: 'تعرف باسم "عروس الصحراء"، وهي مدينة أثرية غنية بالمعابد والأعمدة والمدافن الرومانية.', 
      imageUrls: [
          'https://picsum.photos/seed/palmyra1/800/600',
          'https://picsum.photos/seed/palmyra2/800/600',
          'https://picsum.photos/seed/palmyra3/800/600',
      ],
      googleMapsLink: 'https://www.google.com/maps/place/Palmyra'
    },
    { 
      id: 3, 
      name: 'قلعة حلب', 
      location: 'وسط حلب القديمة', 
      governorate: 'aleppo',
      description: 'من أقدم وأكبر القلاع في العالم، تتربع على تلة في وسط مدينة حلب القديمة.', 
      imageUrls: [
          'https://picsum.photos/seed/aleppo1/800/600',
          'https://picsum.photos/seed/aleppo2/800/600',
          'https://picsum.photos/seed/aleppo3/800/600',
      ],
      googleMapsLink: 'https://www.google.com/maps/place/Citadel+of+Aleppo'
    },
    { 
      id: 4, 
      name: 'قلعة الحصن', 
      location: 'غرب حمص', 
      governorate: 'homs',
      description: 'أهم القلاع الصليبية وأكبرها حجماً وأفضلها حفظاً على الإطلاق، وتعتبر نموذجاً مثالياً للعمارة العسكرية.', 
      imageUrls: [
          'https://picsum.photos/seed/krak1/800/600',
          'https://picsum.photos/seed/krak2/800/600',
      ],
      googleMapsLink: 'https://www.google.com/maps/place/Krak+des+Chevaliers'
    },
    {
      id: 5,
      name: 'بصرى الشام',
      location: 'محافظة درعا',
      governorate: 'daraa',
      description: 'مدينة أثرية تاريخية تشتهر بمدرجها الروماني المحفوظ بشكل استثنائي والذي يتسع لـ 15,000 متفرج.',
      imageUrls: [
        'https://picsum.photos/seed/bosra1/800/600',
        'https://picsum.photos/seed/bosra2/800/600',
        'https://picsum.photos/seed/bosra3/800/600',
      ],
      googleMapsLink: 'https://www.google.com/maps/place/Bosra'
    },
    {
      id: 6,
      name: 'أوغاريت',
      location: 'قرب اللاذقية',
      governorate: 'latakia',
      description: 'مملكة قديمة وموقع أثري هام اكتشفت فيه أول أبجدية في التاريخ، وهي الأبجدية الأوغاريتية.',
      imageUrls: [
        'https://picsum.photos/seed/ugarit1/800/600',
        'https://picsum.photos/seed/ugarit2/800/600',
      ],
      googleMapsLink: 'https://www.google.com/maps/place/Ugarit'
    }
  ];
  
  const filteredSites = useMemo(() => {
      if (selectedGovernorate === 'all') {
          return sites;
      }
      return sites.filter(site => site.governorate === selectedGovernorate);
  }, [sites, selectedGovernorate]);

  const handlePlanTrip = (site: TouristSite) => {
    setSelectedSite(site);
  };

  const handleCloseModal = () => {
      setSelectedSite(null);
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-highlight">{translations.tourismPage.title}</h1>

      <div className="max-w-md mx-auto mb-12">
        <label htmlFor="governorate" className="block text-sm font-medium text-gray-300 mb-2">{translations.realEstatePage.governorate}</label>
        <select
            id="governorate"
            value={selectedGovernorate}
            onChange={(e) => setSelectedGovernorate(e.target.value)}
            className="w-full bg-secondary text-accent rounded-md border-gray-600 focus:ring-highlight focus:border-highlight p-3"
        >
            <option value="all">{translations.realEstatePage.allGovernorates}</option>
            {governorates.map(g => (
                <option key={g.key} value={g.key}>{g.name}</option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSites.length > 0 ? (
          filteredSites.map(site => (
            <TouristSiteCard key={site.id} site={site} onPlanTrip={handlePlanTrip} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full py-10">{locale === 'ar' ? 'لا توجد مواقع تطابق معايير البحث الحالية.' : 'No sites match the current filter criteria.'}</p>
        )}
      </div>
      <AgencyBookingModal site={selectedSite} agencies={travelAgencies} onClose={handleCloseModal} />
    </div>
  );
};

export default Tourism;
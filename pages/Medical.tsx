import React, { useState, useMemo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Doctor } from '../types';
// FIX: Import CalendarIcon to use it in the DoctorCard component.
import { AcademicCapIcon, ClockIcon, MapPinIcon, PhoneIcon, XIcon, MedicalIcon, CalendarIcon } from '../components/icons';

const governorateKeys = [
  'damascus', 'rif_dimashq', 'quneitra', 'daraa', 'suwayda', 'homs', 'tartus', 'latakia', 'hama', 'idlib', 'aleppo', 'raqqa', 'deir_ez_zor', 'hasakah'
] as const;

const specialtyKeys: Doctor['specialty'][] = ['cardiology', 'dermatology', 'pediatrics', 'neurology'];

const BookingModal = ({ doctor, onClose, onConfirm }: { doctor: Doctor | null; onClose: () => void; onConfirm: () => void; }) => {
    // FIX: Destructure locale to use it for conditional rendering based on language.
    const { translations, locale } = useTranslation();
    if (!doctor) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-secondary rounded-lg shadow-2xl w-full max-w-md transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="p-6 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-400 hover:text-white transition-colors">
                        <XIcon />
                    </button>
                    <h2 className="text-2xl font-bold text-highlight mb-2">{translations.medicalPage.bookingModalTitle}</h2>
                    <p className="text-xl text-accent">{doctor.name}</p>
                </div>
                <div className="p-6 border-t border-gray-700">
                    <p className="text-center text-gray-300 mb-6">
                      {locale === 'ar' ? `سيتم التواصل معك لتأكيد الموعد. الرجاء الضغط على زر التأكيد للمتابعة.` : `You will be contacted to confirm the appointment. Please press the confirm button to proceed.`}
                    </p>
                    <button
                        onClick={onConfirm}
                        className="w-full bg-highlight text-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300 text-lg"
                    >
                        {translations.medicalPage.confirmBooking}
                    </button>
                </div>
            </div>
        </div>
    );
};

const DoctorCard = ({ doctor, onBook }: { doctor: Doctor; onBook: (doctor: Doctor) => void; }) => {
    const { translations } = useTranslation();

    return (
        <div className="bg-secondary rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
            <div>
                <img className="w-full h-56 object-cover" src={doctor.imageUrl} alt={doctor.name} />
                <div className="p-5">
                    <h3 className="text-xl font-bold text-highlight">{doctor.name}</h3>
                    <p className="text-md text-yellow-300/80 mb-4">{translations.specialties[doctor.specialty]}</p>
                    
                    <p className="text-gray-400 text-sm mb-4 h-16 overflow-hidden">{doctor.bio}</p>

                    <div className="space-y-3 text-sm text-gray-300">
                       <div className="flex items-center"><MapPinIcon className="w-5 h-5 me-3 text-gray-500" /><span>{doctor.address}</span></div>
                       <div className="flex items-center"><ClockIcon className="w-5 h-5 me-3 text-gray-500" /><span>{doctor.workingHours}</span></div>
                    </div>
                </div>
            </div>
            <div className="p-3 grid grid-cols-3 gap-2 border-t border-gray-700">
                <a href={doctor.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gray-600 text-accent font-bold py-2 px-3 rounded-lg hover:bg-gray-500 transition-colors duration-300 text-sm">
                    <MapPinIcon /> {translations.realEstatePage.viewOnMap}
                </a>
                <a href={`tel:${doctor.contactNumber}`} className="flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-2 px-3 rounded-lg hover:bg-green-500 transition-colors duration-300 text-sm">
                    <PhoneIcon /> {translations.realEstatePage.call}
                </a>
                 <button onClick={() => onBook(doctor)} className="flex items-center justify-center gap-2 bg-highlight text-primary font-bold py-2 px-3 rounded-lg hover:bg-yellow-300 transition-colors duration-300 text-sm">
                    <CalendarIcon /> {translations.medicalPage.bookAppointment}
                </button>
            </div>
        </div>
    );
};

const Medical = () => {
  const { translations } = useTranslation();
  const [filters, setFilters] = useState({ specialty: 'all', governorate: 'all' });
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const governorates = governorateKeys.map(key => ({ key, name: translations.governorates[key] }));
  const specialties = specialtyKeys.map(key => ({ key, name: translations.specialties[key] }));

  const doctors: Doctor[] = [
    { id: 1, name: 'د. سامر المصري', specialty: 'cardiology', governorate: 'damascus', address: 'مزة، فيلات شرقية', imageUrl: 'https://picsum.photos/seed/doc1/400/400', googleMapsLink: '#', contactNumber: '+963911111111', workingHours: 'السبت - الخميس | 5م - 9م', bio: 'استشاري أمراض القلب والشرايين. خبرة 20 عاماً في تشخيص وعلاج أمراض القلب.' },
    { id: 2, name: 'د. ريما الحسن', specialty: 'dermatology', governorate: 'aleppo', address: 'الفرقان، جانب جامع الرحمن', imageUrl: 'https://picsum.photos/seed/doc2/400/400', googleMapsLink: '#', contactNumber: '+963922222222', workingHours: 'الأحد - الخميس | 10ص - 4م', bio: 'أخصائية في الأمراض الجلدية والتجميل والليزر. شهادات معتمدة دولياً.' },
    { id: 3, name: 'د. خالد العظم', specialty: 'pediatrics', governorate: 'damascus', address: 'شارع بغداد، بناء الأطباء', imageUrl: 'https://picsum.photos/seed/doc3/400/400', googleMapsLink: '#', contactNumber: '+963933333333', workingHours: 'يومياً عدا الجمعة | 11ص - 6م', bio: 'أخصائي طب الأطفال وحديثي الولادة. متابعة نمو الطفل وجميع اللقاحات.' },
    { id: 4, name: 'د. لمى مراد', specialty: 'neurology', governorate: 'homs', address: 'شارع الحضارة', imageUrl: 'https://picsum.photos/seed/doc4/400/400', googleMapsLink: '#', contactNumber: '+963944444444', workingHours: 'السبت - الأربعاء | 4م - 8م', bio: 'أخصائية في طب الأعصاب والدماغ. تشخيص وعلاج الصداع وآلام العمود الفقري.' },
    { id: 5, name: 'د. فارس الأحمد', specialty: 'cardiology', governorate: 'latakia', address: 'المشروع السابع، مقابل المشفى الوطني', imageUrl: 'https://picsum.photos/seed/doc5/400/400', googleMapsLink: '#', contactNumber: '+963955555555', workingHours: 'السبت - الخميس | 6م - 10م', bio: 'أخصائي أمراض القلب التداخلية والقسطرة العلاجية. عضو الجمعية الأوروبية لأمراض القلب.' },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  
  const filteredDoctors = useMemo(() => {
      return doctors.filter(doc => 
          (filters.specialty === 'all' || doc.specialty === filters.specialty) &&
          (filters.governorate === 'all' || doc.governorate === filters.governorate)
      );
  }, [filters, doctors]);

  const handleConfirmBooking = () => {
    alert(translations.medicalPage.bookingSuccess);
    setBookingDoctor(null);
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="flex justify-center items-center mb-6">
          <MedicalIcon className="w-16 h-16 text-highlight" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-highlight">{translations.medicalPage.title}</h1>
        <p className="text-lg md:text-xl text-accent max-w-3xl mx-auto">
          {translations.medicalPage.description}
        </p>
      </div>

      {/* Filters */}
      <div className="bg-secondary p-4 rounded-lg shadow-md">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-300 mb-1">{translations.medicalPage.searchBySpecialty}</label>
                <select name="specialty" id="specialty" value={filters.specialty} onChange={handleFilterChange} className="w-full bg-primary text-accent rounded-md border-gray-600 focus:ring-highlight focus:border-highlight text-sm">
                    <option value="all">{translations.medicalPage.allSpecialties}</option>
                    {specialties.map(s => <option key={s.key} value={s.key}>{s.name}</option>)}
                </select>
            </div>
             <div>
                <label htmlFor="governorate" className="block text-sm font-medium text-gray-300 mb-1">{translations.medicalPage.searchByGovernorate}</label>
                <select name="governorate" id="governorate" value={filters.governorate} onChange={handleFilterChange} className="w-full bg-primary text-accent rounded-md border-gray-600 focus:ring-highlight focus:border-highlight text-sm">
                    <option value="all">{translations.realEstatePage.allGovernorates}</option>
                    {governorates.map(g => <option key={g.key} value={g.key}>{g.name}</option>)}
                </select>
            </div>
         </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doc => <DoctorCard key={doc.id} doctor={doc} onBook={setBookingDoctor} />)
        ) : (
            <p className="text-center text-gray-400 col-span-full">{translations.medicalPage.noDoctorsFound}</p>
        )}
      </div>

      <BookingModal doctor={bookingDoctor} onClose={() => setBookingDoctor(null)} onConfirm={handleConfirmBooking} />
    </div>
  );
};

export default Medical;
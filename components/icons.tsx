import React from 'react';

const Icon = ({ children, className, ...props }: { children: React.ReactNode; className?: string, [key: string]: any }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    {...props}
  >
    {children}
  </svg>
);

// FIX: Update all Icon components to accept a className prop for consistency and to fix type errors.
export const MenuIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></Icon>;
export const XIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>;
export const UserIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></Icon>;

export const RealEstateIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></Icon>;
export const TransportationIcon = ({ className = '' }) => <Icon className={className}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM5 16h2m2 0h2m-8-5l2 2v3m4-3l2-2v3" /></Icon>;
export const HotelIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></Icon>;
export const TourismIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>;
export const MedicalIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></Icon>;
export const MarketingIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></Icon>;
export const GovernmentIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V10a2 2 0 00-2-2H7a2 2 0 00-2 2v11m14 0h2m-2 0h-5m-9 0H3m2 0h5M5 6L12 3l7 3" /></Icon>;


export const BedIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m-5 4v6m4-6v6m-4-10a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" /></Icon>;
export const BathIcon = ({ className = '' }) => <Icon className={className}><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2" /><path d="M12 12h.01" /></Icon>;
export const AreaIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v4m0 0h-4m4 0l-5-5" /></Icon>;
export const FloorIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></Icon>;
export const DocumentIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></Icon>;
export const MapPinIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>;
export const PhoneIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></Icon>;
export const WhatsAppIcon = ({ className = '' }) => <Icon className={className}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></Icon>;

export const TruckIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8l2-2zM5 16h2m2 0h2m-8-5l2 2v3m4-3l2-2v3" /></Icon>;
export const BoxIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></Icon>;

export const StarIcon = ({ className = '' }) => <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
export const CalendarIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></Icon>;
export const SparklesIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L11 15l-4 6 6-4 6.293-6.293a1 1 0 011.414 0L21 11" /></Icon>;

export const BriefcaseIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></Icon>;

export const BankIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18H3a2 2 0 01-2-2V8a2 2 0 012-2h9l2-2 2 2h4a2 2 0 012 2v8a2 2 0 01-2 2h-5m-4 0v-2m0 2v2" /></Icon>;
export const ArrowUpIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></Icon>;
export const ArrowDownIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></Icon>;

export const ClockIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>;
export const AcademicCapIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-2.072-1.036A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41l-2.072 1.036m-15.482 0l2.072 1.036m11.338 0l2.072-1.036" /></Icon>;

export const ElectricityIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></Icon>;
export const WaterIcon = ({ className = '' }) => <Icon className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z" /></Icon>;

export const SyriatelIcon = ({ className = '' }) => <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="48" fill="#E60000"/><path d="M50 25C36.1929 25 25 36.1929 25 50C25 63.8071 36.1929 75 50 75" stroke="white" strokeWidth="10" strokeLinecap="round"/><path d="M50 25C63.8071 25 75 36.1929 75 50C75 63.8071 63.8071 75 50 75" stroke="white" strokeWidth="10" strokeLinecap="round" strokeDasharray="0.1 20"/></svg>;
export const MTNIcon = ({ className = '' }) => <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="20" fill="#FFCC00"/><path d="M20 70V30L35 50L50 30V70" stroke="#004988" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/><path d="M60 70V30L72.5 55L85 30V70" stroke="#004988" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
export const SyrianTelecomIcon = ({ className = '' }) => <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z" stroke="#007bff" strokeWidth="8"/><path d="M50 30V70" stroke="#007bff" strokeWidth="8" strokeLinecap="round"/><path d="M30 50L70 50" stroke="#007bff" strokeWidth="8" strokeLinecap="round"/><path d="M39 39L61 61" stroke="#007bff" strokeWidth="8" strokeLinecap="round"/><path d="M39 61L61 39" stroke="#007bff" strokeWidth="8" strokeLinecap="round"/></svg>;
export interface Property {
  id: number;
  title: string;
  type: 'sale' | 'rent';
  price: {
    amount: number;
    currency: 'SYP' | 'USD';
  };
  location: string;
  governorate: string;
  imageUrl: string;
  beds: number;
  baths: number;
  area: number;
  floor: number;
  ownership: string;
  googleMapsLink: string;
  contactNumber: string;
}

export interface Shipment {
  id: number;
  companyName: string;
  cargoType: string;
  truckSize: 'small' | 'medium' | 'large';
  price: number;
  currency: 'SYP' | 'USD';
  origin: string;
  destination: string;
  imageUrl: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
}

export interface TouristSite {
  id: number;
  name: string;
  location: string;
  governorate: string;
  description: string;
  imageUrls: string[];
  googleMapsLink: string;
}

export interface TravelAgency {
  id: number;
  name: string;
  logoUrl: string;
  contactNumber: string;
}

export interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'payment';
  description: string;
  amount: string;
  date: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: 'cardiology' | 'dermatology' | 'pediatrics' | 'neurology';
  governorate: string;
  address: string;
  imageUrl: string;
  googleMapsLink: string;
  contactNumber: string;
  workingHours: string;
  bio: string;
}

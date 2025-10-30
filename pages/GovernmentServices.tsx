import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { ElectricityIcon, WaterIcon, PhoneIcon, TransportationIcon, XIcon, SyriatelIcon, MTNIcon, SyrianTelecomIcon } from '../components/icons';

type ServiceType = 'electricity' | 'water' | 'telecom' | 'trafficFines';
type SubServiceKey = 'syriatel' | 'mtn' | 'syrianTelecom';

interface SubService {
  key: SubServiceKey;
  name: string;
  icon: React.ReactElement<{ className?: string }>;
}

interface Service {
    type: ServiceType;
    name: string;
    icon: React.ReactElement<{ className?: string }>;
    subServices?: SubService[];
}

interface PaymentModalProps {
  service: Service | null;
  company: SubService | null;
  onClose: () => void;
  onConfirm: () => void;
  onSelectCompany: (company: SubService) => void;
}

const PaymentModal = ({ service, company, onClose, onConfirm, onSelectCompany }: PaymentModalProps) => {
  const { translations } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState<'entry' | 'loading' | 'details'>('entry');
  const [billAmount, setBillAmount] = useState<number | null>(null);

  useEffect(() => {
    setInputValue('');
    setStep('entry');
    setBillAmount(null);
  }, [service, company]);

  if (!service) return null;

  const isTelecom = service.type === 'telecom';
  const isCompanySelectionStep = service.subServices && !company;

  const handlePrimaryAction = () => {
    if (isTelecom) {
        if (step === 'entry') {
            if (!/^(09)\d{8}$/.test(inputValue.trim())) {
                alert(translations.governmentServicesPage.enterPhoneNumber);
                return;
            }
            setStep('loading');
            setTimeout(() => {
                const mockAmount = parseInt(inputValue.replace(/\D/g, '').slice(-4) || '0', 10) * 15 + 5000;
                setBillAmount(mockAmount);
                setStep('details');
            }, 1500);
        } else if (step === 'details') {
            onConfirm();
        }
    } else {
        if (!inputValue.trim()) {
            alert(translations.governmentServicesPage.enterInvoiceNumber);
            return;
        }
        onConfirm();
    }
  };

  const getAmountDisplay = () => {
    if (step === 'details' && billAmount !== null) {
      return `${billAmount.toLocaleString()} ${translations.governmentServicesPage.syp}`;
    }
    if (!isTelecom && inputValue) {
      return `${(inputValue.length * 12345).toLocaleString()} ${translations.governmentServicesPage.syp}`;
    }
    return `0 ${translations.governmentServicesPage.syp}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-secondary rounded-lg shadow-2xl w-full max-w-md transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-gray-400 hover:text-white transition-colors">
            <XIcon />
          </button>
          <h2 className="text-2xl font-bold text-highlight mb-2">
            {isCompanySelectionStep ? translations.governmentServicesPage.selectCompany : translations.governmentServicesPage.paymentModalTitle}
          </h2>
          <p className="text-xl text-accent">{company?.name || service.name}</p>
        </div>

        {isCompanySelectionStep ? (
            <div className="p-6 border-t border-gray-700 space-y-4">
                {service.subServices?.map(sub => (
                    <button key={sub.key} onClick={() => onSelectCompany(sub)} className="w-full flex items-center p-4 bg-primary rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        {React.cloneElement(sub.icon, { className: 'w-10 h-10' })}
                        <span className="ms-4 text-lg font-semibold text-accent">{sub.name}</span>
                    </button>
                ))}
            </div>
        ) : (
            <div className="p-6 border-t border-gray-700">
              {step === 'loading' ? (
                <div className="flex flex-col items-center justify-center h-48">
                    <svg className="animate-spin h-10 w-10 text-highlight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-accent">{translations.governmentServicesPage.loading}</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                      <label htmlFor="serviceInput" className="block text-sm font-medium text-gray-300 mb-2">
                      {isTelecom ? translations.governmentServicesPage.phoneNumber : translations.governmentServicesPage.invoiceNumber}
                      </label>
                      <input
                      type={isTelecom ? "tel" : "text"}
                      id="serviceInput"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full bg-primary text-accent rounded-md border-gray-600 focus:ring-highlight focus:border-highlight disabled:bg-gray-800"
                      placeholder={isTelecom ? "09xxxxxxxx" : translations.governmentServicesPage.invoiceNumber + '...'}
                      disabled={step === 'details'}
                      />
                  </div>
                  <div className="mb-6">
                      <p className="text-sm text-gray-400">
                        {(isTelecom && step === 'details') ? translations.governmentServicesPage.billAmount : translations.governmentServicesPage.amount}
                      </p>
                      <p className="text-2xl font-bold text-accent">{getAmountDisplay()}</p>
                  </div>
                  <button
                      onClick={handlePrimaryAction}
                      className="w-full bg-highlight text-primary font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition-colors duration-300 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                      // FIX: The original condition `step === 'loading'` caused a type error because it was always false in this render path.
                      // Changed to disable the button when the input is empty for better UX.
                      disabled={!inputValue.trim()}
                  >
                    {isTelecom 
                      ? (step === 'entry' ? translations.governmentServicesPage.inquire : translations.governmentServicesPage.confirmPayment)
                      : translations.governmentServicesPage.confirmPayment
                    }
                  </button>
                </>
              )}
            </div>
        )}
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, onClick }: { icon: React.ReactElement<{ className?: string }>; title: string; onClick: () => void }) => {
  const { translations } = useTranslation();
  return (
    <div className="bg-secondary p-8 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 group flex flex-col items-center justify-between">
      <div className="text-highlight mb-4">
        {React.cloneElement(icon, { className: 'w-16 h-16' })}
      </div>
      <h3 className="text-xl font-bold text-center mb-6 text-accent group-hover:text-highlight">{title}</h3>
      <button onClick={onClick} className="w-full bg-highlight text-primary font-bold py-2 px-6 rounded-lg hover:bg-yellow-300 transition-colors duration-300 mt-auto">
        {translations.governmentServicesPage.payNow}
      </button>
    </div>
  );
};

const GovernmentServices = () => {
  const { translations } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<SubService | null>(null);

  const services: Service[] = [
    { type: 'electricity', name: translations.governmentServicesPage.electricity, icon: <ElectricityIcon /> },
    { type: 'water', name: translations.governmentServicesPage.water, icon: <WaterIcon /> },
    { 
      type: 'telecom', 
      name: translations.governmentServicesPage.telecom, 
      icon: <PhoneIcon />,
      subServices: [
        { key: 'syriatel', name: translations.governmentServicesPage.syriatel, icon: <SyriatelIcon /> },
        { key: 'mtn', name: translations.governmentServicesPage.mtn, icon: <MTNIcon /> },
        { key: 'syrianTelecom', name: translations.governmentServicesPage.syrianTelecom, icon: <SyrianTelecomIcon /> },
      ]
    },
    { type: 'trafficFines', name: translations.governmentServicesPage.trafficFines, icon: <TransportationIcon /> },
  ];

  const handleOpenModal = (service: Service) => {
    setSelectedService(service);
  };
  
  const handleCloseModal = () => {
    setSelectedService(null);
    setSelectedCompany(null);
  };

  const handleConfirmPayment = () => {
    alert(translations.governmentServicesPage.paymentSuccess);
    handleCloseModal();
  };

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-highlight">{translations.governmentServicesPage.title}</h1>
        <p className="text-lg md:text-xl text-accent max-w-3xl mx-auto">
          {translations.governmentServicesPage.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map(service => (
          <ServiceCard
            key={service.type}
            icon={service.icon}
            title={service.name}
            onClick={() => handleOpenModal(service)}
          />
        ))}
      </div>

      <PaymentModal 
        service={selectedService}
        company={selectedCompany}
        onClose={handleCloseModal}
        onConfirm={handleConfirmPayment}
        onSelectCompany={setSelectedCompany}
      />
    </div>
  );
};

export default GovernmentServices;
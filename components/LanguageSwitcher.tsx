
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
<button 
  onClick={toggleLanguage} 
  className="flex items-center text-[#2D439A] hover:text-[#F7A520] transition-colors"
  aria-label="Switch language"
>
  <Globe 
    size={16} 
    className={`text-[#2D439A] ${language === 'ar' ? 'ml-2' : 'mr-2'}`} 
  />
  <span className={`text-[16px] text-[#2D439A] font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
    {language === 'ar' ? 'العربية | FR' : 'Français | AR'}
  </span>
</button>
  );
};

export default LanguageSwitcher;


import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const TopUtilityBar = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-[#F7A520] text-white h-8 flex items-center">
      <div className="container mx-auto flex justify-end space-x-4 rtl:space-x-reverse px-4">
        {/* This bar is now empty, we could add other utility features here in the future */}
      </div>
    </div>
  );
};

export default TopUtilityBar;

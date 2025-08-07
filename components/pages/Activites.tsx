
import React from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';

const Activites = () => {
  const { t, language } = useLanguage();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {t('activities')}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'هذه الصفحة قيد التطوير حالياً'
              : 'Cette page est actuellement en développement'
            }
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Activites;


import React from 'react';

interface PageHeaderProps {
  language: 'ar' | 'fr';
  title?: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ language, title, description }) => {
  const defaultTitle = language === 'ar' 
    ? 'القناة الثقافية والأدبية'
    : 'Chaîne Culturelle et Littéraire';
    
  const defaultDescription = language === 'ar'
    ? 'مجموعة مختارة من المحاضرات والنقاشات الثقافية والأدبية'
    : 'Une sélection de conférences et discussions culturelles et littéraires';

  return (
    <div className="text-center mb-12">
      <h1 className={`text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} text-alef-teal`}>
        {title || defaultTitle}
      </h1>
      <p className={`text-lg text-gray-600 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
        {description || defaultDescription}
      </p>
      <div className="w-24 h-1 bg-alef-coral mx-auto mt-4"></div>
    </div>
  );
};

export default PageHeader;

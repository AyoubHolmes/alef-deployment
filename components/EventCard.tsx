
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from 'lucide-react';

interface EventCardProps {
  imageUrl: string;
  dateKey?: string;
  date?: {
    ar: string;
    fr: string;
  };
  titleKey?: string;
  title?: {
    ar: string;
    fr: string;
  };
  locationKey?: string;
  location?: {
    ar: string;
    fr: string;
  };
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  dateKey,
  date,
  titleKey,
  title,
  locationKey,
  location,
  link,
}) => {
  const { t, language } = useLanguage();
  
  // Use either translation key or direct translations
  const displayDate = date ? date[language] : dateKey ? t(dateKey) : '';
  const displayTitle = title ? title[language] : titleKey ? t(titleKey) : '';
  const displayLocation = location ? location[language] : locationKey ? t(locationKey) : '';

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
    {/* <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col min-w-[280px] hover:shadow-lg transition-shadow"> */}
      {/* Event Image */}
      <img 
        src={imageUrl} 
        alt={displayTitle} 
        className="h-40 w-full object-cover"
        loading="lazy"
      />
      
      {/* Event Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center text-alef-coral mb-2">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">{displayDate}</span>
        </div>
        
        <h3 className={`font-bold text-lg mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {displayTitle}
        </h3>
        
        {displayLocation && (
          <p className="text-gray-600 mb-4 text-sm">{displayLocation}</p>
        )}
        
        <div className="mt-auto">
          <a 
            href={link || ''}
            className="text-alef-teal hover:text-alef-coral font-medium transition-colors"
          >
            {language === 'ar' ? `${t('details')} ← ` : `${t('details')} →`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

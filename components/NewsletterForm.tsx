
'use client'

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send } from 'lucide-react';

const NewsletterForm = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally send the form to a server
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-r from-alef-teal to-alef-teal/80 py-12 px-4 text-white">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className={`text-3xl font-bold mb-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {t('newsletter')}
        </h2>
        
        {isSubmitted ? (
          <div className="bg-alef-sand text-alef-teal rounded-lg p-4 inline-block">
            {language === 'ar' 
              ? 'شكراً لك! تم تسجيلك في نشرتنا البريدية.'
              : 'Merci ! Vous êtes inscrit à notre newsletter.'}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email')}
              required
              className="px-4 py-3 rounded-lg text-gray-800 flex-1 max-w-[400px] w-full"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
            <button 
              type="submit"
              className="bg-alef-coral hover:bg-alef-coral/80 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse"
            >
              <span>{t('subscribe')}</span>
              <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;

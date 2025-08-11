
'use client'

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/MainLayout';
import { AtSign, PhoneCall, MapPin, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ContactInfo {
  ar: string;
  fr: string;
}

interface SocialLink {
  name: string;
  label: ContactInfo;
  url: string;
  icon: string;
}

interface ContactContent {
  pageTitle: ContactInfo;
  pageDescription: ContactInfo;
  address: ContactInfo;
  phone: string;
  email: string;
  socialLinks: SocialLink[];
}

const Contact = () => {
  const { t, language } = useLanguage();
  const [adminContent, setAdminContent] = useState<ContactContent | null>(null);
  
  // Load admin content
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedContent = localStorage.getItem('contactContent');
      if (savedContent) {
        setAdminContent(JSON.parse(savedContent));
      }
    }
  }, []);

  // Get content with fallback to default
  const getPageTitle = () => {
    return adminContent?.pageTitle[language] || t('contactUs');
  };

  const getPageDescription = () => {
    return adminContent?.pageDescription[language] || t('contactUsDescription');
  };

  const getContactInfo = () => {
    if (adminContent) {
      return [
        { 
          icon: MapPin, 
          title: t('address'), 
          content: adminContent.address[language]
        },
        { 
          icon: PhoneCall, 
          title: t('phone'), 
          content: adminContent.phone
        },
        { 
          icon: Mail, 
          title: t('email'), 
          content: adminContent.email
        },
      ];
    }
    
    // Fallback contact info
    return [
      { 
        icon: MapPin, 
        title: t('address'), 
        content: language === 'ar' 
          ? "123 شارع الفن، الحي الثقافي، الدار البيضاء، 20000" 
          : "123 Art Street, Cultural District, Casablanca, 20000"
      },
      { 
        icon: PhoneCall, 
        title: t('phone'), 
        content: "+212 5XX-XXX-XXX" 
      },
      { 
        icon: Mail, 
        title: t('email'), 
        content: "info@alefassociation.org" 
      },
    ];
  };

  const getSocialLinks = () => {
    if (adminContent && adminContent.socialLinks.length > 0) {
      return adminContent.socialLinks.map(link => ({
        name: link.name,
        icon: link.name === 'Facebook' ? Facebook : 
              link.name === 'Instagram' ? Instagram :
              link.name === 'Twitter' ? Twitter : Youtube,
        url: link.url,
        color: link.name === 'Facebook' ? 'bg-blue-600' :
               link.name === 'Instagram' ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500' :
               link.name === 'Twitter' ? 'bg-sky-500' : 'bg-red-600',
        hoverColor: link.name === 'Facebook' ? 'hover:bg-blue-700' :
                    link.name === 'Instagram' ? 'hover:opacity-90' :
                    link.name === 'Twitter' ? 'hover:bg-sky-600' : 'hover:bg-red-700',
        description: link.label[language]
      }));
    }
    
    // Fallback social links
    return [
      { 
        name: 'Facebook', 
        icon: Facebook, 
        url: 'https://facebook.com', 
        color: 'bg-blue-600',
        hoverColor: 'hover:bg-blue-700',
        description: language === 'ar' ? "تابعنا على Facebook" : "Suivez-nous sur Facebook"
      },
      { 
        name: 'Instagram', 
        icon: Instagram, 
        url: 'https://instagram.com', 
        color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
        hoverColor: 'hover:opacity-90',
        description: language === 'ar' ? "تابعنا على Instagram" : "Suivez-nous sur Instagram"
      },
      { 
        name: 'Twitter', 
        icon: Twitter, 
        url: 'https://twitter.com', 
        color: 'bg-sky-500',
        hoverColor: 'hover:bg-sky-600',
        description: language === 'ar' ? "تابعنا على Twitter" : "Suivez-nous sur Twitter"
      },
      { 
        name: 'Youtube', 
        icon: Youtube, 
        url: 'https://youtube.com', 
        color: 'bg-red-600',
        hoverColor: 'hover:bg-red-700',
        description: language === 'ar' ? "تابعنا على Youtube" : "Suivez-nous sur Youtube"
      }
    ];
  };

  const contactInfo = getContactInfo();
  const socialLinks = getSocialLinks();

  return (
    <MainLayout>
      <div className={`container mx-auto px-4 py-8 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#074D8C]/90 to-[#2D439A]/90 text-white rounded-lg p-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {getPageTitle()}
          </h1>
          <p className="max-w-3xl text-lg opacity-90">
            {getPageDescription()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Information Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-[#074D8C] to-[#2D439A] text-white p-6">
              <h2 className="text-2xl font-semibold mb-2">{t('contactInformation')}</h2>
              <p className="opacity-80">{language === 'ar' ? 'نحن هنا للمساعدة' : 'Nous sommes là pour vous aider'}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-[#F7A520]/10 p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-[#F75C03]" />
                    </div>
                    <div className={`${language === 'ar' ? 'mr-4' : 'ml-4'}`}>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-[#F75C03] to-[#F7A520] text-white p-6">
              <h2 className="text-2xl font-semibold mb-2">{t('followUs')}</h2>
              <p className="opacity-80">
                {language === 'ar' 
                  ? 'ابق على اطلاع بأحدث أخبارنا وأنشطتنا'
                  : 'Restez informé de nos dernières actualités et activités'}
              </p>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center ${social.color} ${social.hoverColor} text-white p-4 rounded-lg transition-all transform hover:scale-[1.03]`}
                >
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <social.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{social.name}</h3>
                    <p className="text-sm text-white/80">{social.description}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="px-6 pb-6 pt-2">
              <Button 
                className="w-full bg-[#074D8C] hover:bg-[#063c70]"
                asChild
              >
                <a href={`mailto:${adminContent?.email || 'info@alefassociation.org'}` || ''}>
                  <Mail className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'راسلنا مباشرة' : 'Envoyez-nous un email'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;

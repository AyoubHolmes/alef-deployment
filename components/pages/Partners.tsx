/* eslint-disable @next/next/no-img-element */

'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Users } from 'lucide-react';

interface Partner {
  id: string;
  name: { ar: string; fr: string };
  description: { ar: string; fr: string };
  logo: string;
  website: string;
  type: string;
}

interface Program {
  id: string;
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  partner: { ar: string; fr: string };
}

interface PartnersContent {
  pageTitle: { ar: string; fr: string };
  pageDescription: { ar: string; fr: string };
  partners: Partner[];
  programs: Program[];
}

const Partners = () => {
  const { t, language } = useLanguage();
  const [adminContent, setAdminContent] = useState<PartnersContent | null>(null);
  
  // Load admin content
  useEffect(() => {
    const savedContent = localStorage.getItem('partnersContent');
    if (savedContent) {
      setAdminContent(JSON.parse(savedContent));
    }
  }, []);
  
  // Set the document title based on language
  useEffect(() => {
    const title = adminContent?.pageTitle[language] || 
      (language === 'ar' ? 'شركاؤنا - جمعية ألف' : 'Nos partenaires - Association ALEF');
    document.title = title;
  }, [language, adminContent]);

  // Get content with fallback to default
  const getPageTitle = () => {
    return adminContent?.pageTitle[language] || 
      (language === 'ar' ? 'شركاؤنا' : 'Nos partenaires');
  };

  const getPageDescription = () => {
    return adminContent?.pageDescription[language] || 
      (language === 'ar' 
        ? 'نفتخر بالعمل مع مجموعة متميزة من المؤسسات والمنظمات التي تشاركنا رؤيتنا لتعزيز الثقافة والفنون'
        : 'Nous sommes fiers de travailler avec un groupe distingué d\'institutions et d\'organisations qui partagent notre vision pour la promotion de la culture et des arts');
  };

  const getPartners = () => {
    if (adminContent && adminContent.partners.length > 0) {
      return adminContent.partners;
    }
    
    // Fallback partners
    return [
      {
        id: "1",
        name: { ar: "وزارة الثقافة المغربية", fr: "Ministère de la Culture Marocain" },
        description: { 
          ar: "الشريك الرسمي للجمعية في مجال تنظيم الفعاليات الثقافية والأدبية الكبرى", 
          fr: "Partenaire officiel de l'association dans l'organisation des grands événements culturels et littéraires" 
        },
        logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=250",
        website: "https://www.minculture.gov.ma/",
        type: "institutional"
      },
      {
        id: "2",
        name: { ar: "جامعة محمد الخامس", fr: "Université Mohammed V" },
        description: { 
          ar: "شراكة استراتيجية في مجال البحث العلمي والمؤتمرات الأكاديمية", 
          fr: "Partenariat stratégique dans le domaine de la recherche scientifique et des conférences académiques" 
        },
        logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=250",
        website: "https://www.um5.ac.ma/",
        type: "academic"
      }
    ];
  };

  const getPrograms = () => {
    if (adminContent && adminContent.programs.length > 0) {
      return adminContent.programs;
    }
    
    // Fallback programs
    return [
      {
        id: "1",
        title: { ar: "مشروع الترجمات الأدبية", fr: "Projet de traductions littéraires" },
        description: { 
          ar: "مشروع مشترك مع المعهد الفرنسي لترجمة الأعمال الأدبية المغربية إلى اللغة الفرنسية والعكس", 
          fr: "Projet conjoint avec l'Institut français pour la traduction d'œuvres littéraires marocaines vers le français et vice versa" 
        },
        partner: { ar: "المعهد الفرنسي بالمغرب", fr: "Institut Français du Maroc" }
      },
      {
        id: "2",
        title: { ar: "ملتقى الشعراء الشباب", fr: "Forum des jeunes poètes" },
        description: { 
          ar: "برنامج سنوي لاكتشاف ودعم المواهب الشعرية الشابة بالتعاون مع وزارة الثقافة", 
          fr: "Programme annuel pour découvrir et soutenir les jeunes talents poétiques en collaboration avec le Ministère de la Culture" 
        },
        partner: { ar: "وزارة الثقافة المغربية", fr: "Ministère de la Culture Marocain" }
      }
    ];
  };

  const partners = getPartners();
  const programs = getPrograms();

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <section className={`text-center mb-16 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#2D439A]">
            {getPageTitle()}
          </h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-600">
            {getPageDescription()}
          </p>
        </section>
        
        {/* Partners Grid */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Handshake size={28} className="text-[#2D439A]" />
            <h2 className={`text-2xl font-semibold text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'شركاؤنا الرئيسيون' : 'Nos partenaires principaux'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <Card key={partner.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={partner.logo} 
                      alt={partner.name[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className={`font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {partner.name[language]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {partner.description[language]}
                  </p>
                  {partner.website && (
                    <a 
                      href={partner.website || ''}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2D439A] hover:underline text-sm"
                    >
                      {language === 'ar' ? 'زيارة الموقع' : 'Visiter le site'}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Collaborative Programs */}
        {programs.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Users size={28} className="text-[#2D439A]" />
              <h2 className={`text-2xl font-semibold text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                {language === 'ar' ? 'برامج مشتركة' : 'Programmes collaboratifs'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programs.map((program) => (
                <Card key={program.id} className="border-none shadow-md overflow-hidden">
                  <CardContent className={`p-6 ${language === 'ar' ? 'text-right' : ''}`}>
                    <h3 className={`text-xl font-semibold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {program.title[language]}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {program.description[language]}
                    </p>
                    <div className="flex items-center mt-4">
                      <span className="text-sm font-medium text-gray-500 mr-2">
                        {language === 'ar' ? 'بالشراكة مع:' : 'En partenariat avec:'}
                      </span>
                      <span className="text-sm font-medium text-[#2D439A]">
                        {program.partner[language]}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </MainLayout>
  );
};

export default Partners;

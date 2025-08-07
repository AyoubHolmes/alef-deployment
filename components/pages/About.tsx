
'use client'

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Info, Users } from 'lucide-react';

interface AboutContent {
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  mission: { ar: string; fr: string };
  vision: { ar: string; fr: string };
  values: Array<{
    id: string;
    title: { ar: string; fr: string };
    description: { ar: string; fr: string };
  }>;
}

const About = () => {
  const { t, language } = useLanguage();
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  
  useEffect(() => {
    const savedContent = localStorage.getItem('aboutContent');
    if (savedContent) {
      setAboutContent(JSON.parse(savedContent));
    }
  }, []);

  // Fallback content if no admin content is available
  const getDisplayContent = () => {
    if (aboutContent && aboutContent.title[language]) {
      return aboutContent;
    }
    
    // Default fallback content
    return {
      title: { 
        ar: 'جمعية ألف للثقافة والتنمية', 
        fr: 'Association ALEF pour la Culture et le Développement' 
      },
      description: { 
        ar: 'تأسست جمعية ألف للثقافة والتنمية عام 2015 كمنصة مستقلة تهدف إلى إثراء المشهد النقدي الفني والثقافي. نحن ملتزمون بتعزيز الحوار حول الفنون المعاصرة ودورها في المجتمع، وخلق مساحات للنقاش والتبادل الفكري.',
        fr: 'Fondée en 2015, l\'Association ALEF pour la Culture et le Développement est une plateforme indépendante dédiée à l\'enrichissement du paysage critique artistique et culturel. Nous nous engageons à promouvoir le dialogue sur les arts contemporains et leur rôle dans la société, et à créer des espaces d\'échange intellectuel.'
      },
      mission: { 
        ar: 'تتمثل رسالتنا في إثراء المشهد الثقافي من خلال تقديم تحليلات نقدية معمقة للأعمال الفنية والأدبية، وخلق منصات للحوار الفكري بين المبدعين والنقاد والجمهور.',
        fr: 'Notre mission est d\'enrichir le paysage culturel en offrant des analyses critiques approfondies des œuvres artistiques et littéraires, et en créant des plateformes de dialogue intellectuel entre créateurs, critiques et public.'
      },
      vision: { 
        ar: 'نتطلع إلى بناء مجتمع يقدر الفكر النقدي والإبداع الفني، ويعزز الحوار البناء حول القضايا الثقافية والفنية.',
        fr: 'Nous aspirons à construire une société qui valorise la pensée critique et la création artistique, et qui favorise un dialogue constructif sur les questions culturelles et artistiques.'
      },
      values: [
        {
          id: '1',
          title: { ar: 'الاستقلالية الفكرية', fr: 'Indépendance intellectuelle' },
          description: { ar: 'تبني رؤى نقدية مستقلة غير خاضعة للتوجهات السائدة أو المصالح التجارية.', fr: 'Adopter des visions critiques indépendantes, libres des tendances dominantes ou des intérêts commerciaux.' }
        },
        {
          id: '2',
          title: { ar: 'التعددية والانفتاح', fr: 'Pluralisme et ouverture' },
          description: { ar: 'احترام تنوع وجهات النظر والتعبيرات الفنية والثقافية والانفتاح على مختلف التيارات الفكرية.', fr: 'Respecter la diversité des points de vue et des expressions artistiques et culturelles, et s\'ouvrir aux différents courants de pensée.' }
        },
        {
          id: '3',
          title: { ar: 'الجودة والعمق', fr: 'Qualité et profondeur' },
          description: { ar: 'تقديم محتوى نقدي عميق ومدروس يتجاوز السطحية ويفتح آفاقًا جديدة للتفكير.', fr: 'Offrir un contenu critique profond et réfléchi, dépassant la superficialité et ouvrant de nouveaux horizons de pensée.' }
        },
        {
          id: '4',
          title: { ar: 'المشاركة والحوار', fr: 'Participation et dialogue' },
          description: { ar: 'تشجيع الحوار البناء والتفاعل بين مختلف الأطراف الفاعلة في المشهد الثقافي.', fr: 'Encourager le dialogue constructif et l\'interaction entre les différents acteurs du paysage culturel.' }
        }
      ]
    };
  };

  const displayContent = getDisplayContent();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} text-alef-teal`}>
            {displayContent.title[language] || t('about')}
          </h1>
          <div className="w-24 h-1 bg-alef-coral mx-auto"></div>
        </div>
        
        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* About Text */}
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <Info className="text-alef-coral mr-2" size={24} />
              <h2 className={`text-2xl font-semibold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                {displayContent.title[language] || (language === 'ar' ? 'عن جمعية ألف للثقافة والتنمية' : 'À propos d\'ALEF')}
              </h2>
            </div>
            
            <p className={`${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'} text-gray-700 whitespace-pre-line`}>
              {displayContent.description[language]}
            </p>
          </div>
          
          {/* About Image */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1000" 
              alt={language === 'ar' ? 'معرض فني' : 'Exposition d\'art'} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Mission & Vision */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className={`text-xl font-bold mb-4 text-alef-teal ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                {language === 'ar' ? 'رسالتنا' : 'Notre mission'}
              </h3>
              <p className={`${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'} text-gray-700 whitespace-pre-line`}>
                {displayContent.mission[language]}
              </p>
            </div>
            
            {/* Vision */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className={`text-xl font-bold mb-4 text-alef-teal ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                {language === 'ar' ? 'رؤيتنا' : 'Notre vision'}
              </h3>
              <p className={`${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'} text-gray-700 whitespace-pre-line`}>
                {displayContent.vision[language]}
              </p>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-6 text-center text-alef-teal ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'قيمنا' : 'Nos valeurs'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayContent.values.map((value, index) => (
              <div key={value.id || index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <h3 className={`text-lg font-semibold mb-3 text-alef-coral ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {value.title[language]}
                </h3>
                <p className={`text-gray-600 text-sm ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} whitespace-pre-line`}>
                  {value.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;

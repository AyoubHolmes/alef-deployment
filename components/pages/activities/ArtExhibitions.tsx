'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { PenLine } from 'lucide-react';

interface ArtExhibition {
  id: number;
  titleAr: string;
  titleFr: string;
  artistAr: string;
  artistFr: string;
  datesAr: string;
  datesFr: string;
  locationAr: string;
  locationFr: string;
  descriptionAr: string;
  descriptionFr: string;
  image?: string;
  status: 'CURRENT' | 'UPCOMING' | 'PAST';
}

const ArtExhibitions = () => {
  const { t, language } = useLanguage();
  const [currentExhibitions, setCurrentExhibitions] = useState<ArtExhibition[]>([]);
  const [upcomingExhibitions, setUpcomingExhibitions] = useState<ArtExhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/art-exhibitions');
      const data = await response.json();
      
      if (data.success) {
        const exhibitions = data.data;
        setCurrentExhibitions(exhibitions.filter((ex: ArtExhibition) => ex.status === 'CURRENT'));
        setUpcomingExhibitions(exhibitions.filter((ex: ArtExhibition) => ex.status === 'UPCOMING'));
      } else {
        setError(language === 'ar' ? 'فشل في جلب المعارض' : 'Échec du chargement des expositions');
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };
  
  const getTitle = (exhibition: ArtExhibition) => language === 'ar' ? exhibition.titleAr : exhibition.titleFr;
  const getArtist = (exhibition: ArtExhibition) => language === 'ar' ? exhibition.artistAr : exhibition.artistFr;
  const getDates = (exhibition: ArtExhibition) => language === 'ar' ? exhibition.datesAr : exhibition.datesFr;
  const getLocation = (exhibition: ArtExhibition) => language === 'ar' ? exhibition.locationAr : exhibition.locationFr;
  const getDescription = (exhibition: ArtExhibition) => language === 'ar' ? exhibition.descriptionAr : exhibition.descriptionFr;
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <section className={`mb-10 ${language === 'ar' ? 'text-right' : ''}`}>
          <div className="flex items-center gap-2 mb-6">
            <PenLine size={28} className="text-[#2D439A]" />
            <h1 className={`text-3xl font-bold text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {t('artExhibitions')}
            </h1>
          </div>
          
          <div className={`prose max-w-none mb-8 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            <p className="text-lg">
              {language === 'ar' 
                ? 'تنظم جمعية ألف للغة والثقافة معارض فنية متنوعة تعكس الثراء الثقافي والفني للمنطقة. تهدف هذه المعارض إلى دعم الفنانين المحليين والعالميين وتقديم أعمالهم للجمهور، وخلق حوار ثقافي حول قضايا فنية معاصرة.'
                : 'L\'Association ALEF pour la langue et la culture organise diverses expositions artistiques reflétant la richesse culturelle et artistique de la région. Ces expositions visent à soutenir les artistes locaux et internationaux, à présenter leurs œuvres au public et à créer un dialogue culturel autour des questions artistiques contemporaines.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt={language === 'ar' ? 'معرض فني' : 'Exposition artistique'} 
                className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
              />
              <div className={`bg-[#F7A520] text-white p-4 rounded-md mt-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                <h3 className="text-xl font-bold mb-2">
                  {language === 'ar' ? 'دعوة للفنانين' : 'Appel aux artistes'}
                </h3>
                <p>
                  {language === 'ar' 
                    ? 'ندعو الفنانين المهتمين بالمشاركة في معارضنا القادمة إلى تقديم أعمالهم. للمزيد من المعلومات، يرجى التواصل معنا.'
                    : 'Nous invitons les artistes intéressés à participer à nos prochaines expositions à soumettre leurs œuvres. Pour plus d\'informations, veuillez nous contacter.'}
                </p>
              </div>
            </div>
            <div className={`flex flex-col justify-center ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              <h3 className={`text-xl font-semibold mb-3 text-[#2D439A] ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                {language === 'ar' ? 'أهدافنا الفنية' : 'Nos objectifs artistiques'}
              </h3>
              <ul className={`space-y-2 list-disc ${language === 'ar' ? 'pr-5' : 'pl-5'}`}>
                <li>
                  {language === 'ar' 
                    ? 'دعم التنوع الثقافي والفني'
                    : 'Soutenir la diversité culturelle et artistique'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'تشجيع الحوار بين الثقافات المختلفة'
                    : 'Encourager le dialogue entre différentes cultures'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'تعزيز فهم وتقدير الفنون البصرية'
                    : 'Promouvoir la compréhension et l\'appréciation des arts visuels'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'توفير منصة للفنانين الناشئين'
                    : 'Fournir une plateforme aux artistes émergents'}
                </li>
              </ul>
            </div>
          </div>
        </section>
        
        {currentExhibitions.length > 0 && (
          <section className={`mb-10 ${language === 'ar' ? 'text-right' : ''}`}>
            <h2 className={`text-2xl font-semibold mb-6 text-[#2D439A] border-b border-[#F7A520] pb-2 inline-block ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'المعارض الحالية' : 'Expositions actuelles'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentExhibitions.map(exhibition => (
                <div key={exhibition.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {exhibition.image ? (
                    <img 
                      src={exhibition.image} 
                      alt={getTitle(exhibition)}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <span className={`text-3xl text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getTitle(exhibition).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`flex justify-between items-start mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <h3 className={`text-xl font-medium text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getTitle(exhibition)}
                      </h3>
                    </div>
                    <p className={`text-gray-700 font-medium mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getArtist(exhibition)}
                    </p>
                    <p className={`text-[#F7A520] mb-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      🗓️ {getDates(exhibition)}
                    </p>
                    <p className={`text-gray-600 mb-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      📍 {getLocation(exhibition)}
                    </p>
                    <p className={`text-gray-800 mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getDescription(exhibition)}
                    </p>
                    <button className={`bg-[#2D439A] hover:bg-[#1c2e6e] text-white py-2 px-4 rounded-md transition-colors ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'المزيد من المعلومات' : 'Plus d\'informations'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {upcomingExhibitions.length > 0 && (
          <section className={`${language === 'ar' ? 'text-right' : ''}`}>
            <h2 className={`text-2xl font-semibold mb-6 text-[#2D439A] border-b border-[#F7A520] pb-2 inline-block ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'المعارض القادمة' : 'Expositions à venir'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingExhibitions.map(exhibition => (
                <div key={exhibition.id} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  {exhibition.image ? (
                    <img 
                      src={exhibition.image} 
                      alt={getTitle(exhibition)}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      <span className={`text-3xl text-[#2D439A] opacity-70 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getTitle(exhibition).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <div className={`flex justify-between items-start mb-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <h3 className={`text-xl font-medium text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getTitle(exhibition)}
                      </h3>
                    </div>
                    <p className={`text-gray-700 font-medium mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getArtist(exhibition)}
                    </p>
                    <p className={`text-[#F7A520] mb-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      🗓️ {getDates(exhibition)}
                    </p>
                    <p className={`text-gray-600 mb-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      📍 {getLocation(exhibition)}
                    </p>
                    <p className={`text-gray-800 mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getDescription(exhibition)}
                    </p>
                    <button className={`bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md transition-colors ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'تذكيري' : 'Me le rappeler'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentExhibitions.length === 0 && upcomingExhibitions.length === 0 && (
          <div className="text-center py-12">
            <h3 className={`text-xl font-medium text-gray-500 mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'لا توجد معارض حالياً' : 'Aucune exposition pour le moment'}
            </h3>
            <p className="text-gray-400">
              {language === 'ar' 
                ? 'سيتم إضافة المحتوى قريباً'
                : 'Le contenu sera ajouté prochainement'
              }
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ArtExhibitions;
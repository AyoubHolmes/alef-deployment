'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Users, Calendar, Book } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LiteraryEvent {
  id: number;
  titleAr: string;
  titleFr: string;
  dateAr: string;
  dateFr: string;
  locationAr: string;
  locationFr: string;
  descriptionAr: string;
  descriptionFr: string;
  image: string;
  status: 'UPCOMING' | 'PAST' | 'CANCELLED';
}

const LiteraryGatherings = () => {
  const { t, language } = useLanguage();
  const [upcomingEvents, setUpcomingEvents] = useState<LiteraryEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<LiteraryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/literary-gatherings');
      const data = await response.json();
      
      if (data.success) {
        const events = data.data;
        setUpcomingEvents(events.filter((event: LiteraryEvent) => event.status === 'UPCOMING'));
        setPastEvents(events.filter((event: LiteraryEvent) => event.status === 'PAST'));
      } else {
        setError(language === 'ar' ? 'فشل في جلب الفعاليات' : 'Échec du chargement des événements');
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (event: LiteraryEvent) => language === 'ar' ? event.titleAr : event.titleFr;
  const getDate = (event: LiteraryEvent) => language === 'ar' ? event.dateAr : event.dateFr;
  const getLocation = (event: LiteraryEvent) => language === 'ar' ? event.locationAr : event.locationFr;
  const getDescription = (event: LiteraryEvent) => language === 'ar' ? event.descriptionAr : event.descriptionFr;

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
        {/* Header Section */}
        <section className={`mb-10 ${language === 'ar' ? 'text-right' : ''}`}>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={28} className="text-[#2D439A]" />
            <h1 className={`text-3xl font-bold text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {t('literaryGatherings')}
            </h1>
          </div>
          
          {/* Introduction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className={`prose max-w-none ${language === 'ar' ? 'font-cairo order-2 md:order-1' : 'font-montserrat order-2 md:order-1'}`}>
              <p className="text-lg mb-4">
                {language === 'ar' 
                  ? 'تنظم جمعية ألف للغة والثقافة واللقاءات الأدبية ملتقيات دورية للأدب والفكر، تجمع الكتاب والمفكرين لمناقشة أحدث الإصدارات الأدبية وتبادل الأفكار.'
                  : 'L\'Association ALEF pour la langue et la culture organise des rencontres littéraires périodiques, réunissant écrivains et penseurs pour discuter des dernières publications et échanger des idées.'}
              </p>
              <p className="text-lg">
                {language === 'ar' 
                  ? 'تشمل هذه الأنشطة نوادي القراءة، والندوات الأدبية، وحلقات النقاش، وأمسيات الشعر والقصة.'
                  : 'Ces activités comprennent des clubs de lecture, des séminaires littéraires, des cercles de discussion et des soirées de poésie et de contes.'}
              </p>
              <div className="mt-6">
                <h3 className={`text-xl font-semibold text-[#2D439A] mb-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {language === 'ar' ? 'لماذا اللقاءات الأدبية؟' : 'Pourquoi les rencontres littéraires ?'}
                </h3>
                <p className="text-gray-700">
                  {language === 'ar' 
                    ? 'تهدف اللقاءات الأدبية إلى إثراء المشهد الثقافي وتعزيز التبادل الفكري بين المثقفين والمهتمين بالأدب.'
                    : 'Les rencontres littéraires visent à enrichir la scène culturelle et à promouvoir l\'échange intellectuel entre les intellectuels et les passionnés de littérature.'}
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be" 
                alt={language === 'ar' ? 'لقاء أدبي' : 'Rencontre littéraire'} 
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-4"
              />
            </div>
          </div>
        </section>
        
        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <section className={`mb-10 ${language === 'ar' ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={24} className="text-[#2D439A]" />
              <h2 className={`text-2xl font-semibold text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                {language === 'ar' ? 'الفعاليات القادمة' : 'Événements à venir'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={event.image} 
                      alt={getTitle(event)} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <span className={`bg-[#F7A520] text-white text-sm font-medium py-1 px-3 rounded-full ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getDate(event)}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className={`pb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                    <h3 className={`text-xl font-semibold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getTitle(event)}
                    </h3>
                    <p className={`text-gray-600 flex items-center gap-1 ${language === 'ar' ? 'justify-end' : ''}`}>
                      <Users size={16} className="text-[#2D439A]" />
                      <span>{getLocation(event)}</span>
                    </p>
                  </CardHeader>
                  
                  <CardContent className={language === 'ar' ? 'text-right' : ''}>
                    <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getDescription(event)}
                    </p>
                  </CardContent>
                  
                  <CardFooter className={`pt-2 ${language === 'ar' ? 'justify-end' : ''}`}>
                    <Button 
                      variant="outline" 
                      className="border-[#2D439A] text-[#2D439A] hover:bg-[#2D439A] hover:text-white"
                    >
                      {language === 'ar' ? 'عرض التفاصيل' : 'Voir les détails'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}
        
        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <section className={`${language === 'ar' ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2 mb-6">
              <Book size={24} className="text-[#2D439A]" />
              <h2 className={`text-2xl font-semibold text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                {language === 'ar' ? 'الفعاليات السابقة' : 'Événements passés'}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastEvents.map(event => (
                <Card key={event.id} className="overflow-hidden border-none shadow-md bg-gray-50">
                  <div className="relative h-48">
                    <img 
                      src={event.image} 
                      alt={getTitle(event)} 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <span className={`bg-gray-300 text-gray-700 text-sm font-medium py-1 px-3 rounded-full ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getDate(event)}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className={`pb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                    <h3 className={`text-xl font-semibold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getTitle(event)}
                    </h3>
                    <p className={`text-gray-600 flex items-center gap-1 ${language === 'ar' ? 'justify-end' : ''}`}>
                      <Users size={16} className="text-gray-600" />
                      <span>{getLocation(event)}</span>
                    </p>
                  </CardHeader>
                  
                  <CardContent className={language === 'ar' ? 'text-right' : ''}>
                    <p className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getDescription(event)}
                    </p>
                  </CardContent>
                  
                  <CardFooter className={`pt-2 ${language === 'ar' ? 'justify-end' : ''}`}>
                    <Button 
                      variant="outline" 
                      className="border-gray-400 text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                    >
                      {language === 'ar' ? 'عرض التفاصيل' : 'Voir les détails'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}

        {upcomingEvents.length === 0 && pastEvents.length === 0 && (
          <div className="text-center py-12">
            <h3 className={`text-xl font-medium text-gray-500 mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'لا توجد فعاليات حالياً' : 'Aucun événement pour le moment'}
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

export default LiteraryGatherings;
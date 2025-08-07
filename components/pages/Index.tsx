/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import NewsletterForm from '@/components/NewsletterForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useContentManager } from '@/hooks/useContentManager';
import { getUpcomingEvents, getEventsByCategory, allEventsData } from '@/data/allEvents';
import MainLayout from '@/components/MainLayout';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from 'lucide-react';

// Updated hero slider with cultural/academic/artistic images
const slides = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    titleKey: 'latestEvent',
    buttonKey: 'readMore',
    linkPath: '/activities/literary-gatherings',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
    titleKey: 'featuredArticle',
    buttonKey: 'discoverIssue',
    linkPath: '/publications',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    titleKey: 'upcomingPublication',
    buttonKey: 'preOrder',
    linkPath: '/publications',
  },
];

// Updated function to get 3 diverse upcoming/ongoing events
const getDiverseUpcomingEvents = () => {
  const today = new Date();
  
  // Filter for upcoming OR ongoing events only
  const upcomingOrOngoingEvents = allEventsData.filter(event => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    // Include if start date is in future OR if we're between start and end dates
    return startDate >= today || (startDate <= today && endDate >= today);
  }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  const categories = ['Arts Visuels', 'Littérature et pensée', 'Éducation'];
  const selectedEvents = [];
  const usedEvents = new Set();

  // First pass: try to get one event from each category
  for (const category of categories) {
    const categoryEvent = upcomingOrOngoingEvents.find(event => 
      event.category.fr === category && !usedEvents.has(event.id)
    );
    if (categoryEvent && selectedEvents.length < 3) {
      selectedEvents.push(categoryEvent);
      usedEvents.add(categoryEvent.id);
    }
  }

  // Second pass: fill remaining slots with next upcoming/ongoing events
  while (selectedEvents.length < 3) {
    const nextEvent = upcomingOrOngoingEvents.find(event => !usedEvents.has(event.id));
    if (nextEvent) {
      selectedEvents.push(nextEvent);
      usedEvents.add(nextEvent.id);
    } else {
      break; // No more events available
    }
  }

  return selectedEvents;
};

const Index = () => {
  const { t, language } = useLanguage();
  const { getContentValue } = useContentManager();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  // Get diverse upcoming events for homepage
  const diverseUpcomingEvents = getDiverseUpcomingEvents();

  // Set the document title based on language
  useEffect(() => {
    document.title = language === 'ar' 
      ? 'جمعية ألف للثقافة والتنمية'
      : 'Association ALEF pour la culture et le développement';
  }, [language]);

  // Get editable content values
  const aboutTitle = getContentValue('home', 'about', 'title', language) || 
    (language === 'ar' ? 'جمعية ألف للثقافة والتنمية' : 'Association ALEF pour la culture et le développement');
  
  const aboutDescription = getContentValue('home', 'about', 'description', language) ||
    (language === 'ar' 
      ? 'جمعية ألف للثقافة والتنمية هي مؤسسة ثقافية غير ربحية تأسست بهدف نشر الوعي الثقافي والأدبي في المجتمع، وتعزيز القيم الإنسانية من خلال مشاريع ثقافية وفنية متنوعة. تسعى الجمعية إلى خلق فضاءات للحوار والتبادل الثقافي وتشجيع المواهب الشابة في مختلف المجالات الإبداعية.'
      : 'L\'Association ALEF pour la culture et le développement est une organisation culturelle à but non lucratif fondée dans le but de diffuser la sensibilisation culturelle et littéraire dans la société, et de promouvoir les valeurs humaines à travers divers projets culturels et artistiques. L\'association cherche à créer des espaces de dialogue et d\'échange culturel et à encourager les jeunes talents dans divers domaines créatifs.');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (categoryFr: string) => {
    switch (categoryFr) {
      case 'Arts Visuels':
        return 'bg-purple-100 text-purple-800';
      case 'Littérature et pensée':
        return 'bg-indigo-100 text-indigo-800';
      case 'Éducation':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section>
        <HeroSlider slides={slides} />
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-4 bg-gray-50 section-fade-in">
        <div className="container mx-auto">
          <h2 className={`text-3xl font-bold mb-10 text-center ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'روابط سريعة' : 'Liens rapides'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Last Activities - Updated to cultural event image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b" 
                alt="Last Activities" 
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className={`font-bold text-xl mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {language === 'ar' ? 'آخر الأنشطة' : 'Dernières activités'}
                </h3>
                <p className="text-gray-600 mb-4 flex-1">
                  {language === 'ar' 
                    ? 'اكتشف أبرز أنشطتنا الثقافية الحديثة'
                    : 'Découvrez nos récentes activités culturelles'}
                </p>
                <div className="mt-auto">
                  <Link 
                    href="/activities" 
                    className="text-alef-teal hover:text-alef-coral font-medium transition-colors"
                  >
                    {language === 'ar' ? 'تصفّح الأنشطة ←' : 'Explorer les activités →'}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Literature & Arts Channel - Updated to library/academic image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                alt="Literature & Arts Channel" 
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className={`font-bold text-xl mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {t('literaryChannel')}
                </h3>
                <p className="text-gray-600 mb-4 flex-1">
                  {language === 'ar' 
                    ? 'شاهد أحدث حلقات قناتنا الثقافية والأدبية'
                    : 'Regardez les derniers épisodes de notre chaîne culturelle et littéraire'}
                </p>
                <div className="mt-auto">
                  <Link 
                    href="/cultural-channel" 
                    className="text-alef-teal hover:text-alef-coral font-medium transition-colors"
                  >
                    {language === 'ar' ? 'مشاهدة الآن ←' : 'Regarder maintenant →'}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Latest Magazine Issue - Updated to academic books image */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" 
                alt="Magazine Cover" 
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className={`font-bold text-xl mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {t('latestIssue')}
                </h3>
                <p className="text-gray-600 mb-4 flex-1">
                  {language === 'ar' 
                    ? 'العدد الرابع - ربيع ٢٠٢٥'
                    : 'Numéro 4 - Printemps 2025'}
                </p>
                <div className="mt-auto">
                  <Link 
                    href="/publications" 
                    className="text-alef-teal hover:text-alef-coral font-medium transition-colors"
                  >
                    {language === 'ar' ? `${t('discoverIssue')} ← ` : `${t('discoverIssue')} →`}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About ALEF Section */}
      <section className="py-16 px-4 section-fade-in">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                {aboutTitle}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {aboutDescription}
              </p>
              <Link href="/about" className="btn-alef">
                {t('learnMore')}
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570" 
                alt="About ALEF" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diverse Upcoming Events - Updated Section */}
      <section className="py-16 px-4 bg-alef-sand/30 section-fade-in">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-3xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'الفعاليات القادمة' : 'Événements à venir'}
            </h2>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'اكتشف أبرز فعالياتنا المتنوعة القادمة'
                : 'Découvrez nos prochains événements diversifiés'}
            </p>
          </div>

          {/* Diverse Events Grid - Always show exactly 3 or fewer */}
          {diverseUpcomingEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {diverseUpcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                    {/* Event Image */}
                    {event.image && (
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title[language]} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Event Content */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Category Badge */}
                      <Badge className={`mb-3 self-start ${getCategoryColor(event.category.fr)}`}>
                        {event.category[language]}
                      </Badge>
                      
                      <h3 className={`font-bold text-lg mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {event.title[language]}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                        {event.description[language]}
                      </p>
                      
                      {/* Event Details */}
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(event.startDate)}
                            {event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location[language]}</span>
                        </div>
                      </div>
                      
                      {/* Details Button - Pushed to bottom */}
                      <div className="mt-auto">
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => setSelectedEvent(event)}
                        >
                          {language === 'ar' ? 'التفاصيل' : 'Détails'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View All Events Button */}
              <div className="text-center">
                <Link href="/activities" className="btn-alef">
                  {language === 'ar' ? 'عرض جميع الفعاليات' : 'Voir tous les événements'}
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600">
              <p className={language === 'ar' ? 'font-cairo' : ''}>
                {language === 'ar' 
                  ? 'لا توجد فعاليات قادمة حالياً'
                  : 'Aucun événement à venir pour le moment'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      <EventModal 
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </MainLayout>
  );
};

export default Index;

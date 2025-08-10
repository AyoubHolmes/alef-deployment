/* eslint-disable @next/next/no-img-element */

'use client'

import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User, DollarSign } from 'lucide-react';
// NOTE: This page previously used mock data from `allEventsData`.
// It now fetches from real APIs and normalizes the results to the expected shape.

type LocalizedText = {
  ar: string;
  fr: string;
};

type ActivityItem = {
  id: number | string;
  title: LocalizedText;
  description: LocalizedText;
  // Some sources have a single date string; we store start/end as strings for display
  startDate: string;
  endDate: string;
  location: LocalizedText;
  image: string;
  category: LocalizedText;
  type: string; // 'exhibition' | 'workshop' | 'event' | ...
  artist?: LocalizedText;
  instructor?: LocalizedText;
  price?: LocalizedText;
};

const Activities = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'current':
        return 'default'; // In Progress
      case 'upcoming':
        return 'secondary'; // Upcoming
      case 'past':
        return 'outline'; // Done
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'current':
        return language === 'ar' ? 'جاري' : 'En cours';
      case 'upcoming':
        return language === 'ar' ? 'قادم' : 'À venir';
      case 'past':
        return language === 'ar' ? 'منتهي' : 'Terminé';
      default:
        return status;
    }
  };

  const categories = [
    { id: 'all', label: { ar: 'الكل', fr: 'Tous' } },
    { id: 'visual-arts', label: { ar: 'فنون بصرية', fr: 'Arts Visuels' } },
    { id: 'literary-thought', label: { ar: 'أدب وفكر', fr: 'Pensée Littéraire' } },
    { id: 'education', label: { ar: 'تربية', fr: 'Éducation' } }
  ];

  useEffect(() => {
    let isCancelled = false;

    async function fetchAllActivities() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        // Fetch in parallel
        const [exhibitionsRes, gatheringsRes, workshopsRes] = await Promise.all([
          fetch('/api/art-exhibitions', { cache: 'no-store' }),
          fetch('/api/literary-gatherings', { cache: 'no-store' }),
          fetch('/api/educational-activities?type=workshops', { cache: 'no-store' })
        ]);

        const [exhibitionsJson, gatheringsJson, workshopsJson] = await Promise.all([
          exhibitionsRes.json(),
          gatheringsRes.json(),
          workshopsRes.json()
        ]);

        const normalizedExhibitions: ActivityItem[] = Array.isArray(exhibitionsJson?.data)
          ? exhibitionsJson.data.map((ex: any) => ({
              id: ex.id,
              title: { ar: ex.titleAr ?? '', fr: ex.titleFr ?? '' },
              description: { ar: ex.descriptionAr ?? '', fr: ex.descriptionFr ?? '' },
              startDate: '',
              endDate: '',
              location: { ar: ex.locationAr ?? '', fr: ex.locationFr ?? '' },
              image: ex.image ?? '',
              category: { ar: 'فنون بصرية', fr: 'Arts Visuels' },
              type: 'exhibition',
              artist: ex.artistAr || ex.artistFr ? { ar: ex.artistAr ?? '', fr: ex.artistFr ?? '' } : undefined
            }))
          : [];

        const normalizedGatherings: ActivityItem[] = Array.isArray(gatheringsJson?.data)
          ? gatheringsJson.data.map((ev: any) => ({
              id: ev.id,
              title: { ar: ev.titleAr ?? '', fr: ev.titleFr ?? '' },
              description: { ar: ev.descriptionAr ?? '', fr: ev.descriptionFr ?? '' },
              startDate: ev.dateFr ?? '',
              endDate: ev.dateFr ?? '',
              location: { ar: ev.locationAr ?? '', fr: ev.locationFr ?? '' },
              image: ev.image ?? '',
              category: { ar: 'أدب وفكر', fr: 'Pensée Littéraire' },
              type: 'event'
            }))
          : [];

        const normalizedWorkshops: ActivityItem[] = Array.isArray(workshopsJson?.data)
          ? workshopsJson.data.map((ws: any) => ({
              id: ws.id,
              title: { ar: ws.titleAr ?? '', fr: ws.titleFr ?? '' },
              description: { ar: ws.examplesAr?.join('، ') ?? '', fr: ws.examplesFr?.join(', ') ?? '' },
              startDate: ws.dateFr ?? '',
              endDate: ws.dateFr ?? '',
              location: { ar: ws.locationAr ?? '', fr: ws.locationFr ?? '' },
              image: '',
              category: { ar: 'تربية', fr: 'Éducation' },
              type: 'workshop',
              instructor: ws.instructorAr || ws.instructorFr ? { ar: ws.instructorAr ?? '', fr: ws.instructorFr ?? '' } : undefined,
              price: ws.price ? { ar: String(ws.price), fr: String(ws.price) } : undefined
            }))
          : [];

        const combined: ActivityItem[] = [
          ...normalizedExhibitions,
          ...normalizedGatherings,
          ...normalizedWorkshops
        ];

        if (!isCancelled) {
          setActivities(combined);
        }
      } catch (error) {
        console.error('Failed to load activities', error);
        if (!isCancelled) setErrorMessage(language === 'ar' ? 'فشل تحميل الأنشطة' : 'Échec du chargement des activités');
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    fetchAllActivities();
    return () => {
      isCancelled = true;
    };
  }, [language]);

  const filteredActivities = useMemo(() => {
    if (selectedCategory === 'all') return activities;
    const categoryMapping: Record<string, string[]> = {
      'visual-arts': ['فنون بصرية', 'Arts Visuels'],
      'literary-thought': ['أدب وفكر', 'Pensée Littéraire'],
      'education': ['تربية', 'Éducation']
    };
    return activities.filter((activity) =>
      categoryMapping[selectedCategory as keyof typeof categoryMapping]?.includes(activity.category.ar) ||
      categoryMapping[selectedCategory as keyof typeof categoryMapping]?.includes(activity.category.fr)
    );
  }, [activities, selectedCategory]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {t('activities')}
          </h1>
          <p className={`text-lg text-gray-600 mb-8 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' 
              ? 'استكشف الأنشطة والفعاليات المتنوعة التي ننظمها'
              : 'Découvrez les activités et événements variés que nous organisons'
            }
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}
            >
              {category.label[language]}
            </Button>
          ))}
        </div>

        {/* Loading / Error */}
        {isLoading && (
          <div className="text-center py-12">
            <p className={`${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </p>
          </div>
        )}
        {errorMessage && !isLoading && (
          <div className="text-center py-12">
            <p className={`text-red-600 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>{errorMessage}</p>
          </div>
        )}

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={activity.image || 'https://images.unsplash.com/photo-1519681393784-d120267933ba'} 
                  alt={activity.title[language]}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={getStatusBadgeVariant(activity.type === 'exhibition' ? 'current' : 'upcoming')}
                    className={`${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}
                  >
                    {getStatusLabel(activity.type === 'exhibition' ? 'current' : 'upcoming')}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="text-xs">
                    {activity.category[language]}
                  </Badge>
                </div>
                <CardTitle className={`text-lg ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                  {activity.title[language]}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                  {activity.description[language]}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{activity.startDate}{activity.endDate ? ` - ${activity.endDate}` : ''}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location[language]}</span>
                  </div>
                  
                  {activity.artist && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{activity.artist[language]}</span>
                    </div>
                  )}
                  
                  {activity.instructor && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{activity.instructor[language]}</span>
                    </div>
                  )}
                  
                  {activity.price && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{activity.price[language]}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' 
                ? 'لا توجد أنشطة في هذه الفئة حالياً'
                : 'Aucune activité disponible dans cette catégorie actuellement'
              }
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Activities;

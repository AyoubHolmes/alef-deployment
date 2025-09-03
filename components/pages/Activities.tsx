/* eslint-disable @next/next/no-img-element */

'use client'

import React, { useEffect, useMemo, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User, DollarSign, Eye } from 'lucide-react';
import EventModal from '@/components/EventModal';
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
  fullDescription?: LocalizedText;
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
  organizers?: LocalizedText;
  localisation?: LocalizedText;
  dates?: LocalizedText;
};

const Activities = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  // Helper function to get category labels
  const getCategoryLabel = (category: string): LocalizedText => {
    switch (category) {
      case 'art-exhibitions':
        return { ar: 'فنون بصرية', fr: 'Arts Visuels' };
      case 'educational-activities':
        return { ar: 'تربية', fr: 'Éducation' };
      case 'literary-gatherings':
        return { ar: 'أدب وفكر', fr: 'Pensée Littéraire' };
      default:
        return { ar: category, fr: category };
    }
  };

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
        // Fetch from the unified activities API
        const activitiesRes = await fetch('/api/activities', { cache: 'no-store' });
        const activitiesJson = await activitiesRes.json();

        if (activitiesJson?.success && Array.isArray(activitiesJson.data)) {
          const normalizedActivities: ActivityItem[] = activitiesJson.data.map((activity: any) => ({
            id: activity.id,
            title: activity.title,
            description: activity.description,
            fullDescription: activity.description, // Use description as fullDescription
            startDate: activity.dates?.ar || activity.startDate || '',
            endDate: activity.dates?.fr || activity.endDate || '',
            location: activity.location,
            image: activity.image || '',
            category: getCategoryLabel(activity.category),
            type: activity.type,
            artist: activity.artist,
            instructor: activity.instructor,
            price: activity.price ? { ar: String(activity.price), fr: String(activity.price) } : undefined,
            organizers: activity.organizers,
            localisation: activity.localisation,
            dates: activity.dates
          }));

          if (!isCancelled) {
            setActivities(normalizedActivities);
          }
        } else {
          if (!isCancelled) {
            setActivities([]);
          }
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

                {/* Details Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button 
                    className={`w-full bg-[#074D8C] hover:bg-[#05396b] text-white ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} transition-colors duration-200`}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <Eye className={`w-4 h-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'عرض التفاصيل' : 'Voir les détails'}
                  </Button>
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

      {/* Activity Details Modal */}
      <EventModal 
        event={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </MainLayout>
  );
};

export default Activities;

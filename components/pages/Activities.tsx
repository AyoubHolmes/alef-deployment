
'use client'

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, User, DollarSign } from 'lucide-react';
import { allEventsData } from '@/data/allEvents';

const Activities = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const filteredActivities = selectedCategory === 'all' 
    ? allEventsData 
    : allEventsData.filter(activity => {
        const categoryMapping = {
          'visual-arts': ['فنون بصرية', 'Arts Visuels'],
          'literary-thought': ['أدب وفكر', 'Pensée Littéraire'],
          'education': ['تربية', 'Éducation']
        };
        return categoryMapping[selectedCategory]?.includes(activity.category.ar) || 
               categoryMapping[selectedCategory]?.includes(activity.category.fr);
      });

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

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={activity.image} 
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
                    <span>{activity.startDate} - {activity.endDate}</span>
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

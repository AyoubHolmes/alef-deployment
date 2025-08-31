
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/language';
import { toast } from 'sonner';
import { Plus, Trash2, Edit3, Globe } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface Activity {
  id: string;
  type: 'literary' | 'art' | 'educational';
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  artist?: { ar: string; fr: string }; // For art exhibitions
  instructor?: { ar: string; fr: string }; // For educational activities
  dates: string;
  location: { ar: string; fr: string };
  localisation: { ar: string; fr: string }; // Added localisation field
  organizers: { ar: string; fr: string }; // Added organizers field
  image?: string;
  status: 'current' | 'upcoming' | 'past';
  price?: string; // For educational activities
  createdAt: string;
}

const ActivitiesManager: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('activities');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    type: 'literary' as 'literary' | 'art' | 'educational',
    titleAr: '',
    titleFr: '',
    descriptionAr: '',
    descriptionFr: '',
    artistAr: '',
    artistFr: '',
    instructorAr: '',
    instructorFr: '',
    dates: '',
    locationAr: '',
    locationFr: '',
    localisationAr: '',
    localisationFr: '',
    organizersAr: '',
    organizersFr: '',
    status: 'upcoming' as 'current' | 'upcoming' | 'past',
    price: '',
    image: ''
  });

  const labels = {
    activitiesManager: { ar: 'إدارة الأنشطة', fr: 'Gestionnaire d\'activités' },
    addActivity: { ar: 'إضافة نشاط جديد', fr: 'Ajouter une nouvelle activité' },
    editActivity: { ar: 'تعديل النشاط', fr: 'Modifier l\'activité' },
    type: { ar: 'نوع النشاط', fr: 'Type d\'activité' },
    literary: { ar: 'ملتقى أدبي', fr: 'Rencontre littéraire' },
    art: { ar: 'معرض فني', fr: 'Exposition artistique' },
    educational: { ar: 'نشاط تعليمي', fr: 'Activité éducative' },
    title: { ar: 'العنوان', fr: 'Titre' },
    description: { ar: 'الوصف', fr: 'Description' },
    artist: { ar: 'الفنان', fr: 'Artiste' },
    instructor: { ar: 'المدرب', fr: 'Instructeur' },
    dates: { ar: 'التواريخ', fr: 'Dates' },
    location: { ar: 'المكان', fr: 'Lieu' },
    localisation: { ar: 'التوطين', fr: 'Localisation' },
    organizers: { ar: 'المنظمون', fr: 'Organisateurs' },
    status: { ar: 'الحالة', fr: 'Statut' },
    current: { ar: 'حالي', fr: 'Actuel' },
    upcoming: { ar: 'قادم', fr: 'À venir' },
    past: { ar: 'سابق', fr: 'Passé' },
    price: { ar: 'السعر', fr: 'Prix' },
    image: { ar: 'الصورة', fr: 'Image' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    save: { ar: 'حفظ', fr: 'Sauvegarder' },
    cancel: { ar: 'إلغاء', fr: 'Annuler' },
    delete: { ar: 'حذف', fr: 'Supprimer' },
    edit: { ar: 'تعديل', fr: 'Modifier' },
    noActivities: { ar: 'لا توجد أنشطة متاحة', fr: 'Aucune activité disponible' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  const saveActivities = (newActivities: Activity[]) => {
    setActivities(newActivities);
    localStorage.setItem('activities', JSON.stringify(newActivities));
  };

  const handleSubmit = () => {
    if (!formData.titleAr || !formData.titleFr || !formData.descriptionAr || !formData.descriptionFr || !formData.dates || !formData.locationAr || !formData.locationFr || !formData.localisationAr || !formData.localisationFr || !formData.organizersAr || !formData.organizersFr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    const activityData: Activity = {
      id: editingActivity?.id || `activity-${Date.now()}`,
      type: formData.type,
      title: { ar: formData.titleAr, fr: formData.titleFr },
      description: { ar: formData.descriptionAr, fr: formData.descriptionFr },
      dates: formData.dates,
      location: { ar: formData.locationAr, fr: formData.locationFr },
      localisation: { ar: formData.localisationAr, fr: formData.localisationFr },
      organizers: { ar: formData.organizersAr, fr: formData.organizersFr },
      status: formData.status,
      image: formData.image,
      createdAt: editingActivity?.createdAt || new Date().toISOString()
    };

    // Add type-specific fields
    if (formData.type === 'art' && (formData.artistAr || formData.artistFr)) {
      activityData.artist = { ar: formData.artistAr, fr: formData.artistFr };
    }
    if (formData.type === 'educational') {
      if (formData.instructorAr || formData.instructorFr) {
        activityData.instructor = { ar: formData.instructorAr, fr: formData.instructorFr };
      }
      if (formData.price) {
        activityData.price = formData.price;
      }
    }

    let newActivities;
    if (editingActivity) {
      newActivities = activities.map(activity => 
        activity.id === editingActivity.id ? activityData : activity
      );
    } else {
      newActivities = [...activities, activityData];
    }

    saveActivities(newActivities);
    resetForm();
    toast.success(language === 'ar' ? 'تم حفظ النشاط بنجاح' : 'Activité sauvegardée avec succès');
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      type: activity.type,
      titleAr: activity.title.ar,
      titleFr: activity.title.fr,
      descriptionAr: activity.description.ar,
      descriptionFr: activity.description.fr,
      artistAr: activity.artist?.ar || '',
      artistFr: activity.artist?.fr || '',
      instructorAr: activity.instructor?.ar || '',
      instructorFr: activity.instructor?.fr || '',
      dates: activity.dates,
      locationAr: activity.location.ar,
      locationFr: activity.location.fr,
      localisationAr: activity.localisation.ar,
      localisationFr: activity.localisation.fr,
      organizersAr: activity.organizers.ar,
      organizersFr: activity.organizers.fr,
      status: activity.status,
      price: activity.price || '',
      image: activity.image || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    const newActivities = activities.filter(activity => activity.id !== id);
    saveActivities(newActivities);
    toast.success(language === 'ar' ? 'تم حذف النشاط بنجاح' : 'Activité supprimée avec succès');
  };

  const resetForm = () => {
    setFormData({
      type: 'literary',
      titleAr: '',
      titleFr: '',
      descriptionAr: '',
      descriptionFr: '',
      artistAr: '',
      artistFr: '',
      instructorAr: '',
      instructorFr: '',
      dates: '',
      locationAr: '',
      locationFr: '',
      localisationAr: '',
      localisationFr: '',
      organizersAr: '',
      organizersFr: '',
      status: 'upcoming',
      price: '',
      image: ''
    });
    setShowAddForm(false);
    setEditingActivity(null);
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
              {getLabel('activitiesManager')}
            </CardTitle>
            <Button 
              onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'FR' : 'AR'}
            </Button>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-fit"
          >
            <Plus className="w-4 h-4 mr-2" />
            {getLabel('addActivity')}
          </Button>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">
                  {editingActivity ? getLabel('editActivity') : getLabel('addActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>{getLabel('type')}</Label>
                  <Select value={formData.type} onValueChange={(value: 'literary' | 'art' | 'educational') => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="literary">{getLabel('literary')}</SelectItem>
                      <SelectItem value="art">{getLabel('art')}</SelectItem>
                      <SelectItem value="educational">{getLabel('educational')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{getLabel('title')} ({getLabel('arabic')})</Label>
                    <Input
                      value={formData.titleAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                      placeholder={getLabel('title')}
                      className="font-cairo"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label>{getLabel('title')} ({getLabel('french')})</Label>
                    <Input
                      value={formData.titleFr}
                      onChange={(e) => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                      placeholder={getLabel('title')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{getLabel('description')} ({getLabel('arabic')})</Label>
                    <Textarea
                      value={formData.descriptionAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                      placeholder={getLabel('description')}
                      className="font-cairo"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label>{getLabel('description')} ({getLabel('french')})</Label>
                    <Textarea
                      value={formData.descriptionFr}
                      onChange={(e) => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
                      placeholder={getLabel('description')}
                    />
                  </div>
                </div>

                {formData.type === 'art' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{getLabel('artist')} ({getLabel('arabic')})</Label>
                      <Input
                        value={formData.artistAr}
                        onChange={(e) => setFormData(prev => ({ ...prev, artistAr: e.target.value }))}
                        placeholder={getLabel('artist')}
                        className="font-cairo"
                        dir="rtl"
                      />
                    </div>
                    <div>
                      <Label>{getLabel('artist')} ({getLabel('french')})</Label>
                      <Input
                        value={formData.artistFr}
                        onChange={(e) => setFormData(prev => ({ ...prev, artistFr: e.target.value }))}
                        placeholder={getLabel('artist')}
                      />
                    </div>
                  </div>
                )}

                {formData.type === 'educational' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>{getLabel('instructor')} ({getLabel('arabic')})</Label>
                        <Input
                          value={formData.instructorAr}
                          onChange={(e) => setFormData(prev => ({ ...prev, instructorAr: e.target.value }))}
                          placeholder={getLabel('instructor')}
                          className="font-cairo"
                          dir="rtl"
                        />
                      </div>
                      <div>
                        <Label>{getLabel('instructor')} ({getLabel('french')})</Label>
                        <Input
                          value={formData.instructorFr}
                          onChange={(e) => setFormData(prev => ({ ...prev, instructorFr: e.target.value }))}
                          placeholder={getLabel('instructor')}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>{getLabel('price')}</Label>
                      <Input
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder={getLabel('price')}
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{getLabel('dates')}</Label>
                    <Input
                      value={formData.dates}
                      onChange={(e) => setFormData(prev => ({ ...prev, dates: e.target.value }))}
                      placeholder={getLabel('dates')}
                    />
                  </div>
                  <div>
                    <Label>{getLabel('status')}</Label>
                    <Select value={formData.status} onValueChange={(value: 'current' | 'upcoming' | 'past') => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">{getLabel('current')}</SelectItem>
                        <SelectItem value="upcoming">{getLabel('upcoming')}</SelectItem>
                        <SelectItem value="past">{getLabel('past')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{getLabel('location')} ({getLabel('arabic')})</Label>
                    <Input
                      value={formData.locationAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, locationAr: e.target.value }))}
                      placeholder={getLabel('location')}
                      className="font-cairo"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label>{getLabel('location')} ({getLabel('french')})</Label>
                    <Input
                      value={formData.locationFr}
                      onChange={(e) => setFormData(prev => ({ ...prev, locationFr: e.target.value }))}
                      placeholder={getLabel('location')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{getLabel('localisation')} ({getLabel('arabic')})</Label>
                    <Input
                      value={formData.localisationAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, localisationAr: e.target.value }))}
                      placeholder={getLabel('localisation')}
                      className="font-cairo"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label>{getLabel('localisation')} ({getLabel('french')})</Label>
                    <Input
                      value={formData.localisationFr}
                      onChange={(e) => setFormData(prev => ({ ...prev, localisationFr: e.target.value }))}
                      placeholder={getLabel('localisation')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{getLabel('organizers')} ({getLabel('arabic')})</Label>
                    <Input
                      value={formData.organizersAr}
                      onChange={(e) => setFormData(prev => ({ ...prev, organizersAr: e.target.value }))}
                      placeholder={getLabel('organizers')}
                      className="font-cairo"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label>{getLabel('organizers')} ({getLabel('french')})</Label>
                    <Input
                      value={formData.organizersFr}
                      onChange={(e) => setFormData(prev => ({ ...prev, organizersFr: e.target.value }))}
                      placeholder={getLabel('organizers')}
                    />
                  </div>
                </div>

                <div>
                  <ImageUpload
                    label={getLabel('image')}
                    onImageUpload={(imageData) => setFormData(prev => ({ ...prev, image: imageData }))}
                    currentImage={formData.image}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSubmit}>
                    {getLabel('save')}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    {getLabel('cancel')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map(activity => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {getLabel(activity.type)}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {getLabel(activity.status)}
                          </span>
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                          {activity.title[language]}
                        </h3>
                        <p className="text-gray-600 mb-2">{activity.description[language]}</p>
                        <p className="text-sm text-gray-500 mb-1">📅 {activity.dates}</p>
                        <p className="text-sm text-gray-500 mb-1">📍 {activity.location[language]}</p>
                        <p className="text-sm text-gray-500 mb-1">🌍 {getLabel('localisation')}: {activity.localisation[language]}</p>
                        <p className="text-sm text-gray-500 mb-1">👥 {getLabel('organizers')}: {activity.organizers[language]}</p>
                        {activity.artist && (
                          <p className="text-sm text-gray-500">🎨 {activity.artist[language]}</p>
                        )}
                        {activity.instructor && (
                          <p className="text-sm text-gray-500">👨‍🏫 {activity.instructor[language]}</p>
                        )}
                        {activity.price && (
                          <p className="text-sm text-gray-500">💰 {activity.price}</p>
                        )}
                        {activity.image && (
                          <img src={activity.image} alt={activity.title[language]} className="mt-2 w-20 h-20 object-cover rounded" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(activity)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(activity.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className={`text-gray-500 text-center ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {getLabel('noActivities')}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitiesManager;

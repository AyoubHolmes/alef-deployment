'use client'

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ui/ImageUpload';

const AdminActivitiesManager: React.FC = () => {
  const { language } = useLanguage();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<any>(null);

  const [formData, setFormData] = useState({
    titleAr: '',
    titleFr: '',
    descriptionAr: '',
    descriptionFr: '',
    category: 'art-exhibitions',
    type: 'exhibition',
    status: 'upcoming',
    startDate: '',
    endDate: '',
    locationAr: '',
    locationFr: '',
    localisationAr: '',
    localisationFr: '',
    organizersAr: '',
    organizersFr: '',
    artistAr: '',
    artistFr: '',
    datesAr: '',
    datesFr: '',
    instructorAr: '',
    instructorFr: '',
    price: '',
    time: '',
    image: ''
  });

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities');
      const data = await response.json();
      
      if (data.success) {
        setActivities(data.data || []);
      } else {
        console.error('Failed to fetch activities');
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'past': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'current': return language === 'ar' ? 'جاري' : 'En cours';
      case 'upcoming': return language === 'ar' ? 'قادم' : 'À venir';
      case 'past': return language === 'ar' ? 'منتهي' : 'Terminé';
      default: return status;
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        await fetchActivities();
        setIsAddDialogOpen(false);
        setEditingActivity(null);
        setFormData({
          titleAr: '', titleFr: '', descriptionAr: '', descriptionFr: '',
          category: 'art-exhibitions', type: 'exhibition', status: 'upcoming',
          startDate: '', endDate: '', locationAr: '', locationFr: '',
          localisationAr: '', localisationFr: '', organizersAr: '', organizersFr: '',
          artistAr: '', artistFr: '', datesAr: '', datesFr: '',
          instructorAr: '', instructorFr: '', price: '', time: '', image: ''
        });
      }
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const handleDelete = async (activity: any) => {
    if (!confirm(language === 'ar' ? 'هل تريد حذف هذا النشاط؟' : 'Voulez-vous supprimer cette activité?')) return;

    try {
      const response = await fetch('/api/activities', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: activity.id, category: activity.category })
      });

      const data = await response.json();
      if (data.success) {
        await fetchActivities();
      }
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const openDialog = (activity: any = null) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        titleAr: activity.title.ar,
        titleFr: activity.title.fr,
        descriptionAr: activity.description.ar,
        descriptionFr: activity.description.fr,
        category: activity.category,
        type: activity.type,
        status: activity.status,
        startDate: activity.startDate,
        endDate: activity.endDate,
        locationAr: activity.location.ar,
        locationFr: activity.location.fr,
        localisationAr: activity.localisation?.ar || '',
        localisationFr: activity.localisation?.fr || '',
        organizersAr: activity.organizers?.ar || '',
        organizersFr: activity.organizers?.fr || '',
        artistAr: activity.artist?.ar || '',
        artistFr: activity.artist?.fr || '',
        datesAr: activity.dates?.ar || '',
        datesFr: activity.dates?.fr || '',
        instructorAr: activity.instructor?.ar || '',
        instructorFr: activity.instructor?.fr || '',
        price: activity.price || '',
        time: activity.time || '',
        image: ''
      });
    } else {
      setEditingActivity(null);
      setFormData({
        titleAr: '', titleFr: '', descriptionAr: '', descriptionFr: '',
        category: 'art-exhibitions', type: 'exhibition', status: 'upcoming',
        startDate: '', endDate: '', locationAr: '', locationFr: '',
        localisationAr: '', localisationFr: '', organizersAr: '', organizersFr: '',
        artistAr: '', artistFr: '', datesAr: '', datesFr: '',
        instructorAr: '', instructorFr: '', price: '', time: '', image: ''
      });
    }
    setIsAddDialogOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">
            {language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...'}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'إدارة الأنشطة' : 'Gestion des Activités'}
            </h1>
            <p className={`text-gray-600 mt-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'إدارة وتنظيم جميع الأنشطة والفعاليات' : 'Gérer et organiser toutes les activités et événements'}
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className={`bg-[#074D8C] hover:bg-[#05396b] text-white px-6 py-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} transition-colors duration-200 shadow-sm`}
                onClick={() => openDialog()}
              >
                <Plus size={16} className={language === 'ar' ? 'ml-2' : 'mr-2'} />
                {language === 'ar' ? 'إضافة نشاط جديد' : 'Ajouter Activité'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className={`text-xl font-bold ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat text-left'}`}>
                  {editingActivity 
                    ? (language === 'ar' ? 'تعديل نشاط' : 'Modifier Activité')
                    : (language === 'ar' ? 'إضافة نشاط جديد' : 'Ajouter Nouvelle Activité')
                  }
                </DialogTitle>
              </DialogHeader>
              <form className={`space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'العنوان (عربي)' : 'Titre (Arabe)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'العنوان بالعربية' : 'Titre en arabe'} 
                      value={formData.titleAr}
                      onChange={(e) => setFormData({...formData, titleAr: e.target.value})}
                      className={`${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'} border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C]`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'العنوان (فرنسي)' : 'Titre (Français)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'العنوان بالفرنسية' : 'Titre en français'} 
                      value={formData.titleFr}
                      onChange={(e) => setFormData({...formData, titleFr: e.target.value})}
                      className={`font-montserrat border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C]`}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'الفئة' : 'Catégorie'}
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger className={`${language === 'ar' ? 'font-cairo' : 'font-montserrat'} border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C]`}>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الفئة' : 'Choisir catégorie'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="art-exhibitions" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                          {language === 'ar' ? 'معارض فنية' : 'Expositions d\'Art'}
                        </SelectItem>
                        <SelectItem value="educational-activities" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                          {language === 'ar' ? 'أنشطة تعليمية' : 'Activités Éducatives'}
                        </SelectItem>
                        <SelectItem value="literary-gatherings" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                          {language === 'ar' ? 'لقاءات أدبية' : 'Rencontres Littéraires'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'الحالة' : 'Statut'}
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger className={`${language === 'ar' ? 'font-cairo' : 'font-montserrat'} border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C]`}>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الحالة' : 'Choisir statut'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                          {language === 'ar' ? 'قادم' : 'À venir'}
                        </SelectItem>
                        <SelectItem value="current" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                          {language === 'ar' ? 'جاري' : 'En cours'}
                        </SelectItem>
                        <SelectItem value="past" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                          {language === 'ar' ? 'منتهي' : 'Terminé'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'تاريخ البداية' : 'Date de Début'}
                    </Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'تاريخ النهاية' : 'Date de Fin'}
                    </Label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'المكان (عربي)' : 'Lieu (Arabe)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'المكان بالعربية' : 'Lieu en arabe'} 
                      value={formData.locationAr}
                      onChange={(e) => setFormData({...formData, locationAr: e.target.value})}
                      className={`${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'} border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C]`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'المكان (فرنسي)' : 'Lieu (Français)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'المكان بالفرنسية' : 'Lieu en français'} 
                      value={formData.locationFr}
                      onChange={(e) => setFormData({...formData, locationFr: e.target.value})}
                      className={`font-montserrat border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C]`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'التوطين (عربي)' : 'Localisation (Arabe)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'التوطين بالعربية' : 'Localisation en arabe'} 
                      value={formData.localisationAr}
                      onChange={(e) => setFormData({...formData, localisationAr: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'التوطين (فرنسي)' : 'Localisation (Français)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'التوطين بالفرنسية' : 'Localisation en français'} 
                      value={formData.localisationFr}
                      onChange={(e) => setFormData({...formData, localisationFr: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المنظمون (عربي)' : 'Organisateurs (Arabe)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'المنظمون بالعربية' : 'Organisateurs en arabe'} 
                      value={formData.organizersAr}
                      onChange={(e) => setFormData({...formData, organizersAr: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المنظمون (فرنسي)' : 'Organisateurs (Français)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'المنظمون بالفرنسية' : 'Organisateurs en français'} 
                      value={formData.organizersFr}
                      onChange={(e) => setFormData({...formData, organizersFr: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabe)'}
                    </Label>
                    <Textarea 
                      placeholder={language === 'ar' ? 'وصف النشاط بالعربية' : 'Description en arabe'} 
                      rows={4}
                      value={formData.descriptionAr}
                      onChange={(e) => setFormData({...formData, descriptionAr: e.target.value})}
                      className={`${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'} border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C] resize-none`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'الوصف (فرنسي)' : 'Description (Français)'}
                    </Label>
                    <Textarea 
                      placeholder={language === 'ar' ? 'وصف النشاط بالفرنسية' : 'Description en français'} 
                      rows={4}
                      value={formData.descriptionFr}
                      onChange={(e) => setFormData({...formData, descriptionFr: e.target.value})}
                      className={`font-montserrat border-gray-300 focus:border-[#074D8C] focus:ring-[#074D8C] resize-none`}
                    />
                  </div>
                </div>

                <ImageUpload
                  label={language === 'ar' ? 'صورة النشاط' : 'Image de l\'activité'}
                  onImageUpload={(imageUrl) => setFormData({...formData, image: imageUrl})}
                  currentImage={formData.image}
                />

                <div className={`flex gap-3 pt-6 border-t border-gray-200 ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddDialogOpen(false)}
                    className={`px-6 py-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} border-gray-300 hover:border-gray-400`}
                  >
                    {language === 'ar' ? 'إلغاء' : 'Annuler'}
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    className={`px-6 py-2 bg-[#074D8C] hover:bg-[#05396b] text-white ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} transition-colors duration-200`}
                  >
                    {editingActivity 
                      ? (language === 'ar' ? 'تحديث' : 'Mettre à jour')
                      : (language === 'ar' ? 'حفظ' : 'Enregistrer')
                    }
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Activities Table */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className={`flex items-center gap-2 text-xl font-semibold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              <Calendar size={20} className="text-[#074D8C]" />
              {language === 'ar' ? 'قائمة الأنشطة' : 'Liste des Activités'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'الصورة' : 'Image'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'العنوان' : 'Titre'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'الفئة' : 'Catégorie'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'الحالة' : 'Statut'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'التوطين' : 'Localisation'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'المنظمون' : 'Organisateurs'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      {activity.image ? (
                        <img 
                          src={activity.image} 
                          alt={language === 'ar' ? activity.title.ar : activity.title.fr}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <span className="text-gray-400 text-xs">
                            {language === 'ar' ? 'لا توجد صورة' : 'Pas d\'image'}
                          </span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? activity.title.ar : activity.title.fr}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        {language === 'ar' 
                          ? activity.category === 'art-exhibitions' ? 'معارض فنية'
                            : activity.category === 'educational-activities' ? 'أنشطة تعليمية'
                            : activity.category === 'literary-gatherings' ? 'لقاءات أدبية'
                            : activity.category
                          : activity.category === 'art-exhibitions' ? 'Expositions d\'Art'
                            : activity.category === 'educational-activities' ? 'Activités Éducatives'
                            : activity.category === 'literary-gatherings' ? 'Rencontres Littéraires'
                            : activity.category
                        }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(activity.status)} ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getStatusLabel(activity.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {activity.startDate}
                      </div>
                    </TableCell>
                    <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {language === 'ar' ? activity.localisation?.ar : activity.localisation?.fr}
                      </div>
                    </TableCell>
                    <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        {language === 'ar' ? activity.organizers?.ar : activity.organizers?.fr}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openDialog(activity)}
                          className="hover:bg-[#074D8C] hover:text-white hover:border-[#074D8C] transition-colors duration-200"
                          title={language === 'ar' ? 'تعديل' : 'Modifier'}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 transition-colors duration-200" 
                          onClick={() => handleDelete(activity)}
                          title={language === 'ar' ? 'حذف' : 'Supprimer'}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {activities.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-gray-500">
                        {language === 'ar' ? 'لا توجد أنشطة' : 'Aucune activité'}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminActivitiesManager;
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
              <Button className="bg-[#2D439A] hover:bg-[#2D439A]/90" onClick={() => openDialog()}>
                <Plus size={16} className="mr-2" />
                {language === 'ar' ? 'إضافة نشاط' : 'Ajouter Activité'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                  {editingActivity 
                    ? (language === 'ar' ? 'تعديل نشاط' : 'Modifier Activité')
                    : (language === 'ar' ? 'إضافة نشاط جديد' : 'Ajouter Nouvelle Activité')
                  }
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'العنوان (عربي)' : 'Titre (Arabe)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'العنوان بالعربية' : 'Titre en arabe'} 
                      value={formData.titleAr}
                      onChange={(e) => setFormData({...formData, titleAr: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'العنوان (فرنسي)' : 'Titre (Français)'}
                    </Label>
                    <Input 
                      placeholder={language === 'ar' ? 'العنوان بالفرنسية' : 'Titre en français'} 
                      value={formData.titleFr}
                      onChange={(e) => setFormData({...formData, titleFr: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الفئة' : 'Catégorie'}
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الفئة' : 'Choisir catégorie'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="art-exhibitions">{language === 'ar' ? 'معارض فنية' : 'Expositions d\'Art'}</SelectItem>
                        <SelectItem value="educational-activities">{language === 'ar' ? 'أنشطة تعليمية' : 'Activités Éducatives'}</SelectItem>
                        <SelectItem value="literary-gatherings">{language === 'ar' ? 'لقاءات أدبية' : 'Rencontres Littéraires'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الحالة' : 'Statut'}
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الحالة' : 'Choisir statut'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">{language === 'ar' ? 'قادم' : 'À venir'}</SelectItem>
                        <SelectItem value="current">{language === 'ar' ? 'جاري' : 'En cours'}</SelectItem>
                        <SelectItem value="past">{language === 'ar' ? 'منتهي' : 'Terminé'}</SelectItem>
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

                <div>
                  <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                    {language === 'ar' ? 'الوصف' : 'Description'}
                  </Label>
                  <Textarea 
                    placeholder={language === 'ar' ? 'وصف النشاط' : 'Description de l\'activité'} 
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    {language === 'ar' ? 'إلغاء' : 'Annuler'}
                  </Button>
                  <Button type="button" className="bg-[#2D439A] hover:bg-[#2D439A]/90" onClick={handleSubmit}>
                    {language === 'ar' ? 'حفظ' : 'Enregistrer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Activities Table */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              <Calendar size={20} />
              {language === 'ar' ? 'قائمة الأنشطة' : 'Liste des Activités'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
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
                    {language === 'ar' ? 'المشاركون' : 'Participants'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
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
                        <Users size={14} />
                        {activity.participants || 0}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => openDialog(activity)}>
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(activity)}>
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {activities.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
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
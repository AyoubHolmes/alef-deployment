'use client'

import React, { useState } from 'react';
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

  // Mock data
  const activities = [
    {
      id: 1,
      title: { ar: 'ورشة الفنون البصرية', fr: 'Atelier Arts Visuels' },
      description: { ar: 'ورشة تفاعلية للفنون البصرية', fr: 'Atelier interactif d\'arts visuels' },
      category: 'visual-arts',
      status: 'upcoming',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      location: { ar: 'قاعة الفنون', fr: 'Salle des Arts' },
      participants: 25
    },
    {
      id: 2,
      title: { ar: 'محاضرة الأدب المعاصر', fr: 'Conférence Littérature Contemporaine' },
      description: { ar: 'محاضرة حول الأدب المعاصر', fr: 'Conférence sur la littérature contemporaine' },
      category: 'literary-thought',
      status: 'current',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      location: { ar: 'القاعة الكبرى', fr: 'Grande Salle' },
      participants: 50
    }
  ];

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
              <Button className="bg-[#2D439A] hover:bg-[#2D439A]/90">
                <Plus size={16} className="mr-2" />
                {language === 'ar' ? 'إضافة نشاط' : 'Ajouter Activité'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                  {language === 'ar' ? 'إضافة نشاط جديد' : 'Ajouter Nouvelle Activité'}
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'العنوان (عربي)' : 'Titre (Arabe)'}
                    </Label>
                    <Input placeholder={language === 'ar' ? 'العنوان بالعربية' : 'Titre en arabe'} />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'العنوان (فرنسي)' : 'Titre (Français)'}
                    </Label>
                    <Input placeholder={language === 'ar' ? 'العنوان بالفرنسية' : 'Titre en français'} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الفئة' : 'Catégorie'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الفئة' : 'Choisir catégorie'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visual-arts">{language === 'ar' ? 'فنون بصرية' : 'Arts Visuels'}</SelectItem>
                        <SelectItem value="literary-thought">{language === 'ar' ? 'فكر أدبي' : 'Pensée Littéraire'}</SelectItem>
                        <SelectItem value="education">{language === 'ar' ? 'تعليم' : 'Éducation'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الحالة' : 'Statut'}
                    </Label>
                    <Select>
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
                  <Button type="submit" className="bg-[#2D439A] hover:bg-[#2D439A]/90">
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
                      {activity.title[language]}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        {activity.category}
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
                        {activity.participants}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit size={14} />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminActivitiesManager;
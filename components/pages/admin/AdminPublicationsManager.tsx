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
import { Plus, Edit, Trash2, BookOpen, Eye } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminPublicationsManager: React.FC = () => {
  const { language } = useLanguage();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const publications = [
    {
      id: 1,
      title: { ar: 'أصدقاء ديونيسوس - العدد الأول', fr: 'Amis de Dionysos - Numéro 1' },
      category: 'amis-dionysos',
      type: 'magazine',
      publishDate: '2024-01-15',
      status: 'published',
      downloads: 245
    },
    {
      id: 2,
      title: { ar: 'أرشيف الفن المعاصر', fr: 'Archive d\'Art Contemporain' },
      category: 'art-chiv',
      type: 'article',
      publishDate: '2024-01-20',
      status: 'draft',
      downloads: 0
    },
    {
      id: 3,
      title: { ar: 'التحيزات الفنية في العصر الحديث', fr: 'Biais Artistiques à l\'Époque Moderne' },
      category: 'biais-artistiques',
      type: 'essay',
      publishDate: '2024-01-10',
      status: 'published',
      downloads: 156
    }
  ];

  const categories = [
    { value: 'all', label: { ar: 'جميع الفئات', fr: 'Toutes les catégories' } },
    { value: 'amis-dionysos', label: { ar: 'أصدقاء ديونيسوس', fr: 'Amis de Dionysos' } },
    { value: 'art-chiv', label: { ar: 'أرت شيف', fr: 'ArtChiv' } },
    { value: 'biais-artistiques', label: { ar: 'التحيزات الفنية', fr: 'Biais Artistiques' } },
    { value: 'books', label: { ar: 'الكتب', fr: 'Livres' } }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return language === 'ar' ? 'منشور' : 'Publié';
      case 'draft': return language === 'ar' ? 'مسودة' : 'Brouillon';
      case 'archived': return language === 'ar' ? 'مؤرشف' : 'Archivé';
      default: return status;
    }
  };

  const filteredPublications = selectedCategory === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === selectedCategory);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'إدارة المنشورات' : 'Gestion des Publications'}
            </h1>
            <p className={`text-gray-600 mt-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'إدارة جميع المنشورات والمقالات والكتب' : 'Gérer toutes les publications, articles et livres'}
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2D439A] hover:bg-[#2D439A]/90">
                <Plus size={16} className="mr-2" />
                {language === 'ar' ? 'إضافة منشور' : 'Ajouter Publication'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                  {language === 'ar' ? 'إضافة منشور جديد' : 'Ajouter Nouvelle Publication'}
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
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الفئة' : 'Catégorie'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الفئة' : 'Choisir catégorie'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amis-dionysos">{language === 'ar' ? 'أصدقاء ديونيسوس' : 'Amis de Dionysos'}</SelectItem>
                        <SelectItem value="art-chiv">{language === 'ar' ? 'أرت شيف' : 'ArtChiv'}</SelectItem>
                        <SelectItem value="biais-artistiques">{language === 'ar' ? 'التحيزات الفنية' : 'Biais Artistiques'}</SelectItem>
                        <SelectItem value="books">{language === 'ar' ? 'الكتب' : 'Livres'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'النوع' : 'Type'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر النوع' : 'Choisir type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">{language === 'ar' ? 'مقال' : 'Article'}</SelectItem>
                        <SelectItem value="magazine">{language === 'ar' ? 'مجلة' : 'Magazine'}</SelectItem>
                        <SelectItem value="book">{language === 'ar' ? 'كتاب' : 'Livre'}</SelectItem>
                        <SelectItem value="essay">{language === 'ar' ? 'مقالة' : 'Essai'}</SelectItem>
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
                        <SelectItem value="draft">{language === 'ar' ? 'مسودة' : 'Brouillon'}</SelectItem>
                        <SelectItem value="published">{language === 'ar' ? 'منشور' : 'Publié'}</SelectItem>
                        <SelectItem value="archived">{language === 'ar' ? 'مؤرشف' : 'Archivé'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                    {language === 'ar' ? 'الوصف' : 'Description'}
                  </Label>
                  <Textarea 
                    placeholder={language === 'ar' ? 'وصف المنشور' : 'Description de la publication'} 
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

        {/* Filter */}
        <div className="flex items-center gap-4">
          <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
            {language === 'ar' ? 'تصفية حسب الفئة:' : 'Filtrer par catégorie:'}
          </Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label[language]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Publications Table */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              <BookOpen size={20} />
              {language === 'ar' ? 'قائمة المنشورات' : 'Liste des Publications'}
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
                    {language === 'ar' ? 'النوع' : 'Type'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'الحالة' : 'Statut'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'التحميلات' : 'Téléchargements'}
                  </TableHead>
                  <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPublications.map((publication) => (
                  <TableRow key={publication.id}>
                    <TableCell className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {publication.title[language]}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        {categories.find(cat => cat.value === publication.category)?.label[language]}
                      </Badge>
                    </TableCell>
                    <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {publication.type}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(publication.status)} ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {getStatusLabel(publication.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {publication.downloads}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye size={14} />
                        </Button>
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

export default AdminPublicationsManager;
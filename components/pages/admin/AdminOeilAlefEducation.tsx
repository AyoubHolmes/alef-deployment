'use client'

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, X, Upload, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: { ar: string; fr: string };
  author: { ar: string; fr: string };
  translator?: { ar: string; fr: string };
  excerpt: { ar: string; fr: string };
  content: { ar: string; fr: string };
  featuredImage?: string;
  authorImage?: string;
  additionalImages: string[];
  publishDate: string;
  status: 'published' | 'draft';
  category: 'education';
}

const AdminOeilAlefEducation: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: { ar: 'مقال التعليم 1', fr: 'Article Éducation 1' },
      author: { ar: 'كاتب عربي', fr: 'Auteur français' },
      excerpt: { ar: 'مقتطف من المقال', fr: 'Extrait de l\'article' },
      content: { ar: 'محتوى المقال', fr: 'Contenu de l\'article' },
      additionalImages: [],
      publishDate: '2024-01-15',
      status: 'published',
      category: 'education'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: { ar: '', fr: '' },
    author: { ar: '', fr: '' },
    translator: { ar: '', fr: '' },
    excerpt: { ar: '', fr: '' },
    content: { ar: '', fr: '' },
    additionalImages: [],
    status: 'draft',
    category: 'education'
  });

  const handleInputChange = (field: string, value: any, lang?: 'ar' | 'fr') => {
    if (lang && typeof formData[field as keyof Article] === 'object') {
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field as keyof Article] as any, [lang]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = (field: 'featuredImage' | 'authorImage', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, [field]: imageUrl }));
      toast.success(language === 'ar' ? 'تم رفع الصورة' : 'Image téléchargée');
    }
  };

  const addAdditionalImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        additionalImages: [...(prev.additionalImages || []), imageUrl]
      }));
      toast.success(language === 'ar' ? 'تم إضافة الصورة' : 'Image ajoutée');
    }
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = () => {
    if (!formData.title?.ar || !formData.title?.fr || !formData.content?.ar || !formData.content?.fr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    const articleData = {
      ...formData,
      id: editingArticle?.id || Date.now().toString(),
      publishDate: editingArticle?.publishDate || new Date().toISOString().split('T')[0]
    } as Article;

    if (editingArticle) {
      setArticles(prev => prev.map(article => 
        article.id === editingArticle.id ? articleData : article
      ));
      toast.success(language === 'ar' ? 'تم تحديث المقال' : 'Article mis à jour');
    } else {
      setArticles(prev => [...prev, articleData]);
      toast.success(language === 'ar' ? 'تم إضافة المقال' : 'Article ajouté');
    }

    resetForm();
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({ ...article });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المقال؟' : 'Êtes-vous sûr de supprimer cet article ?')) {
      setArticles(prev => prev.filter(article => article.id !== id));
      toast.success(language === 'ar' ? 'تم حذف المقال' : 'Article supprimé');
    }
  };

  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      author: { ar: '', fr: '' },
      translator: { ar: '', fr: '' },
      excerpt: { ar: '', fr: '' },
      content: { ar: '', fr: '' },
      additionalImages: [],
      status: 'draft',
      category: 'education'
    });
    setEditingArticle(null);
    setIsDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'إدارة التعليم - عين الألف' : 'Gestion Éducation - L\'œil d\'Alef'}
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" onClick={resetForm}>
                <Plus size={16} />
                {language === 'ar' ? 'إضافة مقال جديد' : 'Nouvel Article'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingArticle 
                    ? (language === 'ar' ? 'تعديل المقال' : 'Modifier l\'Article')
                    : (language === 'ar' ? 'إضافة مقال جديد' : 'Nouvel Article')
                  }
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-6">
                {/* Title Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title-ar">
                      {language === 'ar' ? 'العنوان (عربي)' : 'Titre (Arabe)'}
                    </Label>
                    <Input
                      id="title-ar"
                      value={formData.title?.ar || ''}
                      onChange={(e) => handleInputChange('title', e.target.value, 'ar')}
                      className="mt-1"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title-fr">
                      {language === 'ar' ? 'العنوان (فرنسي)' : 'Titre (Français)'}
                    </Label>
                    <Input
                      id="title-fr"
                      value={formData.title?.fr || ''}
                      onChange={(e) => handleInputChange('title', e.target.value, 'fr')}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Author Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author-ar">
                      {language === 'ar' ? 'المؤلف (عربي)' : 'Auteur (Arabe)'}
                    </Label>
                    <Input
                      id="author-ar"
                      value={formData.author?.ar || ''}
                      onChange={(e) => handleInputChange('author', e.target.value, 'ar')}
                      className="mt-1"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author-fr">
                      {language === 'ar' ? 'المؤلف (فرنسي)' : 'Auteur (Français)'}
                    </Label>
                    <Input
                      id="author-fr"
                      value={formData.author?.fr || ''}
                      onChange={(e) => handleInputChange('author', e.target.value, 'fr')}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'الصورة الرئيسية' : 'Image principale'}</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                      {formData.featuredImage ? (
                        <div className="relative">
                          <img src={formData.featuredImage} alt="Featured" className="w-full h-32 object-cover rounded" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => setFormData(prev => ({ ...prev, featuredImage: undefined }))}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-32">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            {language === 'ar' ? 'رفع صورة' : 'Télécharger image'}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('featuredImage', e)}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>{language === 'ar' ? 'صورة المؤلف' : 'Photo auteur'}</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                      {formData.authorImage ? (
                        <div className="relative">
                          <img src={formData.authorImage} alt="Author" className="w-full h-32 object-cover rounded" />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => setFormData(prev => ({ ...prev, authorImage: undefined }))}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center justify-center h-32">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">
                            {language === 'ar' ? 'رفع صورة' : 'Télécharger image'}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleImageUpload('authorImage', e)}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Images */}
                <div>
                  <Label>{language === 'ar' ? 'صور إضافية' : 'Images supplémentaires'}</Label>
                  <div className="mt-2 grid grid-cols-3 gap-4">
                    {formData.additionalImages?.map((image, index) => (
                      <div key={index} className="relative">
                        <img src={image} alt={`Additional ${index}`} className="w-full h-24 object-cover rounded" />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1"
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <X size={12} />
                        </Button>
                      </div>
                    ))}
                    <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-24">
                      <ImageIcon className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-xs text-gray-500">
                        {language === 'ar' ? 'إضافة' : 'Ajouter'}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={addAdditionalImage}
                      />
                    </label>
                  </div>
                </div>

                {/* Excerpt Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="excerpt-ar">
                      {language === 'ar' ? 'المقتطف (عربي)' : 'Extrait (Arabe)'}
                    </Label>
                    <Textarea
                      id="excerpt-ar"
                      value={formData.excerpt?.ar || ''}
                      onChange={(e) => handleInputChange('excerpt', e.target.value, 'ar')}
                      className="mt-1"
                      dir="rtl"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt-fr">
                      {language === 'ar' ? 'المقتطف (فرنسي)' : 'Extrait (Français)'}
                    </Label>
                    <Textarea
                      id="excerpt-fr"
                      value={formData.excerpt?.fr || ''}
                      onChange={(e) => handleInputChange('excerpt', e.target.value, 'fr')}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Content Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="content-ar">
                      {language === 'ar' ? 'المحتوى (عربي)' : 'Contenu (Arabe)'}
                    </Label>
                    <Textarea
                      id="content-ar"
                      value={formData.content?.ar || ''}
                      onChange={(e) => handleInputChange('content', e.target.value, 'ar')}
                      className="mt-1"
                      dir="rtl"
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content-fr">
                      {language === 'ar' ? 'المحتوى (فرنسي)' : 'Contenu (Français)'}
                    </Label>
                    <Textarea
                      id="content-fr"
                      value={formData.content?.fr || ''}
                      onChange={(e) => handleInputChange('content', e.target.value, 'fr')}
                      className="mt-1"
                      rows={6}
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <Label>{language === 'ar' ? 'الحالة' : 'Statut'}</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        {language === 'ar' ? 'مسودة' : 'Brouillon'}
                      </SelectItem>
                      <SelectItem value="published">
                        {language === 'ar' ? 'منشور' : 'Publié'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetForm}>
                    {language === 'ar' ? 'إلغاء' : 'Annuler'}
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingArticle 
                      ? (language === 'ar' ? 'تحديث' : 'Mettre à jour')
                      : (language === 'ar' ? 'إضافة' : 'Ajouter')
                    }
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
              {language === 'ar' ? 'مقالات التعليم' : 'Articles Éducation'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {article.featuredImage && (
                      <img 
                        src={article.featuredImage} 
                        alt={article.title[language]} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {article.title[language]}
                      </h3>
                      <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {article.author[language]} • {article.publishDate} • {article.status === 'published' ? (language === 'ar' ? 'منشور' : 'Publié') : (language === 'ar' ? 'مسودة' : 'Brouillon')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(article.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );

};

export default AdminOeilAlefEducation;
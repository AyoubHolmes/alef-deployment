'use client'

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from '@/components/ui/ImageUpload';

interface BiaisArtistiquesArticle {
  id: number;
  title: { ar: string; fr: string };
  date: string;
  status: { ar: string; fr: string };
  content: { ar: string; fr: string };
  excerpt: { ar: string; fr: string };
  number?: number;
  image?: string;
}

const AdminPublicationsBiaisArtistiques: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<BiaisArtistiquesArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBiaisArtistiquesIssues = async () => {
    try {
      const response = await fetch('/api/publication-issues?magazine=BIAIS_ARTISTIQUES');
      const data = await response.json();
      
      if (data.success) {
        const transformedArticles = data.data.map((issue: any) => ({
          id: issue.id,
          title: { ar: issue.titleAr, fr: issue.titleFr },
          date: issue.date.split('T')[0],
          status: { ar: 'منشور', fr: 'Publié' },
          content: { ar: issue.contentAr, fr: issue.contentFr },
          excerpt: { ar: issue.featuredAr, fr: issue.featuredFr },
          number: issue.number,
          image: issue.image
        }));
        setArticles(transformedArticles);
      } else {
        toast.error(language === 'ar' ? 'فشل في تحميل البيانات' : 'Échec du chargement des données');
      }
    } catch (error) {
      console.error('Error fetching Biais Artistiques issues:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل البيانات' : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBiaisArtistiquesIssues();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BiaisArtistiquesArticle | null>(null);
  const [formData, setFormData] = useState<Omit<BiaisArtistiquesArticle, 'id'>>({
    title: { ar: '', fr: '' },
    date: new Date().toISOString().split('T')[0],
    status: { ar: 'مسودة', fr: 'Brouillon' },
    content: { ar: '', fr: '' },
    excerpt: { ar: '', fr: '' },
    number: 1,
    image: ''
  });

  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      date: new Date().toISOString().split('T')[0],
      status: { ar: 'مسودة', fr: 'Brouillon' },
      content: { ar: '', fr: '' },
      excerpt: { ar: '', fr: '' },
      number: articles.length + 1,
      image: ''
    });
    setEditingArticle(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (article: BiaisArtistiquesArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      date: article.date,
      status: article.status,
      content: article.content,
      excerpt: article.excerpt,
      number: article.number || 1,
      image: article.image || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm(language === 'ar' ? 'هل تريد حذف هذا المقال؟' : 'Voulez-vous supprimer cet article?')) return;

    try {
      const response = await fetch('/api/publication-issues', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const result = await response.json();
      if (result.success) {
        toast.success(language === 'ar' ? 'تم حذف المقال بنجاح' : 'Article supprimé avec succès');
        await fetchBiaisArtistiquesIssues();
      } else {
        toast.error(language === 'ar' ? 'خطأ في حذف المقال' : 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error(language === 'ar' ? 'خطأ في حذف المقال' : 'Erreur lors de la suppression');
    }
  };

  const handleSave = async () => {
    if (!formData.title.ar || !formData.title.fr || !formData.content.ar || !formData.content.fr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    try {
      const apiData = {
        magazine: 'BIAIS_ARTISTIQUES',
        number: formData.number || articles.length + 1,
        titleAr: formData.title.ar,
        titleFr: formData.title.fr,
        date: new Date(formData.date).toISOString(),
        image: formData.image || '',
        featuredAr: formData.excerpt.ar,
        featuredFr: formData.excerpt.fr,
        contentAr: formData.content.ar,
        contentFr: formData.content.fr
      };

      let response;
      if (editingArticle) {
        response = await fetch('/api/publication-issues', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingArticle.id, ...apiData })
        });
      } else {
        response = await fetch('/api/publication-issues', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiData)
        });
      }

      const result = await response.json();
      if (result.success) {
        toast.success(editingArticle 
          ? (language === 'ar' ? 'تم تحديث المقال بنجاح' : 'Article mis à jour avec succès')
          : (language === 'ar' ? 'تم إضافة المقال بنجاح' : 'Article ajouté avec succès')
        );
        await fetchBiaisArtistiquesIssues();
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(language === 'ar' ? 'خطأ في حفظ المقال' : 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error(language === 'ar' ? 'خطأ في حفظ المقال' : 'Erreur lors de la sauvegarde');
    }
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
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'إدارة التحيزات الفنية' : 'Gestion Biais Artistiques'}
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="flex items-center gap-2">
                <Plus size={16} />
                {language === 'ar' ? 'إضافة مقال جديد' : 'Nouvel Article'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                  {editingArticle 
                    ? (language === 'ar' ? 'تعديل المقال' : 'Modifier l\'Article')
                    : (language === 'ar' ? 'إضافة مقال جديد' : 'Nouvel Article')
                  }
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'العنوان (عربي)' : 'Titre (Arabe)'}
                    </Label>
                    <Input
                      value={formData.title.ar}
                      onChange={(e) => setFormData({...formData, title: {...formData.title, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'العنوان (فرنسي)' : 'Titre (Français)'}
                    </Label>
                    <Input
                      value={formData.title.fr}
                      onChange={(e) => setFormData({...formData, title: {...formData.title, fr: e.target.value}})}
                      className="font-montserrat"
                    />
                  </div>
                </div>



                <div>
                  <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                    {language === 'ar' ? 'التاريخ' : 'Date'}
                  </Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المقتطف (عربي)' : 'Extrait (Arabe)'}
                    </Label>
                    <Textarea
                      value={formData.excerpt.ar}
                      onChange={(e) => setFormData({...formData, excerpt: {...formData.excerpt, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المقتطف (فرنسي)' : 'Extrait (Français)'}
                    </Label>
                    <Textarea
                      value={formData.excerpt.fr}
                      onChange={(e) => setFormData({...formData, excerpt: {...formData.excerpt, fr: e.target.value}})}
                      className="font-montserrat"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المحتوى (عربي)' : 'Contenu (Arabe)'}
                    </Label>
                    <Textarea
                      value={formData.content.ar}
                      onChange={(e) => setFormData({...formData, content: {...formData.content, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المحتوى (فرنسي)' : 'Contenu (Français)'}
                    </Label>
                    <Textarea
                      value={formData.content.fr}
                      onChange={(e) => setFormData({...formData, content: {...formData.content, fr: e.target.value}})}
                      className="font-montserrat"
                      rows={6}
                    />
                  </div>
                </div>

                <ImageUpload
                  label={language === 'ar' ? 'صورة المقال' : 'Image de l\'article'}
                  onImageUpload={(imageUrl) => setFormData({...formData, image: imageUrl})}
                  currentImage={formData.image}
                />

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    <X size={16} className="mr-2" />
                    {language === 'ar' ? 'إلغاء' : 'Annuler'}
                  </Button>
                  <Button onClick={handleSave}>
                    <Save size={16} className="mr-2" />
                    {language === 'ar' ? 'حفظ' : 'Enregistrer'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
              {language === 'ar' ? 'المقالات' : 'Articles'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-4 flex-1">
                    {article.image && (
                      <img 
                        src={article.image} 
                        alt={language === 'ar' ? article.title.ar : article.title.fr}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {language === 'ar' ? article.title.ar : article.title.fr}
                        {article.number && (
                          <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                            {language === 'ar' ? `العدد ${article.number}` : `N° ${article.number}`}
                          </span>
                        )}
                      </h3>
                      <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {article.date} - {language === 'ar' ? article.status.ar : article.status.fr}
                      </p>
                      <p className={`text-sm text-gray-600 mt-1 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {language === 'ar' ? article.excerpt.ar : article.excerpt.fr}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(article)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(article.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              {articles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-lg mb-2">
                    {language === 'ar' ? 'لا توجد مقالات' : 'Aucun article'}
                  </div>
                  <div className="text-sm">
                    {language === 'ar' ? 'ابدأ بإضافة مقال جديد' : 'Commencez par ajouter un nouvel article'}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPublicationsBiaisArtistiques;
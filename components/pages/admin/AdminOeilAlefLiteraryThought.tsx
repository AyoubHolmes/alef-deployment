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

interface LiteraryThoughtArticle {
  id: number;
  title: { ar: string; fr: string };
  author: { ar: string; fr: string };
  date: string;
  content: { ar: string; fr: string };
  excerpt: { ar: string; fr: string };
  image?: string;
  published: boolean;
}

const AdminOeilAlefLiteraryThought: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<LiteraryThoughtArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles?category=LITERARY_THOUGHT');
      const data = await response.json();
      
      if (data.success) {
        const transformedArticles = data.data.map((article: any) => ({
          id: article.id,
          title: { ar: article.titleAr, fr: article.titleFr },
          author: { ar: article.authorAr, fr: article.authorFr },
          date: article.createdAt.split('T')[0],
          content: { ar: article.contentAr, fr: article.contentFr },
          excerpt: { ar: article.excerptAr || '', fr: article.excerptFr || '' },
          image: article.image || '',
          published: article.published
        }));
        setArticles(transformedArticles);
      } else {
        toast.error(language === 'ar' ? 'فشل في تحميل البيانات' : 'Échec du chargement des données');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل البيانات' : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<LiteraryThoughtArticle | null>(null);
  const [formData, setFormData] = useState<Omit<LiteraryThoughtArticle, 'id'>>({
    title: { ar: '', fr: '' },
    author: { ar: '', fr: '' },
    date: '',
    content: { ar: '', fr: '' },
    excerpt: { ar: '', fr: '' },
    image: '',
    published: true
  });



  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      author: { ar: '', fr: '' },
      date: '',
      content: { ar: '', fr: '' },
      excerpt: { ar: '', fr: '' },
      image: '',
      published: true
    });
    setEditingArticle(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (article: LiteraryThoughtArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      author: article.author,
      date: article.date,
      content: article.content,
      excerpt: article.excerpt,
      image: article.image || '',
      published: article.published
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm(language === 'ar' ? 'هل تريد حذف هذا المقال؟' : 'Voulez-vous supprimer cet article?')) return;

    try {
      const response = await fetch('/api/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const result = await response.json();
      if (result.success) {
        toast.success(language === 'ar' ? 'تم حذف المقال بنجاح' : 'Article supprimé avec succès');
        await fetchArticles();
      } else {
        toast.error(language === 'ar' ? 'خطأ في حذف المقال' : 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error(language === 'ar' ? 'خطأ في حذف المقال' : 'Erreur lors de la suppression');
    }
  };

  const handleSave = async () => {
    if (!formData.title.ar || !formData.title.fr || !formData.author.ar || !formData.author.fr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    try {
      const apiData = {
        titleAr: formData.title.ar,
        titleFr: formData.title.fr,
        authorAr: formData.author.ar,
        authorFr: formData.author.fr,
        contentAr: formData.content.ar,
        contentFr: formData.content.fr,
        excerptAr: formData.excerpt.ar,
        excerptFr: formData.excerpt.fr,
        image: formData.image || '',
        published: formData.published,
        category: 'LITERARY_THOUGHT',
        additionalImages: []
      };

      let response;
      if (editingArticle) {
        response = await fetch('/api/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingArticle.id, ...apiData })
        });
      } else {
        response = await fetch('/api/articles', {
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
        await fetchArticles();
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
            {language === 'ar' ? 'إدارة الفكر الأدبي - عين الألف' : 'Gestion Pensée Littéraire - L\'œil d\'Alef'}
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
                    <Label>{language === 'ar' ? 'العنوان (عربي)' : 'Titre (Arabe)'}</Label>
                    <Input
                      value={formData.title.ar}
                      onChange={(e) => setFormData({...formData, title: {...formData.title, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'العنوان (فرنسي)' : 'Titre (Français)'}</Label>
                    <Input
                      value={formData.title.fr}
                      onChange={(e) => setFormData({...formData, title: {...formData.title, fr: e.target.value}})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'المؤلف (عربي)' : 'Auteur (Arabe)'}</Label>
                    <Input
                      value={formData.author.ar}
                      onChange={(e) => setFormData({...formData, author: {...formData.author, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'المؤلف (فرنسي)' : 'Auteur (Français)'}</Label>
                    <Input
                      value={formData.author.fr}
                      onChange={(e) => setFormData({...formData, author: {...formData.author, fr: e.target.value}})}
                    />
                  </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'الصورة الرئيسية' : 'Image Principale'}</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData({...formData, published: e.target.checked})}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="published" className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'منشور' : 'Publié'}
                    </Label>
                  </div>
                </div>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'المقتطف (عربي)' : 'Extrait (Arabe)'}</Label>
                    <Textarea
                      value={formData.excerpt.ar}
                      onChange={(e) => setFormData({...formData, excerpt: {...formData.excerpt, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'المقتطف (فرنسي)' : 'Extrait (Français)'}</Label>
                    <Textarea
                      value={formData.excerpt.fr}
                      onChange={(e) => setFormData({...formData, excerpt: {...formData.excerpt, fr: e.target.value}})}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'المحتوى (عربي)' : 'Contenu (Arabe)'}</Label>
                    <Textarea
                      value={formData.content.ar}
                      onChange={(e) => setFormData({...formData, content: {...formData.content, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'المحتوى (فرنسي)' : 'Contenu (Français)'}</Label>
                    <Textarea
                      value={formData.content.fr}
                      onChange={(e) => setFormData({...formData, content: {...formData.content, fr: e.target.value}})}
                      rows={6}
                    />
                  </div>
                </div>

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
              {language === 'ar' ? 'مقالات الفكر الأدبي' : 'Articles Pensée Littéraire'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? article.title.ar : article.title.fr}
                      <span className={`ml-2 text-xs px-2 py-1 rounded ${article.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {article.published ? (language === 'ar' ? 'منشور' : 'Publié') : (language === 'ar' ? 'مسودة' : 'Brouillon')}
                      </span>
                    </h3>
                    <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? article.author.ar : article.author.fr} - {article.date}
                    </p>
                    <p className={`text-sm text-gray-600 mt-1 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? article.excerpt.ar : article.excerpt.fr}
                    </p>
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

export default AdminOeilAlefLiteraryThought;
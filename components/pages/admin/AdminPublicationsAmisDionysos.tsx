'use client'

import React, { useState } from 'react';
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

interface AmisDionysosArticle {
  id: number;
  title: { ar: string; fr: string };
  author: { ar: string; fr: string };
  date: string;
  status: { ar: string; fr: string };
  content: { ar: string; fr: string };
  excerpt: { ar: string; fr: string };
}

const AdminPublicationsAmisDionysos: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<AmisDionysosArticle[]>([
    {
      id: 1,
      title: { 
        ar: 'مقال أصدقاء ديونيسوس الأول', 
        fr: 'Premier Article Amis de Dionysos' 
      },
      author: { 
        ar: 'د. محمد الأديب', 
        fr: 'Dr. Mohamed Ladib' 
      },
      date: '2024-01-15',
      status: { ar: 'منشور', fr: 'Publié' },
      content: { 
        ar: 'هذا نص المقال باللغة العربية...', 
        fr: 'Ceci est le contenu de l\'article en français...' 
      },
      excerpt: { 
        ar: 'مقتطف من المقال...', 
        fr: 'Extrait de l\'article...' 
      }
    },
    {
      id: 2,
      title: { 
        ar: 'مقال أصدقاء ديونيسوس الثاني', 
        fr: 'Deuxième Article Amis de Dionysos' 
      },
      author: { 
        ar: 'أ. سعاد الكاتبة', 
        fr: 'Prof. Souad Katiba' 
      },
      date: '2024-01-10',
      status: { ar: 'مسودة', fr: 'Brouillon' },
      content: { 
        ar: 'هذا نص المقال الثاني باللغة العربية...', 
        fr: 'Ceci est le contenu du deuxième article en français...' 
      },
      excerpt: { 
        ar: 'مقتطف من المقال الثاني...', 
        fr: 'Extrait du deuxième article...' 
      }
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<AmisDionysosArticle | null>(null);
  const [formData, setFormData] = useState<Omit<AmisDionysosArticle, 'id'>>({
    title: { ar: '', fr: '' },
    author: { ar: '', fr: '' },
    date: new Date().toISOString().split('T')[0],
    status: { ar: 'مسودة', fr: 'Brouillon' },
    content: { ar: '', fr: '' },
    excerpt: { ar: '', fr: '' }
  });

  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      author: { ar: '', fr: '' },
      date: new Date().toISOString().split('T')[0],
      status: { ar: 'مسودة', fr: 'Brouillon' },
      content: { ar: '', fr: '' },
      excerpt: { ar: '', fr: '' }
    });
    setEditingArticle(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (article: AmisDionysosArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      author: article.author,
      date: article.date,
      status: article.status,
      content: article.content,
      excerpt: article.excerpt
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
    toast.success(language === 'ar' ? 'تم حذف المقال بنجاح' : 'Article supprimé avec succès');
  };

  const handleSave = () => {
    if (!formData.title.ar || !formData.title.fr || !formData.author.ar || !formData.author.fr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    if (editingArticle) {
      // Update existing article
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { ...formData, id: editingArticle.id }
          : article
      ));
      toast.success(language === 'ar' ? 'تم تحديث المقال بنجاح' : 'Article mis à jour avec succès');
    } else {
      // Add new article
      const newArticle = {
        ...formData,
        id: Math.max(...articles.map(a => a.id)) + 1
      };
      setArticles([...articles, newArticle]);
      toast.success(language === 'ar' ? 'تم إضافة المقال بنجاح' : 'Article ajouté avec succès');
    }

    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <AdminLayout>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'إدارة أصدقاء ديونيسوس' : 'Gestion Amis de Dionysos'}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المؤلف (عربي)' : 'Auteur (Arabe)'}
                    </Label>
                    <Input
                      value={formData.author.ar}
                      onChange={(e) => setFormData({...formData, author: {...formData.author, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'المؤلف (فرنسي)' : 'Auteur (Français)'}
                    </Label>
                    <Input
                      value={formData.author.fr}
                      onChange={(e) => setFormData({...formData, author: {...formData.author, fr: e.target.value}})}
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
                  <div className="flex-1">
                    <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {article.title[language]}
                    </h3>
                    <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {article.author[language]} - {article.date} - {article.status[language]}
                    </p>
                    <p className={`text-sm text-gray-600 mt-1 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {article.excerpt[language]}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPublicationsAmisDionysos;
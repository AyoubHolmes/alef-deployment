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

interface LiteraryThoughtArticle {
  id: number;
  title: { ar: string; fr: string };
  author: { ar: string; fr: string };
  translator?: { ar: string; fr: string };
  date: string;
  status: { ar: string; fr: string };
  content: { ar: string; fr: string };
  excerpt: { ar: string; fr: string };
  image?: string;
  additionalImages?: string[];
  authorImage?: string;
}

const AdminOeilAlefLiteraryThought: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<LiteraryThoughtArticle[]>([
    {
      id: 1,
      title: { 
        ar: 'النقد الأدبي المغربي المعاصر', 
        fr: 'La critique littéraire marocaine contemporaine' 
      },
      author: { 
        ar: 'د. محمد برادة', 
        fr: 'Dr. Mohamed Berrada' 
      },
      translator: { 
        ar: 'نادية بن علي', 
        fr: 'Nadia Ben Ali' 
      },
      date: '2024-01-10',
      status: { ar: 'منشور', fr: 'Publié' },
      content: { 
        ar: 'يشهد النقد الأدبي المغربي المعاصر تنوعاً في المناهج والتوجهات...', 
        fr: 'La critique littéraire marocaine contemporaine témoigne d\'une diversité dans les méthodes...' 
      },
      excerpt: { 
        ar: 'تحليل للمناهج النقدية الحديثة في الأدب المغربي...', 
        fr: 'Analyse des méthodes critiques modernes dans la littérature marocaine...' 
      },
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      additionalImages: [
        'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
      ],
      authorImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<LiteraryThoughtArticle | null>(null);
  const [formData, setFormData] = useState<Omit<LiteraryThoughtArticle, 'id'>>({
    title: { ar: '', fr: '' },
    author: { ar: '', fr: '' },
    translator: { ar: '', fr: '' },
    date: new Date().toISOString().split('T')[0],
    status: { ar: 'مسودة', fr: 'Brouillon' },
    content: { ar: '', fr: '' },
    excerpt: { ar: '', fr: '' },
    image: '',
    additionalImages: [],
    authorImage: ''
  });

  const [newAdditionalImage, setNewAdditionalImage] = useState('');

  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      author: { ar: '', fr: '' },
      translator: { ar: '', fr: '' },
      date: new Date().toISOString().split('T')[0],
      status: { ar: 'مسودة', fr: 'Brouillon' },
      content: { ar: '', fr: '' },
      excerpt: { ar: '', fr: '' },
      image: '',
      additionalImages: [],
      authorImage: ''
    });
    setNewAdditionalImage('');
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
      translator: article.translator || { ar: '', fr: '' },
      date: article.date,
      status: article.status,
      content: article.content,
      excerpt: article.excerpt,
      image: article.image || '',
      additionalImages: article.additionalImages || [],
      authorImage: article.authorImage || ''
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
      setArticles(articles.map(article => 
        article.id === editingArticle.id 
          ? { 
              ...formData, 
              id: editingArticle.id,
              translator: formData.translator?.ar || formData.translator?.fr ? formData.translator : undefined
            }
          : article
      ));
      toast.success(language === 'ar' ? 'تم تحديث المقال بنجاح' : 'Article mis à jour avec succès');
    } else {
      const newArticle = {
        ...formData,
        id: Math.max(...articles.map(a => a.id), 0) + 1,
        translator: formData.translator?.ar || formData.translator?.fr ? formData.translator : undefined
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
                    <Label>{language === 'ar' ? 'المترجم (عربي) - اختياري' : 'Traducteur (Arabe) - Optionnel'}</Label>
                    <Input
                      value={formData.translator?.ar || ''}
                      onChange={(e) => setFormData({...formData, translator: {...formData.translator, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'المترجم (فرنسي) - اختياري' : 'Traducteur (Français) - Optionnel'}</Label>
                    <Input
                      value={formData.translator?.fr || ''}
                      onChange={(e) => setFormData({...formData, translator: {...formData.translator, fr: e.target.value}})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'التاريخ' : 'Date'}</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'الصورة الرئيسية' : 'Image Principale'}</Label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <Label>{language === 'ar' ? 'صورة المؤلف' : 'Photo Auteur'}</Label>
                  <Input
                    value={formData.authorImage}
                    onChange={(e) => setFormData({...formData, authorImage: e.target.value})}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <Label>{language === 'ar' ? 'الصور الإضافية' : 'Images Additionnelles'}</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={newAdditionalImage}
                        onChange={(e) => setNewAdditionalImage(e.target.value)}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        onClick={() => {
                          if (newAdditionalImage.trim()) {
                            setFormData({
                              ...formData, 
                              additionalImages: [...(formData.additionalImages || []), newAdditionalImage.trim()]
                            });
                            setNewAdditionalImage('');
                          }
                        }}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    {formData.additionalImages && formData.additionalImages.length > 0 && (
                      <div className="space-y-1">
                        {formData.additionalImages.map((img, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="flex-1 text-sm truncate">{img}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const updatedImages = formData.additionalImages?.filter((_, i) => i !== index) || [];
                                setFormData({...formData, additionalImages: updatedImages});
                              }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
                      {article.title[language]}
                    </h3>
                    <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {article.author[language]} {article.translator && `- ${language === 'ar' ? 'ترجمة:' : 'Trad:'} ${article.translator[language]}`} - {article.date} - {article.status[language]}
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

export default AdminOeilAlefLiteraryThought;
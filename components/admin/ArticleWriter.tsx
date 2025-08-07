
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/language';
import { toast } from 'sonner';
import { Plus, Trash2, Edit3, FileText, User } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface Article {
  id: string;
  title: { ar: string; fr: string };
  content: { ar: string; fr: string };
  excerpt: { ar: string; fr: string };
  author: { ar: string; fr: string };
  authorImage?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  publishDate: string;
  isPublished: boolean;
  createdAt: string;
}

const ArticleWriter: React.FC = () => {
  const { language } = useLanguage();
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('articles');
    return saved ? JSON.parse(saved) : [];
  });
  const [showEditor, setShowEditor] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    titleAr: '',
    titleFr: '',
    contentAr: '',
    contentFr: '',
    excerptAr: '',
    excerptFr: '',
    authorAr: '',
    authorFr: '',
    authorImage: '',
    featuredImage: '',
    category: '',
    tags: '',
    publishDate: new Date().toISOString().split('T')[0],
    isPublished: false
  });

  const labels = {
    articleWriter: { ar: 'كاتب المقالات', fr: 'Éditeur d\'articles' },
    addArticle: { ar: 'إضافة مقال جديد', fr: 'Ajouter un nouvel article' },
    editArticle: { ar: 'تعديل المقال', fr: 'Modifier l\'article' },
    title: { ar: 'العنوان', fr: 'Titre' },
    content: { ar: 'المحتوى', fr: 'Contenu' },
    excerpt: { ar: 'المقتطف', fr: 'Extrait' },
    author: { ar: 'المؤلف', fr: 'Auteur' },
    authorImage: { ar: 'صورة المؤلف', fr: 'Photo de l\'auteur' },
    featuredImage: { ar: 'الصورة البارزة', fr: 'Image en vedette' },
    category: { ar: 'الفئة', fr: 'Catégorie' },
    tags: { ar: 'العلامات', fr: 'Étiquettes' },
    publishDate: { ar: 'تاريخ النشر', fr: 'Date de publication' },
    published: { ar: 'منشور', fr: 'Publié' },
    draft: { ar: 'مسودة', fr: 'Brouillon' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    save: { ar: 'حفظ', fr: 'Sauvegarder' },
    cancel: { ar: 'إلغاء', fr: 'Annuler' },
    delete: { ar: 'حذف', fr: 'Supprimer' },
    edit: { ar: 'تعديل', fr: 'Modifier' },
    publish: { ar: 'نشر', fr: 'Publier' },
    unpublish: { ar: 'إلغاء النشر', fr: 'Dépublier' },
    noArticles: { ar: 'لا توجد مقالات متاحة', fr: 'Aucun article disponible' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    localStorage.setItem('articles', JSON.stringify(newArticles));
  };

  const handleSubmit = () => {
    if (!formData.titleAr || !formData.titleFr || !formData.contentAr || !formData.contentFr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    const articleData: Article = {
      id: editingArticle?.id || `article-${Date.now()}`,
      title: { ar: formData.titleAr, fr: formData.titleFr },
      content: { ar: formData.contentAr, fr: formData.contentFr },
      excerpt: { ar: formData.excerptAr, fr: formData.excerptFr },
      author: { ar: formData.authorAr, fr: formData.authorFr },
      authorImage: formData.authorImage,
      featuredImage: formData.featuredImage,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      publishDate: formData.publishDate,
      isPublished: formData.isPublished,
      createdAt: editingArticle?.createdAt || new Date().toISOString()
    };

    let newArticles;
    if (editingArticle) {
      newArticles = articles.map(article => 
        article.id === editingArticle.id ? articleData : article
      );
    } else {
      newArticles = [...articles, articleData];
    }

    saveArticles(newArticles);
    resetForm();
    toast.success(language === 'ar' ? 'تم حفظ المقال بنجاح' : 'Article sauvegardé avec succès');
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      titleAr: article.title.ar,
      titleFr: article.title.fr,
      contentAr: article.content.ar,
      contentFr: article.content.fr,
      excerptAr: article.excerpt.ar,
      excerptFr: article.excerpt.fr,
      authorAr: article.author.ar,
      authorFr: article.author.fr,
      authorImage: article.authorImage || '',
      featuredImage: article.featuredImage || '',
      category: article.category,
      tags: article.tags.join(', '),
      publishDate: article.publishDate,
      isPublished: article.isPublished
    });
    setShowEditor(true);
  };

  const handleDelete = (id: string) => {
    const newArticles = articles.filter(article => article.id !== id);
    saveArticles(newArticles);
    toast.success(language === 'ar' ? 'تم حذف المقال بنجاح' : 'Article supprimé avec succès');
  };

  const togglePublish = (id: string) => {
    const newArticles = articles.map(article => 
      article.id === id ? { ...article, isPublished: !article.isPublished } : article
    );
    saveArticles(newArticles);
    toast.success(language === 'ar' ? 'تم تحديث حالة النشر' : 'Statut de publication mis à jour');
  };

  const resetForm = () => {
    setFormData({
      titleAr: '',
      titleFr: '',
      contentAr: '',
      contentFr: '',
      excerptAr: '',
      excerptFr: '',
      authorAr: '',
      authorFr: '',
      authorImage: '',
      featuredImage: '',
      category: '',
      tags: '',
      publishDate: new Date().toISOString().split('T')[0],
      isPublished: false
    });
    setShowEditor(false);
    setEditingArticle(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
            <FileText className="w-5 h-5 text-blue-600" />
            {getLabel('articleWriter')}
          </CardTitle>
          <Button 
            onClick={() => setShowEditor(!showEditor)}
            className="w-fit bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {getLabel('addArticle')}
          </Button>
        </CardHeader>
      </Card>

      {showEditor && (
        <Card className="shadow-lg border-t-4 border-t-blue-500">
          <CardHeader className="bg-gray-50">
            <CardTitle className={`text-lg ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
              {editingArticle ? getLabel('editArticle') : getLabel('addArticle')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('title')} ({getLabel('arabic')})</Label>
                <Input
                  value={formData.titleAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
                  placeholder={getLabel('title')}
                  className="font-cairo border-2 focus:border-blue-400"
                  dir="rtl"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('title')} ({getLabel('french')})</Label>
                <Input
                  value={formData.titleFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
                  placeholder={getLabel('title')}
                  className="border-2 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUpload
                label={getLabel('featuredImage')}
                onImageUpload={(imageData) => setFormData(prev => ({ ...prev, featuredImage: imageData }))}
                currentImage={formData.featuredImage}
              />
              <ImageUpload
                label={getLabel('authorImage')}
                onImageUpload={(imageData) => setFormData(prev => ({ ...prev, authorImage: imageData }))}
                currentImage={formData.authorImage}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('excerpt')} ({getLabel('arabic')})</Label>
                <Textarea
                  value={formData.excerptAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerptAr: e.target.value }))}
                  placeholder={getLabel('excerpt')}
                  className="font-cairo border-2 focus:border-blue-400"
                  dir="rtl"
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('excerpt')} ({getLabel('french')})</Label>
                <Textarea
                  value={formData.excerptFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerptFr: e.target.value }))}
                  placeholder={getLabel('excerpt')}
                  className="border-2 focus:border-blue-400"
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('content')} ({getLabel('arabic')})</Label>
                <Textarea
                  value={formData.contentAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentAr: e.target.value }))}
                  placeholder={getLabel('content')}
                  className="font-cairo border-2 focus:border-blue-400"
                  dir="rtl"
                  rows={8}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('content')} ({getLabel('french')})</Label>
                <Textarea
                  value={formData.contentFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, contentFr: e.target.value }))}
                  placeholder={getLabel('content')}
                  className="border-2 focus:border-blue-400"
                  rows={8}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('author')} ({getLabel('arabic')})</Label>
                <Input
                  value={formData.authorAr}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorAr: e.target.value }))}
                  placeholder={getLabel('author')}
                  className="font-cairo border-2 focus:border-blue-400"
                  dir="rtl"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('author')} ({getLabel('french')})</Label>
                <Input
                  value={formData.authorFr}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorFr: e.target.value }))}
                  placeholder={getLabel('author')}
                  className="border-2 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('category')}</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder={getLabel('category')}
                  className="border-2 focus:border-blue-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('tags')}</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3"
                  className="border-2 focus:border-blue-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('publishDate')}</Label>
                <Input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                  className="border-2 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm font-medium">{getLabel('published')}</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
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
        {articles.length > 0 ? (
          articles.map(article => (
            <Card key={article.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {article.featuredImage && (
                    <img 
                      src={article.featuredImage} 
                      alt={article.title[language]}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {article.title[language]}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => togglePublish(article.id)}
                          className={article.isPublished ? 'text-green-600' : 'text-orange-600'}
                        >
                          {article.isPublished ? getLabel('published') : getLabel('draft')}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(article)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">{article.excerpt[language]}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {article.authorImage && (
                        <img 
                          src={article.authorImage} 
                          alt={article.author[language]}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span>{article.author[language]}</span>
                      <span>•</span>
                      <span>{article.publishDate}</span>
                      {article.category && (
                        <>
                          <span>•</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {article.category}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className={`text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {getLabel('noArticles')}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ArticleWriter;

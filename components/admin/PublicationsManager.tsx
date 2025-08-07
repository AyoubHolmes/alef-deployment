
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language';
import { toast } from 'sonner';
import { Plus, Globe } from 'lucide-react';
import PublicationForm from './publications/PublicationForm';
import PublicationsList from './publications/PublicationsList';

interface Publication {
  id: string;
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  type: 'article' | 'book' | 'magazine';
  date: string;
  author: { ar: string; fr: string };
  image?: string;
  downloadUrl?: string;
  createdAt: string;
  // Article-specific fields
  content?: { ar: string; fr: string };
  authorImage?: string;
  // Magazine-specific fields
  issueNumber?: string;
  pages?: number;
  fileUrl?: string;
}

const PublicationsManager: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [publications, setPublications] = useState<Publication[]>(() => {
    const saved = localStorage.getItem('publications');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [formData, setFormData] = useState({
    titleAr: '',
    titleFr: '',
    descriptionAr: '',
    descriptionFr: '',
    type: 'article' as Publication['type'],
    date: '',
    authorAr: '',
    authorFr: '',
    image: '',
    downloadUrl: '',
    // Article-specific
    contentAr: '',
    contentFr: '',
    authorImage: '',
    // Magazine-specific
    issueNumber: '',
    pages: '',
    fileUrl: ''
  });

  const labels = {
    publicationsManager: { ar: 'إدارة المنشورات', fr: 'Gestionnaire de publications' },
    addPublication: { ar: 'إضافة منشور جديد', fr: 'Ajouter une nouvelle publication' },
    editPublication: { ar: 'تعديل المنشور', fr: 'Modifier la publication' },
    title: { ar: 'العنوان', fr: 'Titre' },
    description: { ar: 'الوصف', fr: 'Description' },
    type: { ar: 'النوع', fr: 'Type' },
    date: { ar: 'التاريخ', fr: 'Date' },
    author: { ar: 'المؤلف', fr: 'Auteur' },
    image: { ar: 'الصورة', fr: 'Image' },
    authorImage: { ar: 'صورة المؤلف', fr: 'Photo de l\'auteur' },
    downloadUrl: { ar: 'رابط التحميل', fr: 'Lien de téléchargement' },
    content: { ar: 'المحتوى', fr: 'Contenu' },
    articleContent: { ar: 'محتوى المقال', fr: 'Contenu de l\'article' },
    articleContentPlaceholder: { ar: 'اكتب محتوى المقال هنا...', fr: 'Écrivez le contenu de l\'article ici...' },
    issueNumber: { ar: 'رقم العدد', fr: 'Numéro d\'édition' },
    pages: { ar: 'عدد الصفحات', fr: 'Nombre de pages' },
    magazineFile: { ar: 'ملف المجلة', fr: 'Fichier magazine' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    save: { ar: 'حفظ', fr: 'Sauvegarder' },
    cancel: { ar: 'إلغاء', fr: 'Annuler' },
    delete: { ar: 'حذف', fr: 'Supprimer' },
    edit: { ar: 'تعديل', fr: 'Modifier' },
    noPublications: { ar: 'لا توجد منشورات متاحة', fr: 'Aucune publication disponible' },
    article: { ar: 'مقال', fr: 'Article' },
    book: { ar: 'كتاب', fr: 'Livre' },
    magazine: { ar: 'مجلة', fr: 'Magazine' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  const savePublications = (newPublications: Publication[]) => {
    setPublications(newPublications);
    localStorage.setItem('publications', JSON.stringify(newPublications));
  };

  const handleSubmit = () => {
    if (!formData.titleAr || !formData.titleFr || !formData.descriptionAr || !formData.descriptionFr || !formData.date) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    // Additional validation for articles
    if (formData.type === 'article' && (!formData.contentAr || !formData.contentFr)) {
      toast.error(language === 'ar' ? 'يرجى إضافة محتوى المقال' : 'Veuillez ajouter le contenu de l\'article');
      return;
    }

    // Additional validation for magazines
    if (formData.type === 'magazine' && !formData.fileUrl) {
      toast.error(language === 'ar' ? 'يرجى رفع ملف المجلة' : 'Veuillez télécharger le fichier magazine');
      return;
    }

    const publicationData: Publication = {
      id: editingPublication?.id || `publication-${Date.now()}`,
      title: { ar: formData.titleAr, fr: formData.titleFr },
      description: { ar: formData.descriptionAr, fr: formData.descriptionFr },
      type: formData.type,
      date: formData.date,
      author: { ar: formData.authorAr, fr: formData.authorFr },
      image: formData.image,
      downloadUrl: formData.downloadUrl,
      createdAt: editingPublication?.createdAt || new Date().toISOString(),
      // Article-specific fields
      ...(formData.type === 'article' && {
        content: { ar: formData.contentAr, fr: formData.contentFr },
        authorImage: formData.authorImage
      }),
      // Magazine-specific fields
      ...(formData.type === 'magazine' && {
        issueNumber: formData.issueNumber,
        pages: formData.pages ? parseInt(formData.pages) : undefined,
        fileUrl: formData.fileUrl
      })
    };

    let newPublications;
    if (editingPublication) {
      newPublications = publications.map(publication => 
        publication.id === editingPublication.id ? publicationData : publication
      );
    } else {
      newPublications = [...publications, publicationData];
    }

    savePublications(newPublications);
    resetForm();
    toast.success(language === 'ar' ? 'تم حفظ المنشور بنجاح' : 'Publication sauvegardée avec succès');
  };

  const handleEdit = (publication: Publication) => {
    setEditingPublication(publication);
    setFormData({
      titleAr: publication.title.ar,
      titleFr: publication.title.fr,
      descriptionAr: publication.description.ar,
      descriptionFr: publication.description.fr,
      type: publication.type,
      date: publication.date,
      authorAr: publication.author.ar,
      authorFr: publication.author.fr,
      image: publication.image || '',
      downloadUrl: publication.downloadUrl || '',
      // Article-specific
      contentAr: publication.content?.ar || '',
      contentFr: publication.content?.fr || '',
      authorImage: publication.authorImage || '',
      // Magazine-specific
      issueNumber: publication.issueNumber || '',
      pages: publication.pages?.toString() || '',
      fileUrl: publication.fileUrl || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    const newPublications = publications.filter(publication => publication.id !== id);
    savePublications(newPublications);
    toast.success(language === 'ar' ? 'تم حذف المنشور بنجاح' : 'Publication supprimée avec succès');
  };

  const resetForm = () => {
    setFormData({
      titleAr: '',
      titleFr: '',
      descriptionAr: '',
      descriptionFr: '',
      type: 'article',
      date: '',
      authorAr: '',
      authorFr: '',
      image: '',
      downloadUrl: '',
      contentAr: '',
      contentFr: '',
      authorImage: '',
      issueNumber: '',
      pages: '',
      fileUrl: ''
    });
    setShowAddForm(false);
    setEditingPublication(null);
  };

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
              {getLabel('publicationsManager')}
            </CardTitle>
            <Button 
              onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === 'ar' ? 'FR' : 'AR'}
            </Button>
          </div>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-fit"
          >
            <Plus className="w-4 h-4 mr-2" />
            {getLabel('addPublication')}
          </Button>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <PublicationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              onCancel={resetForm}
              editingPublication={editingPublication}
              labels={labels}
              getLabel={getLabel}
            />
          )}

          <PublicationsList
            publications={publications}
            onEdit={handleEdit}
            onDelete={handleDelete}
            getLabel={getLabel}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicationsManager;

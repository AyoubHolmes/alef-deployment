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

interface Book {
  id: number;
  title: { ar: string; fr: string };
  author: { ar: string; fr: string };
  year: string;
  pages: number;
  isbn: string;
  image?: string;
  description: { ar: string; fr: string };
  summary: { ar: string; fr: string };
  downloadUrl?: string;
}

const AdminPublicationsBooks: React.FC = () => {
  const { language } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/publications/books');
      const data = await response.json();
      
      if (data.success) {
        const transformedBooks = data.data.map((book: any) => ({
          id: book.id,
          title: { ar: book.titleAr, fr: book.titleFr },
          author: { ar: book.authorAr, fr: book.authorFr },
          year: book.year,
          pages: book.pages,
          isbn: book.isbn,
          image: book.image,
          description: { ar: book.descriptionAr, fr: book.descriptionFr },
          summary: { ar: book.summaryAr, fr: book.summaryFr },
          downloadUrl: book.downloadUrl
        }));
        setBooks(transformedBooks);
      } else {
        toast.error(language === 'ar' ? 'فشل في تحميل البيانات' : 'Échec du chargement des données');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل البيانات' : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: { ar: '', fr: '' },
    author: { ar: '', fr: '' },
    year: new Date().getFullYear().toString(),
    pages: 0,
    isbn: '',
    image: '',
    description: { ar: '', fr: '' },
    summary: { ar: '', fr: '' },
    downloadUrl: ''
  });

  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      author: { ar: '', fr: '' },
      year: new Date().getFullYear().toString(),
      pages: 0,
      isbn: '',
      image: '',
      description: { ar: '', fr: '' },
      summary: { ar: '', fr: '' },
      downloadUrl: ''
    });
    setEditingBook(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      year: book.year,
      pages: book.pages,
      isbn: book.isbn,
      image: book.image || '',
      description: book.description,
      summary: book.summary,
      downloadUrl: book.downloadUrl || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm(language === 'ar' ? 'هل تريد حذف هذا الكتاب؟' : 'Voulez-vous supprimer ce livre?')) return;

    try {
      const response = await fetch('/api/publications/books', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      const result = await response.json();
      if (result.success) {
        toast.success(language === 'ar' ? 'تم حذف الكتاب بنجاح' : 'Livre supprimé avec succès');
        await fetchBooks();
      } else {
        toast.error(language === 'ar' ? 'خطأ في حذف الكتاب' : 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error(language === 'ar' ? 'خطأ في حذف الكتاب' : 'Erreur lors de la suppression');
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
        year: formData.year,
        pages: parseInt(formData.pages.toString()) || 0,
        isbn: formData.isbn,
        image: formData.image || '',
        descriptionAr: formData.description.ar,
        descriptionFr: formData.description.fr,
        summaryAr: formData.summary.ar,
        summaryFr: formData.summary.fr,
        downloadUrl: formData.downloadUrl || ''
      };

      let response;
      if (editingBook) {
        response = await fetch('/api/publications/books', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBook.id, ...apiData })
        });
      } else {
        response = await fetch('/api/publications/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(apiData)
        });
      }

      const result = await response.json();
      if (result.success) {
        toast.success(editingBook 
          ? (language === 'ar' ? 'تم تحديث الكتاب بنجاح' : 'Livre mis à jour avec succès')
          : (language === 'ar' ? 'تم إضافة الكتاب بنجاح' : 'Livre ajouté avec succès')
        );
        await fetchBooks();
        setIsDialogOpen(false);
        resetForm();
      } else {
        toast.error(language === 'ar' ? 'خطأ في حفظ الكتاب' : 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error(language === 'ar' ? 'خطأ في حفظ الكتاب' : 'Erreur lors de la sauvegarde');
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
            {language === 'ar' ? 'إدارة الكتب' : 'Gestion des Livres'}
          </h1>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="flex items-center gap-2">
                <Plus size={16} />
                {language === 'ar' ? 'إضافة كتاب جديد' : 'Nouveau Livre'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                  {editingBook 
                    ? (language === 'ar' ? 'تعديل الكتاب' : 'Modifier le Livre')
                    : (language === 'ar' ? 'إضافة كتاب جديد' : 'Nouveau Livre')
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'سنة النشر' : 'Année de publication'}
                    </Label>
                    <Input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'عدد الصفحات' : 'Nombre de pages'}
                    </Label>
                    <Input
                      type="number"
                      value={formData.pages}
                      onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value) || 0})}
                      placeholder="200"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'رقم الكتاب الدولي' : 'ISBN'}
                    </Label>
                    <Input
                      value={formData.isbn}
                      onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                      placeholder="978-123456789"
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'رابط التحميل' : 'Lien de téléchargement'}
                    </Label>
                    <Input
                      value={formData.downloadUrl}
                      onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الملخص (عربي)' : 'Résumé (Arabe)'}
                    </Label>
                    <Textarea
                      value={formData.summary.ar}
                      onChange={(e) => setFormData({...formData, summary: {...formData.summary, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الملخص (فرنسي)' : 'Résumé (Français)'}
                    </Label>
                    <Textarea
                      value={formData.summary.fr}
                      onChange={(e) => setFormData({...formData, summary: {...formData.summary, fr: e.target.value}})}
                      className="font-montserrat"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabe)'}
                    </Label>
                    <Textarea
                      value={formData.description.ar}
                      onChange={(e) => setFormData({...formData, description: {...formData.description, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                      rows={6}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الوصف (فرنسي)' : 'Description (Français)'}
                    </Label>
                    <Textarea
                      value={formData.description.fr}
                      onChange={(e) => setFormData({...formData, description: {...formData.description, fr: e.target.value}})}
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
              {language === 'ar' ? 'الكتب' : 'Livres'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {books.map((book) => (
                <div key={book.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? book.title.ar : book.title.fr}
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {book.year}
                      </span>
                    </h3>
                    <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? book.author.ar : book.author.fr} • {book.pages} {language === 'ar' ? 'صفحة' : 'pages'}
                    </p>
                    <p className={`text-sm text-gray-600 mt-1 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {book.isbn && `ISBN: ${book.isbn}`}
                      {book.downloadUrl && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {language === 'ar' ? 'متاح للتحميل' : 'Téléchargeable'}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(book)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(book.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              {books.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-lg mb-2">
                    {language === 'ar' ? 'لا توجد كتب' : 'Aucun livre'}
                  </div>
                  <div className="text-sm">
                    {language === 'ar' ? 'ابدأ بإضافة كتاب جديد' : 'Commencez par ajouter un nouveau livre'}
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

export default AdminPublicationsBooks;
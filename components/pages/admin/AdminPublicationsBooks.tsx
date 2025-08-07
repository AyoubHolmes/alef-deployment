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

interface Book {
  id: number;
  title: { ar: string; fr: string };
  author: { ar: string; fr: string };
  date: string;
  status: { ar: string; fr: string };
  description: { ar: string; fr: string };
  isbn?: string;
  publisher: { ar: string; fr: string };
}

const AdminPublicationsBooks: React.FC = () => {
  const { language } = useLanguage();
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: { 
        ar: 'كتاب الأدب المعاصر', 
        fr: 'Livre de Littérature Contemporaine' 
      },
      author: { 
        ar: 'د. محمد الأديب', 
        fr: 'Dr. Mohamed Ladib' 
      },
      date: '2024-01-15',
      status: { ar: 'منشور', fr: 'Publié' },
      description: { 
        ar: 'وصف الكتاب باللغة العربية...', 
        fr: 'Description du livre en français...' 
      },
      isbn: '978-123456789',
      publisher: { 
        ar: 'دار النشر العربية', 
        fr: 'Maison d\'édition Arabe' 
      }
    },
    {
      id: 2,
      title: { 
        ar: 'كتاب الفن الحديث', 
        fr: 'Livre d\'Art Moderne' 
      },
      author: { 
        ar: 'أ. سعاد الفنانة', 
        fr: 'Prof. Souad Fannana' 
      },
      date: '2024-01-10',
      status: { ar: 'مسودة', fr: 'Brouillon' },
      description: { 
        ar: 'وصف كتاب الفن الحديث باللغة العربية...', 
        fr: 'Description du livre d\'art moderne en français...' 
      },
      isbn: '978-987654321',
      publisher: { 
        ar: 'دار الفنون للنشر', 
        fr: 'Éditions des Arts' 
      }
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: { ar: '', fr: '' },
    author: { ar: '', fr: '' },
    date: new Date().toISOString().split('T')[0],
    status: { ar: 'مسودة', fr: 'Brouillon' },
    description: { ar: '', fr: '' },
    isbn: '',
    publisher: { ar: '', fr: '' }
  });

  const resetForm = () => {
    setFormData({
      title: { ar: '', fr: '' },
      author: { ar: '', fr: '' },
      date: new Date().toISOString().split('T')[0],
      status: { ar: 'مسودة', fr: 'Brouillon' },
      description: { ar: '', fr: '' },
      isbn: '',
      publisher: { ar: '', fr: '' }
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
      date: book.date,
      status: book.status,
      description: book.description,
      isbn: book.isbn || '',
      publisher: book.publisher
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setBooks(books.filter(book => book.id !== id));
    toast.success(language === 'ar' ? 'تم حذف الكتاب بنجاح' : 'Livre supprimé avec succès');
  };

  const handleSave = () => {
    if (!formData.title.ar || !formData.title.fr || !formData.author.ar || !formData.author.fr) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    if (editingBook) {
      setBooks(books.map(book => 
        book.id === editingBook.id 
          ? { ...formData, id: editingBook.id }
          : book
      ));
      toast.success(language === 'ar' ? 'تم تحديث الكتاب بنجاح' : 'Livre mis à jour avec succès');
    } else {
      const newBook = {
        ...formData,
        id: Math.max(...books.map(b => b.id)) + 1
      };
      setBooks([...books, newBook]);
      toast.success(language === 'ar' ? 'تم إضافة الكتاب بنجاح' : 'Livre ajouté avec succès');
    }

    setIsDialogOpen(false);
    resetForm();
  };

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
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'دار النشر (عربي)' : 'Éditeur (Arabe)'}
                    </Label>
                    <Input
                      value={formData.publisher.ar}
                      onChange={(e) => setFormData({...formData, publisher: {...formData.publisher, ar: e.target.value}})}
                      className={language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}
                    />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'دار النشر (فرنسي)' : 'Éditeur (Français)'}
                    </Label>
                    <Input
                      value={formData.publisher.fr}
                      onChange={(e) => setFormData({...formData, publisher: {...formData.publisher, fr: e.target.value}})}
                      className="font-montserrat"
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
                      {book.title[language]}
                    </h3>
                    <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {book.author[language]} - {book.date} - {book.status[language]}
                    </p>
                    <p className={`text-sm text-gray-600 mt-1 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {book.publisher[language]} {book.isbn && `- ISBN: ${book.isbn}`}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPublicationsBooks;
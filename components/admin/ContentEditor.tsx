'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useContentManager } from '@/hooks/useContentManager';
import { useLanguage } from '@/contexts/language';
import { EditableContent } from '@/types/ContentTypes';
import { toast } from 'sonner';
import { Plus, Trash2, Edit3, Image as ImageIcon, Globe } from 'lucide-react';
import ImageUpload from './ImageUpload';

const ContentEditor: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { content, updateContent, getContentByPage, addContent, deleteContent } = useContentManager();
  const [selectedPage, setSelectedPage] = useState('home');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContentForm, setNewContentForm] = useState({
    section: '',
    field: '',
    label: '',
    type: 'text' as 'text' | 'image',
    valueAr: '',
    valueFr: '',
    imageValue: ''
  });

  const pages = ['home', 'about', 'activities', 'publications', 'contact', 'team', 'members', 'partners', 'cultural-channel', 'proemes', 'navigation', 'footer'];
  const pageContent = getContentByPage(selectedPage);

  const labels = {
    contentEditor: { ar: 'محرر المحتوى', fr: 'Éditeur de contenu' },
    addContent: { ar: 'إضافة محتوى جديد', fr: 'Ajouter un nouveau contenu' },
    section: { ar: 'القسم', fr: 'Section' },
    field: { ar: 'الحقل', fr: 'Champ' },
    label: { ar: 'التسمية', fr: 'Libellé' },
    type: { ar: 'النوع', fr: 'Type' },
    text: { ar: 'نص', fr: 'Texte' },
    image: { ar: 'صورة', fr: 'Image' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    save: { ar: 'حفظ', fr: 'Sauvegarder' },
    cancel: { ar: 'إلغاء', fr: 'Annuler' },
    delete: { ar: 'حذف', fr: 'Supprimer' },
    edit: { ar: 'تعديل', fr: 'Modifier' },
    noContent: { ar: 'لا يوجد محتوى متاح لهذه الصفحة حتى الآن.', fr: 'Aucun contenu disponible pour cette page pour le moment.' },
    home: { ar: 'الرئيسية', fr: 'Accueil' },
    about: { ar: 'من نحن', fr: 'À propos' },
    activities: { ar: 'الأنشطة', fr: 'Activités' },
    publications: { ar: 'المنشورات', fr: 'Publications' },
    contact: { ar: 'اتصل بنا', fr: 'Contact' },
    team: { ar: 'الفريق', fr: 'Équipe' },
    members: { ar: 'الأعضاء', fr: 'Membres' },
    partners: { ar: 'الشركاء', fr: 'Partenaires' },
    'cultural-channel': { ar: 'القناة الثقافية', fr: 'Chaîne Culturelle' },
    proemes: { ar: 'بروايم', fr: 'Proèmes' },
    navigation: { ar: 'التنقل', fr: 'Navigation' },
    footer: { ar: 'التذييل', fr: 'Pied de page' },
    switchLanguage: { ar: 'تغيير اللغة', fr: 'Changer la langue' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  const handleContentUpdate = (item: EditableContent, lang: string, newValue: string) => {
    if (typeof item.value === 'object') {
      const updatedValue = { ...item.value, [lang]: newValue };
      updateContent(item.id, updatedValue);
    } else {
      updateContent(item.id, newValue);
    }
    toast.success(language === 'ar' ? 'تم تحديث المحتوى بنجاح' : 'Contenu mis à jour avec succès');
  };

  const handleAddContent = () => {
    if (!newContentForm.section || !newContentForm.field || !newContentForm.label) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    const newContent: EditableContent = {
      id: `${selectedPage}-${newContentForm.section}-${newContentForm.field}-${Date.now()}`,
      type: newContentForm.type,
      page: selectedPage,
      section: newContentForm.section,
      field: newContentForm.field,
      label: newContentForm.label,
      value: newContentForm.type === 'image' 
        ? newContentForm.imageValue
        : {
            ar: newContentForm.valueAr,
            fr: newContentForm.valueFr
          }
    };

    addContent(newContent);
    setNewContentForm({ 
      section: '', 
      field: '', 
      label: '', 
      type: 'text',
      valueAr: '', 
      valueFr: '',
      imageValue: ''
    });
    setShowAddForm(false);
    toast.success(language === 'ar' ? 'تم إضافة المحتوى بنجاح' : 'Contenu ajouté avec succès');
  };

  const handleDeleteContent = (id: string) => {
    deleteContent(id);
    toast.success(language === 'ar' ? 'تم حذف المحتوى بنجاح' : 'Contenu supprimé avec succès');
  };

  const groupedContent = pageContent.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, EditableContent[]>);

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
              <Edit3 className="w-5 h-5 text-purple-600" />
              {getLabel('contentEditor')}
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
            className="w-fit bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {getLabel('addContent')}
          </Button>
        </CardHeader>
      </Card>

      {showAddForm && (
        <Card className="shadow-lg border-t-4 border-t-purple-500">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg">{getLabel('addContent')}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('section')}</Label>
                <Input
                  value={newContentForm.section}
                  onChange={(e) => setNewContentForm(prev => ({ ...prev, section: e.target.value }))}
                  placeholder={getLabel('section')}
                  className="border-2 focus:border-purple-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('field')}</Label>
                <Input
                  value={newContentForm.field}
                  onChange={(e) => setNewContentForm(prev => ({ ...prev, field: e.target.value }))}
                  placeholder={getLabel('field')}
                  className="border-2 focus:border-purple-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('label')}</Label>
                <Input
                  value={newContentForm.label}
                  onChange={(e) => setNewContentForm(prev => ({ ...prev, label: e.target.value }))}
                  placeholder={getLabel('label')}
                  className="border-2 focus:border-purple-400"
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700">{getLabel('type')}</Label>
                <select
                  value={newContentForm.type}
                  onChange={(e) => setNewContentForm(prev => ({ ...prev, type: e.target.value as 'text' | 'image' }))}
                  className="flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm focus:border-purple-400"
                >
                  <option value="text">{getLabel('text')}</option>
                  <option value="image">{getLabel('image')}</option>
                </select>
              </div>
            </div>

            {newContentForm.type === 'text' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">{getLabel('arabic')}</Label>
                  <Textarea
                    value={newContentForm.valueAr}
                    onChange={(e) => setNewContentForm(prev => ({ ...prev, valueAr: e.target.value }))}
                    placeholder={getLabel('arabic')}
                    className="font-cairo border-2 focus:border-purple-400"
                    dir="rtl"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">{getLabel('french')}</Label>
                  <Textarea
                    value={newContentForm.valueFr}
                    onChange={(e) => setNewContentForm(prev => ({ ...prev, valueFr: e.target.value }))}
                    placeholder={getLabel('french')}
                    className="border-2 focus:border-purple-400"
                  />
                </div>
              </div>
            ) : (
              <ImageUpload
                label={getLabel('image')}
                onImageUpload={(imageData) => setNewContentForm(prev => ({ ...prev, imageValue: imageData }))}
                currentImage={newContentForm.imageValue}
              />
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleAddContent} className="bg-purple-600 hover:bg-purple-700">
                {getLabel('save')}
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                {getLabel('cancel')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={selectedPage} onValueChange={setSelectedPage} className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 bg-white border shadow-sm overflow-x-auto">
          {pages.map(page => (
            <TabsTrigger 
              key={page} 
              value={page} 
              className="capitalize data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              {getLabel(page)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {pages.map(page => (
          <TabsContent key={page} value={page} className="space-y-6 mt-6">
            {Object.entries(groupedContent).length > 0 ? (
              Object.entries(groupedContent).map(([sectionName, items]) => (
                <Card key={sectionName} className="shadow-md">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className={`text-lg capitalize flex items-center gap-2 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      {sectionName} {language === 'ar' ? 'قسم' : 'Section'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {items.map(item => (
                      <div key={item.id} className="bg-white border-2 border-gray-100 rounded-lg p-4 hover:border-purple-200 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                          <Label className={`font-semibold text-gray-800 flex items-center gap-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                            {item.type === 'image' && <ImageIcon className="w-4 h-4 text-purple-600" />}
                            {item.label}
                          </Label>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteContent(item.id)}
                            className="hover:bg-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {item.type === 'image' ? (
                          <ImageUpload
                            onImageUpload={(imageData) => updateContent(item.id, imageData)}
                            currentImage={item.value as string}
                            label=""
                          />
                        ) : typeof item.value === 'object' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm text-gray-600 font-cairo mb-2 block">
                                {getLabel('arabic')}
                              </Label>
                              <Textarea
                                value={item.value.ar || ''}
                                onChange={(e) => handleContentUpdate(item, 'ar', e.target.value)}
                                placeholder={getLabel('arabic')}
                                className="font-cairo border-2 focus:border-purple-400"
                                dir="rtl"
                                rows={4}
                              />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600 mb-2 block">
                                {getLabel('french')}
                              </Label>
                              <Textarea
                                value={item.value.fr || ''}
                                onChange={(e) => handleContentUpdate(item, 'fr', e.target.value)}
                                placeholder={getLabel('french')}
                                className="border-2 focus:border-purple-400"
                                rows={4}
                              />
                            </div>
                          </div>
                        ) : (
                          <Input
                            value={item.value as string}
                            onChange={(e) => updateContent(item.id, e.target.value)}
                            placeholder={item.label}
                            className="border-2 focus:border-purple-400"
                          />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8">
                  <div className="text-center">
                    <Edit3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className={`text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {getLabel('noContent')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentEditor;

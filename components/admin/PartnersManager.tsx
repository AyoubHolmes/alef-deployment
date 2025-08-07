
'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Handshake, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language';
import ImageUpload from './ImageUpload';

interface Partner {
  id: string;
  name: { ar: string; fr: string };
  description: { ar: string; fr: string };
  logo: string;
  website: string;
  type: string;
}

interface Program {
  id: string;
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  partner: { ar: string; fr: string };
}

interface PartnersContent {
  pageTitle: { ar: string; fr: string };
  pageDescription: { ar: string; fr: string };
  partners: Partner[];
  programs: Program[];
}

const PartnersManager: React.FC = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<PartnersContent>({
    pageTitle: { ar: '', fr: '' },
    pageDescription: { ar: '', fr: '' },
    partners: [],
    programs: []
  });

  const labels = {
    partnersManagement: { ar: 'إدارة الشركاء', fr: 'Gestion des partenaires' },
    pageContent: { ar: 'محتوى الصفحة', fr: 'Contenu de la page' },
    partners: { ar: 'الشركاء', fr: 'Partenaires' },
    programs: { ar: 'البرامج المشتركة', fr: 'Programmes collaboratifs' },
    addPartner: { ar: 'إضافة شريك', fr: 'Ajouter un partenaire' },
    addProgram: { ar: 'إضافة برنامج', fr: 'Ajouter un programme' },
    title: { ar: 'العنوان', fr: 'Titre' },
    description: { ar: 'الوصف', fr: 'Description' },
    name: { ar: 'الاسم', fr: 'Nom' },
    logo: { ar: 'الشعار', fr: 'Logo' },
    website: { ar: 'الموقع الإلكتروني', fr: 'Site web' },
    type: { ar: 'النوع', fr: 'Type' },
    partner: { ar: 'الشريك', fr: 'Partenaire' },
    saveChanges: { ar: 'حفظ التغييرات', fr: 'Enregistrer les modifications' },
    contentSaved: { ar: 'تم حفظ المحتوى بنجاح', fr: 'Contenu enregistré avec succès' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    remove: { ar: 'إزالة', fr: 'Supprimer' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  useEffect(() => {
    const savedContent = localStorage.getItem('partnersContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('partnersContent', JSON.stringify(content));
    localStorage.setItem('partners', JSON.stringify(content.partners));
    toast.success(getLabel('contentSaved'));
  };

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: { ar: '', fr: '' },
      description: { ar: '', fr: '' },
      logo: '',
      website: '',
      type: ''
    };
    setContent(prev => ({
      ...prev,
      partners: [...prev.partners, newPartner]
    }));
  };

  const removePartner = (id: string) => {
    setContent(prev => ({
      ...prev,
      partners: prev.partners.filter(partner => partner.id !== id)
    }));
  };

  const updatePartner = (id: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      partners: prev.partners.map(partner => 
        partner.id === id ? { ...partner, [field]: value } : partner
      )
    }));
  };

  const addProgram = () => {
    const newProgram: Program = {
      id: Date.now().toString(),
      title: { ar: '', fr: '' },
      description: { ar: '', fr: '' },
      partner: { ar: '', fr: '' }
    };
    setContent(prev => ({
      ...prev,
      programs: [...prev.programs, newProgram]
    }));
  };

  const removeProgram = (id: string) => {
    setContent(prev => ({
      ...prev,
      programs: prev.programs.filter(program => program.id !== id)
    }));
  };

  const updateProgram = (id: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      programs: prev.programs.map(program => 
        program.id === id ? { ...program, [field]: value } : program
      )
    }));
  };

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Handshake className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {getLabel('partnersManagement')}
          </h2>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          {getLabel('saveChanges')}
        </Button>
      </div>

      <Tabs defaultValue="ar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ar">{getLabel('arabic')}</TabsTrigger>
          <TabsTrigger value="fr">{getLabel('french')}</TabsTrigger>
        </TabsList>

        <TabsContent value="ar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{getLabel('pageContent')} - العربية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{getLabel('title')}</Label>
                <Input
                  value={content.pageTitle.ar}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    pageTitle: { ...prev.pageTitle, ar: e.target.value }
                  }))}
                  placeholder="عنوان صفحة الشركاء"
                  className="text-right"
                />
              </div>
              
              <div>
                <Label>{getLabel('description')}</Label>
                <Textarea
                  value={content.pageDescription.ar}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    pageDescription: { ...prev.pageDescription, ar: e.target.value }
                  }))}
                  placeholder="وصف صفحة الشركاء"
                  rows={3}
                  className="text-right"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{getLabel('partners')} - العربية</CardTitle>
                <Button onClick={addPartner} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {getLabel('addPartner')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.partners.map((partner, index) => (
                <div key={partner.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">شريك {index + 1}</h4>
                    <Button
                      onClick={() => removePartner(partner.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>اسم الشريك</Label>
                      <Input
                        value={partner.name.ar}
                        onChange={(e) => updatePartner(partner.id, 'name', { ...partner.name, ar: e.target.value })}
                        placeholder="اسم الشريك بالعربية"
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label>نوع الشراكة</Label>
                      <Input
                        value={partner.type}
                        onChange={(e) => updatePartner(partner.id, 'type', e.target.value)}
                        placeholder="نوع الشراكة"
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>وصف الشريك</Label>
                    <Textarea
                      value={partner.description.ar}
                      onChange={(e) => updatePartner(partner.id, 'description', { ...partner.description, ar: e.target.value })}
                      placeholder="وصف الشريك بالعربية"
                      rows={3}
                      className="text-right"
                    />
                  </div>

                  <div>
                    <ImageUpload
                      label="شعار الشريك"
                      currentImage={partner.logo}
                      onImageUpload={(imageData) => updatePartner(partner.id, 'logo', imageData)}
                    />
                  </div>

                  <div>
                    <Label>الموقع الإلكتروني</Label>
                    <Input
                      value={partner.website}
                      onChange={(e) => updatePartner(partner.id, 'website', e.target.value)}
                      placeholder="https://example.com"
                      type="url"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{getLabel('programs')} - العربية</CardTitle>
                <Button onClick={addProgram} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {getLabel('addProgram')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.programs.map((program, index) => (
                <div key={program.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">برنامج {index + 1}</h4>
                    <Button
                      onClick={() => removeProgram(program.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>عنوان البرنامج</Label>
                    <Input
                      value={program.title.ar}
                      onChange={(e) => updateProgram(program.id, 'title', { ...program.title, ar: e.target.value })}
                      placeholder="عنوان البرنامج بالعربية"
                      className="text-right"
                    />
                  </div>
                  <div>
                    <Label>وصف البرنامج</Label>
                    <Textarea
                      value={program.description.ar}
                      onChange={(e) => updateProgram(program.id, 'description', { ...program.description, ar: e.target.value })}
                      placeholder="وصف البرنامج بالعربية"
                      rows={2}
                      className="text-right"
                    />
                  </div>
                  <div>
                    <Label>الشريك</Label>
                    <Input
                      value={program.partner.ar}
                      onChange={(e) => updateProgram(program.id, 'partner', { ...program.partner, ar: e.target.value })}
                      placeholder="اسم الشريك بالعربية"
                      className="text-right"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{getLabel('pageContent')} - Français</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{getLabel('title')}</Label>
                <Input
                  value={content.pageTitle.fr}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    pageTitle: { ...prev.pageTitle, fr: e.target.value }
                  }))}
                  placeholder="Titre de la page partenaires"
                />
              </div>
              
              <div>
                <Label>{getLabel('description')}</Label>
                <Textarea
                  value={content.pageDescription.fr}
                  onChange={(e) => setContent(prev => ({
                    ...prev,
                    pageDescription: { ...prev.pageDescription, fr: e.target.value }
                  }))}
                  placeholder="Description de la page partenaires"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{getLabel('partners')} - Français</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.partners.map((partner, index) => (
                <div key={partner.id} className="p-4 border rounded-lg space-y-4">
                  <h4 className="font-medium">Partenaire {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nom du partenaire</Label>
                      <Input
                        value={partner.name.fr}
                        onChange={(e) => updatePartner(partner.id, 'name', { ...partner.name, fr: e.target.value })}
                        placeholder="Nom du partenaire en français"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description du partenaire</Label>
                    <Textarea
                      value={partner.description.fr}
                      onChange={(e) => updatePartner(partner.id, 'description', { ...partner.description, fr: e.target.value })}
                      placeholder="Description du partenaire en français"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{getLabel('programs')} - Français</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.programs.map((program, index) => (
                <div key={program.id} className="p-4 border rounded-lg space-y-3">
                  <h4 className="font-medium">Programme {index + 1}</h4>
                  <div>
                    <Label>Titre du programme</Label>
                    <Input
                      value={program.title.fr}
                      onChange={(e) => updateProgram(program.id, 'title', { ...program.title, fr: e.target.value })}
                      placeholder="Titre du programme en français"
                    />
                  </div>
                  <div>
                    <Label>Description du programme</Label>
                    <Textarea
                      value={program.description.fr}
                      onChange={(e) => updateProgram(program.id, 'description', { ...program.description, fr: e.target.value })}
                      placeholder="Description du programme en français"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label>Partenaire</Label>
                    <Input
                      value={program.partner.fr}
                      onChange={(e) => updateProgram(program.id, 'partner', { ...program.partner, fr: e.target.value })}
                      placeholder="Nom du partenaire en français"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnersManager;

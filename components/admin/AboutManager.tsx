
'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Save, Languages } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language';

interface AboutContent {
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  mission: { ar: string; fr: string };
  vision: { ar: string; fr: string };
  values: Array<{
    id: string;
    title: { ar: string; fr: string };
    description: { ar: string; fr: string };
  }>;
}

const AboutManager: React.FC = () => {
  const { language } = useLanguage();
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: { ar: '', fr: '' },
    description: { ar: '', fr: '' },
    mission: { ar: '', fr: '' },
    vision: { ar: '', fr: '' },
    values: []
  });

  const labels = {
    aboutManagement: { ar: 'إدارة صفحة من نحن', fr: 'Gestion de la page À propos' },
    mainContent: { ar: 'المحتوى الرئيسي', fr: 'Contenu principal' },
    title: { ar: 'العنوان', fr: 'Titre' },
    description: { ar: 'الوصف', fr: 'Description' },
    mission: { ar: 'مهمتنا', fr: 'Notre mission' },
    vision: { ar: 'رؤيتنا', fr: 'Notre vision' },
    values: { ar: 'قيمنا', fr: 'Nos valeurs' },
    addValue: { ar: 'إضافة قيمة', fr: 'Ajouter une valeur' },
    saveChanges: { ar: 'حفظ التغييرات', fr: 'Enregistrer les modifications' },
    contentSaved: { ar: 'تم حفظ المحتوى بنجاح', fr: 'Contenu enregistré avec succès' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    remove: { ar: 'إزالة', fr: 'Supprimer' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  useEffect(() => {
    const savedContent = localStorage.getItem('aboutContent');
    if (savedContent) {
      setAboutContent(JSON.parse(savedContent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
    toast.success(getLabel('contentSaved'));
  };

  const addValue = () => {
    const newValue = {
      id: Date.now().toString(),
      title: { ar: '', fr: '' },
      description: { ar: '', fr: '' }
    };
    setAboutContent(prev => ({
      ...prev,
      values: [...prev.values, newValue]
    }));
  };

  const removeValue = (id: string) => {
    setAboutContent(prev => ({
      ...prev,
      values: prev.values.filter(value => value.id !== id)
    }));
  };

  const updateValue = (id: string, field: string, lang: 'ar' | 'fr', value: string) => {
    setAboutContent(prev => ({
      ...prev,
      values: prev.values.map(val => 
        val.id === id 
          ? { ...val, [field]: { ...val[field as keyof typeof val] as any, [lang]: value } }
          : val
      )
    }));
  };

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {getLabel('aboutManagement')}
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
              <CardTitle>{getLabel('mainContent')} - العربية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title-ar">{getLabel('title')}</Label>
                <Input
                  id="title-ar"
                  value={aboutContent.title.ar}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    title: { ...prev.title, ar: e.target.value }
                  }))}
                  placeholder="عنوان صفحة من نحن"
                  className="text-right"
                />
              </div>
              
              <div>
                <Label htmlFor="description-ar">{getLabel('description')}</Label>
                <Textarea
                  id="description-ar"
                  value={aboutContent.description.ar}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    description: { ...prev.description, ar: e.target.value }
                  }))}
                  placeholder="وصف الجمعية والأهداف"
                  rows={4}
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="mission-ar">{getLabel('mission')}</Label>
                <Textarea
                  id="mission-ar"
                  value={aboutContent.mission.ar}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    mission: { ...prev.mission, ar: e.target.value }
                  }))}
                  placeholder="رسالة الجمعية"
                  rows={3}
                  className="text-right"
                />
              </div>

              <div>
                <Label htmlFor="vision-ar">{getLabel('vision')}</Label>
                <Textarea
                  id="vision-ar"
                  value={aboutContent.vision.ar}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    vision: { ...prev.vision, ar: e.target.value }
                  }))}
                  placeholder="رؤية الجمعية"
                  rows={3}
                  className="text-right"
                />
              </div>
            </CardContent>
          </Card>

          {/* Values in Arabic */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{getLabel('values')} - العربية</CardTitle>
                <Button onClick={addValue} variant="outline" size="sm">
                  {getLabel('addValue')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {aboutContent.values.map((value, index) => (
                <div key={value.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">قيمة {index + 1}</h4>
                    <Button
                      onClick={() => removeValue(value.id)}
                      variant="destructive"
                      size="sm"
                    >
                      {getLabel('remove')}
                    </Button>
                  </div>
                  <div>
                    <Label>عنوان القيمة</Label>
                    <Input
                      value={value.title.ar}
                      onChange={(e) => updateValue(value.id, 'title', 'ar', e.target.value)}
                      placeholder="عنوان القيمة بالعربية"
                      className="text-right"
                    />
                  </div>
                  <div>
                    <Label>وصف القيمة</Label>
                    <Textarea
                      value={value.description.ar}
                      onChange={(e) => updateValue(value.id, 'description', 'ar', e.target.value)}
                      placeholder="وصف القيمة بالعربية"
                      rows={2}
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
              <CardTitle>{getLabel('mainContent')} - Français</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title-fr">{getLabel('title')}</Label>
                <Input
                  id="title-fr"
                  value={aboutContent.title.fr}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    title: { ...prev.title, fr: e.target.value }
                  }))}
                  placeholder="Titre de la page À propos"
                />
              </div>
              
              <div>
                <Label htmlFor="description-fr">{getLabel('description')}</Label>
                <Textarea
                  id="description-fr"
                  value={aboutContent.description.fr}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    description: { ...prev.description, fr: e.target.value }
                  }))}
                  placeholder="Description de l'association et objectifs"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="mission-fr">{getLabel('mission')}</Label>
                <Textarea
                  id="mission-fr"
                  value={aboutContent.mission.fr}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    mission: { ...prev.mission, fr: e.target.value }
                  }))}
                  placeholder="Mission de l'association"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="vision-fr">{getLabel('vision')}</Label>
                <Textarea
                  id="vision-fr"
                  value={aboutContent.vision.fr}
                  onChange={(e) => setAboutContent(prev => ({
                    ...prev,
                    vision: { ...prev.vision, fr: e.target.value }
                  }))}
                  placeholder="Vision de l'association"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Values in French */}
          <Card>
            <CardHeader>
              <CardTitle>{getLabel('values')} - Français</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aboutContent.values.map((value, index) => (
                <div key={value.id} className="p-4 border rounded-lg space-y-3">
                  <h4 className="font-medium">Valeur {index + 1}</h4>
                  <div>
                    <Label>Titre de la valeur</Label>
                    <Input
                      value={value.title.fr}
                      onChange={(e) => updateValue(value.id, 'title', 'fr', e.target.value)}
                      placeholder="Titre de la valeur en français"
                    />
                  </div>
                  <div>
                    <Label>Description de la valeur</Label>
                    <Textarea
                      value={value.description.fr}
                      onChange={(e) => updateValue(value.id, 'description', 'fr', e.target.value)}
                      placeholder="Description de la valeur en français"
                      rows={2}
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

export default AboutManager;

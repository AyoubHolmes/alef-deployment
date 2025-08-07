
'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Users, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language';
import ImageUpload from './ImageUpload';

interface Member {
  id: string;
  name: { ar: string; fr: string };
  role: { ar: string; fr: string };
  bio: { ar: string; fr: string };
  image: string;
}

interface MembersContent {
  pageTitle: { ar: string; fr: string };
  pageDescription: { ar: string; fr: string };
  members: Member[];
}

const MembersManager: React.FC = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<MembersContent>({
    pageTitle: { ar: '', fr: '' },
    pageDescription: { ar: '', fr: '' },
    members: []
  });

  const labels = {
    membersManagement: { ar: 'إدارة أعضاء الجمعية', fr: 'Gestion des membres' },
    pageContent: { ar: 'محتوى الصفحة', fr: 'Contenu de la page' },
    members: { ar: 'الأعضاء', fr: 'Membres' },
    addMember: { ar: 'إضافة عضو', fr: 'Ajouter un membre' },
    title: { ar: 'العنوان', fr: 'Titre' },
    description: { ar: 'الوصف', fr: 'Description' },
    name: { ar: 'الاسم', fr: 'Nom' },
    role: { ar: 'الدور', fr: 'Rôle' },
    bio: { ar: 'النبذة الشخصية', fr: 'Biographie' },
    image: { ar: 'الصورة', fr: 'Image' },
    saveChanges: { ar: 'حفظ التغييرات', fr: 'Enregistrer les modifications' },
    contentSaved: { ar: 'تم حفظ المحتوى بنجاح', fr: 'Contenu enregistré avec succès' },
    arabic: { ar: 'العربية', fr: 'Arabe' },
    french: { ar: 'الفرنسية', fr: 'Français' },
    remove: { ar: 'إزالة', fr: 'Supprimer' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  useEffect(() => {
    const savedContent = localStorage.getItem('membersContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('membersContent', JSON.stringify(content));
    toast.success(getLabel('contentSaved'));
  };

  const addMember = () => {
    const newMember: Member = {
      id: Date.now().toString(),
      name: { ar: '', fr: '' },
      role: { ar: '', fr: '' },
      bio: { ar: '', fr: '' },
      image: ''
    };
    setContent(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
  };

  const removeMember = (id: string) => {
    setContent(prev => ({
      ...prev,
      members: prev.members.filter(member => member.id !== id)
    }));
  };

  const updateMember = (id: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      members: prev.members.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      )
    }));
  };

  return (
    <div className={`space-y-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {getLabel('membersManagement')}
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
                  placeholder="عنوان صفحة أعضاء الجمعية"
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
                  placeholder="وصف أعضاء الجمعية"
                  rows={3}
                  className="text-right"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{getLabel('members')} - العربية</CardTitle>
                <Button onClick={addMember} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {getLabel('addMember')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.members.map((member, index) => (
                <div key={member.id} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">عضو {index + 1}</h4>
                    <Button
                      onClick={() => removeMember(member.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>الاسم</Label>
                      <Input
                        value={member.name.ar}
                        onChange={(e) => updateMember(member.id, 'name', { ...member.name, ar: e.target.value })}
                        placeholder="اسم العضو بالعربية"
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label>الدور</Label>
                      <Input
                        value={member.role.ar}
                        onChange={(e) => updateMember(member.id, 'role', { ...member.role, ar: e.target.value })}
                        placeholder="دور العضو بالعربية"
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>النبذة الشخصية</Label>
                    <Textarea
                      value={member.bio.ar}
                      onChange={(e) => updateMember(member.id, 'bio', { ...member.bio, ar: e.target.value })}
                      placeholder="النبذة الشخصية بالعربية"
                      rows={3}
                      className="text-right"
                    />
                  </div>

                  <div>
                    <ImageUpload
                      label="صورة العضو"
                      currentImage={member.image}
                      onImageUpload={(imageData) => updateMember(member.id, 'image', imageData)}
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
                  placeholder="Titre de la page membres"
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
                  placeholder="Description des membres"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{getLabel('members')} - Français</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.members.map((member, index) => (
                <div key={member.id} className="p-4 border rounded-lg space-y-4">
                  <h4 className="font-medium">Membre {index + 1}</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nom</Label>
                      <Input
                        value={member.name.fr}
                        onChange={(e) => updateMember(member.id, 'name', { ...member.name, fr: e.target.value })}
                        placeholder="Nom du membre en français"
                      />
                    </div>
                    <div>
                      <Label>Rôle</Label>
                      <Input
                        value={member.role.fr}
                        onChange={(e) => updateMember(member.id, 'role', { ...member.role, fr: e.target.value })}
                        placeholder="Rôle du membre en français"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Biographie</Label>
                    <Textarea
                      value={member.bio.fr}
                      onChange={(e) => updateMember(member.id, 'bio', { ...member.bio, fr: e.target.value })}
                      placeholder="Biographie en français"
                      rows={3}
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

export default MembersManager;

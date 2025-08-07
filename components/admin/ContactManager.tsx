
'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';
import { Save, MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

interface ContactInfo {
  ar: string;
  fr: string;
}

interface SocialLink {
  name: string;
  label: ContactInfo;
  url: string;
  icon: string;
}

interface ContactContent {
  pageTitle: ContactInfo;
  pageDescription: ContactInfo;
  address: ContactInfo;
  phone: string;
  email: string;
  socialLinks: SocialLink[];
}

const ContactManager = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<ContactContent>({
    pageTitle: { ar: 'تواصل معنا', fr: 'Contactez-nous' },
    pageDescription: { 
      ar: 'نرحب بتواصلكم معنا. يمكنكم إرسال استفساراتكم أو اقتراحاتكم من خلال النموذج أدناه أو عبر معلومات الاتصال المتوفرة.',
      fr: 'Nous sommes ravis de vous entendre. Envoyez-nous vos questions ou suggestions via le formulaire ci-dessous ou via nos coordonnées.'
    },
    address: { 
      ar: '123 شارع الفن، الحي الثقافي، الدار البيضاء، 20000',
      fr: '123 Art Street, Cultural District, Casablanca, 20000'
    },
    phone: '+212 5XX-XXX-XXX',
    email: 'info@alefassociation.org',
    socialLinks: [
      {
        name: 'Facebook',
        label: { ar: 'تابعنا على Facebook', fr: 'Suivez-nous sur Facebook' },
        url: 'https://facebook.com',
        icon: 'facebook'
      },
      {
        name: 'Instagram',
        label: { ar: 'تابعنا على Instagram', fr: 'Suivez-nous sur Instagram' },
        url: 'https://instagram.com',
        icon: 'instagram'
      },
      {
        name: 'Twitter',
        label: { ar: 'تابعنا على Twitter', fr: 'Suivez-nous sur Twitter' },
        url: 'https://twitter.com',
        icon: 'twitter'
      },
      {
        name: 'Youtube',
        label: { ar: 'تابعنا على Youtube', fr: 'Suivez-nous sur Youtube' },
        url: 'https://youtube.com',
        icon: 'youtube'
      }
    ]
  });

  // Load saved content on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('contactContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('contactContent', JSON.stringify(content));
    alert(language === 'ar' ? 'تم حفظ المحتوى بنجاح!' : 'Contenu sauvegardé avec succès!');
  };

  const updateContent = (field: keyof ContactContent, value: any) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: any) => {
    const updatedLinks = [...content.socialLinks];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    updateContent('socialLinks', updatedLinks);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {language === 'ar' ? 'إدارة صفحة الاتصال' : 'Gestion de la page Contact'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Page Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{language === 'ar' ? 'عنوان الصفحة (عربي)' : 'Titre de la page (Arabe)'}</Label>
              <Input
                value={content.pageTitle.ar}
                onChange={(e) => updateContent('pageTitle', { ...content.pageTitle, ar: e.target.value })}
                placeholder="عنوان الصفحة بالعربية"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'عنوان الصفحة (فرنسي)' : 'Titre de la page (Français)'}</Label>
              <Input
                value={content.pageTitle.fr}
                onChange={(e) => updateContent('pageTitle', { ...content.pageTitle, fr: e.target.value })}
                placeholder="Titre de la page en français"
              />
            </div>
          </div>

          {/* Page Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{language === 'ar' ? 'وصف الصفحة (عربي)' : 'Description de la page (Arabe)'}</Label>
              <Textarea
                value={content.pageDescription.ar}
                onChange={(e) => updateContent('pageDescription', { ...content.pageDescription, ar: e.target.value })}
                placeholder="وصف الصفحة بالعربية"
                rows={3}
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'وصف الصفحة (فرنسي)' : 'Description de la page (Français)'}</Label>
              <Textarea
                value={content.pageDescription.fr}
                onChange={(e) => updateContent('pageDescription', { ...content.pageDescription, fr: e.target.value })}
                placeholder="Description de la page en français"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {language === 'ar' ? 'معلومات الاتصال' : 'Informations de contact'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{language === 'ar' ? 'العنوان (عربي)' : 'Adresse (Arabe)'}</Label>
              <Textarea
                value={content.address.ar}
                onChange={(e) => updateContent('address', { ...content.address, ar: e.target.value })}
                placeholder="العنوان بالعربية"
                rows={2}
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'العنوان (فرنسي)' : 'Adresse (Français)'}</Label>
              <Textarea
                value={content.address.fr}
                onChange={(e) => updateContent('address', { ...content.address, fr: e.target.value })}
                placeholder="Adresse en français"
                rows={2}
              />
            </div>
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}</Label>
              <Input
                value={content.phone}
                onChange={(e) => updateContent('phone', e.target.value)}
                placeholder="+212 5XX-XXX-XXX"
              />
            </div>
            <div>
              <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Adresse e-mail'}</Label>
              <Input
                value={content.email}
                onChange={(e) => updateContent('email', e.target.value)}
                placeholder="info@example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Facebook className="h-5 w-5" />
            {language === 'ar' ? 'روابط وسائل التواصل الاجتماعي' : 'Liens des réseaux sociaux'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {content.socialLinks.map((link, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                {link.name === 'Facebook' && <Facebook className="h-4 w-4" />}
                {link.name === 'Instagram' && <Instagram className="h-4 w-4" />}
                {link.name === 'Twitter' && <Twitter className="h-4 w-4" />}
                {link.name === 'Youtube' && <Youtube className="h-4 w-4" />}
                {link.name}
              </h4>
              
              {/* URL */}
              <div>
                <Label>{language === 'ar' ? 'رابط الملف الشخصي' : 'URL du profil'}</Label>
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              {/* Labels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>{language === 'ar' ? 'النص (عربي)' : 'Libellé (Arabe)'}</Label>
                  <Input
                    value={link.label.ar}
                    onChange={(e) => updateSocialLink(index, 'label', { ...link.label, ar: e.target.value })}
                    placeholder="النص بالعربية"
                  />
                </div>
                <div>
                  <Label>{language === 'ar' ? 'النص (فرنسي)' : 'Libellé (Français)'}</Label>
                  <Input
                    value={link.label.fr}
                    onChange={(e) => updateSocialLink(index, 'label', { ...link.label, fr: e.target.value })}
                    placeholder="Libellé en français"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          {language === 'ar' ? 'حفظ التغييرات' : 'Sauvegarder les modifications'}
        </Button>
      </div>
    </div>
  );
};

export default ContactManager;

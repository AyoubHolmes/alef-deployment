'use client'

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface Partner {
  id: number;
  nameAr: string;
  nameFr: string;
  descriptionAr: string;
  descriptionFr: string;
  logo: string;
  website?: string;
  type: string;
}

interface CollaborativeProgram {
  id: number;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  partnerNameAr: string;
  partnerNameFr: string;
}

const AdminPartnersManager: React.FC = () => {
  const { language } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [programs, setPrograms] = useState<CollaborativeProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editingProgram, setEditingProgram] = useState<CollaborativeProgram | null>(null);

  const [partnerForm, setPartnerForm] = useState({
    nameAr: '',
    nameFr: '',
    descriptionAr: '',
    descriptionFr: '',
    logo: '',
    website: '',
    type: 'cultural'
  });

  const [programForm, setProgramForm] = useState({
    titleAr: '',
    titleFr: '',
    descriptionAr: '',
    descriptionFr: '',
    partnerNameAr: '',
    partnerNameFr: ''
  });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      
      if (data.success) {
        setPartners(data.data.partners || []);
        setPrograms(data.data.programs || []);
      } else {
        toast.error(language === 'ar' ? 'فشل في تحميل البيانات' : 'Échec du chargement des données');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error(language === 'ar' ? 'خطأ في تحميل البيانات' : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePartnerSubmit = async () => {
    try {
      const updatedPartners = editingPartner
        ? partners.map(p => p.id === editingPartner.id ? { ...p, ...partnerForm } : p)
        : [...partners, { id: Date.now(), ...partnerForm }];

      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: null,
          partners: updatedPartners.map(p => ({
            nameAr: p.nameAr,
            nameFr: p.nameFr,
            descriptionAr: p.descriptionAr,
            descriptionFr: p.descriptionFr,
            logo: p.logo,
            website: p.website,
            type: p.type
          })),
          programs
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(language === 'ar' ? 'تم حفظ الشريك بنجاح' : 'Partenaire sauvegardé avec succès');
        await fetchData();
        setIsPartnerDialogOpen(false);
        setEditingPartner(null);
        setPartnerForm({ nameAr: '', nameFr: '', descriptionAr: '', descriptionFr: '', logo: '', website: '', type: 'cultural' });
      }
    } catch (error) {
      toast.error(language === 'ar' ? 'خطأ في حفظ الشريك' : 'Erreur lors de la sauvegarde');
    }
  };

  const handleDeletePartner = async (partnerId: number) => {
    if (!confirm(language === 'ar' ? 'هل تريد حذف هذا الشريك؟' : 'Voulez-vous supprimer ce partenaire?')) return;

    try {
      const updatedPartners = partners.filter(p => p.id !== partnerId);
      
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: null,
          partners: updatedPartners.map(p => ({
            nameAr: p.nameAr,
            nameFr: p.nameFr,
            descriptionAr: p.descriptionAr,
            descriptionFr: p.descriptionFr,
            logo: p.logo,
            website: p.website,
            type: p.type
          })),
          programs
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(language === 'ar' ? 'تم حذف الشريك' : 'Partenaire supprimé');
        await fetchData();
      }
    } catch (error) {
      toast.error(language === 'ar' ? 'خطأ في حذف الشريك' : 'Erreur lors de la suppression');
    }
  };

  const openPartnerDialog = (partner: Partner | null = null) => {
    if (partner) {
      setEditingPartner(partner);
      setPartnerForm({
        nameAr: partner.nameAr,
        nameFr: partner.nameFr,
        descriptionAr: partner.descriptionAr,
        descriptionFr: partner.descriptionFr,
        logo: partner.logo,
        website: partner.website || '',
        type: partner.type
      });
    } else {
      setEditingPartner(null);
      setPartnerForm({ nameAr: '', nameFr: '', descriptionAr: '', descriptionFr: '', logo: '', website: '', type: 'cultural' });
    }
    setIsPartnerDialogOpen(true);
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
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'إدارة الشركاء' : 'Gestion des Partenaires'}
          </h1>
          <Dialog open={isPartnerDialogOpen} onOpenChange={setIsPartnerDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" onClick={() => openPartnerDialog()}>
                <Plus size={16} />
                {language === 'ar' ? 'إضافة شريك جديد' : 'Nouveau Partenaire'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                  {editingPartner 
                    ? (language === 'ar' ? 'تعديل شريك' : 'Modifier Partenaire')
                    : (language === 'ar' ? 'إضافة شريك جديد' : 'Nouveau Partenaire')
                  }
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'الاسم (عربي)' : 'Nom (Arabe)'}</Label>
                    <Input
                      value={partnerForm.nameAr}
                      onChange={(e) => setPartnerForm({...partnerForm, nameAr: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'الاسم (فرنسي)' : 'Nom (Français)'}</Label>
                    <Input
                      value={partnerForm.nameFr}
                      onChange={(e) => setPartnerForm({...partnerForm, nameFr: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'الوصف (عربي)' : 'Description (Arabe)'}</Label>
                    <Textarea
                      value={partnerForm.descriptionAr}
                      onChange={(e) => setPartnerForm({...partnerForm, descriptionAr: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'الوصف (فرنسي)' : 'Description (Français)'}</Label>
                    <Textarea
                      value={partnerForm.descriptionFr}
                      onChange={(e) => setPartnerForm({...partnerForm, descriptionFr: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{language === 'ar' ? 'الشعار' : 'Logo'}</Label>
                    <Input
                      value={partnerForm.logo}
                      onChange={(e) => setPartnerForm({...partnerForm, logo: e.target.value})}
                      placeholder={language === 'ar' ? 'رابط الشعار' : 'URL du logo'}
                    />
                  </div>
                  <div>
                    <Label>{language === 'ar' ? 'الموقع الإلكتروني' : 'Site Web'}</Label>
                    <Input
                      value={partnerForm.website}
                      onChange={(e) => setPartnerForm({...partnerForm, website: e.target.value})}
                      placeholder={language === 'ar' ? 'رابط الموقع' : 'URL du site'}
                    />
                  </div>
                </div>
                <div>
                  <Label>{language === 'ar' ? 'نوع الشراكة' : 'Type de Partenariat'}</Label>
                  <Select value={partnerForm.type} onValueChange={(value) => setPartnerForm({...partnerForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cultural">{language === 'ar' ? 'ثقافي' : 'Culturel'}</SelectItem>
                      <SelectItem value="academic">{language === 'ar' ? 'أكاديمي' : 'Académique'}</SelectItem>
                      <SelectItem value="media">{language === 'ar' ? 'إعلامي' : 'Médiatique'}</SelectItem>
                      <SelectItem value="institutional">{language === 'ar' ? 'مؤسسي' : 'Institutionnel'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsPartnerDialogOpen(false)}>
                    {language === 'ar' ? 'إلغاء' : 'Annuler'}
                  </Button>
                  <Button onClick={handlePartnerSubmit}>
                    {language === 'ar' ? 'حفظ' : 'Sauvegarder'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
              {language === 'ar' ? 'الشركاء' : 'Partenaires'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {partners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {partner.logo && (
                      <img src={partner.logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
                    )}
                    <div>
                      <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {language === 'ar' ? partner.nameAr : partner.nameFr}
                      </h3>
                      <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {language === 'ar' ? partner.descriptionAr : partner.descriptionFr}
                      </p>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {partner.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openPartnerDialog(partner)}>
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeletePartner(partner.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
              {partners.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {language === 'ar' ? 'لا توجد شركاء' : 'Aucun partenaire'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPartnersManager;
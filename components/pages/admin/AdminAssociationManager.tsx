'use client'

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Edit, Trash2, Users, Mail, Phone } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminAssociationManager: React.FC = () => {
  const { language } = useLanguage();
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('members');

  const members = [
    {
      id: 1,
      name: { ar: 'أحمد محمد', fr: 'Ahmed Mohammed' },
      role: { ar: 'رئيس الجمعية', fr: 'Président de l\'Association' },
      email: 'ahmed@alef.org',
      phone: '+33 123 456 789',
      joinDate: '2020-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: { ar: 'فاطمة الزهراء', fr: 'Fatima Zahra' },
      role: { ar: 'نائب الرئيس', fr: 'Vice-Présidente' },
      email: 'fatima@alef.org',
      phone: '+33 123 456 788',
      joinDate: '2020-03-20',
      status: 'active'
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: { ar: 'سعيد العلوي', fr: 'Said Alaoui' },
      position: { ar: 'مدير تنفيذي', fr: 'Directeur Exécutif' },
      department: { ar: 'الإدارة', fr: 'Administration' },
      email: 'said@alef.org',
      status: 'active'
    },
    {
      id: 2,
      name: { ar: 'مريم بن علي', fr: 'Maryam Ben Ali' },
      position: { ar: 'منسقة الأنشطة', fr: 'Coordinatrice d\'Activités' },
      department: { ar: 'الأنشطة', fr: 'Activités' },
      email: 'maryam@alef.org',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return language === 'ar' ? 'نشط' : 'Actif';
      case 'inactive': return language === 'ar' ? 'غير نشط' : 'Inactif';
      case 'pending': return language === 'ar' ? 'في الانتظار' : 'En attente';
      default: return status;
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'members':
        return (
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                <Users size={20} />
                {language === 'ar' ? 'أعضاء الجمعية' : 'Membres de l\'Association'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'الاسم' : 'Nom'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'الدور' : 'Rôle'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'الحالة' : 'Statut'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'الإجراءات' : 'Actions'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {member.name[language]}
                      </TableCell>
                      <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        {member.role[language]}
                      </TableCell>
                      <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          {member.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(member.status)} ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                          {getStatusLabel(member.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case 'team':
        return (
          <Card>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                <Users size={20} />
                {language === 'ar' ? 'فريق العمل' : 'Équipe de Travail'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'الاسم' : 'Nom'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'المنصب' : 'Poste'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'القسم' : 'Département'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </TableHead>
                    <TableHead className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
                      {language === 'ar' ? 'الإجراءات' : 'Actions'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {member.name[language]}
                      </TableCell>
                      <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        {member.position[language]}
                      </TableCell>
                      <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        {member.department[language]}
                      </TableCell>
                      <TableCell className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                        {member.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit size={14} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'إدارة الجمعية' : 'Gestion de l\'Association'}
            </h1>
            <p className={`text-gray-600 mt-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'إدارة أعضاء الجمعية وفريق العمل' : 'Gérer les membres de l\'association et l\'équipe'}
            </p>
          </div>
          
          <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#2D439A] hover:bg-[#2D439A]/90">
                <Plus size={16} className="mr-2" />
                {language === 'ar' ? 'إضافة عضو' : 'Ajouter Membre'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                  {language === 'ar' ? 'إضافة عضو جديد' : 'Ajouter Nouveau Membre'}
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الاسم (عربي)' : 'Nom (Arabe)'}
                    </Label>
                    <Input placeholder={language === 'ar' ? 'الاسم بالعربية' : 'Nom en arabe'} />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الاسم (فرنسي)' : 'Nom (Français)'}
                    </Label>
                    <Input placeholder={language === 'ar' ? 'الاسم بالفرنسية' : 'Nom en français'} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </Label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'رقم الهاتف' : 'Téléphone'}
                    </Label>
                    <Input placeholder="+33 123 456 789" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'النوع' : 'Type'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر النوع' : 'Choisir type'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">{language === 'ar' ? 'عضو' : 'Membre'}</SelectItem>
                        <SelectItem value="team">{language === 'ar' ? 'فريق عمل' : 'Équipe'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                      {language === 'ar' ? 'الحالة' : 'Statut'}
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'ar' ? 'اختر الحالة' : 'Choisir statut'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{language === 'ar' ? 'نشط' : 'Actif'}</SelectItem>
                        <SelectItem value="inactive">{language === 'ar' ? 'غير نشط' : 'Inactif'}</SelectItem>
                        <SelectItem value="pending">{language === 'ar' ? 'في الانتظار' : 'En attente'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
                    {language === 'ar' ? 'السيرة الذاتية' : 'Biographie'}
                  </Label>
                  <Textarea 
                    placeholder={language === 'ar' ? 'نبذة عن العضو' : 'Description du membre'} 
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
                    {language === 'ar' ? 'إلغاء' : 'Annuler'}
                  </Button>
                  <Button type="submit" className="bg-[#2D439A] hover:bg-[#2D439A]/90">
                    {language === 'ar' ? 'حفظ' : 'Enregistrer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Section Selector */}
        <div className="flex items-center gap-4">
          <Label className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
            {language === 'ar' ? 'اختر القسم:' : 'Choisir section:'}
          </Label>
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="members">{language === 'ar' ? 'أعضاء الجمعية' : 'Membres Association'}</SelectItem>
              <SelectItem value="team">{language === 'ar' ? 'فريق العمل' : 'Équipe de Travail'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderContent()}
      </div>
    </AdminLayout>
  );
};

export default AdminAssociationManager;
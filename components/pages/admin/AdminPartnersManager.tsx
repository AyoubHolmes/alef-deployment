import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminPartnersManager: React.FC = () => {
  const { language } = useLanguage();

  const partners = [
    {
      id: 1,
      name: language === 'ar' ? 'شريك 1' : 'Partenaire 1',
      description: language === 'ar' ? 'وصف الشريك 1' : 'Description Partenaire 1',
      status: language === 'ar' ? 'نشط' : 'Actif'
    },
    {
      id: 2,
      name: language === 'ar' ? 'شريك 2' : 'Partenaire 2',
      description: language === 'ar' ? 'وصف الشريك 2' : 'Description Partenaire 2',
      status: language === 'ar' ? 'نشط' : 'Actif'
    }
  ];

  return (
    <AdminLayout>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'إدارة الشركاء' : 'Gestion des Partenaires'}
          </h1>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            {language === 'ar' ? 'إضافة شريك جديد' : 'Nouveau Partenaire'}
          </Button>
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
                  <div>
                    <h3 className={`font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {partner.name}
                    </h3>
                    <p className={`text-sm text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {partner.description} - {partner.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
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

export default AdminPartnersManager;
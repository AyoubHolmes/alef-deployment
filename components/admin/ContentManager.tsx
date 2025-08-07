
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';

const ContentManager: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader>
          <CardTitle className={language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}>
            {language === 'ar' ? 'إدارة المحتوى' : 'Gestionnaire de contenu'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-gray-500 text-center ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'إدارة المحتوى قيد التطوير' : 'Gestionnaire de contenu en développement'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManager;

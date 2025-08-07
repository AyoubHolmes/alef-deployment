
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/language';
import ImageUpload from '../ImageUpload';

interface Props {
  contentAr: string;
  contentFr: string;
  onContentChange: (contentAr: string, contentFr: string) => void;
  getLabel: (key: string) => string;
}

const ArticleContentEditor: React.FC<Props> = ({
  contentAr,
  contentFr,
  onContentChange,
  getLabel
}) => {
  const { language } = useLanguage();

  const handleContentChange = (field: 'ar' | 'fr', value: string) => {
    if (field === 'ar') {
      onContentChange(value, contentFr);
    } else {
      onContentChange(contentAr, value);
    }
  };

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-md text-blue-800">
          {getLabel('articleContent')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-semibold text-gray-700">
              {getLabel('content')} ({getLabel('arabic')})
            </Label>
            <Textarea
              value={contentAr}
              onChange={(e) => handleContentChange('ar', e.target.value)}
              placeholder={getLabel('articleContentPlaceholder')}
              className="font-cairo min-h-[300px] border-2 focus:border-blue-400"
              dir="rtl"
            />
            <p className="text-xs text-gray-500 mt-1">
              {language === 'ar' 
                ? 'يمكنك استخدام النص المنسق هنا' 
                : 'Vous pouvez utiliser du texte formaté ici'
              }
            </p>
          </div>
          <div>
            <Label className="text-sm font-semibold text-gray-700">
              {getLabel('content')} ({getLabel('french')})
            </Label>
            <Textarea
              value={contentFr}
              onChange={(e) => handleContentChange('fr', e.target.value)}
              placeholder={getLabel('articleContentPlaceholder')}
              className="min-h-[300px] border-2 focus:border-blue-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              {language === 'ar' 
                ? 'يمكنك استخدام النص المنسق هنا' 
                : 'Vous pouvez utiliser du texte formaté ici'
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleContentEditor;

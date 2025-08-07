
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/language';
import ImageUpload from '../ImageUpload';
import ArticleContentEditor from './ArticleContentEditor';
import FileUpload from './FileUpload';

interface Publication {
  id: string;
  title: { ar: string; fr: string };
  description: { ar: string; fr: string };
  type: 'article' | 'book' | 'magazine';
  date: string;
  author: { ar: string; fr: string };
  image?: string;
  downloadUrl?: string;
  createdAt: string;
  // Article-specific fields
  content?: { ar: string; fr: string };
  authorImage?: string;
  // Magazine-specific fields
  issueNumber?: string;
  pages?: number;
  fileUrl?: string;
}

interface FormData {
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  type: Publication['type'];
  date: string;
  authorAr: string;
  authorFr: string;
  image: string;
  downloadUrl: string;
  // Article-specific
  contentAr: string;
  contentFr: string;
  authorImage: string;
  // Magazine-specific
  issueNumber: string;
  pages: string;
  fileUrl: string;
}

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => void;
  onCancel: () => void;
  editingPublication: Publication | null;
  labels: any;
  getLabel: (key: string) => string;
}

const PublicationForm: React.FC<Props> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  editingPublication,
  labels,
  getLabel
}) => {
  const { language } = useLanguage();

  const isArticle = formData.type === 'article';
  const isMagazine = formData.type === 'magazine';

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">
          {editingPublication ? getLabel('editPublication') : getLabel('addPublication')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{getLabel('title')} ({getLabel('arabic')})</Label>
            <Input
              value={formData.titleAr}
              onChange={(e) => setFormData(prev => ({ ...prev, titleAr: e.target.value }))}
              placeholder={getLabel('title')}
              className="font-cairo"
              dir="rtl"
            />
          </div>
          <div>
            <Label>{getLabel('title')} ({getLabel('french')})</Label>
            <Input
              value={formData.titleFr}
              onChange={(e) => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
              placeholder={getLabel('title')}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{getLabel('description')} ({getLabel('arabic')})</Label>
            <Textarea
              value={formData.descriptionAr}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
              placeholder={getLabel('description')}
              className="font-cairo"
              dir="rtl"
            />
          </div>
          <div>
            <Label>{getLabel('description')} ({getLabel('french')})</Label>
            <Textarea
              value={formData.descriptionFr}
              onChange={(e) => setFormData(prev => ({ ...prev, descriptionFr: e.target.value }))}
              placeholder={getLabel('description')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>{getLabel('type')}</Label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Publication['type'] }))}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="article">{getLabel('article')}</option>
              <option value="book">{getLabel('book')}</option>
              <option value="magazine">{getLabel('magazine')}</option>
            </select>
          </div>
          <div>
            <Label>{getLabel('date')}</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            />
          </div>
          {!isArticle && (
            <div>
              <Label>{getLabel('downloadUrl')}</Label>
              <Input
                value={formData.downloadUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, downloadUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{getLabel('author')} ({getLabel('arabic')})</Label>
            <Input
              value={formData.authorAr}
              onChange={(e) => setFormData(prev => ({ ...prev, authorAr: e.target.value }))}
              placeholder={getLabel('author')}
              className="font-cairo"
              dir="rtl"
            />
          </div>
          <div>
            <Label>{getLabel('author')} ({getLabel('french')})</Label>
            <Input
              value={formData.authorFr}
              onChange={(e) => setFormData(prev => ({ ...prev, authorFr: e.target.value }))}
              placeholder={getLabel('author')}
            />
          </div>
        </div>

        {/* Cover Image */}
        <ImageUpload
          label={getLabel('image')}
          onImageUpload={(imageData) => setFormData(prev => ({ ...prev, image: imageData }))}
          currentImage={formData.image}
        />

        {/* Article-specific fields */}
        {isArticle && (
          <>
            <ImageUpload
              label={getLabel('authorImage')}
              onImageUpload={(imageData) => setFormData(prev => ({ ...prev, authorImage: imageData }))}
              currentImage={formData.authorImage}
            />
            
            <ArticleContentEditor
              contentAr={formData.contentAr}
              contentFr={formData.contentFr}
              onContentChange={(contentAr, contentFr) => 
                setFormData(prev => ({ ...prev, contentAr, contentFr }))
              }
              getLabel={getLabel}
            />
          </>
        )}

        {/* Magazine-specific fields */}
        {isMagazine && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{getLabel('issueNumber')}</Label>
                <Input
                  value={formData.issueNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, issueNumber: e.target.value }))}
                  placeholder="Issue #1"
                />
              </div>
              <div>
                <Label>{getLabel('pages')}</Label>
                <Input
                  type="number"
                  value={formData.pages}
                  onChange={(e) => setFormData(prev => ({ ...prev, pages: e.target.value }))}
                  placeholder="Number of pages"
                />
              </div>
            </div>
            
            <FileUpload
              label={getLabel('magazineFile')}
              onFileUpload={(fileUrl) => setFormData(prev => ({ ...prev, fileUrl }))}
              currentFile={formData.fileUrl}
              acceptedTypes=".pdf,.epub"
            />
          </>
        )}

        <div className="flex gap-2">
          <Button onClick={onSubmit}>
            {getLabel('save')}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            {getLabel('cancel')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationForm;

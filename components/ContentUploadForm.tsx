
'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon } from 'lucide-react';
import ImageUpload from './admin/ImageUpload';

interface ContentFormData {
  title: string;
  description: string;
  image: string;
}

interface ContentUploadFormProps {
  onSubmit: (content: ContentFormData) => void;
}

const ContentUploadForm: React.FC<ContentUploadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.image) {
      toast.error('Please provide at least a title and image');
      return;
    }

    onSubmit(formData);
    setFormData({ title: '', description: '', image: '' });
    toast.success('Content uploaded successfully!');
  };

  return (
    <Card className="shadow-lg border-t-4 border-t-green-500">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Upload className="w-5 h-5" />
          Upload New Media Content
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter content title"
              className="border-2 focus:border-green-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter content description"
              className="border-2 focus:border-green-400"
            />
          </div>

          <ImageUpload
            label="Content Image *"
            onImageUpload={(imageData) => setFormData(prev => ({ ...prev, image: imageData }))}
            currentImage={formData.image}
          />

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Content
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContentUploadForm;

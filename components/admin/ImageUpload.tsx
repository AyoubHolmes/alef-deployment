
'use client'

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/language';

interface ImageUploadProps {
  onImageUpload: (imageData: string) => void;
  currentImage?: string;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  currentImage, 
  label,
  className = "" 
}) => {
  const { language } = useLanguage();
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const labels = {
    uploadImage: { ar: 'رفع صورة', fr: 'Télécharger une image' },
    dragDrop: { ar: 'اسحب وأفلت الصورة هنا، أو انقر للاختيار', fr: 'Glissez et déposez une image ici, ou cliquez pour sélectionner' },
    selectImage: { ar: 'اختر صورة', fr: 'Sélectionner une image' },
    invalidFile: { ar: 'يرجى اختيار ملف صورة صالح', fr: 'Veuillez sélectionner un fichier image valide' }
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setPreview(imageData);
        onImageUpload(imageData);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error(getLabel('invalidFile'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {label && (
        <Label className={`text-sm font-medium mb-2 block ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {label}
        </Label>
      )}
      <Card 
        className={`border-2 border-dashed transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-6">
          {preview ? (
            <div className="relative">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-md"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                {getLabel('dragDrop')}
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {getLabel('selectImage')}
              </Button>
            </div>
          )}
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUpload;

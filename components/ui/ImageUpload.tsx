'use client'

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  label: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  currentImage,
  label,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.url);
        onImageUpload(data.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {imageUrl ? (
        <div className="relative w-full max-w-md">
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div 
          onClick={handleUploadClick}
          className="w-full max-w-md h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <ImageIcon size={48} className="text-gray-400 mb-2" />
          <p className="text-gray-500 text-center">
            Click to upload image
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG, GIF up to 5MB
          </p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={handleUploadClick}
        disabled={uploading}
        className="w-full max-w-md"
      >
        <Upload size={16} className="mr-2" />
        {uploading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </div>
  );
};

export default ImageUpload;

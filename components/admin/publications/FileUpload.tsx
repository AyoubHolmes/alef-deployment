
'use client'

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, File, X } from 'lucide-react';
import { useLanguage } from '@/contexts/language';

interface Props {
  label: string;
  onFileUpload: (fileData: string) => void;
  currentFile?: string;
  acceptedTypes?: string;
}

const FileUpload: React.FC<Props> = ({
  label,
  onFileUpload,
  currentFile,
  acceptedTypes = ".pdf,.epub,.doc,.docx"
}) => {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll create a mock URL
      const mockUrl = `${window.location.origin}/uploads/${file.name}`;
      onFileUpload(mockUrl);
    }
  };

  const handleUrlInput = (url: string) => {
    onFileUpload(url);
  };

  const clearFile = () => {
    onFileUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">{label}</Label>
      
      <Card className="p-4 border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
        <div className="space-y-4">
          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {language === 'ar' ? 'رفع ملف' : 'Télécharger un fichier'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="text-xs text-gray-500 text-center">
              {language === 'ar' 
                ? 'أو اربط ملف موجود'
                : 'Ou liez un fichier existant'
              }
            </p>
          </div>

          {/* URL Input */}
          <div className="space-y-2">
            <Input
              placeholder={language === 'ar' ? 'رابط الملف' : 'URL du fichier'}
              value={currentFile || ''}
              onChange={(e) => handleUrlInput(e.target.value)}
            />
          </div>

          {/* Current File Display */}
          {currentFile && (
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <File className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700 truncate">
                  {currentFile.split('/').pop() || currentFile}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FileUpload;

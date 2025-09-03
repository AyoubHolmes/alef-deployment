'use client'

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

interface DocumentUploadProps {
  onDocumentUpload: (documentUrl: string) => void;
  currentDocument?: string;
  label: string;
  className?: string;
  acceptedTypes?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onDocumentUpload,
  currentDocument,
  label,
  className = '',
  acceptedTypes = '.pdf,.doc,.docx'
}) => {
  const [uploading, setUploading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState(currentDocument || '');
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
        setDocumentUrl(data.url);
        onDocumentUpload(data.url);
        toast.success('Document uploaded successfully');
      } else {
        toast.error(data.error || 'Failed to upload document');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveDocument = () => {
    setDocumentUrl('');
    onDocumentUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'Document';
  };

  const handleDownload = () => {
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
        className="hidden"
      />

      {documentUrl ? (
        <div className="relative w-full max-w-md">
          <div className="flex items-center p-4 border rounded-lg bg-gray-50">
            <FileText size={24} className="text-gray-600 mr-3" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {getFileName(documentUrl)}
              </p>
              <p className="text-xs text-gray-500">
                Document uploaded
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownload}
                title="Download document"
              >
                <Download size={16} />
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemoveDocument}
                title="Remove document"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div 
          onClick={handleUploadClick}
          className="w-full max-w-md h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <FileText size={32} className="text-gray-400 mb-2" />
          <p className="text-gray-500 text-center text-sm">
            Click to upload document
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PDF, DOC, DOCX up to 10MB
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
        {uploading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </div>
  );
};

export default DocumentUpload;

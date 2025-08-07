
'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
}

interface ContentListProps {
  content: ContentItem[];
  onDelete: (id: string) => void;
}

const ContentList: React.FC<ContentListProps> = ({ content, onDelete }) => {
  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id);
      toast.success('Content deleted successfully');
    }
  };

  if (content.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Uploaded Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">No content uploaded yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Content ({content.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {content.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Uploaded: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(item.id, item.title)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentList;

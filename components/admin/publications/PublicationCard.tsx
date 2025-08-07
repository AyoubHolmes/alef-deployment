
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit3, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language';

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
}

interface Props {
  publication: Publication;
  onEdit: (publication: Publication) => void;
  onDelete: (id: string) => void;
  getLabel: (key: string) => string;
}

const PublicationCard: React.FC<Props> = ({ publication, onEdit, onDelete, getLabel }) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={`text-lg font-bold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {publication.title[language]}
            </h3>
            <p className="text-gray-600 mb-2">{publication.description[language]}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>{getLabel('type')}: {getLabel(publication.type)}</p>
              <p>{getLabel('author')}: {publication.author[language]}</p>
              <p>{getLabel('date')}: {publication.date}</p>
            </div>
            {publication.image && (
              <img src={publication.image} alt={publication.title[language]} className="mt-2 w-20 h-20 object-cover rounded" />
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(publication)}
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(publication.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationCard;

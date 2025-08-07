
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';
import PublicationCard from './PublicationCard';

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
  publications: Publication[];
  onEdit: (publication: Publication) => void;
  onDelete: (id: string) => void;
  getLabel: (key: string) => string;
}

const PublicationsList: React.FC<Props> = ({ publications, onEdit, onDelete, getLabel }) => {
  const { language } = useLanguage();

  if (publications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className={`text-gray-500 text-center ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {getLabel('noPublications')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {publications.map(publication => (
        <PublicationCard
          key={publication.id}
          publication={publication}
          onEdit={onEdit}
          onDelete={onDelete}
          getLabel={getLabel}
        />
      ))}
    </div>
  );
};

export default PublicationsList;

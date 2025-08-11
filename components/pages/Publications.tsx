
'use client'

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { useContentManager } from '@/hooks/useContentManager';
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Eye, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Publications = () => {
  const { language } = useLanguage();
  const { getContentValue } = useContentManager();
  const router = useRouter();

  // Get publications from localStorage (managed by admin)
  const [publications, setPublications] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('publications');
      setPublications(saved ? JSON.parse(saved) : []);
    }
  }, []);

  const publicationTypes = [
    {
      id: 'articles',
      name: getContentValue('publications', 'types', 'articles_title', language) || (language === 'ar' ? 'المقالات' : 'Articles'),
      description: getContentValue('publications', 'types', 'articles_description', language) || (language === 'ar' ? 'مقالات ثقافية وأدبية' : 'Articles culturels et littéraires'),
      icon: FileText,
      path: '/publications/articles',
      color: '#074D8C'
    },
    {
      id: 'books',
      name: getContentValue('publications', 'types', 'books_title', language) || (language === 'ar' ? 'كتب' : 'Livres'),
      description: getContentValue('publications', 'types', 'books_description', language) || (language === 'ar' ? 'مجموعة من الكتب المتخصصة' : 'Collection de livres spécialisés'),
      icon: BookOpen,
      path: '/publications/books',
      color: '#074D8C'
    },
    {
      id: 'dionysos',
      name: language === 'ar' ? 'أصدقاء ديونيزوس' : 'Amis de Dionysos',
      description: language === 'ar' ? 'مجلة شهرية للثقافة والفنون' : 'Magazine mensuel de culture et arts',
      icon: FileText,
      path: '/publications/amis-dionysos',
      color: '#F7A520'
    },
    {
      id: 'artchiv',
      name: language === 'ar' ? 'آرت-شيف' : 'Art\'Chiv',
      description: language === 'ar' ? 'مجلة فصلية للأدب والشعر' : 'Magazine trimestriel de littérature et poésie',
      icon: FileText,
      path: '/publications/art-chiv',
      color: '#F7A520'
    },
    {
      id: 'biais',
      name: language === 'ar' ? 'أحياز بصرية' : 'Biais Artistiques',
      description: language === 'ar' ? 'مجلة متخصصة في الفنون البصرية المعاصرة' : 'Magazine spécialisé en arts visuels contemporains',
      icon: FileText,
      path: '/publications/biais-artistiques',
      color: '#F7A520'
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {getContentValue('publications', 'hero', 'title', language) || (language === 'ar' ? 'المنشورات' : 'Publications')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getContentValue('publications', 'hero', 'description', language) || 
              (language === 'ar' 
                ? 'اكتشف مجموعتنا المتنوعة من المنشورات الثقافية والأدبية'
                : 'Découvrez notre collection diversifiée de publications culturelles et littéraires'
              )
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {publicationTypes.map((type) => (
            <div key={type.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <type.icon className="h-8 w-8" style={{ color: type.color }} />
                  <h3 className={`text-xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {type.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <Button 
                  onClick={() => router.push(type.path)}
                  className="w-full"
                  style={{ backgroundColor: type.color }}
                >
                  {language === 'ar' ? 'استكشاف' : 'Explorer'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Publications */}
        {publications.length > 0 && (
          <div>
            <h2 className={`text-3xl font-bold mb-8 text-center ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'المنشورات الحديثة' : 'Publications Récentes'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publications.slice(0, 6).map((publication: any) => (
                <div key={publication.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {publication.image && (
                    <img 
                      src={publication.image} 
                      alt={publication.title[language]} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {publication.type === 'article' ? (language === 'ar' ? 'مقال' : 'Article') :
                         publication.type === 'book' ? (language === 'ar' ? 'كتاب' : 'Livre') :
                         (language === 'ar' ? 'مجلة' : 'Magazine')}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {publication.title[language]}
                    </h3>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {publication.description[language]}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      📝 {publication.author[language]}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      📅 {publication.date}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => console.log('View publication', publication.id)}
                      >
                        {language === 'ar' ? 'عرض' : 'Voir'}
                      </Button>
                      {publication.downloadUrl && (
                        <Button 
                          size="sm" 
                          className="bg-[#074D8C] hover:bg-[#05396b]"
                          onClick={() => window.open(publication.downloadUrl, '_blank')}
                        >
                          {language === 'ar' ? 'تحميل' : 'Télécharger'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Publications;

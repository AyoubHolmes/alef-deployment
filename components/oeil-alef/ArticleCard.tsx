
import React from 'react';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download } from 'lucide-react';
import { OeilDAlefArticle } from '@/data/oeilDAlefArticles';

interface ArticleCardProps {
  article: OeilDAlefArticle;
  onReadArticle: (articleId: number) => void;
  onDownload: (articleId: number) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onReadArticle, onDownload }) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={article.image} 
            alt={article.title[language]}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex items-center mb-2">
            <FileText className="mr-2 h-5 w-5 text-[#074D8C]" />
            <span className="text-sm text-gray-500">{article.date}</span>
            <span className="mx-2">•</span>
            <span className="text-sm bg-[#074D8C] text-white px-2 py-1 rounded">
              {article.categoryLabel[language]}
            </span>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {article.title[language]}
          </h3>
          <p className="text-gray-600 mb-2">{article.author[language]}</p>
          <p className="text-gray-700 mb-4">{article.excerpt[language]}</p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onReadArticle(article.id)}
            >
              <Eye className="mr-1 h-4 w-4" />
              {language === 'ar' ? 'قراءة كاملة' : 'Lire complet'}
            </Button>
            <Button 
              size="sm" 
              className="bg-[#074D8C] hover:bg-[#05396b]"
              onClick={() => onDownload(article.id)}
            >
              <Download className="mr-1 h-4 w-4" />
              {language === 'ar' ? 'تحميل' : 'Télécharger'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

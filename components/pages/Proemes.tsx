
'use client'

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { oeilDAlefArticles } from '@/data/oeilDAlefArticles';
import ArticleCard from '@/components/oeil-alef/ArticleCard';

const Proemes = () => {
  const { language } = useLanguage();
  const router = useRouter();

  // Filter articles for proèmes category
  const proemesArticles = oeilDAlefArticles.filter(article => article.category === 'proemes');

  const handleDownload = (articleId: number) => {
    console.log(`Downloading article ${articleId}`);
  };

  const handleReadArticle = (articleId: number) => {
    router.push(`/proemes/article/${articleId}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/activities')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'العودة إلى الأنشطة' : 'Retour aux activités'}
          </Button>
          
          <h1 className={`text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'نثريات' : 'Proèmes'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'مجموعة من المقالات في فن النثر والكتابة الإبداعية'
              : 'Collection d\'articles sur l\'art de la prose et l\'écriture créative'
            }
          </p>
        </div>

        <div className="grid gap-6">
          {proemesArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onReadArticle={handleReadArticle}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {proemesArticles.length === 0 && (
          <div className="text-center py-12">
            <h3 className={`text-xl font-medium text-gray-500 mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'لا توجد مقالات حالياً' : 'Aucun article pour le moment'}
            </h3>
            <p className="text-gray-400">
              {language === 'ar' 
                ? 'سيتم إضافة المحتوى قريباً'
                : 'Le contenu sera ajouté prochainement'
              }
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Proemes;

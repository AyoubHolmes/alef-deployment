'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ArticleCard from '@/components/oeil-alef/ArticleCard';

interface Article {
  id: number;
  titleAr: string;
  titleFr: string;
  authorAr: string;
  authorFr: string;
  translatorAr?: string;
  translatorFr?: string;
  date: string;
  category: string;
  categoryLabelAr: string;
  categoryLabelFr: string;
  image: string;
  excerptAr: string;
  excerptFr: string;
  contentAr: string;
  contentFr: string;
  additionalImages: string[];
  published: boolean;
}

const Education = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/education');
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.data);
      } else {
        setError(language === 'ar' ? 'فشل في جلب المقالات' : 'Échec du chargement des articles');
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (articleId: number) => {
    console.log(`Downloading article ${articleId}`);
  };

  const handleReadArticle = (articleId: number) => {
    router.push(`/activities/education/article/${articleId}`);
  };

  // Transform the article to match the expected format for ArticleCard
  const transformArticle = (article: Article) => ({
    id: article.id,
    title: { ar: article.titleAr, fr: article.titleFr },
    author: { ar: article.authorAr, fr: article.authorFr },
    translator: article.translatorAr && article.translatorFr 
      ? { ar: article.translatorAr, fr: article.translatorFr }
      : undefined,
    date: article.date,
    category: 'education' as const,
    categoryLabel: { ar: article.categoryLabelAr, fr: article.categoryLabelFr },
    image: article.image,
    excerpt: { ar: article.excerptAr, fr: article.excerptFr },
    content: { ar: article.contentAr, fr: article.contentFr },
    additionalImages: article.additionalImages
  });

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
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
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </MainLayout>
    );
  }

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
            {language === 'ar' ? 'تربية' : 'Éducation'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'مجموعة من المقالات التربوية والتعليمية'
              : 'Collection d\'articles éducatifs et pédagogiques'
            }
          </p>
        </div>

        <div className="grid gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={transformArticle(article)}
              onReadArticle={handleReadArticle}
              onDownload={handleDownload}
            />
          ))}
        </div>

        {articles.length === 0 && (
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

export default Education;
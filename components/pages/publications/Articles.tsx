
'use client'

import React from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Articles = () => {
  const { language } = useLanguage();
  const router = useRouter();

  const articles = [
    {
      id: 1,
      title: language === 'ar' ? 'الأدب المغربي المعاصر' : 'Littérature marocaine contemporaine',
      author: language === 'ar' ? 'د. أحمد المالكي' : 'Dr. Ahmed Malki',
      date: '2024-01-15',
      category: language === 'ar' ? 'أدب' : 'Littérature',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      excerpt: language === 'ar' 
        ? 'دراسة تحليلية للتطورات الحديثة في الأدب المغربي'
        : 'Analyse des développements récents de la littérature marocaine'
    },
    {
      id: 2,
      title: language === 'ar' ? 'الفن والثقافة في العصر الرقمي' : 'Art et culture à l\'ère numérique',
      author: language === 'ar' ? 'فاطمة الزهراء' : 'Fatima Zahra',
      date: '2024-02-10',
      category: language === 'ar' ? 'ثقافة رقمية' : 'Culture numérique',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      excerpt: language === 'ar' 
        ? 'تأثير التكنولوجيا على الإبداع الفني والثقافي'
        : 'Impact de la technologie sur la créativité artistique et culturelle'
    }
  ];

  const handleDownload = (articleId: number) => {
    console.log(`Downloading article ${articleId}`);
  };

  const handleReadArticle = (articleId: number) => {
    router.push(`/publications/articles/${articleId}`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/publications')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'العودة إلى المنشورات' : 'Retour aux publications'}
          </Button>
          
          <h1 className={`text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {language === 'ar' ? 'المقالات' : 'Articles'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'مجموعة من المقالات الثقافية والأدبية المتنوعة'
              : 'Collection d\'articles culturels et littéraires variés'
            }
          </p>
        </div>

        <div className="grid gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center mb-2">
                    <FileText className="mr-2 h-5 w-5 text-[#074D8C]" />
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <span className="mx-2">•</span>
                    <span className="text-sm bg-[#074D8C] text-white px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{article.author}</p>
                  <p className="text-gray-700 mb-4">{article.excerpt}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReadArticle(article.id)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      {language === 'ar' ? 'قراءة كاملة' : 'Lire complet'}
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-[#074D8C] hover:bg-[#05396b]"
                      onClick={() => handleDownload(article.id)}
                    >
                      <Download className="mr-1 h-4 w-4" />
                      {language === 'ar' ? 'تحميل' : 'Télécharger'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Articles;

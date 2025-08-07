'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Calendar, User, Clock } from 'lucide-react';
import { oeilDAlefArticles } from '@/data/oeilDAlefArticles';

const OeilAlefArticleDetail = () => {
  const { id, category } = useParams();
  const router = useRouter();
  const { language } = useLanguage();

  const article = oeilDAlefArticles.find(a => a.id === parseInt(id || ''));

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'المقال غير موجود' : 'Article non trouvé'}
          </h1>
          <Button onClick={() => router.push(-1)}>
            {language === 'ar' ? 'العودة' : 'Retour'}
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleDownload = () => {
    console.log(`Downloading article ${article.id}`);
  };

  const getCategoryPath = () => {
    // Navigate back to the category page that shows the article list
    const currentPath = window.pathname;
    const pathParts = currentPath.split('/');
    // Remove '/article/{id}' from the end to get back to the category list
    return pathParts.slice(0, -2).join('/');
  };

  const getCategoryName = () => {
    switch (category) {
      case 'visual-arts':
        return language === 'ar' ? 'الفنون البصرية' : 'Arts Visuels';
      case 'literary-thought':
        return language === 'ar' ? 'أدب وفكر' : 'Littérature et pensée';
      case 'education':
        return language === 'ar' ? 'تربية' : 'Éducation';
      case 'proemes':
        return language === 'ar' ? 'نثريات' : 'Proèmes';
      default:
        return language === 'ar' ? 'الأنشطة' : 'Activités';
    }
  };

  const displayImages = () => {
    const images = article.additionalImages || [];
    const defaultImages = [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop'
    ];
    
    // If we have at least one additional image, use it, otherwise use defaults
    if (images.length >= 2) {
      return images.slice(0, 2);
    } else if (images.length === 1) {
      return [images[0], defaultImages[1]];
    } else {
      return defaultImages;
    }
  };

  return (
    <MainLayout>
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push(getCategoryPath())}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ar' ? `العودة إلى قائمة المقالات` : `Retour à la liste des articles`}
          </Button>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {article.categoryLabel[language]}
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat text-left'}`}>
            {article.title[language]}
          </h1>

          {/* Meta Information */}
          <div className={`flex flex-wrap items-center gap-6 text-gray-600 mb-8 ${language === 'ar' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{language === 'ar' ? 'قراءة 5 دقائق' : '5 min de lecture'}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={article.image} 
              alt={article.title[language]}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Author & Translator Section */}
        <div className={`mb-8 p-6 bg-gray-50 rounded-lg ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="flex items-start gap-6">
            {/* Author */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-500 block mb-1">
                  {language === 'ar' ? 'المؤلف' : 'Auteur'}
                </span>
                <h3 className="font-bold text-lg text-gray-900">{article.author[language]}</h3>
              </div>
            </div>
            
            {/* Translator */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-500 block mb-1">
                  {language === 'ar' ? 'المترجم' : 'Traducteur'}
                </span>
                <h4 className="font-semibold text-gray-700">{article.translator?.[language]}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className={`prose prose-lg max-w-none mb-12 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className={`text-gray-800 leading-relaxed space-y-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {article.content[language].split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Additional Images - Always show two images */}
        <div className="mb-12">
          <h3 className={`text-xl font-bold mb-6 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat text-left'}`}>
            {language === 'ar' ? 'صور إضافية' : 'Images supplémentaires'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayImages().map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src={image} 
                  alt={`${article.title[language]} - ${language === 'ar' ? 'صورة' : 'Image'} ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Article Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center py-8 border-t border-gray-200">
          <Button 
            className="bg-[#074D8C] hover:bg-[#05396b] text-white px-8 py-3"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-5 w-5" />
            {language === 'ar' ? 'تحميل المقال' : 'Télécharger l\'article'}
          </Button>
          <Button 
            variant="outline"
            className="px-8 py-3"
            onClick={() => router.push(getCategoryPath())}
          >
            {language === 'ar' ? 'مقالات أخرى' : 'Autres articles'}
          </Button>
        </div>
      </article>
    </MainLayout>
  );
};

export default OeilAlefArticleDetail;

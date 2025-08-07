
'use client'

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Books = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      id: 1,
      title: {
        ar: 'تاريخ الثقافة المغربية',
        fr: 'Histoire de la culture marocaine'
      },
      author: {
        ar: 'د. محمد الأندلسي',
        fr: 'Dr. Mohammed Andalusi'
      },
      year: '2023',
      pages: 320,
      isbn: '978-9981-123-456-7',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      description: language === 'ar' 
        ? 'دراسة شاملة لتطور الثقافة المغربية عبر العصور، تتناول الجوانب الأدبية والفنية والاجتماعية'
        : 'Étude complète de l\'évolution de la culture marocaine à travers les âges, couvrant les aspects littéraires, artistiques et sociaux',
      summary: language === 'ar'
        ? 'يقدم هذا الكتاب نظرة معمقة على التراث الثقافي المغربي من خلال تحليل النصوص التاريخية والشواهد الأثرية. يستكشف المؤلف كيف تشكلت الهوية الثقافية المغربية عبر التفاعل مع الحضارات المختلفة.'
        : 'Ce livre offre un regard approfondi sur le patrimoine culturel marocain à travers l\'analyse de textes historiques et de témoignages archéologiques. L\'auteur explore comment l\'identité culturelle marocaine s\'est formée par l\'interaction avec différentes civilisations.',
      downloadUrl: '/sample-book-1.pdf'
    },
    {
      id: 2,
      title: {
        ar: 'الشعر المغربي الحديث',
        fr: 'Poésie marocaine moderne'
      },
      author: {
        ar: 'أمينة الكتاني',
        fr: 'Amina Kettani'
      },
      year: '2023',
      pages: 280,
      isbn: '978-9981-123-457-4',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      description: language === 'ar' 
        ? 'مختارات من أجمل القصائد المغربية المعاصرة مع دراسة نقدية معمقة'
        : 'Anthologie des plus beaux poèmes marocains contemporains avec une étude critique approfondie',
      summary: language === 'ar'
        ? 'مجموعة منتقاة من أروع الأعمال الشعرية المغربية الحديثة، تضم قصائد لأبرز الشعراء المعاصرين مع تحليل أدبي ونقدي يسلط الضوء على خصائص الشعر المغربي الحديث.'
        : 'Collection soigneusement sélectionnée des plus belles œuvres poétiques marocaines modernes, comprenant des poèmes des poètes contemporains les plus éminents avec une analyse littéraire et critique mettant en lumière les caractéristiques de la poésie marocaine moderne.',
      downloadUrl: '/sample-book-2.pdf'
    }
  ];

  const openBookDetails = (book) => {
    setSelectedBook(book);
  };

  const closeBookDetails = () => {
    setSelectedBook(null);
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
            {language === 'ar' ? 'كتب' : 'Livres'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'مجموعة من الكتب المتخصصة في الثقافة والأدب'
              : 'Collection de livres spécialisés en culture et littérature'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="w-full">
                <AspectRatio ratio={3/4}>
                  <img 
                    src={book.image} 
                    alt={book.title[language]}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </AspectRatio>
              </div>
              <div className="p-4">
                <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {book.title[language]}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{book.author[language]}</p>
                <div className="flex gap-3 text-xs text-gray-500 mb-3">
                  <span>{book.year}</span>
                  <span>{book.pages} {language === 'ar' ? 'صفحة' : 'pages'}</span>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{book.description}</p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openBookDetails(book)}
                    className="flex-1 text-xs"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    {language === 'ar' ? 'التفاصيل' : 'Détails'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {selectedBook.title[language]}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeBookDetails}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="w-full max-w-sm mx-auto">
                    <AspectRatio ratio={3/4}>
                      <img 
                        src={selectedBook.image} 
                        alt={selectedBook.title[language]}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </AspectRatio>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold">{language === 'ar' ? 'المؤلف:' : 'Auteur:'} </span>
                        {selectedBook.author[language]}
                      </div>
                      <div>
                        <span className="font-semibold">{language === 'ar' ? 'سنة النشر:' : 'Année:'} </span>
                        {selectedBook.year}
                      </div>
                      <div>
                        <span className="font-semibold">{language === 'ar' ? 'عدد الصفحات:' : 'Pages:'} </span>
                        {selectedBook.pages}
                      </div>
                      <div>
                        <span className="font-semibold">ISBN: </span>
                        {selectedBook.isbn}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'ar' ? 'ملخص الكتاب' : 'Résumé du livre'}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedBook.summary}</p>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="outline" onClick={closeBookDetails}>
                    {language === 'ar' ? 'إغلاق' : 'Fermer'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Books;

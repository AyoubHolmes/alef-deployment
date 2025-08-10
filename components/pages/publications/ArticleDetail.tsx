
'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Calendar, User, Clock } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();

  // Sample articles data (in a real app, this would come from an API or context)
  const articles = [
    {
      id: 1,
      title: language === 'ar' ? 'الأدب المغربي المعاصر' : 'Littérature marocaine contemporaine',
      author: language === 'ar' ? 'د. أحمد المالكي' : 'Dr. Ahmed Malki',
      translator: language === 'ar' ? 'د. سعيد الحسني' : 'Dr. Said Hassani',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      translatorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      date: '2024-01-15',
      category: language === 'ar' ? 'أدب' : 'Littérature',
      heroImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop',
      content: language === 'ar'
        ? `يشهد الأدب المغربي المعاصر تطورات مهمة على مستوى الشكل والمضمون، حيث يسعى الكتاب المغاربة إلى استكشاف أساليب جديدة في التعبير الأدبي.

هذا المقال يتناول أبرز هذه التطورات ويحلل خصائص الكتابة الأدبية المعاصرة في المغرب، من خلال دراسة أعمال أبرز الكتاب المغاربة الجدد.

لقد شهدت الساحة الأدبية المغربية في العقود الأخيرة ظهور أصوات جديدة تحمل رؤى مختلفة وتقنيات سردية متطورة. هؤلاء الكتاب يجمعون بين الأصالة والحداثة، محافظين على الهوية المغربية الأصيلة مع الانفتاح على التجارب العالمية.

من أبرز خصائص هذا الأدب الجديد:
- التنويع في الأساليب السردية
- استخدام اللغة بطريقة إبداعية ومبتكرة
- تناول قضايا المجتمع المعاصر
- الاهتمام بالبعد النفسي للشخصيات

إن هذا التطور في الأدب المغربي يعكس نضج الوعي الثقافي والفكري للمجتمع المغربي، ويبشر بمستقبل واعد للإبداع الأدبي في المملكة.`
        : `La littérature marocaine contemporaine connaît des développements importants au niveau de la forme et du contenu, les écrivains marocains cherchant à explorer de nouvelles méthodes d'expression littéraire.

Cet article examine les principaux développements et analyse les caractéristiques de l'écriture littéraire contemporaine au Maroc, à travers l'étude des œuvres des écrivains marocains les plus éminents.

La scène littéraire marocaine a vu ces dernières décennies l'émergence de nouvelles voix portant des visions différentes et des techniques narratives avancées. Ces écrivains allient authenticité et modernité, préservant l'identité marocaine authentique tout en s'ouvrant aux expériences mondiales.

Parmi les principales caractéristiques de cette nouvelle littérature :
- Diversification des styles narratifs
- Utilisation créative et innovante du langage
- Traitement des questions de la société contemporaine
- Attention à la dimension psychologique des personnages

Cette évolution de la littérature marocaine reflète la maturité de la conscience culturelle et intellectuelle de la société marocaine, et augure d'un avenir prometteur pour la créativité littéraire dans le Royaume.`,
      images: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop'
      ]
    },
    {
      id: 2,
      title: language === 'ar' ? 'الفن والثقافة في العصر الرقمي' : 'Art et culture à l\'ère numérique',
      author: language === 'ar' ? 'فاطمة الزهراء' : 'Fatima Zahra',
      authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      date: '2024-02-10',
      category: language === 'ar' ? 'ثقافة رقمية' : 'Culture numérique',
      heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      content: language === 'ar'
        ? `لقد غيرت التكنولوجيا الرقمية وجه الثقافة والفن بشكل جذري، حيث أتاحت للفنانين والمبدعين إمكانيات جديدة للتعبير والوصول إلى جمهور أوسع.

يتناول هذا المقال كيفية تأثير التقنيات الحديثة على أشكال الفن التقليدية وظهور أشكال جديدة من الإبداع الرقمي.

إن التحول الرقمي لم يقتصر على تغيير وسائل العرض والتوزيع فحسب، بل امتد ليشمل طبيعة العمل الفني نفسه. فقد ظهرت أشكال جديدة من الفن مثل الفن التفاعلي والواقع الافتراضي.

من أبرز التأثيرات:
- ديمقراطية الوصول للفن والثقافة
- ظهور منصات رقمية جديدة للعرض
- تطوير تقنيات إبداعية متقدمة
- تغيير أنماط استهلاك المحتوى الثقافي

هذا التطور يفتح آفاقاً جديدة أمام المبدعين العرب للوصول إلى جمهور عالمي وتقديم أعمالهم بطرق مبتكرة.`
        : `La technologie numérique a radicalement transformé le visage de la culture et de l'art, offrant aux artistes et créateurs de nouvelles possibilités d'expression et d'accès à un public plus large.

Cet article examine comment les technologies modernes affectent les formes d'art traditionnelles et l'émergence de nouvelles formes de créativité numérique.

La transformation numérique ne s'est pas limitée à changer les moyens de présentation et de distribution, mais s'est étendue pour inclure la nature même de l'œuvre d'art. De nouvelles formes d'art ont émergé, comme l'art interactif et la réalité virtuelle.

Parmi les principaux impacts :
- Démocratisation de l'accès à l'art et à la culture
- Émergence de nouvelles plateformes numériques d'exposition
- Développement de techniques créatives avancées
- Changement des modèles de consommation culturelle

Cette évolution ouvre de nouveaux horizons aux créateurs arabes pour atteindre un public mondial et présenter leurs œuvres de manière innovante.`,
      images: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
      ]
    }
  ];

  const article = articles.find(a => a.id === parseInt(Array.isArray(id) ? id[0] : id || '0'));

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'المقال غير موجود' : 'Article non trouvé'}
          </h1>
          <Button onClick={() => router.push('/publications/articles')}>
            {language === 'ar' ? 'العودة إلى المقالات' : 'Retour aux articles'}
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleDownload = () => {
    console.log(`Downloading article ${article.id}`);
  };

  return (
    <MainLayout>
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/publications/articles')}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'العودة إلى المقالات' : 'Retour aux articles'}
          </Button>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
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
              src={article.heroImage} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className={`text-gray-800 leading-relaxed space-y-6 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
            {article.content.split('\n\n').map((paragraph, index) => (
              <div key={index}>
                {paragraph.includes('•') || paragraph.includes('-') ? (
                  <div className="my-6">
                    {paragraph.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className={line.trim().startsWith('-') || line.trim().startsWith('•') ? 'ml-6 mb-2 text-gray-700' : 'mb-4 font-semibold text-gray-900'}>
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mb-6 text-lg leading-relaxed">{paragraph}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Article Images */}
        {article.images && article.images.length > 0 && (
          <div className="mb-12">
            <div className="grid gap-8">
              {article.images.map((image, index) => (
                <figure key={index} className="text-center">
                  <img 
                    src={image} 
                    alt={`${language === 'ar' ? 'صورة المقال' : 'Illustration de l\'article'} ${index + 1}`}
                    className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600">
                    {language === 'ar' ? `صورة ${index + 1}` : `Figure ${index + 1}`}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* Author & Translator Section */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Author */}
            <div className="flex items-start gap-4">
              <img 
                src={article.authorImage} 
                alt={article.author}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center text-gray-600 mb-1">
                  <User className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">
                    {language === 'ar' ? 'المؤلف' : 'Auteur'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{article.author}</h3>
                <p className="text-gray-600">
                  {language === 'ar' ? 'كاتب وباحث في الأدب المعاصر' : 'Écrivain et chercheur en littérature contemporaine'}
                </p>
              </div>
            </div>
            
            {/* Translator (if exists) */}
            {article.translator && (
              <div className="flex items-start gap-4">
                <img 
                  src={article.translatorImage || article.authorImage} 
                  alt={article.translator}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center text-gray-600 mb-1">
                    <User className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">
                      {language === 'ar' ? 'المترجم' : 'Traducteur'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{article.translator}</h3>
                  <p className="text-gray-600">
                    {language === 'ar' ? 'مترجم ومحرر أدبي' : 'Traducteur et éditeur littéraire'}
                  </p>
                </div>
              </div>
            )}
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
            onClick={() => router.push('/publications/articles')}
          >
            {language === 'ar' ? 'مقالات أخرى' : 'Autres articles'}
          </Button>
        </div>
      </article>
    </MainLayout>
  );
};

export default ArticleDetail;

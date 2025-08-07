'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap } from 'lucide-react';

interface WorkshopCategory {
  id: number;
  titleAr: string;
  titleFr: string;
  icon: string;
  descriptionAr: string;
  descriptionFr: string;
}

interface Workshop {
  id: number;
  titleAr: string;
  titleFr: string;
  dateAr: string;
  dateFr: string;
  time: string;
  locationAr: string;
  locationFr: string;
  instructorAr: string;
  instructorFr: string;
  price: string;
  status: 'OPEN' | 'ALMOST_FULL' | 'FULL' | 'COMPLETED';
  categoryId: number;
  examplesAr: string[];
  examplesFr: string[];
}

const EducationalActivities = () => {
  const { t, language } = useLanguage();
  const [workshopCategories, setWorkshopCategories] = useState<WorkshopCategory[]>([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchEducationalActivities();
  }, []);

  const fetchEducationalActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/educational-activities');
      const data = await response.json();
      
      if (data.success) {
        setWorkshopCategories(data.data.categories || []);
        setUpcomingWorkshops(data.data.workshops || []);
      } else {
        setError(language === 'ar' ? 'فشل في جلب الأنشطة التعليمية' : 'Échec du chargement des activités éducatives');
      }
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ في الاتصال' : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusLabel = (status: string) => {
    if (status === 'OPEN') {
      return language === 'ar' ? 'متاح' : 'Places disponibles';
    } else if (status === 'ALMOST_FULL') {
      return language === 'ar' ? 'أماكن محدودة' : 'Places limitées';
    } else if (status === 'FULL') {
      return language === 'ar' ? 'مكتمل' : 'Complet';
    } else {
      return language === 'ar' ? 'منتهي' : 'Terminé';
    }
  };
  
  const getStatusColor = (status: string) => {
    if (status === 'OPEN') {
      return 'bg-green-100 text-green-800';
    } else if (status === 'ALMOST_FULL') {
      return 'bg-yellow-100 text-yellow-800';
    } else if (status === 'FULL') {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryExamples = (categoryId: number) => {
    const workshop = upcomingWorkshops.find(w => w.categoryId === categoryId);
    if (workshop) {
      return language === 'ar' ? workshop.examplesAr : workshop.examplesFr;
    }
    return [];
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8 px-4">
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
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">{error}</div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <section className={`mb-10 ${language === 'ar' ? 'text-right' : ''}`}>
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={28} className="text-[#2D439A]" />
            <h1 className={`text-3xl font-bold text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {t('educationalActivities')}
            </h1>
          </div>
          
          <div className={`prose max-w-none mb-8 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            <p className="text-lg">
              {language === 'ar' 
                ? 'تقدم جمعية ألف للغة والثقافة مجموعة متنوعة من الأنشطة التعليمية التي تهدف إلى نشر اللغة العربية وتعزيز التبادل الثقافي. تشمل هذه الأنشطة دورات لتعلم اللغة العربية، وورش عمل للترجمة، ودورات للخط العربي وغيرها من المجالات المتعلقة باللغة والثقافة.'
                : 'L\'Association ALEF pour la langue et la culture propose une variété d\'activités éducatives visant à promouvoir la langue arabe et à renforcer les échanges culturels. Ces activités comprennent des cours d\'apprentissage de l\'arabe, des ateliers de traduction, des cours de calligraphie arabe et d\'autres domaines liés à la langue et à la culture.'}
            </p>
          </div>
          
          <div className="bg-[#2D439A] text-white p-6 rounded-lg mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'التسجيل مفتوح!' : 'Inscriptions ouvertes !'}
            </h2>
            <p className={`mb-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' 
                ? 'التسجيل مفتوح الآن لدورات الصيف. احجز مكانك اليوم واستفد من خصم ١٥٪ للتسجيل المبكر حتى ١ يونيو.'
                : 'Les inscriptions sont maintenant ouvertes pour les cours d\'été. Réservez votre place aujourd\'hui et bénéficiez d\'une remise de 15% pour toute inscription anticipée jusqu\'au 1er juin.'}
            </p>
            <button className={`bg-[#F7A520] hover:bg-[#e89818] text-white py-2 px-6 rounded-md transition-colors font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'سجل الآن' : 'S\'inscrire maintenant'}
            </button>
          </div>
        </section>
        
        {workshopCategories.length > 0 && (
          <section className={`mb-12 ${language === 'ar' ? 'text-right' : ''}`}>
            <h2 className={`text-2xl font-semibold mb-8 text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'فئات الورش' : 'Catégories d\'ateliers'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workshopCategories.map(category => (
                <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className={`text-xl font-medium mb-3 text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {language === 'ar' ? category.titleAr : category.titleFr}
                  </h3>
                  <p className={`text-gray-700 mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {language === 'ar' ? category.descriptionAr : category.descriptionFr}
                  </p>
                  {getCategoryExamples(category.id).length > 0 && (
                    <div className={`mt-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      <h4 className="font-medium text-[#F7A520] mb-2">
                        {language === 'ar' ? 'أمثلة:' : 'Exemples :'}
                      </h4>
                      <ul className={`list-disc ${language === 'ar' ? 'pr-5' : 'pl-5'} text-gray-600`}>
                        {getCategoryExamples(category.id).map((example, index) => (
                          <li key={index}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {upcomingWorkshops.length > 0 && (
          <section className={`${language === 'ar' ? 'text-right' : ''}`}>
            <h2 className={`text-2xl font-semibold mb-6 text-[#2D439A] ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'الورش القادمة' : 'Prochains ateliers'}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className={`border px-4 py-3 text-left ${language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'الورشة' : 'Atelier'}
                    </th>
                    <th className={`border px-4 py-3 text-left ${language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </th>
                    <th className={`border px-4 py-3 text-left ${language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'المعلم' : 'Instructeur'}
                    </th>
                    <th className={`border px-4 py-3 text-left ${language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'السعر' : 'Prix'}
                    </th>
                    <th className={`border px-4 py-3 text-left ${language === 'ar' ? 'text-right font-cairo' : 'font-montserrat'}`}>
                      {language === 'ar' ? 'الحالة' : 'Statut'}
                    </th>
                    <th className={`border px-4 py-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}></th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingWorkshops.filter(w => w.status !== 'COMPLETED').map(workshop => (
                    <tr key={workshop.id} className="hover:bg-gray-50">
                      <td className={`border px-4 py-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        <div className="font-medium text-[#2D439A]">
                          {language === 'ar' ? workshop.titleAr : workshop.titleFr}
                        </div>
                        <div className="text-sm text-gray-600">
                          {language === 'ar' ? workshop.locationAr : workshop.locationFr}, {workshop.time}
                        </div>
                      </td>
                      <td className={`border px-4 py-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {language === 'ar' ? workshop.dateAr : workshop.dateFr}
                      </td>
                      <td className={`border px-4 py-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {language === 'ar' ? workshop.instructorAr : workshop.instructorFr}
                      </td>
                      <td className={`border px-4 py-3 font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        {workshop.price}
                      </td>
                      <td className={`border px-4 py-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workshop.status)}`}>
                          {getStatusLabel(workshop.status)}
                        </span>
                      </td>
                      <td className={`border px-4 py-3 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                        <button 
                          className={`
                            py-1 px-3 rounded text-sm font-medium transition-colors
                            ${workshop.status !== 'FULL' 
                              ? 'bg-[#2D439A] hover:bg-[#1c2e6e] text-white' 
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                          `}
                          disabled={workshop.status === 'FULL'}
                        >
                          {language === 'ar' ? 'سجل' : 'S\'inscrire'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className={`mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
              <h3 className="text-lg font-medium text-[#2D439A] mb-2">
                {language === 'ar' ? 'معلومات التسجيل' : 'Informations d\'inscription'}
              </h3>
              <ul className={`list-disc ${language === 'ar' ? 'pr-5' : 'pl-5'} space-y-2 text-gray-700`}>
                <li>
                  {language === 'ar' 
                    ? 'يمكن التسجيل عبر الإنترنت أو في مقر الجمعية.'
                    : 'L\'inscription peut se faire en ligne ou au siège de l\'association.'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'يجب دفع رسوم التسجيل مقدمًا لتأكيد الحجز.'
                    : 'Les frais d\'inscription doivent être payés à l\'avance pour confirmer la réservation.'}
                </li>
                <li>
                  {language === 'ar' 
                    ? 'يمكن إلغاء التسجيل قبل أسبوع من بدء الورشة مع استرداد ٨٠٪ من الرسوم.'
                    : 'L\'annulation est possible jusqu\'à une semaine avant le début de l\'atelier avec un remboursement de 80% des frais.'}
                </li>
              </ul>
            </div>
          </section>
        )}

        {workshopCategories.length === 0 && upcomingWorkshops.length === 0 && (
          <div className="text-center py-12">
            <h3 className={`text-xl font-medium text-gray-500 mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'لا توجد أنشطة تعليمية حالياً' : 'Aucune activité éducative pour le moment'}
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

export default EducationalActivities;
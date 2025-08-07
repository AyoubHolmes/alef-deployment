
'use client'

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AmisDionysos = () => {
  const { language } = useLanguage();
  const router = useRouter();
  const [selectedIssue, setSelectedIssue] = useState(null);

  const issues = [
    {
      id: 1,
      number: 12,
      title: language === 'ar' ? 'عدد خاص: الفنون المعاصرة' : 'Édition spéciale: Arts contemporains',
      date: '2024-03-01',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
      featured: language === 'ar' 
        ? 'ملف خاص عن الفن المغربي المعاصر'
        : 'Dossier spécial sur l\'art marocain contemporain',
      content: language === 'ar'
        ? 'يضم هذا العدد مجموعة من المقالات المتخصصة في الفن المغربي المعاصر، بالإضافة إلى حوارات حصرية مع أبرز الفنانين المغاربة المعاصرين. كما يتضمن معرضًا مصورًا للأعمال الفنية الحديثة ودراسات نقدية معمقة.'
        : 'Ce numéro comprend une collection d\'articles spécialisés dans l\'art marocain contemporain, ainsi que des interviews exclusives avec les artistes marocains contemporains les plus éminents. Il comprend également une galerie photographique d\'œuvres d\'art modernes et des études critiques approfondies.'
    },
    {
      id: 2,
      number: 11,
      title: language === 'ar' ? 'الأدب والذاكرة' : 'Littérature et mémoire',
      date: '2024-02-01',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      featured: language === 'ar' 
        ? 'استكشاف العلاقة بين الأدب والذاكرة الجماعية'
        : 'Exploration de la relation entre littérature et mémoire collective',
      content: language === 'ar'
        ? 'عدد مميز يستكشف العلاقة المعقدة بين الأدب والذاكرة الجماعية، من خلال دراسات أكاديمية وإبداعات أدبية متنوعة. يتضمن مقالات حول دور الأدب في حفظ الذاكرة الثقافية ونقلها عبر الأجيال.'
        : 'Numéro spécial explorant la relation complexe entre littérature et mémoire collective, à travers des études académiques et des créations littéraires variées. Il comprend des articles sur le rôle de la littérature dans la préservation et la transmission de la mémoire culturelle à travers les générations.'
    }
  ];

  const handleDownload = (issueId) => {
    console.log(`Downloading magazine issue ${issueId}`);
  };

  const openIssueDetails = (issue) => {
    setSelectedIssue(issue);
  };

  const closeIssueDetails = () => {
    setSelectedIssue(null);
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
            {language === 'ar' ? 'أصدقاء ديونيزوس' : 'Amis de Dionysos'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'مجلة شهرية تركز على الثقافة والفنون المعاصرة'
              : 'Magazine mensuel axé sur la culture et les arts contemporains'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="w-full">
                <AspectRatio ratio={3/4}>
                  <img 
                    src={issue.image} 
                    alt={issue.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </AspectRatio>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <FileText className="mr-2 h-4 w-4 text-[#074D8C]" />
                  <span className="text-xs font-semibold text-[#074D8C]">
                    {language === 'ar' ? `العدد ${issue.number}` : `Numéro ${issue.number}`}
                  </span>
                </div>
                <h4 className={`text-lg font-bold mb-2 line-clamp-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {issue.title}
                </h4>
                <p className="text-gray-600 text-xs mb-2">{issue.date}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{issue.featured}</p>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => openIssueDetails(issue)}
                    className="flex-1 text-xs"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    {language === 'ar' ? 'التفاصيل' : 'Détails'}
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-[#074D8C] hover:bg-[#05396b]"
                    onClick={() => handleDownload(issue.id)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Issue Details Modal */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {selectedIssue.title}
                    </h2>
                    <div className="flex items-center text-gray-600">
                      <span className="font-semibold">
                        {language === 'ar' ? `العدد ${selectedIssue.number}` : `Numéro ${selectedIssue.number}`}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{selectedIssue.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closeIssueDetails}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="w-full max-w-sm mx-auto">
                    <AspectRatio ratio={3/4}>
                      <img 
                        src={selectedIssue.image} 
                        alt={selectedIssue.title}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                      />
                    </AspectRatio>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      {language === 'ar' ? 'في هذا العدد' : 'Dans ce numéro'}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedIssue.content}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-[#074D8C] hover:bg-[#05396b]"
                    onClick={() => handleDownload(selectedIssue.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {language === 'ar' ? 'تحميل العدد' : 'Télécharger le numéro'}
                  </Button>
                  <Button variant="outline" onClick={closeIssueDetails}>
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

export default AmisDionysos;

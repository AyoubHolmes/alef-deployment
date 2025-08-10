'use client'

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Eye, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AspectRatio } from "@/components/ui/aspect-ratio";

const BiaisArtistiques = () => {
  const { language } = useLanguage();
  const router = useRouter();
  type Issue = {
    id: number;
    number: number;
    title: string;
    date: string;
    image: string;
    featured: string;
    content: string;
  } | null;

  const [selectedIssue, setSelectedIssue] = useState<Issue>(null);

  const issues = [
    {
      id: 1,
      number: 5,
      title: language === 'ar' ? 'الفن التفاعلي والتكنولوجيا' : 'Art interactif et technologie',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
      featured: language === 'ar' 
        ? 'استكشاف حدود الفن الرقمي والتفاعل البصري'
        : 'Explorer les frontières de l\'art numérique et de l\'interaction visuelle',
      content: language === 'ar'
        ? 'عدد رائد يتناول أحدث التطورات في الفن التفاعلي والرقمي، مع التركيز على كيفية تأثير التكنولوجيا على الإبداع البصري. يضم مقابلات مع فنانين رقميين رائدين ودراسات حول مستقبل الفن في العصر الرقمي.'
        : 'Numéro pionnier traitant des derniers développements dans l\'art interactif et numérique, en se concentrant sur l\'impact de la technologie sur la créativité visuelle. Il comprend des interviews avec des artistes numériques pionniers et des études sur l\'avenir de l\'art à l\'ère numérique.'
    },
    {
      id: 2,
      number: 4,
      title: language === 'ar' ? 'التراث البصري المغربي' : 'Patrimoine visuel marocain',
      date: '2023-12-01',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      featured: language === 'ar' 
        ? 'رحلة عبر تاريخ الفنون البصرية في المغرب'
        : 'Voyage à travers l\'histoire des arts visuels au Maroc',
      content: language === 'ar'
        ? 'عدد خاص يحتفي بالتراث البصري المغربي الغني، من الفنون التقليدية إلى التعبيرات المعاصرة. يستكشف تطور الفن المغربي عبر العصور ودوره في تشكيل الهوية الثقافية الوطنية.'
        : 'Numéro spécial célébrant le riche patrimoine visuel marocain, des arts traditionnels aux expressions contemporaines. Il explore l\'évolution de l\'art marocain à travers les âges et son rôle dans la formation de l\'identité culturelle nationale.'
    }
  ];

  const handleDownload = (issueId: number) => {
    console.log(`Downloading magazine issue ${issueId}`);
  };

  const openIssueDetails = (issue: NonNullable<Issue>) => {
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
            {language === 'ar' ? 'أحياز بصرية' : 'Biais Artistiques'}
          </h1>
          <p className="text-lg text-gray-600">
            {language === 'ar' 
              ? 'مجلة متخصصة في الفنون البصرية المعاصرة والنقد الفني'
              : 'Magazine spécialisé en arts visuels contemporains et critique artistique'
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
                  <FileText className="mr-2 h-4 w-4 text-[#F7A520]" />
                  <span className="text-xs font-semibold text-[#F7A520]">
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
                    className="bg-[#F7A520] hover:bg-[#e6941c]"
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
                    className="flex-1 bg-[#F7A520] hover:bg-[#e6941c]"
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

export default BiaisArtistiques;

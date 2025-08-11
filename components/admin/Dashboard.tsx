
'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language';
import { 
  FileText, 
  BookOpen, 
  Newspaper, 
  Calendar, 
  Users, 
  UserCheck, 
  Play, 
  Handshake,
  Globe,
  AlertCircle
} from 'lucide-react';

interface DashboardStats {
  publications: {
    articles: number;
    books: number;
    magazines: number;
    magazineAlef: number;
    magazineHikma: number;
  };
  activities: {
    total: number;
    educational: number;
    artExhibitions: number;
    literaryGatherings: number;
  };
  team: {
    members: number;
  };
  associationMembers: {
    members: number;
  };
  culturalChannel: {
    videos: number;
  };
  partners: {
    total: number;
  };
  translations: {
    missingArabic: number;
    missingFrench: number;
    complete: number;
  };
}

const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const [stats, setStats] = useState<DashboardStats>({
    publications: {
      articles: 0,
      books: 0,
      magazines: 0,
      magazineAlef: 0,
      magazineHikma: 0,
    },
    activities: {
      total: 0,
      educational: 0,
      artExhibitions: 0,
      literaryGatherings: 0,
    },
    team: {
      members: 0,
    },
    associationMembers: {
      members: 0,
    },
    culturalChannel: {
      videos: 0,
    },
    partners: {
      total: 0,
    },
    translations: {
      missingArabic: 0,
      missingFrench: 0,
      complete: 0,
    },
  });

  const labels = {
    dashboardTitle: { ar: 'لوحة التحكم الرئيسية', fr: 'Tableau de bord principal' },
    publicationsOverview: { ar: 'نظرة عامة على المنشورات', fr: 'Aperçu des publications' },
    activitiesOverview: { ar: 'نظرة عامة على الأنشطة', fr: 'Aperçu des activités' },
    teamOverview: { ar: 'نظرة عامة على الفريق', fr: 'Aperçu de l\'équipe' },
    translationStatus: { ar: 'حالة الترجمة', fr: 'État des traductions' },
    articles: { ar: 'المقالات', fr: 'Articles' },
    books: { ar: 'كتب', fr: 'Livres' },
    magazines: { ar: 'المجلات', fr: 'Magazines' },
    magazineAlef: { ar: 'مجلة ألف', fr: 'Magazine ALEF' },
    magazineHikma: { ar: 'مجلة حكمة', fr: 'Magazine Hikma' },
    totalActivities: { ar: 'إجمالي الأنشطة', fr: 'Total des activités' },
    educationalActivities: { ar: 'الأنشطة التعليمية', fr: 'Activités éducatives' },
    artExhibitions: { ar: 'المعارض الفنية', fr: 'Expositions d\'art' },
    literaryGatherings: { ar: 'اللقاءات الأدبية', fr: 'Rencontres littéraires' },
    teamMembers: { ar: 'أعضاء الفريق', fr: 'Membres de l\'équipe' },
    associationMembers: { ar: 'أعضاء الجمعية', fr: 'Membres de l\'association' },
    culturalVideos: { ar: 'فيديوهات القناة الثقافية', fr: 'Vidéos de la chaîne culturelle' },
    partners: { ar: 'الشركاء', fr: 'Partenaires' },
    completeTranslations: { ar: 'الترجمات المكتملة', fr: 'Traductions complètes' },
    missingArabic: { ar: 'نقص في الترجمة العربية', fr: 'Traductions arabes manquantes' },
    missingFrench: { ar: 'نقص في الترجمة الفرنسية', fr: 'Traductions françaises manquantes' },
  };

  const getLabel = (key: string) => labels[key as keyof typeof labels]?.[language] || key;

  useEffect(() => {
    const calculateStats = () => {
      if (typeof window === 'undefined') return;
      
      // Publications stats
      const publications = JSON.parse(localStorage.getItem('publications') || '[]');
      const articles = publications.filter((p: any) => p.type === 'article').length;
      const books = publications.filter((p: any) => p.type === 'book').length;
      const magazines = publications.filter((p: any) => p.type === 'magazine').length;
      const magazineAlef = publications.filter((p: any) => p.type === 'magazine' && p.title?.fr?.toLowerCase().includes('alef')).length;
      const magazineHikma = publications.filter((p: any) => p.type === 'magazine' && p.title?.fr?.toLowerCase().includes('hikma')).length;

      // Activities stats
      const activities = JSON.parse(localStorage.getItem('activities') || '[]');
      const educational = activities.filter((a: any) => a.type === 'educational').length;
      const artExhibitions = activities.filter((a: any) => a.type === 'art-exhibition').length;
      const literaryGatherings = activities.filter((a: any) => a.type === 'literary-gathering').length;

      // Team and members stats
      const teamContent = JSON.parse(localStorage.getItem('teamContent') || '{"members": []}');
      const membersContent = JSON.parse(localStorage.getItem('membersContent') || '{"members": []}');

      // Cultural channel stats
      const culturalVideos = JSON.parse(localStorage.getItem('culturalChannelVideos') || '[]');

      // Partners stats
      const partnersContent = JSON.parse(localStorage.getItem('partnersContent') || '{"partners": []}');

      // Translation completeness
      let missingArabic = 0;
      let missingFrench = 0;
      let complete = 0;

      // Check publications translations
      publications.forEach((p: any) => {
        if (!p.title?.ar || !p.description?.ar) missingArabic++;
        if (!p.title?.fr || !p.description?.fr) missingFrench++;
        if (p.title?.ar && p.title?.fr && p.description?.ar && p.description?.fr) complete++;
      });

      // Check activities translations
      activities.forEach((a: any) => {
        if (!a.title?.ar || !a.description?.ar) missingArabic++;
        if (!a.title?.fr || !a.description?.fr) missingFrench++;
        if (a.title?.ar && a.title?.fr && a.description?.ar && a.description?.fr) complete++;
      });

      setStats({
        publications: {
          articles,
          books,
          magazines,
          magazineAlef,
          magazineHikma,
        },
        activities: {
          total: activities.length,
          educational,
          artExhibitions,
          literaryGatherings,
        },
        team: {
          members: teamContent.members?.length || 0,
        },
        associationMembers: {
          members: membersContent.members?.length || 0,
        },
        culturalChannel: {
          videos: culturalVideos.length,
        },
        partners: {
          total: partnersContent.partners?.length || 0,
        },
        translations: {
          missingArabic,
          missingFrench,
          complete,
        },
      });
    };

    calculateStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, color = "text-blue-600" }: {
    icon: any;
    title: string;
    value: number;
    color?: string;
  }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <Icon className={`w-8 h-8 ${color} mr-4`} />
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className={language === 'ar' ? 'font-cairo' : 'font-montserrat'}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getLabel('dashboardTitle')}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'نظرة شاملة على محتوى الموقع والإحصائيات'
              : 'Vue d\'ensemble du contenu du site et des statistiques'
            }
          </p>
        </div>

        {/* Publications Overview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            {getLabel('publicationsOverview')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <StatCard icon={FileText} title={getLabel('articles')} value={stats.publications.articles} />
            <StatCard icon={BookOpen} title={getLabel('books')} value={stats.publications.books} color="text-green-600" />
            <StatCard icon={Newspaper} title={getLabel('magazines')} value={stats.publications.magazines} color="text-purple-600" />
            <StatCard icon={Newspaper} title={getLabel('magazineAlef')} value={stats.publications.magazineAlef} color="text-indigo-600" />
            <StatCard icon={Newspaper} title={getLabel('magazineHikma')} value={stats.publications.magazineHikma} color="text-pink-600" />
          </div>
        </div>

        {/* Activities Overview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-orange-600" />
            {getLabel('activitiesOverview')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Calendar} title={getLabel('totalActivities')} value={stats.activities.total} color="text-orange-600" />
            <StatCard icon={Calendar} title={getLabel('educationalActivities')} value={stats.activities.educational} color="text-blue-600" />
            <StatCard icon={Calendar} title={getLabel('artExhibitions')} value={stats.activities.artExhibitions} color="text-green-600" />
            <StatCard icon={Calendar} title={getLabel('literaryGatherings')} value={stats.activities.literaryGatherings} color="text-purple-600" />
          </div>
        </div>

        {/* Team & Members Overview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-green-600" />
            {getLabel('teamOverview')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={Users} title={getLabel('teamMembers')} value={stats.team.members} color="text-green-600" />
            <StatCard icon={UserCheck} title={getLabel('associationMembers')} value={stats.associationMembers.members} color="text-blue-600" />
            <StatCard icon={Play} title={getLabel('culturalVideos')} value={stats.culturalChannel.videos} color="text-red-600" />
            <StatCard icon={Handshake} title={getLabel('partners')} value={stats.partners.total} color="text-yellow-600" />
          </div>
        </div>

        {/* Translation Status */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Globe className="w-6 h-6 mr-2 text-blue-600" />
            {getLabel('translationStatus')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard icon={Globe} title={getLabel('completeTranslations')} value={stats.translations.complete} color="text-green-600" />
            <StatCard icon={AlertCircle} title={getLabel('missingArabic')} value={stats.translations.missingArabic} color="text-orange-600" />
            <StatCard icon={AlertCircle} title={getLabel('missingFrench')} value={stats.translations.missingFrench} color="text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

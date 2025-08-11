'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Video, 
  Eye, 
  TrendingUp,
  Activity,
  FileText,
  Edit3
} from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: string;
  language: 'ar' | 'fr';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, language }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {value}
        </div>
        {trend && (
          <p className={`text-xs text-muted-foreground ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const AdminDashboard: React.FC = () => {
  const language = 'ar';
  const [stats, setStats] = useState([
    {
      title: language === 'ar' ? 'إجمالي الأنشطة' : 'Total des Activités',
      value: 0,
      icon: Calendar,
      trend: language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...'
    },
    {
      title: language === 'ar' ? 'المنشورات' : 'Publications',
      value: 0,
      icon: BookOpen,
      trend: language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...'
    },
    {
      title: language === 'ar' ? 'الشركاء' : 'Partenaires',
      value: 0,
      icon: Users,
      trend: language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...'
    },
    {
      title: language === 'ar' ? 'المقالات' : 'Articles',
      value: 0,
      icon: FileText,
      trend: language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...'
    }
  ]);

  const [recentActivities, setRecentActivities] = useState([
    {
      action: language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...',
      item: '',
      time: ''
    }
  ]);

  const fetchDashboardData = async () => {
    try {
      // Fetch activities
      const activitiesResponse = await fetch('/api/activities');
      const activitiesData = await activitiesResponse.json();
      const activitiesCount = activitiesData.success ? activitiesData.data.length : 0;

      // Fetch partners
      const partnersResponse = await fetch('/api/partners');
      const partnersData = await partnersResponse.json();
      const partnersCount = partnersData.success ? (partnersData.data.partners?.length || 0) : 0;

      // Fetch books
      const booksResponse = await fetch('/api/publications/books');
      const booksData = await booksResponse.json();
      const booksCount = booksData.success ? booksData.data.length : 0;

      // Fetch articles
      const articlesResponse = await fetch('/api/articles');
      const articlesData = await articlesResponse.json();
      const articlesCount = articlesData.success ? articlesData.data.length : 0;

      setStats([
        {
          title: language === 'ar' ? 'إجمالي الأنشطة' : 'Total des Activités',
          value: activitiesCount,
          icon: Calendar,
          trend: language === 'ar' ? `${activitiesCount} نشاط` : `${activitiesCount} activités`
        },
        {
          title: language === 'ar' ? 'المنشورات' : 'Publications',
          value: booksCount,
          icon: BookOpen,
          trend: language === 'ar' ? `${booksCount} كتاب` : `${booksCount} livres`
        },
        {
          title: language === 'ar' ? 'الشركاء' : 'Partenaires',
          value: partnersCount,
          icon: Users,
          trend: language === 'ar' ? `${partnersCount} شريك` : `${partnersCount} partenaires`
        },
        {
          title: language === 'ar' ? 'المقالات' : 'Articles',
          value: articlesCount,
          icon: FileText,
          trend: language === 'ar' ? `${articlesCount} مقال` : `${articlesCount} articles`
        }
      ]);

      // Set recent activities based on real data
      const recentActionsData = [];
      if (activitiesData.success && activitiesData.data.length > 0) {
        const latestActivity = activitiesData.data[0];
        recentActionsData.push({
          action: language === 'ar' ? 'تم إضافة نشاط جديد' : 'Nouvelle activité ajoutée',
          item: language === 'ar' ? latestActivity.title.ar : latestActivity.title.fr,
          time: language === 'ar' ? 'مؤخراً' : 'Récemment'
        });
      }
      
      if (partnersData.success && partnersData.data.partners?.length > 0) {
        const latestPartner = partnersData.data.partners[0];
        recentActionsData.push({
          action: language === 'ar' ? 'تم إضافة شريك جديد' : 'Nouveau partenaire ajouté',
          item: language === 'ar' ? latestPartner.nameAr : latestPartner.nameFr,
          time: language === 'ar' ? 'مؤخراً' : 'Récemment'
        });
      }

      if (articlesData.success && articlesData.data.length > 0) {
        const latestArticle = articlesData.data[0];
        recentActionsData.push({
          action: language === 'ar' ? 'تم نشر مقال جديد' : 'Nouvel article publié',
          item: language === 'ar' ? latestArticle.titleAr : latestArticle.titleFr,
          time: language === 'ar' ? 'مؤخراً' : 'Récemment'
        });
      }

      if (recentActionsData.length > 0) {
        setRecentActivities(recentActionsData.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className={`text-3xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {language === 'ar' ? 'مرحباً بك في لوحة التحكم' : 'Bienvenue dans le Tableau de Bord'}
        </h1>
        <p className={`text-gray-600 mt-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
          {language === 'ar' 
            ? 'إدارة محتوى موقع جمعية الألف للآداب والفنون'
            : 'Gestion du contenu du site de l\'Association ALEF pour les Arts et Littératures'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            language={language}
          />
        ))}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              <Activity size={20} />
              {language === 'ar' ? 'الأنشطة الأخيرة' : 'Activités Récentes'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 rounded-full bg-[#2D439A] mt-2"></div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {activity.action}
                    </p>
                    <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {activity.item}
                    </p>
                    <p className={`text-xs text-gray-500 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              <TrendingUp size={20} />
              {language === 'ar' ? 'إجراءات سريعة' : 'Actions Rapides'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/activities" className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-[#2D439A] transition-colors">
                <Calendar className="mx-auto mb-2 text-[#2D439A]" size={24} />
                <span className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {language === 'ar' ? 'إدارة الأنشطة' : 'Gérer Activités'}
                </span>
              </Link>
              <Link href="/admin/publications" className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-[#2D439A] transition-colors">
                <FileText className="mx-auto mb-2 text-[#2D439A]" size={24} />
                <span className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {language === 'ar' ? 'إدارة المنشورات' : 'Gérer Publications'}
                </span>
              </Link>
              <Link href="/admin/association" className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-[#2D439A] transition-colors">
                <Users className="mx-auto mb-2 text-[#2D439A]" size={24} />
                <span className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {language === 'ar' ? 'إدارة الجمعية' : 'Gérer Association'}
                </span>
              </Link>
              <Link href="/admin/content" className="p-4 text-center rounded-lg border-2 border-dashed border-gray-300 hover:border-[#2D439A] transition-colors">
                <Edit3 className="mx-auto mb-2 text-[#2D439A]" size={24} />
                <span className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                  {language === 'ar' ? 'إدارة المحتوى' : 'Gérer Contenu'}
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
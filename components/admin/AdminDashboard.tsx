import React from 'react';
import { useLanguage } from '@/contexts/language';
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
  const { language } = useLanguage();

  const stats = [
    {
      title: language === 'ar' ? 'إجمالي الأنشطة' : 'Total des Activités',
      value: 24,
      icon: Calendar,
      trend: language === 'ar' ? '+20% من الشهر الماضي' : '+20% du mois dernier'
    },
    {
      title: language === 'ar' ? 'المنشورات' : 'Publications',
      value: 156,
      icon: BookOpen,
      trend: language === 'ar' ? '+15 هذا الأسبوع' : '+15 cette semaine'
    },
    {
      title: language === 'ar' ? 'الأعضاء' : 'Membres',
      value: 89,
      icon: Users,
      trend: language === 'ar' ? '+5 أعضاء جدد' : '+5 nouveaux membres'
    },
    {
      title: language === 'ar' ? 'مقاطع الفيديو' : 'Vidéos',
      value: 32,
      icon: Video,
      trend: language === 'ar' ? '+3 هذا الشهر' : '+3 ce mois'
    }
  ];

  const recentActivities = [
    {
      action: language === 'ar' ? 'تم إضافة نشاط جديد' : 'Nouvelle activité ajoutée',
      item: language === 'ar' ? 'ورشة الفنون البصرية' : 'Atelier Arts Visuels',
      time: language === 'ar' ? 'منذ ساعتين' : 'Il y a 2 heures'
    },
    {
      action: language === 'ar' ? 'تم نشر مقال جديد' : 'Nouvel article publié',
      item: language === 'ar' ? 'الأدب المعاصر' : 'Littérature Contemporaine',
      time: language === 'ar' ? 'منذ 4 ساعات' : 'Il y a 4 heures'
    },
    {
      action: language === 'ar' ? 'تم تحديث معلومات عضو' : 'Informations membre mises à jour',
      item: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohammed',
      time: language === 'ar' ? 'منذ يوم واحد' : 'Il y a 1 jour'
    }
  ];

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
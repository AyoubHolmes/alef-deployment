/* eslint-disable react/no-children-prop */
'use client'

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/language';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  UserCheck,
  Phone,
  Info,
  Video,
  Handshake,
  Palette,
  GraduationCap,
  PenTool,
  Library,
  ChevronDown,
  ChevronRight,
  Edit3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  path?: string;
  children?: Array<{ label: string; path: string }>;
  isActive?: boolean;
  language: 'ar' | 'fr';
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  path, 
  children, 
  isActive, 
  language 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    if (children) {
      setIsExpanded(!isExpanded);
    }
  };

  const itemClass = cn(
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 w-full",
    language === 'ar' ? 'text-right font-cairo' : 'text-left font-montserrat',
    isActive || pathname === path
      ? "bg-[#2D439A] text-white"
      : "text-gray-700 hover:bg-gray-100"
  );

  if (children) {
    return (
      <div>
        <Button
          variant="ghost"
          onClick={handleClick}
          className={itemClass}
        >
          <Icon size={20} />
          <span className="flex-1">{label}</span>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </Button>
        {isExpanded && (
          <div className={`ml-6 mt-1 space-y-1 ${language === 'ar' ? 'mr-6 ml-0' : ''}`}>
            {children.map((child) => (
              <Link
                key={child.path}
                href={child.path || ''}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm transition-colors duration-200",
                  language === 'ar' ? 'font-cairo text-right' : 'font-montserrat',
                  pathname === child.path
                    ? "bg-[#2D439A] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={path || '#'} className={itemClass}>
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

const AdminSidebar: React.FC = () => {
  const { language } = useLanguage();
  const pathname = usePathname();

  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: language === 'ar' ? 'لوحة التحكم' : 'Tableau de Bord',
      path: '/admin',
      isActive: pathname === '/admin'
    },
    {
      icon: Edit3,
      label: language === 'ar' ? 'إدارة المحتوى' : 'Gestion Contenu',
      path: '/admin/content',
      isActive: pathname.includes('/admin/content')
    },
    {
      icon: Calendar,
      label: language === 'ar' ? 'الأنشطة' : 'Activités',
      path: '/admin/activities',
      isActive: pathname.includes('/admin/activities')
    },
    {
      icon: BookOpen,
      label: language === 'ar' ? 'المنشورات' : 'Publications',
      children: [
        { 
          label: language === 'ar' ? 'أصدقاء ديونيسوس' : 'Amis de Dionysos', 
          path: '/admin/publications/amis-dionysos' 
        },
        { 
          label: language === 'ar' ? 'أرت شيف' : 'ArtChiv', 
          path: '/admin/publications/art-chiv' 
        },
        { 
          label: language === 'ar' ? 'التحيزات الفنية' : 'Biais Artistiques', 
          path: '/admin/publications/biais-artistiques' 
        },
        { 
          label: language === 'ar' ? 'الكتب' : 'Livres', 
          path: '/admin/publications/books' 
        },
      ]
    },
    {
      icon: Palette,
      label: language === 'ar' ? 'عين الألف' : 'L\'œil d\'Alef',
      children: [
        { 
          label: language === 'ar' ? 'الفنون البصرية' : 'Arts Visuels', 
          path: '/admin/oeil-alef/visual-arts' 
        },
        { 
          label: language === 'ar' ? 'الفكر الأدبي' : 'Pensée Littéraire', 
          path: '/admin/oeil-alef/literary-thought' 
        },
        { 
          label: language === 'ar' ? 'بروييم' : 'Proèmes', 
          path: '/admin/oeil-alef/proemes' 
        },
        { 
          label: language === 'ar' ? 'التعليم' : 'Éducation', 
          path: '/admin/oeil-alef/education' 
        },
      ]
    },
    {
      icon: Video,
      label: language === 'ar' ? 'القناة الثقافية' : 'Chaîne Culturelle',
      path: '/admin/cultural-channel',
      isActive: pathname.includes('/admin/cultural-channel')
    },
    {
      icon: Users,
      label: language === 'ar' ? 'الجمعية' : 'Association',
      children: [
        { 
          label: language === 'ar' ? 'من نحن' : 'À Propos', 
          path: '/admin/association/about' 
        },
        { 
          label: language === 'ar' ? 'الأعضاء' : 'Membres', 
          path: '/admin/association/members' 
        },
        { 
          label: language === 'ar' ? 'الفريق' : 'Équipe', 
          path: '/admin/association/team' 
        },
        { 
          label: language === 'ar' ? 'اتصل بنا' : 'Contact', 
          path: '/admin/association/contact' 
        },
      ]
    },
    {
      icon: Handshake,
      label: language === 'ar' ? 'الشركاء' : 'Partenaires',
      path: '/admin/partners',
      isActive: pathname.includes('/admin/partners')
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#2D439A] rounded-lg flex items-center justify-center">
            <Library className="text-white" size={24} />
          </div>
          <div>
            <h2 className={`font-semibold text-gray-800 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              ALEF CMS
            </h2>
            <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {language === 'ar' ? 'نظام إدارة المحتوى' : 'Système de Gestion'}
            </p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            children={item.children}
            isActive={item.isActive}
            language={language}
          />
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
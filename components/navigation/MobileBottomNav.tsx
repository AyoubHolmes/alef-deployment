
'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Users, BookOpen, Mail } from 'lucide-react';

const MobileBottomNav = () => {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  
  // Quick access mobile links based on new structure
  const quickAccessLinks = [
    { name: 'home', path: '/', icon: Home },
    { name: 'theAssociation', path: '/about', icon: Users },
    { name: 'publications', path: '/publications', icon: BookOpen },
    { name: 'contact', path: '/contact', icon: Mail },
  ];
  
  // Check if link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    // For association, check if it's any association-related page
    if (path === '/about') {
      return pathname === '/about' || pathname === '/members' || pathname === '/team' || pathname === '/contact';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16 lg:hidden z-40">
      <div className="flex justify-around items-center h-full">
        {quickAccessLinks.map((link) => (
          <Link
            key={link.name}
            href={link.path || ''}
            aria-current={isActive(link.path) ? "page" : undefined}
            className={`
              flex flex-col items-center justify-center h-full w-1/4
              ${isActive(link.path) ? 'text-[#F75C03]' : 'text-[#074D8C]'}
            `}
          >
            <link.icon size={20} />
            <span className={`text-xs mt-1 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {t(link.name)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;

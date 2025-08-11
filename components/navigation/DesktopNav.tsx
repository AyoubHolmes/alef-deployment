'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DesktopNav = () => {
  const { t, language } = useLanguage();
  const pathname = usePathname();

  // Navigation structure with updated L'œil d'Alef section and separate Activities
  const navLinks = [
    { name: 'home', path: '/' },
    { 
      name: 'theAssociation', 
      path: '/association',
      hasDropdown: true,
      dropdownItems: [
        { name: 'whoAreWe', path: '/about' },
        { name: 'members', path: '/members' },
        { name: 'team', path: '/team' },
        { name: 'contact', path: '/contact' },
      ]
    },
    { 
      name: 'oeilDAlef', 
      path: '/activities',
      hasDropdown: true,
      dropdownItems: [
        { name: 'visualArts', path: '/activities/visual-arts' },
        { name: 'literaryThought', path: '/activities/literary-thought' },
        { name: 'proemes', path: '/proemes' },
        { name: 'education', path: '/activities/education' },
      ]
    },
    { name: 'activities', path: '/activities' },
    { 
      name: 'publications', 
      path: '/publications',
      hasDropdown: true,
      dropdownItems: [
        { name: 'friendsOfDionysos', path: '/publications/amis-dionysos' },
        { name: 'artChiv', path: '/publications/art-chiv' },
        { name: 'artisticBias', path: '/publications/biais-artistiques' },
        { name: 'books', path: '/publications/books' },
      ]
    },
    { name: 'culturalChannel', path: '/cultural-channel' },
    { name: 'partners', path: '/partners' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const isDropdownItemActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="hidden lg:flex items-center justify-center">
      <div className="flex items-center space-x-8 rtl:space-x-reverse">
        {navLinks.map((link) => (
          <div key={link.name} className="flex items-center">
            {link.hasDropdown ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={`
                        ${language === 'ar' ? 'font-cairo text-lg' : 'font-montserrat text-base'}
                        ${isActive(link.path) ? 'font-semibold' : 'font-medium'}
                        text-[#2D439A] hover:text-[#2D439A] focus:text-[#2D439A] px-0
                        bg-transparent hover:bg-transparent focus:bg-transparent
                        data-[state=open]:bg-transparent data-[active]:bg-transparent
                      `}
                    >
                      {t(link.name)}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={`
                      ${language === 'ar' ? 'rtl' : 'ltr'}
                      ${language === 'ar' ? 'right-0' : 'left-0'}
                    `}>
                      <ul className={`
                        grid w-[280px] gap-1 p-3 bg-white shadow-lg rounded-md border border-gray-200 z-50
                        ${language === 'ar' ? 'text-right' : 'text-left'}
                      `}>
                        {link.dropdownItems?.map((item) => (
                          <li key={item.path}>
                            <Link
                              href={item.path || ''}
                              className={`
                                block select-none rounded-md p-3 text-sm transition-colors duration-200
                                ${language === 'ar' ? 'font-cairo text-right pr-4' : 'font-montserrat text-left pl-4'}
                                ${isDropdownItemActive(item.path) 
                                  ? 'bg-[#2D439A] text-white font-medium' 
                                  : 'text-[#2D439A] hover:bg-[#2D439A]/10 hover:text-[#2D439A] font-medium'
                                }
                              `}
                            >
                              {t(item.name)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <Link 
                href={link.path || ''}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={`
                  ${language === 'ar' ? 'font-cairo text-lg' : 'font-montserrat text-base'} 
                  ${isActive(link.path) ? 'font-semibold' : 'font-medium'}
                  text-[#2D439A] relative group
                `}
              >
                <span>{t(link.name)}</span>
                <span 
                  className={`
                    absolute -bottom-1 left-0 w-full h-0.5 bg-[#F7A520] origin-left transform 
                    ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    transition-transform duration-300 ease-in
                  `}
                ></span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DesktopNav;


'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { X, ChevronDown, ChevronUp, Settings } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Main navigation links without dropdowns
  const mainNavLinks = [
    { name: 'home', path: '/' },
  ];
  
  // Association dropdown links
  const associationLinks = [
    { name: 'whoAreWe', path: '/about' },
    { name: 'members', path: '/members' },
    { name: 'team', path: '/team' },
    { name: 'contact', path: '/contact' },
  ];

  // L'œil d'Alef dropdown links - updated structure
  const oeilDAlefLinks = [
    { name: 'visualArts', path: '/activities/visual-arts' },
    { name: 'literaryThought', path: '/activities/literary-thought' },
    { name: 'proemes', path: '/proemes' },
    { name: 'education', path: '/activities/education' },
  ];

  // Publications dropdown links
  const publicationsLinks = [
    { name: 'friendsOfDionysos', path: '/publications/amis-dionysos' },
    { name: 'artChiv', path: '/publications/art-chiv' },
    { name: 'artisticBias', path: '/publications/biais-artistiques' },
    { name: 'books', path: '/publications/books' },
  ];

  // Single navigation items (no dropdowns) - now includes Activities
  const singleNavLinks = [
    { name: 'activities', path: '/activities' },
    { name: 'culturalChannel', path: '/cultural-channel' },
    { name: 'partners', path: '/partners' },
  ];
  
  // Toggle dropdown for navigation sections
  const toggleDropdown = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };
  
  // Check if link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname === path;
  };

  if (!isOpen) return null;
  
  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className={`fixed inset-y-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-4/5 max-w-xs bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-y-auto`}>
        <div className="p-5">
          {/* Mobile menu header with logo */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-3/4">
              <img 
                src="/lovable-uploads/Logo_officiel.png" 
                alt="ALEF Association" 
                className="h-12 object-contain"
              />
            </div>
            <button 
              onClick={onClose} 
              className="p-1 text-[#074D8C]"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            {/* Home */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path || ''}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={`
                  block py-3 border-b border-gray-200
                  ${language === 'ar' ? 'font-cairo text-lg text-right' : 'font-montserrat text-base'}
                  ${isActive(link.path) ? 'font-semibold text-[#F75C03]' : 'font-medium text-[#074D8C]'}
                `}
                onClick={onClose}
              >
                {t(link.name)}
              </Link>
            ))}
            
            {/* Association dropdown */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleDropdown('association')}
                className={`
                  flex items-center justify-between w-full py-3
                  ${language === 'ar' ? 'font-cairo text-lg text-right' : 'font-montserrat text-base'}
                  font-medium text-[#074D8C]
                `}
              >
                <span>{t('theAssociation')}</span>
                {expandedItem === 'association' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedItem === 'association' && (
                <div className="pl-4 pb-2 space-y-2">
                  {associationLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path || ''}
                      aria-current={isActive(link.path) ? "page" : undefined}
                      className={`
                        block py-2
                        ${language === 'ar' ? 'font-cairo text-base text-right' : 'font-montserrat text-sm'}
                        ${isActive(link.path) ? 'font-semibold text-[#F75C03]' : 'font-medium text-[#074D8C]'}
                      `}
                      onClick={onClose}
                    >
                      {t(link.name)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* L'œil d'Alef dropdown */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleDropdown('oeilDAlef')}
                className={`
                  flex items-center justify-between w-full py-3
                  ${language === 'ar' ? 'font-cairo text-lg text-right' : 'font-montserrat text-base'}
                  font-medium text-[#074D8C]
                `}
              >
                <span>{t('oeilDAlef')}</span>
                {expandedItem === 'oeilDAlef' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedItem === 'oeilDAlef' && (
                <div className="pl-4 pb-2 space-y-2">
                  {oeilDAlefLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path || ''}
                      aria-current={isActive(link.path) ? "page" : undefined}
                      className={`
                        block py-2
                        ${language === 'ar' ? 'font-cairo text-base text-right' : 'font-montserrat text-sm'}
                        ${isActive(link.path) ? 'font-semibold text-[#F75C03]' : 'font-medium text-[#074D8C]'}
                      `}
                      onClick={onClose}
                    >
                      {t(link.name)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Publications dropdown */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleDropdown('publications')}
                className={`
                  flex items-center justify-between w-full py-3
                  ${language === 'ar' ? 'font-cairo text-lg text-right' : 'font-montserrat text-base'}
                  font-medium text-[#074D8C]
                `}
              >
                <span>{t('publications')}</span>
                {expandedItem === 'publications' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {expandedItem === 'publications' && (
                <div className="pl-4 pb-2 space-y-2">
                  {publicationsLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path || ''}
                      aria-current={isActive(link.path) ? "page" : undefined}
                      className={`
                        block py-2
                        ${language === 'ar' ? 'font-cairo text-base text-right' : 'font-montserrat text-sm'}
                        ${isActive(link.path) ? 'font-semibold text-[#F75C03]' : 'font-medium text-[#074D8C]'}
                      `}
                      onClick={onClose}
                    >
                      {t(link.name)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Single navigation items: Activities, Cultural Channel, Partners */}
            {singleNavLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path || ''}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={`
                  block py-3 border-b border-gray-200
                  ${language === 'ar' ? 'font-cairo text-lg text-right' : 'font-montserrat text-base'}
                  ${isActive(link.path) ? 'font-semibold text-[#F75C03]' : 'font-medium text-[#074D8C]'}
                `}
                onClick={onClose}
              >
                {t(link.name)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;


'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Menu, Settings } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import DesktopNav from './navigation/DesktopNav';
import MobileMenu from './navigation/MobileMenu';
import MobileBottomNav from './navigation/MobileBottomNav';
import { useScrollEffect } from '@/hooks/useScrollEffect';

const Header = () => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAdmin();
  const isScrolled = useScrollEffect();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Main header with logo and navigation */}
      <div className="bg-white text-[#2D439A] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo - Made bigger for better readability */}
            <div className={`flex-shrink-0 ${language === 'ar' ? 'lg:mr-8' : 'lg:ml-8'}`}>
              <Link href="/" className="block">
                <img 
                  src="/lovable-uploads/7494d24e-9f75-4da7-af9e-fea8fc57e6fd.png" 
                  alt="ALEF Association" 
                  className="h-16 md:h-20 object-contain"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <DesktopNav />
            
            {/* Admin Button and Language Switcher - Desktop - Consistent spacing */}
            <div className={`hidden lg:flex items-center space-x-4 ${language === 'ar' ? 'lg:ml-8 space-x-reverse' : 'lg:mr-8'}`}>
              {/* <Link 
                 href="/admin" 
                 className="flex items-center space-x-2 px-3 py-2 bg-[#F75C03] text-white rounded-md hover:bg-[#e54d02] transition-colors"
              >
                <Settings size={16} />
                <span className="text-sm font-medium">Admin</span>
              </Link> */}
              <div className="border border-[#2D439A] rounded-md px-2 py-1 bg-white shadow-sm">
                <LanguageSwitcher />
              </div>
            </div>
            
            {/* Mobile Navigation Toggle */}
            <div className={`flex items-center lg:hidden ${language === 'ar' ? 'space-x-reverse' : ''}`}>
              <div className="border border-[#2D439A] rounded-md px-2 py-1 bg-white shadow-sm">
                <LanguageSwitcher />
              </div>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 text-[#2D439A] ${language === 'ar' ? 'mr-4' : 'ml-4'}`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? null : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Mobile Bottom Quick Access Bar */}
      <MobileBottomNav />
    </header>
  );
};

export default Header;

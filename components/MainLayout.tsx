

'use client'

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  
  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[84px] pb-[64px] lg:pb-0">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;



import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/MainLayout';

const NotFound = () => {

  return (
    <MainLayout>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className={`text-6xl font-bold text-alef-teal mb-4 ${'font-montserrat'}`}>
            404
          </h1>
          <p className={`text-xl text-gray-600 mb-8 ${'font-montserrat'}`}>
            {'Désolé, la page que vous cherchez n\'existe pas.'}
          </p>
          <Link href="/" className="btn-alef">
            {'Retour à l\'accueil'}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;

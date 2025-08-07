
'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users } from 'lucide-react';

interface Member {
  id: string;
  name: { ar: string; fr: string };
  role: { ar: string; fr: string };
  bio: { ar: string; fr: string };
  image: string;
}

interface MembersContent {
  pageTitle: { ar: string; fr: string };
  pageDescription: { ar: string; fr: string };
  members: Member[];
}

const Members = () => {
  const { language } = useLanguage();
  const [adminContent, setAdminContent] = useState<MembersContent | null>(null);
  
  // Load admin content
  useEffect(() => {
    const savedContent = localStorage.getItem('membersContent');
    if (savedContent) {
      setAdminContent(JSON.parse(savedContent));
    }
  }, []);

  // Get content with fallback to default
  const getPageTitle = () => {
    return adminContent?.pageTitle[language] || 
      (language === 'ar' ? 'أعضاء الجمعية' : 'Membres de l\'association');
  };

  const getPageDescription = () => {
    return adminContent?.pageDescription[language] || 
      (language === 'ar' 
        ? 'نفخر بأعضاء جمعية ألف للثقافة والتنمية، الذين يساهمون بفعالية في تحقيق أهدافنا الثقافية والتنموية من خلال خبراتهم المتنوعة وشغفهم بالعمل الثقافي.'
        : 'Nous sommes fiers des membres d\'ALEF pour la Culture et le Développement, qui contribuent efficacement à la réalisation de nos objectifs culturels et de développement grâce à leurs diverses expertises et leur passion pour le travail culturel.'
      );
  };

  const getMembers = () => {
    if (adminContent && adminContent.members.length > 0) {
      return adminContent.members;
    }
    
    // Fallback members
    return [
      {
        id: "1",
        name: { ar: "فاطمة الزهراني", fr: "Fatima El Zahrani" },
        role: { ar: "عضو مؤسس", fr: "Membre fondateur" },
        bio: { 
          ar: "كاتبة وباحثة في الأدب العربي، حاصلة على دكتوراه في الأدب المقارن. لها إسهامات بارزة في النقد الأدبي.", 
          fr: "Écrivain et chercheur en littérature arabe, titulaire d'un doctorat en littérature comparée. Elle a des contributions remarquables dans la critique littéraire." 
        },
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=500"
      },
      {
        id: "2",
        name: { ar: "محمد الغامدي", fr: "Mohammed El Ghamdi" },
        role: { ar: "عضو نشط", fr: "Membre actif" },
        bio: { 
          ar: "مهندس ومهتم بالثقافة والفنون، يساهم في تنظيم الفعاليات الثقافية وورش العمل الإبداعية.", 
          fr: "Ingénieur passionné de culture et d'arts, il contribue à l'organisation d'événements culturels et d'ateliers créatifs." 
        },
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500"
      },
      {
        id: "3",
        name: { ar: "نورا العتيبي", fr: "Nora El Otaibi" },
        role: { ar: "عضو متطوع", fr: "Membre bénévole" },
        bio: { 
          ar: "طالبة دراسات عليا في علم الاجتماع، متحمسة للعمل التطوعي والمشاريع الثقافية المجتمعية.", 
          fr: "Étudiante en master de sociologie, passionnée par le bénévolat et les projets culturels communautaires." 
        },
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=500"
      }
    ];
  };

  const members = getMembers();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'} text-alef-teal`}>
            {getPageTitle()}
          </h1>
          <div className="w-24 h-1 bg-alef-coral mx-auto"></div>
        </div>
        
        {/* Members Introduction */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Users className="text-alef-coral" size={32} />
          </div>
          <p className={`${language === 'ar' ? 'font-cairo' : 'font-montserrat'} text-gray-700`}>
            {getPageDescription()}
          </p>
        </div>
        
        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              {/* Member Image */}
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name[language]}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Member Info */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-1 text-alef-teal ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                  {member.name[language]}
                </h3>
                <p className={`text-alef-coral mb-4 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                  {member.role[language]}
                </p>
                <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo text-right' : 'font-montserrat'}`}>
                  {member.bio[language]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Members;

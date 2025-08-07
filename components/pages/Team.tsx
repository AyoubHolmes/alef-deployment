
'use client'

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users } from 'lucide-react';

interface TeamMember {
  id: string;
  name: { ar: string; fr: string };
  role: { ar: string; fr: string };
  bio: { ar: string; fr: string };
  image: string;
  email?: string;
  phone?: string;
}

interface TeamContent {
  pageTitle: { ar: string; fr: string };
  pageDescription: { ar: string; fr: string };
  members: TeamMember[];
}

const Team = () => {
  const { language } = useLanguage();
  const [adminContent, setAdminContent] = useState<TeamContent | null>(null);
  
  // Load admin content
  useEffect(() => {
    const savedContent = localStorage.getItem('teamContent');
    if (savedContent) {
      setAdminContent(JSON.parse(savedContent));
    }
  }, []);

  // Get content with fallback to default
  const getPageTitle = () => {
    return adminContent?.pageTitle[language] || 
      (language === 'ar' ? 'فريق العمل' : 'Notre équipe');
  };

  const getPageDescription = () => {
    return adminContent?.pageDescription[language] || 
      (language === 'ar' 
        ? 'يضم فريق عمل جمعية ألف للثقافة والتنمية نخبة من المتخصصين في مجالات النقد الفني والأدبي، والإدارة الثقافية، والتواصل الإعلامي. يجمعنا شغف مشترك بالفن والثقافة، ورؤية موحدة لتعزيز الفكر النقدي والإبداع في المجتمع.'
        : 'L\'équipe d\'ALEF pour la Culture et le Développement comprend des experts en critique d\'art et littéraire, en gestion culturelle et en communication médiatique. Nous partageons une passion commune pour l\'art et la culture, et une vision unifiée pour promouvoir la pensée critique et la créativité dans la société.'
      );
  };

  const getTeamMembers = () => {
    if (adminContent && adminContent.members.length > 0) {
      return adminContent.members;
    }
    
    // Fallback team members
    return [
      {
        id: "1",
        name: { ar: "أحمد المرزوقي", fr: "Ahmed El Marzougui" },
        role: { ar: "مدير تحرير المجلة", fr: "Rédacteur en chef" },
        bio: { 
          ar: "دكتور في الفلسفة الجمالية، متخصص في النقد الفني. قام بتأليف العديد من الكتب حول الفن المعاصر والجماليات الثقافية.", 
          fr: "Docteur en philosophie esthétique, spécialisé dans la critique d'art. Il a écrit plusieurs ouvrages sur l'art contemporain et l'esthétique culturelle." 
        },
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500"
      },
      {
        id: "2",
        name: { ar: "سلمى بنعلي", fr: "Salma Benali" },
        role: { ar: "منسقة الفعاليات الثقافية", fr: "Coordinatrice des événements culturels" },
        bio: { 
          ar: "حاصلة على ماجستير في الدراسات الثقافية، ولديها خبرة واسعة في تنظيم المعارض والملتقيات الأدبية.", 
          fr: "Titulaire d'un master en études culturelles, elle possède une vaste expérience dans l'organisation d'expositions et de rencontres littéraires." 
        },
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=500"
      },
      {
        id: "3",
        name: { ar: "كريم الحسني", fr: "Karim El Hassani" },
        role: { ar: "مسؤول المشاريع الفنية", fr: "Responsable des projets artistiques" },
        bio: { 
          ar: "فنان تشكيلي وناقد فني، درس الفنون الجميلة في باريس. له العديد من المعارض الفنية المحلية والدولية.", 
          fr: "Artiste plasticien et critique d'art, il a étudié les beaux-arts à Paris. Il a réalisé plusieurs expositions artistiques locales et internationales." 
        },
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=500"
      }
    ];
  };

  const teamMembers = getTeamMembers();

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
        
        {/* Team Introduction */}
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Users className="text-alef-coral" size={32} />
          </div>
          <p className={`${language === 'ar' ? 'font-cairo' : 'font-montserrat'} text-gray-700`}>
            {getPageDescription()}
          </p>
        </div>
        
        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
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

export default Team;

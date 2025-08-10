
'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/MainLayout';
import { useLanguage } from '@/contexts/language';
import { Calendar, MapPin, Users, ArrowLeft, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Combined events data from all activity pages
const allEvents = {
  visualArts: [
    {
      id: 1,
      title: {
        ar: 'معرض الفن التشكيلي المعاصر',
        fr: 'Exposition d\'art plastique contemporain'
      },
      description: {
        ar: 'معرض يضم أعمال فنانين معاصرين من المغرب والعالم العربي',
        fr: 'Exposition présentant les œuvres d\'artistes contemporains du Maroc et du monde arabe'
      },
      fullDescription: {
        ar: 'معرض شامل للفن التشكيلي المعاصر يستعرض أحدث الاتجاهات في الفن البصري، ويضم أعمال مجموعة متنوعة من الفنانين المغاربة والعرب، مع التركيز على التقنيات الحديثة والمواضيع المعاصرة.',
        fr: 'Exposition complète d\'art plastique contemporain présentant les dernières tendances de l\'art visuel, avec des œuvres d\'artistes marocains et arabes variés, en mettant l\'accent sur les techniques modernes et les sujets contemporains.'
      },
      startDate: '2025-08-15',
      endDate: '2025-09-15',
      location: {
        ar: 'رواق الفنون - الدار البيضاء',
        fr: 'Galerie d\'art - Casablanca'
      },
      image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
      category: {
        ar: 'فنون بصرية',
        fr: 'Arts Visuels'
      },
      artist: {
        ar: 'فنانون متعددون',
        fr: 'Artistes multiples'
      }
    },
    {
      id: 2,
      title: {
        ar: 'ورشة التصوير الفوتوغرافي',
        fr: 'Atelier de photographie'
      },
      description: {
        ar: 'ورشة تدريبية لتعلم أساسيات التصوير الفوتوغرافي',
        fr: 'Atelier de formation pour apprendre les bases de la photographie'
      },
      fullDescription: {
        ar: 'ورشة تدريبية شاملة تغطي أساسيات التصوير الفوتوغرافي من الإعدادات التقنية إلى التركيب الفني، مع جلسات عملية في الهواء الطلق وفي الاستوديو.',
        fr: 'Atelier de formation complet couvrant les bases de la photographie des réglages techniques à la composition artistique, avec des sessions pratiques en extérieur et en studio.'
      },
      startDate: '2025-07-20',
      endDate: '2025-07-27',
      location: {
        ar: 'المركز الثقافي - الرباط',
        fr: 'Centre culturel - Rabat'
      },
      image: 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50',
      category: {
        ar: 'فنون بصرية',
        fr: 'Arts Visuels'
      }
    },
    {
      id: 3,
      title: {
        ar: 'عرض فنون رقمية',
        fr: 'Présentation d\'arts numériques'
      },
      description: {
        ar: 'عرض أعمال الفن الرقمي والتفاعلي',
        fr: 'Présentation d\'œuvres d\'art numérique et interactif'
      },
      fullDescription: {
        ar: 'عرض مبتكر للفنون الرقمية والتفاعلية، يشمل تقنيات الواقع المعزز والتركيبات الرقمية المعاصرة، مع إمكانية التفاعل المباشر للجمهور مع الأعمال.',
        fr: 'Présentation innovante d\'arts numériques et interactifs, incluant des techniques de réalité augmentée et des installations numériques contemporaines, avec possibilité d\'interaction directe du public avec les œuvres.'
      },
      startDate: '2025-06-10',
      endDate: '2025-06-15',
      location: {
        ar: 'معهد الفنون - فاس',
        fr: 'Institut des Arts - Fès'
      },
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
      category: {
        ar: 'فنون بصرية',
        fr: 'Arts Visuels'
      }
    }
  ],
  literaryThought: [
    {
      id: 1,
      title: {
        ar: 'ندوة الأدب والمجتمع',
        fr: 'Symposium Littérature et Société'
      },
      description: {
        ar: 'نقاش معمق حول دور الأدب في التغيير الاجتماعي',
        fr: 'Discussion approfondie sur le rôle de la littérature dans le changement social'
      },
      fullDescription: {
        ar: 'ندوة فكرية تجمع كتاب ومفكرين لمناقشة تأثير الأدب على المجتمع والتغييرات السياسية والاجتماعية، مع التركيز على الأدب المغربي والعربي المعاصر.',
        fr: 'Symposium intellectuel réunissant écrivains et penseurs pour discuter de l\'impact de la littérature sur la société et les changements politiques et sociaux, en mettant l\'accent sur la littérature marocaine et arabe contemporaine.'
      },
      startDate: '2025-07-15',
      endDate: '2025-07-16',
      location: {
        ar: 'جامعة محمد الخامس - الرباط',
        fr: 'Université Mohammed V - Rabat'
      },
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
      category: {
        ar: 'أدب وفكر',
        fr: 'Littérature et pensée'
      },
      speakers: {
        ar: 'د. أحمد المتوكل، د. فاطمة المرنيسي',
        fr: 'Dr. Ahmed Moutaouakil, Dr. Fatema Mernissi'
      }
    },
    {
      id: 2,
      title: {
        ar: 'أمسية شعرية: أصوات جديدة',
        fr: 'Soirée poétique: Nouvelles voix'
      },
      description: {
        ar: 'أمسية لعرض أعمال الشعراء الشباب',
        fr: 'Soirée de présentation des œuvres de jeunes poètes'
      },
      fullDescription: {
        ar: 'أمسية شعرية مخصصة لإبراز المواهب الشعرية الشابة في المغرب والعالم العربي، مع قراءات شعرية ونقاشات حول اتجاهات الشعر المعاصر.',
        fr: 'Soirée poétique dédiée à la mise en valeur des jeunes talents poétiques au Maroc et dans le monde arabe, avec des lectures poétiques et des discussions sur les tendances de la poésie contemporaine.'
      },
      startDate: '2025-08-05',
      endDate: '2025-08-05',
      location: {
        ar: 'المركز الثقافي - الدار البيضاء',
        fr: 'Centre culturel - Casablanca'
      },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      category: {
        ar: 'أدب وفكر',
        fr: 'Littérature et pensée'
      }
    },
    {
      id: 3,
      title: {
        ar: 'حلقة نقاش: الفلسفة المعاصرة',
        fr: 'Table ronde: Philosophie contemporaine'
      },
      description: {
        ar: 'نقاش حول التيارات الفلسفية المعاصرة',
        fr: 'Discussion sur les courants philosophiques contemporains'
      },
      fullDescription: {
        ar: 'حلقة نقاش تجمع أساتذة الفلسفة والمهتمين لمناقشة أحدث التطورات في الفكر الفلسفي المعاصر وتطبيقاته في الواقع المغربي والعربي.',
        fr: 'Table ronde réunissant professeurs de philosophie et passionnés pour discuter des derniers développements de la pensée philosophique contemporaine et ses applications dans la réalité marocaine et arabe.'
      },
      startDate: '2025-06-20',
      endDate: '2025-06-20',
      location: {
        ar: 'كلية الآداب - فاس',
        fr: 'Faculté des Lettres - Fès'
      },
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
      category: {
        ar: 'أدب وفكر',
        fr: 'Littérature et pensée'
      }
    }
  ],
  education: [
    {
      id: 1,
      title: {
        ar: 'ورشة الكتابة الإبداعية',
        fr: 'Atelier d\'écriture créative'
      },
      description: {
        ar: 'تعلم تقنيات الكتابة الإبداعية والسرد',
        fr: 'Apprendre les techniques d\'écriture créative et de narration'
      },
      fullDescription: {
        ar: 'ورشة شاملة لتطوير مهارات الكتابة الإبداعية تشمل تقنيات السرد، بناء الشخصيات، والحوار. مناسبة للمبتدئين والكتاب الطموحين.',
        fr: 'Atelier complet pour développer les compétences d\'écriture créative incluant les techniques narratives, la construction de personnages et le dialogue. Adapté aux débutants et écrivains ambitieux.'
      },
      startDate: '2025-07-10',
      endDate: '2025-07-24',
      location: {
        ar: 'المركز الثقافي - الرباط',
        fr: 'Centre culturel - Rabat'
      },
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
      category: {
        ar: 'تربية',
        fr: 'Éducation'
      },
      instructor: {
        ar: 'أ. محمد برادة',
        fr: 'Prof. Mohammed Berrada'
      },
      capacity: 20,
      price: {
        ar: '300 درهم',
        fr: '300 DH'
      }
    },
    {
      id: 2,
      title: {
        ar: 'دورة النقد الأدبي',
        fr: 'Formation en critique littéraire'
      },
      description: {
        ar: 'أسس ومناهج النقد الأدبي الحديث',
        fr: 'Fondements et méthodes de la critique littéraire moderne'
      },
      fullDescription: {
        ar: 'دورة تدريبية متخصصة في النقد الأدبي تغطي المناهج النقدية المختلفة والتطبيق العملي على النصوص الأدبية المعاصرة.',
        fr: 'Formation spécialisée en critique littéraire couvrant différentes approches critiques et application pratique sur des textes littéraires contemporains.'
      },
      startDate: '2025-08-01',
      endDate: '2025-08-15',
      location: {
        ar: 'كلية الآداب - فاس',
        fr: 'Faculté des Lettres - Fès'
      },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      category: {
        ar: 'تربية',
        fr: 'Éducation'
      },
      instructor: {
        ar: 'د. عبد الفتاح كيليطو',
        fr: 'Dr. Abdelfattah Kilito'
      },
      duration: {
        ar: '15 يوم',
        fr: '15 jours'
      }
    },
    {
      id: 3,
      title: {
        ar: 'برنامج محو الأمية الثقافية',
        fr: 'Programme d\'alphabétisation culturelle'
      },
      description: {
        ar: 'برنامج تعليمي لتعزيز الثقافة العامة',
        fr: 'Programme éducatif pour renforcer la culture générale'
      },
      fullDescription: {
        ar: 'برنامج تعليمي مجتمعي يهدف إلى رفع مستوى الثقافة العامة وتعزيز المعرفة بالتراث المحلي والعالمي من خلال حلقات نقاشية وورش تفاعلية.',
        fr: 'Programme éducatif communautaire visant à élever le niveau de culture générale et renforcer la connaissance du patrimoine local et mondial à travers des cercles de discussion et ateliers interactifs.'
      },
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      location: {
        ar: 'مراكز متعددة',
        fr: 'Centres multiples'
      },
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
      category: {
        ar: 'تربية',
        fr: 'Éducation'
      },
      beneficiaries: {
        ar: 'جميع الأعمار',
        fr: 'Tous âges'
      }
    }
  ]
};

const EventDetail = () => {
  const { category, id } = useParams();
  const router = useRouter();
  const { language } = useLanguage();

  // Find the event based on category and id
  const findEvent = () => {
    const categoryKey = category as keyof typeof allEvents;
    const events = allEvents[categoryKey];
    return events?.find(event => event.id === parseInt(Array.isArray(id) ? id[0] : id || '0'));
  };

  const event = findEvent();

  if (!event) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'الفعالية غير موجودة' : 'Événement non trouvé'}
          </h1>
          <Button onClick={() => router.push('/activities')}>
            {language === 'ar' ? 'العودة للأنشطة' : 'Retour aux activités'}
          </Button>
        </div>
      </MainLayout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getBackUrl = () => {
    switch (category) {
      case 'visual-arts':
        return '/activities/visual-arts';
      case 'literary-thought':
        return '/activities/literary-thought';
      case 'education':
        return '/activities/education';
      default:
        return '/activities';
    }
  };

  // Helper function to safely access optional properties
  const getSpeakersOrInstructor = () => {
    if ('speakers' in event && event.speakers) {
      return event.speakers[language];
    }
    if ('instructor' in event && event.instructor) {
      return event.instructor[language];
    }
    if ('artist' in event && event.artist) {
      return event.artist[language];
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => router.push(getBackUrl())}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {language === 'ar' ? 'العودة للقائمة' : 'Retour à la liste'}
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Main Image */}
          {event.image && (
            <div className="aspect-video mb-8 overflow-hidden rounded-lg">
              <img 
                src={event.image} 
                alt={event.title[language]} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Event Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                <Tag className="w-3 h-3 inline mr-1" />
                {event.category[language]}
              </span>
            </div>
            
            <h1 className={`text-4xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
              {event.title[language]}
            </h1>
          </div>

          {/* Event Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className={`text-xl font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {language === 'ar' ? 'حول الفعالية' : 'À propos de l\'événement'}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {event.fullDescription[language]}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Event Info Sidebar */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className={`font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}>
                    {language === 'ar' ? 'تفاصيل الفعالية' : 'Détails de l\'événement'}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Date */}
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">
                          {language === 'ar' ? 'التاريخ' : 'Date'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(event.startDate)}
                          {event.endDate !== event.startDate && (
                            <span> - {formatDate(event.endDate)}</span>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">
                          {language === 'ar' ? 'المكان' : 'Lieu'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {event.location[language]}
                        </p>
                      </div>
                    </div>

                    {/* Speakers/Instructor/Artist */}
                    {getSpeakersOrInstructor() && (
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-gray-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">
                            {language === 'ar' ? 'المتحدثون' : 'Intervenants'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {getSpeakersOrInstructor()}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Additional Info */}
                    {'capacity' in event && event.capacity && (
                      <div className="pt-2 border-t">
                        <p className="text-sm">
                          <span className="font-medium">
                            {language === 'ar' ? 'المقاعد المتاحة:' : 'Places disponibles:'}
                          </span> {event.capacity}
                        </p>
                      </div>
                    )}

                    {'price' in event && event.price && (
                      <div className="pt-2 border-t">
                        <p className="text-sm">
                          <span className="font-medium">
                            {language === 'ar' ? 'السعر:' : 'Prix:'}
                          </span> {event.price[language]}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetail;

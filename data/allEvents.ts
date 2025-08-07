
// Consolidated events data from all activity categories
export const allEventsData = [
  // Visual Arts Events
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
    category: {
      ar: 'فنون بصرية',
      fr: 'Arts Visuels'
    },
    type: 'exhibition',
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
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    category: {
      ar: 'فنون بصرية',
      fr: 'Arts Visuels'
    },
    type: 'workshop'
  },
  // Literary Thought Events
  {
    id: 3,
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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    category: {
      ar: 'أدب وفكر',
      fr: 'Littérature et pensée'
    },
    type: 'symposium',
    speakers: {
      ar: 'د. أحمد المتوكل، د. فاطمة المرنيسي',
      fr: 'Dr. Ahmed Moutaouakil, Dr. Fatema Mernissi'
    }
  },
  {
    id: 4,
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
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
    category: {
      ar: 'أدب وفكر',
      fr: 'Pensée Littéraire'
    },
    type: 'poetry'
  },
  // Education Events
  {
    id: 5,
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
    type: 'workshop',
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
    id: 6,
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
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    category: {
      ar: 'تربية',
      fr: 'Éducation'
    },
    type: 'course',
    instructor: {
      ar: 'د. عبد الفتاح كيليطو',
      fr: 'Dr. Abdelfattah Kilito'
    },
    duration: {
      ar: '15 يوم',
      fr: '15 jours'
    }
  }
];

// Helper function to get upcoming events
export const getUpcomingEvents = (limit = 6) => {
  const today = new Date();
  return allEventsData
    .filter(event => new Date(event.startDate) > today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit);
};

// Helper function to filter events by category
export const getEventsByCategory = (category: string) => {
  if (category === 'all') return allEventsData;
  return allEventsData.filter(event => event.category.fr === category || event.category.ar === category);
};

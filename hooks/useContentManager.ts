
import { useState, useEffect } from 'react';
import { EditableContent } from '@/types/ContentTypes';

const CONTENT_STORAGE_KEY = 'cms_content';

export const useContentManager = () => {
  const [content, setContent] = useState<EditableContent[]>([]);

  useEffect(() => {
    const savedContent = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      // Initialize with default content structure
      const defaultContent = initializeDefaultContent();
      setContent(defaultContent);
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(defaultContent));
    }
  }, []);

  const updateContent = (id: string, newValue: string | { ar?: string; fr?: string }) => {
    const updatedContent = content.map(item => 
      item.id === id ? { ...item, value: newValue } : item
    );
    setContent(updatedContent);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(updatedContent));
  };

  const addContent = (newContent: EditableContent) => {
    const updatedContent = [...content, newContent];
    setContent(updatedContent);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(updatedContent));
  };

  const deleteContent = (id: string) => {
    const updatedContent = content.filter(item => item.id !== id);
    setContent(updatedContent);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(updatedContent));
  };

  const getContentByPage = (page: string) => {
    return content.filter(item => item.page === page);
  };

  const getContentValue = (page: string, section: string, field: string, language?: string) => {
    const item = content.find(c => c.page === page && c.section === section && c.field === field);
    if (!item) return '';
    
    if (typeof item.value === 'string') return item.value;
    if (language && typeof item.value === 'object') {
      return item.value[language as keyof typeof item.value] || '';
    }
    return '';
  };

  return {
    content,
    updateContent,
    addContent,
    deleteContent,
    getContentByPage,
    getContentValue
  };
};

const initializeDefaultContent = (): EditableContent[] => {
  return [
    // Homepage content
    {
      id: 'home-hero-title',
      type: 'text',
      page: 'home',
      section: 'hero',
      field: 'title',
      value: { ar: 'جمعية ألف للثقافة والتنمية', fr: 'Association ALEF pour la culture et le développement' },
      label: 'Hero Title'
    },
    {
      id: 'home-hero-subtitle',
      type: 'text',
      page: 'home',
      section: 'hero',
      field: 'subtitle',
      value: { ar: 'نشر الثقافة والفكر والإبداع', fr: 'Diffuser la culture, la pensée et la créativité' },
      label: 'Hero Subtitle'
    },
    {
      id: 'home-hero-description',
      type: 'text',
      page: 'home',
      section: 'hero',
      field: 'description',
      value: { ar: 'منصة ثقافية رائدة تهدف إلى تعزيز القيم الثقافية والأدبية في المجتمع', fr: 'Plateforme culturelle de premier plan visant à promouvoir les valeurs culturelles et littéraires dans la société' },
      label: 'Hero Description'
    },
    {
      id: 'home-hero-image',
      type: 'image',
      page: 'home',
      section: 'hero',
      field: 'background_image',
      value: '/lovable-uploads/Logo_officiel.png',
      label: 'Hero Background Image'
    },
    {
      id: 'home-about-title',
      type: 'text',
      page: 'home',
      section: 'about',
      field: 'title',
      value: { ar: 'من نحن', fr: 'Qui sommes-nous' },
      label: 'About Section Title'
    },
    {
      id: 'home-about-description',
      type: 'text',
      page: 'home',
      section: 'about',
      field: 'description',
      value: { 
        ar: 'جمعية ألف للثقافة والتنمية هي مؤسسة ثقافية غير ربحية تأسست بهدف نشر الوعي الثقافي والأدبي في المجتمع، وتعزيز القيم الإنسانية من خلال مشاريع ثقافية وفنية متنوعة.',
        fr: 'L\'Association ALEF pour la culture et le développement est une organisation culturelle à but non lucratif fondée dans le but de diffuser la sensibilisation culturelle et littéraire dans la société.'
      },
      label: 'About Description'
    },
    {
      id: 'home-mission-title',
      type: 'text',
      page: 'home',
      section: 'mission',
      field: 'title',
      value: { ar: 'رسالتنا', fr: 'Notre Mission' },
      label: 'Mission Title'
    },
    {
      id: 'home-mission-description',
      type: 'text',
      page: 'home',
      section: 'mission',
      field: 'description',
      value: { ar: 'نسعى لإثراء المشهد الثقافي من خلال تنظيم فعاليات ثقافية وأدبية متميزة', fr: 'Nous nous efforçons d\'enrichir le paysage culturel en organisant des événements culturels et littéraires exceptionnels' },
      label: 'Mission Description'
    },
    {
      id: 'home-services-title',
      type: 'text',
      page: 'home',
      section: 'services',
      field: 'title',
      value: { ar: 'خدماتنا', fr: 'Nos Services' },
      label: 'Services Title'
    },

    // About page content
    {
      id: 'about-hero-title',
      type: 'text',
      page: 'about',
      section: 'hero',
      field: 'title',
      value: { ar: 'عن جمعية ألف', fr: 'À propos d\'ALEF' },
      label: 'About Hero Title'
    },
    {
      id: 'about-hero-description',
      type: 'text',
      page: 'about',
      section: 'hero',
      field: 'description',
      value: { ar: 'تعرف على تاريخنا ورؤيتنا ورسالتنا', fr: 'Découvrez notre histoire, notre vision et notre mission' },
      label: 'About Hero Description'
    },
    {
      id: 'about-history-title',
      type: 'text',
      page: 'about',
      section: 'history',
      field: 'title',
      value: { ar: 'تاريخنا', fr: 'Notre Histoire' },
      label: 'History Title'
    },
    {
      id: 'about-history-content',
      type: 'text',
      page: 'about',
      section: 'history',
      field: 'content',
      value: { ar: 'تأسست جمعية ألف للثقافة والتنمية بهدف النهوض بالثقافة والأدب في المجتمع العربي', fr: 'L\'Association ALEF pour la culture et le développement a été fondée dans le but de promouvoir la culture et la littérature dans la société arabe' },
      label: 'History Content'
    },
    {
      id: 'about-vision-title',
      type: 'text',
      page: 'about',
      section: 'vision',
      field: 'title',
      value: { ar: 'رؤيتنا', fr: 'Notre Vision' },
      label: 'Vision Title'
    },
    {
      id: 'about-vision-content',
      type: 'text',
      page: 'about',
      section: 'vision',
      field: 'content',
      value: { ar: 'أن نكون منارة ثقافية تضيء طريق الإبداع والفكر في العالم العربي', fr: 'Être un phare culturel qui éclaire le chemin de la créativité et de la pensée dans le monde arabe' },
      label: 'Vision Content'
    },
    {
      id: 'about-values-title',
      type: 'text',
      page: 'about',
      section: 'values',
      field: 'title',
      value: { ar: 'قيمنا', fr: 'Nos Valeurs' },
      label: 'Values Title'
    },
    {
      id: 'about-values-content',
      type: 'text',
      page: 'about',
      section: 'values',
      field: 'content',
      value: { ar: 'الإبداع، التميز، الشفافية، الالتزام بالثقافة العربية الأصيلة', fr: 'Créativité, excellence, transparence, engagement envers la culture arabe authentique' },
      label: 'Values Content'
    },

    // Activities page content
    {
      id: 'activities-hero-title',
      type: 'text',
      page: 'activities',
      section: 'hero',
      field: 'title',
      value: { ar: 'أنشطتنا الثقافية', fr: 'Nos Activités Culturelles' },
      label: 'Activities Hero Title'
    },
    {
      id: 'activities-hero-description',
      type: 'text',
      page: 'activities',
      section: 'hero',
      field: 'description',
      value: { 
        ar: 'اكتشف مجموعة متنوعة من الأنشطة الثقافية والتعليمية والفنية التي نقدمها',
        fr: 'Découvrez une variété d\'activités culturelles, éducatives et artistiques que nous proposons'
      },
      label: 'Activities Hero Description'
    },
    {
      id: 'activities-literary-title',
      type: 'text',
      page: 'activities',
      section: 'literary',
      field: 'title',
      value: { ar: 'اللقاءات الأدبية', fr: 'Rencontres Littéraires' },
      label: 'Literary Gatherings Title'
    },
    {
      id: 'activities-literary-description',
      type: 'text',
      page: 'activities',
      section: 'literary',
      field: 'description',
      value: { ar: 'ندوات ومناقشات حول الأدب والثقافة العربية المعاصرة', fr: 'Séminaires et discussions sur la littérature et la culture arabe contemporaine' },
      label: 'Literary Gatherings Description'
    },
    {
      id: 'activities-art-title',
      type: 'text',
      page: 'activities',
      section: 'art',
      field: 'title',
      value: { ar: 'المعارض الفنية', fr: 'Expositions Artistiques' },
      label: 'Art Exhibitions Title'
    },
    {
      id: 'activities-art-description',
      type: 'text',
      page: 'activities',
      section: 'art',
      field: 'description',
      value: { ar: 'معارض متنوعة للفن التشكيلي والإبداع البصري', fr: 'Expositions variées d\'arts plastiques et de créativité visuelle' },
      label: 'Art Exhibitions Description'
    },
    {
      id: 'activities-educational-title',
      type: 'text',
      page: 'activities',
      section: 'educational',
      field: 'title',
      value: { ar: 'الأنشطة التعليمية', fr: 'Activités Éducatives' },
      label: 'Educational Activities Title'
    },
    {
      id: 'activities-educational-description',
      type: 'text',
      page: 'activities',
      section: 'educational',
      field: 'description',
      value: { ar: 'ورش عمل ودورات تدريبية في مختلف المجالات الثقافية', fr: 'Ateliers et cours de formation dans divers domaines culturels' },
      label: 'Educational Activities Description'
    },
    {
      id: 'activities-visual-arts-title',
      type: 'text',
      page: 'activities',
      section: 'visual_arts',
      field: 'title',
      value: { ar: 'الفنون البصرية', fr: 'Arts Visuels' },
      label: 'Visual Arts Title'
    },
    {
      id: 'activities-visual-arts-description',
      type: 'text',
      page: 'activities',
      section: 'visual_arts',
      field: 'description',
      value: { ar: 'مقالات وأنشطة متخصصة في الفنون البصرية المعاصرة', fr: 'Articles et activités spécialisés dans les arts visuels contemporains' },
      label: 'Visual Arts Description'
    },
    {
      id: 'activities-literary-thought-title',
      type: 'text',
      page: 'activities',
      section: 'literary_thought',
      field: 'title',
      value: { ar: 'الفكر الأدبي', fr: 'Pensée Littéraire' },
      label: 'Literary Thought Title'
    },
    {
      id: 'activities-literary-thought-description',
      type: 'text',
      page: 'activities',
      section: 'literary_thought',
      field: 'description',
      value: { ar: 'دراسات ومقالات في الفكر الأدبي العربي والعالمي', fr: 'Études et articles sur la pensée littéraire arabe et mondiale' },
      label: 'Literary Thought Description'
    },

    // Publications page content
    {
      id: 'publications-hero-title',
      type: 'text',
      page: 'publications',
      section: 'hero',
      field: 'title',
      value: { ar: 'منشوراتنا', fr: 'Nos Publications' },
      label: 'Publications Hero Title'
    },
    {
      id: 'publications-hero-description',
      type: 'text',
      page: 'publications',
      section: 'hero',
      field: 'description',
      value: { 
        ar: 'اكتشف مجموعتنا المتنوعة من المنشورات الثقافية والأدبية والعلمية',
        fr: 'Découvrez notre collection diversifiée de publications culturelles, littéraires et scientifiques'
      },
      label: 'Publications Hero Description'
    },
    {
      id: 'publications-amis-dionysos-title',
      type: 'text',
      page: 'publications',
      section: 'magazines',
      field: 'amis_dionysos_title',
      value: { ar: 'أصدقاء ديونيسوس', fr: 'Les Amis de Dionysos' },
      label: 'Amis de Dionysos Title'
    },
    {
      id: 'publications-amis-dionysos-description',
      type: 'text',
      page: 'publications',
      section: 'magazines',
      field: 'amis_dionysos_description',
      value: { ar: 'مجلة أدبية متخصصة في الأدب والشعر', fr: 'Revue littéraire spécialisée dans la littérature et la poésie' },
      label: 'Amis de Dionysos Description'
    },
    {
      id: 'publications-art-chiv-title',
      type: 'text',
      page: 'publications',
      section: 'magazines',
      field: 'art_chiv_title',
      value: { ar: 'آرت شيف', fr: 'Art Chiv' },
      label: 'Art Chiv Title'
    },
    {
      id: 'publications-art-chiv-description',
      type: 'text',
      page: 'publications',
      section: 'magazines',
      field: 'art_chiv_description',
      value: { ar: 'مجلة متخصصة في الفنون التشكيلية والبصرية', fr: 'Magazine spécialisé dans les arts plastiques et visuels' },
      label: 'Art Chiv Description'
    },
    {
      id: 'publications-biais-artistiques-title',
      type: 'text',
      page: 'publications',
      section: 'magazines',
      field: 'biais_artistiques_title',
      value: { ar: 'منحازات فنية', fr: 'Biais Artistiques' },
      label: 'Biais Artistiques Title'
    },
    {
      id: 'publications-biais-artistiques-description',
      type: 'text',
      page: 'publications',
      section: 'magazines',
      field: 'biais_artistiques_description',
      value: { ar: 'مجلة تستكشف التوجهات الفنية المعاصرة', fr: 'Magazine explorant les tendances artistiques contemporaines' },
      label: 'Biais Artistiques Description'
    },
    {
      id: 'publications-articles-title',
      type: 'text',
      page: 'publications',
      section: 'content',
      field: 'articles_title',
      value: { ar: 'المقالات', fr: 'Articles' },
      label: 'Articles Title'
    },
    {
      id: 'publications-articles-description',
      type: 'text',
      page: 'publications',
      section: 'content',
      field: 'articles_description',
      value: { ar: 'مقالات ثقافية وأدبية متنوعة', fr: 'Articles culturels et littéraires variés' },
      label: 'Articles Description'
    },
    {
      id: 'publications-books-title',
      type: 'text',
      page: 'publications',
      section: 'content',
      field: 'books_title',
      value: { ar: 'الكتب', fr: 'Livres' },
      label: 'Books Title'
    },
    {
      id: 'publications-books-description',
      type: 'text',
      page: 'publications',
      section: 'content',
      field: 'books_description',
      value: { ar: 'مجموعة متنوعة من الكتب المتخصصة', fr: 'Collection variée de livres spécialisés' },
      label: 'Books Description'
    },

    // Contact page content
    {
      id: 'contact-hero-title',
      type: 'text',
      page: 'contact',
      section: 'hero',
      field: 'title',
      value: { ar: 'تواصل معنا', fr: 'Contactez-nous' },
      label: 'Contact Hero Title'
    },
    {
      id: 'contact-hero-description',
      type: 'text',
      page: 'contact',
      section: 'hero',
      field: 'description',
      value: { ar: 'نحن نرحب بتواصلكم واستفساراتكم', fr: 'Nous accueillons vos communications et vos questions' },
      label: 'Contact Hero Description'
    },
    {
      id: 'contact-address-title',
      type: 'text',
      page: 'contact',
      section: 'info',
      field: 'address_title',
      value: { ar: 'العنوان', fr: 'Adresse' },
      label: 'Address Title'
    },
    {
      id: 'contact-address-content',
      type: 'text',
      page: 'contact',
      section: 'info',
      field: 'address_content',
      value: { ar: 'تونس، تونس', fr: 'Tunis, Tunisie' },
      label: 'Address Content'
    },
    {
      id: 'contact-phone-title',
      type: 'text',
      page: 'contact',
      section: 'info',
      field: 'phone_title',
      value: { ar: 'الهاتف', fr: 'Téléphone' },
      label: 'Phone Title'
    },
    {
      id: 'contact-phone-content',
      type: 'text',
      page: 'contact',
      section: 'info',
      field: 'phone_content',
      value: { ar: '+216 XX XXX XXX', fr: '+216 XX XXX XXX' },
      label: 'Phone Content'
    },
    {
      id: 'contact-email-title',
      type: 'text',
      page: 'contact',
      section: 'info',
      field: 'email_title',
      value: { ar: 'البريد الإلكتروني', fr: 'Email' },
      label: 'Email Title'
    },
    {
      id: 'contact-email-content',
      type: 'text',
      page: 'contact',
      section: 'info',
      field: 'email_content',
      value: { ar: 'contact@alef-culture.org', fr: 'contact@alef-culture.org' },
      label: 'Email Content'
    },

    // Team page content
    {
      id: 'team-hero-title',
      type: 'text',
      page: 'team',
      section: 'hero',
      field: 'title',
      value: { ar: 'فريقنا', fr: 'Notre Équipe' },
      label: 'Team Hero Title'
    },
    {
      id: 'team-hero-description',
      type: 'text',
      page: 'team',
      section: 'hero',
      field: 'description',
      value: { ar: 'تعرف على الأشخاص الذين يقودون رؤيتنا الثقافية', fr: 'Rencontrez les personnes qui dirigent notre vision culturelle' },
      label: 'Team Hero Description'
    },

    // Members page content
    {
      id: 'members-hero-title',
      type: 'text',
      page: 'members',
      section: 'hero',
      field: 'title',
      value: { ar: 'أعضاؤنا', fr: 'Nos Membres' },
      label: 'Members Hero Title'
    },
    {
      id: 'members-hero-description',
      type: 'text',
      page: 'members',
      section: 'hero',
      field: 'description',
      value: { ar: 'انضم إلى مجتمعنا الثقافي المتنامي', fr: 'Rejoignez notre communauté culturelle croissante' },
      label: 'Members Hero Description'
    },

    // Partners page content
    {
      id: 'partners-hero-title',
      type: 'text',
      page: 'partners',
      section: 'hero',
      field: 'title',
      value: { ar: 'شركاؤنا', fr: 'Nos Partenaires' },
      label: 'Partners Hero Title'
    },
    {
      id: 'partners-hero-description',
      type: 'text',
      page: 'partners',
      section: 'hero',
      field: 'description',
      value: { ar: 'نعمل مع شركاء متميزين لتحقيق أهدافنا الثقافية', fr: 'Nous travaillons avec des partenaires exceptionnels pour atteindre nos objectifs culturels' },
      label: 'Partners Hero Description'
    },

    // Cultural Channel page content
    {
      id: 'cultural-channel-hero-title',
      type: 'text',
      page: 'cultural-channel',
      section: 'hero',
      field: 'title',
      value: { ar: 'القناة الثقافية', fr: 'Chaîne Culturelle' },
      label: 'Cultural Channel Hero Title'
    },
    {
      id: 'cultural-channel-hero-description',
      type: 'text',
      page: 'cultural-channel',
      section: 'hero',
      field: 'description',
      value: { ar: 'محتوى فيديو ثقافي متنوع ومثري', fr: 'Contenu vidéo culturel varié et enrichissant' },
      label: 'Cultural Channel Hero Description'
    },

    // Proemes page content
    {
      id: 'proemes-hero-title',
      type: 'text',
      page: 'proemes',
      section: 'hero',
      field: 'title',
      value: { ar: 'بروايم', fr: 'Proèmes' },
      label: 'Proemes Hero Title'
    },
    {
      id: 'proemes-hero-description',
      type: 'text',
      page: 'proemes',
      section: 'hero',
      field: 'description',
      value: { ar: 'مجموعة من النصوص الشعرية والأدبية', fr: 'Collection de textes poétiques et littéraires' },
      label: 'Proemes Hero Description'
    },

    // Navigation content
    {
      id: 'nav-home',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'home',
      value: { ar: 'الرئيسية', fr: 'Accueil' },
      label: 'Navigation Home'
    },
    {
      id: 'nav-about',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'about',
      value: { ar: 'من نحن', fr: 'À propos' },
      label: 'Navigation About'
    },
    {
      id: 'nav-activities',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'activities',
      value: { ar: 'الأنشطة', fr: 'Activités' },
      label: 'Navigation Activities'
    },
    {
      id: 'nav-publications',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'publications',
      value: { ar: 'المنشورات', fr: 'Publications' },
      label: 'Navigation Publications'
    },
    {
      id: 'nav-contact',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'contact',
      value: { ar: 'اتصل بنا', fr: 'Contact' },
      label: 'Navigation Contact'
    },
    {
      id: 'nav-team',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'team',
      value: { ar: 'الفريق', fr: 'Équipe' },
      label: 'Navigation Team'
    },
    {
      id: 'nav-members',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'members',
      value: { ar: 'الأعضاء', fr: 'Membres' },
      label: 'Navigation Members'
    },
    {
      id: 'nav-partners',
      type: 'text',
      page: 'navigation',
      section: 'main',
      field: 'partners',
      value: { ar: 'الشركاء', fr: 'Partenaires' },
      label: 'Navigation Partners'
    },

    // Footer content
    {
      id: 'footer-description',
      type: 'text',
      page: 'footer',
      section: 'main',
      field: 'description',
      value: { ar: 'جمعية ألف للثقافة والتنمية - منارة ثقافية لنشر الوعي والإبداع', fr: 'Association ALEF pour la culture et le développement - Phare culturel pour diffuser la conscience et la créativité' },
      label: 'Footer Description'
    },
    {
      id: 'footer-copyright',
      type: 'text',
      page: 'footer',
      section: 'main',
      field: 'copyright',
      value: { ar: 'جميع الحقوق محفوظة © 2024 جمعية ألف للثقافة والتنمية', fr: 'Tous droits réservés © 2024 Association ALEF pour la culture et le développement' },
      label: 'Footer Copyright'
    }
  ];
};

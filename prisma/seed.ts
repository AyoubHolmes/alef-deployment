import { PrismaClient, ExhibitionStatus, ArticleCategory, WorkshopStatus, EventStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Seed Art Exhibitions
  const exhibitions = await Promise.all([
    prisma.artExhibition.create({
      data: {
        titleAr: 'الفن المعاصر من شمال أفريقيا',
        titleFr: 'Art contemporain d\'Afrique du Nord',
        artistAr: 'مجموعة فنانين',
        artistFr: 'Collectif d\'artistes',
        datesAr: '١ مايو - ٣٠ يونيو ٢٠٢٥',
        datesFr: '1 mai - 30 juin 2025',
        locationAr: 'قاعة العرض الرئيسية',
        locationFr: 'Galerie principale',
        descriptionAr: 'معرض يجمع أعمال فنية معاصرة من شمال أفريقيا، يستكشف التقاطعات بين التقاليد والحداثة.',
        descriptionFr: 'Une exposition qui rassemble des œuvres d\'art contemporain d\'Afrique du Nord, explorant les intersections entre tradition et modernité.',
        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
        status: ExhibitionStatus.CURRENT
      }
    }),
    prisma.artExhibition.create({
      data: {
        titleAr: 'الخط العربي: تراث وإبداع',
        titleFr: 'Calligraphie arabe : héritage et création',
        artistAr: 'محمد القاسم',
        artistFr: 'Mohamed Al-Qasim',
        datesAr: '١٥ مايو - ١٥ يوليو ٢٠٢٥',
        datesFr: '15 mai - 15 juillet 2025',
        locationAr: 'قاعة الفنون التراثية',
        locationFr: 'Salle des arts patrimoniaux',
        descriptionAr: 'معرض للخط العربي يجمع بين الأساليب الكلاسيكية والتفسيرات المعاصرة للخط العربي.',
        descriptionFr: 'Une exposition de calligraphie arabe qui combine styles classiques et interprétations contemporaines de l\'écriture arabe.',
        status: ExhibitionStatus.CURRENT
      }
    }),
    prisma.artExhibition.create({
      data: {
        titleAr: 'الفن الرقمي: آفاق جديدة',
        titleFr: 'Art numérique : nouveaux horizons',
        artistAr: 'سارة المهدي',
        artistFr: 'Sara Al-Mahdi',
        datesAr: '١ أغسطس - ٣٠ سبتمبر ٢٠٢٥',
        datesFr: '1 août - 30 septembre 2025',
        locationAr: 'قاعة الفنون المعاصرة',
        locationFr: 'Galerie d\'art contemporain',
        descriptionAr: 'استكشاف للإمكانيات الإبداعية للتكنولوجيا الرقمية في الفن المعاصر.',
        descriptionFr: 'Une exploration des possibilités créatives de la technologie numérique dans l\'art contemporain.',
        status: ExhibitionStatus.UPCOMING
      }
    })
  ]);

  console.log(`✅ Created ${exhibitions.length} art exhibitions`);

  // Seed Articles (Education, Literary Thought, Visual Arts)
  const articles = await Promise.all([
    // Visual Arts Articles
    prisma.article.create({
      data: {
        titleAr: 'الفن التشكيلي المعاصر في المغرب',
        titleFr: 'L\'art plastique contemporain au Maroc',
        authorAr: 'د. سعيد بنعيسى',
        authorFr: 'Dr. Said Benissa',
        translatorAr: 'أحمد الترجماني',
        translatorFr: 'Ahmed Tarjamani',
        date: new Date('2024-01-15'),
        category: ArticleCategory.VISUAL_ARTS,
        categoryLabelAr: 'فنون بصرية',
        categoryLabelFr: 'Arts Visuels',
        image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
        excerptAr: 'استكشاف للتطورات الحديثة في الفن التشكيلي المغربي ودوره في الثقافة المعاصرة',
        excerptFr: 'Exploration des développements récents de l\'art plastique marocain et son rôle dans la culture contemporaine',
        contentAr: 'يشهد الفن التشكيلي المغربي المعاصر تطورات مهمة ونوعية في السنوات الأخيرة...',
        contentFr: 'L\'art plastique marocain contemporain connaît des développements importants...',
        additionalImages: ['https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07'],
        published: true
      }
    }),
    // Literary Thought Articles
    prisma.article.create({
      data: {
        titleAr: 'النقد الأدبي المغربي المعاصر',
        titleFr: 'La critique littéraire marocaine contemporaine',
        authorAr: 'د. محمد برادة',
        authorFr: 'Dr. Mohamed Berrada',
        translatorAr: 'نادية بن علي',
        translatorFr: 'Nadia Ben Ali',
        date: new Date('2024-02-10'),
        category: ArticleCategory.LITERARY_THOUGHT,
        categoryLabelAr: 'أدب وفكر',
        categoryLabelFr: 'Littérature et pensée',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570',
        excerptAr: 'دراسة تحليلية للنقد الأدبي المغربي في العصر الحديث',
        excerptFr: 'Étude analytique de la critique littéraire marocaine à l\'époque moderne',
        contentAr: 'يعتبر النقد الأدبي المغربي من أهم مكونات الحركة الثقافية العربية...',
        contentFr: 'La critique littéraire marocaine est considérée comme l\'un des éléments les plus importants...',
        additionalImages: [],
        published: true
      }
    }),
    // Education Articles
    prisma.article.create({
      data: {
        titleAr: 'التعليم الرقمي والتحديات المعاصرة',
        titleFr: 'L\'éducation numérique et les défis contemporains',
        authorAr: 'د. فاطمة الزهراء',
        authorFr: 'Dr. Fatima Zahra',
        date: new Date('2024-03-20'),
        category: ArticleCategory.EDUCATION,
        categoryLabelAr: 'تربية',
        categoryLabelFr: 'Éducation',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        excerptAr: 'تحليل شامل للتحديات والفرص في التعليم الرقمي',
        excerptFr: 'Analyse complète des défis et opportunités dans l\'éducation numérique',
        contentAr: 'يواجه التعليم الرقمي في العصر الحديث تحديات متعددة...',
        contentFr: 'L\'éducation numérique à l\'ère moderne fait face à de multiples défis...',
        additionalImages: [],
        published: true
      }
    })
  ]);

  console.log(`✅ Created ${articles.length} articles`);

  // Seed Workshop Categories
  const categories = await Promise.all([
    prisma.workshopCategory.create({
      data: {
        titleAr: 'ورش اللغة العربية',
        titleFr: 'Ateliers de langue arabe',
        icon: '🗣️',
        descriptionAr: 'ورش عمل لتعلم اللغة العربية لجميع المستويات، من المبتدئين إلى المتقدمين.',
        descriptionFr: 'Ateliers d\'apprentissage de la langue arabe pour tous les niveaux, des débutants aux avancés.'
      }
    }),
    prisma.workshopCategory.create({
      data: {
        titleAr: 'ورش الترجمة',
        titleFr: 'Ateliers de traduction',
        icon: '🔄',
        descriptionAr: 'ورش عمل متخصصة في الترجمة بين اللغتين العربية والفرنسية.',
        descriptionFr: 'Ateliers spécialisés en traduction entre l\'arabe et le français.'
      }
    }),
    prisma.workshopCategory.create({
      data: {
        titleAr: 'ورش الخط العربي',
        titleFr: 'Ateliers de calligraphie arabe',
        icon: '✒️',
        descriptionAr: 'ورش عمل لتعلم فن الخط العربي بمختلف أنواعه.',
        descriptionFr: 'Ateliers pour apprendre l\'art de la calligraphie arabe dans ses différents styles.'
      }
    })
  ]);

  console.log(`✅ Created ${categories.length} workshop categories`);

  // Seed Workshops
  const workshops = await Promise.all([
    prisma.workshop.create({
      data: {
        titleAr: 'ورشة الخط العربي للمبتدئين',
        titleFr: 'Atelier de calligraphie arabe pour débutants',
        dateAr: '٥ يونيو - ٢٦ يونيو ٢٠٢٥',
        dateFr: '5 juin - 26 juin 2025',
        time: '17:00 - 19:00',
        locationAr: 'قاعة الورش الفنية',
        locationFr: 'Salle d\'ateliers artistiques',
        instructorAr: 'أحمد السالم',
        instructorFr: 'Ahmed Al-Salem',
        price: '300 DH',
        status: WorkshopStatus.OPEN,
        categoryId: categories[2].id,
        examplesAr: ['أساسيات الخط العربي', 'خط الثلث', 'تصميم اللوحات الخطية'],
        examplesFr: ['Bases de la calligraphie arabe', 'Le thuluth', 'Conception de tableaux calligraphiques']
      }
    }),
    prisma.workshop.create({
      data: {
        titleAr: 'دورة الترجمة الأدبية',
        titleFr: 'Cours de traduction littéraire',
        dateAr: '١٢ يونيو - ١٧ يوليو ٢٠٢٥',
        dateFr: '12 juin - 17 juillet 2025',
        time: '18:00 - 20:00',
        locationAr: 'قاعة المحاضرات',
        locationFr: 'Salle de conférence',
        instructorAr: 'ليلى بنصالح',
        instructorFr: 'Leila Bensalah',
        price: '450 DH',
        status: WorkshopStatus.ALMOST_FULL,
        categoryId: categories[1].id,
        examplesAr: ['ترجمة النصوص الأدبية', 'الترجمة في المجال الإعلامي'],
        examplesFr: ['Traduction de textes littéraires', 'Traduction dans le domaine des médias']
      }
    }),
    prisma.workshop.create({
      data: {
        titleAr: 'ورشة اللغة العربية للناطقين بالفرنسية',
        titleFr: 'Atelier d\'arabe pour francophones',
        dateAr: '٢٠ يونيو - ٢٥ أغسطس ٢٠٢٥',
        dateFr: '20 juin - 25 août 2025',
        time: '10:00 - 12:00',
        locationAr: 'قاعة اللغات',
        locationFr: 'Salle des langues',
        instructorAr: 'سمير العلوي',
        instructorFr: 'Samir Alaoui',
        price: '600 DH',
        status: WorkshopStatus.FULL,
        categoryId: categories[0].id,
        examplesAr: ['دورة أساسيات اللغة العربية', 'ورشة الكتابة الإبداعية'],
        examplesFr: ['Cours de bases de la langue arabe', 'Atelier d\'écriture créative']
      }
    })
  ]);

  console.log(`✅ Created ${workshops.length} workshops`);

  // Seed Literary Events
  const events = await Promise.all([
    prisma.literaryEvent.create({
      data: {
        titleAr: 'نادي القراءة الشهري',
        titleFr: 'Club de lecture mensuel',
        dateAr: '١٥ يونيو ٢٠٢٥',
        dateFr: '15 juin 2025',
        locationAr: 'المكتبة الرئيسية',
        locationFr: 'Bibliothèque principale',
        descriptionAr: 'انضموا إلينا لمناقشة الرواية الجديدة للكاتب محمد حسن علوان "موت صغير"',
        descriptionFr: 'Rejoignez-nous pour discuter du nouveau roman de Mohammed Hasan Alwan "Une mort mineure"',
        image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be',
        status: EventStatus.UPCOMING
      }
    }),
    prisma.literaryEvent.create({
      data: {
        titleAr: 'أمسية شعرية',
        titleFr: 'Soirée poétique',
        dateAr: '٢٢ يونيو ٢٠٢٥',
        dateFr: '22 juin 2025',
        locationAr: 'قاعة الاجتماعات',
        locationFr: 'Salle de réunion',
        descriptionAr: 'أمسية شعرية مع الشاعر عبد الله الفيصل لقراءة قصائد من ديوانه الأخير',
        descriptionFr: 'Soirée poétique avec le poète Abdullah Al-Faisal pour lire des poèmes de son dernier recueil',
        image: 'https://images.unsplash.com/photo-1473177104440-ffee2f376098',
        status: EventStatus.UPCOMING
      }
    }),
    prisma.literaryEvent.create({
      data: {
        titleAr: 'لقاء مع الكاتب',
        titleFr: 'Rencontre avec l\'auteur',
        dateAr: '١٠ مايو ٢٠٢٥',
        dateFr: '10 mai 2025',
        locationAr: 'المسرح الصغير',
        locationFr: 'Petit théâtre',
        descriptionAr: 'لقاء حواري مع الروائي إبراهيم نصر الله حول روايته "شرفة العار"',
        descriptionFr: 'Dialogue avec le romancier Ibrahim Nasrallah sur son roman "Balcon de la honte"',
        image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
        status: EventStatus.PAST
      }
    })
  ]);

  console.log(`✅ Created ${events.length} literary events`);

  // Seed Partners Page Content
  const partnersContent = await prisma.partnersPageContent.upsert({
    where: { id: 1 },
    create: {
      pageTitleAr: 'شركاؤنا',
      pageTitleFr: 'Nos partenaires',
      pageDescriptionAr: 'نفتخر بالعمل مع مجموعة متميزة من المؤسسات والمنظمات التي تشاركنا رؤيتنا لتعزيز الثقافة والفنون',
      pageDescriptionFr: "Nous sommes fiers de travailler avec un groupe distingué d'institutions et d'organisations qui partagent notre vision pour la promotion de la culture et des arts",
    },
    update: {}
  });

  // Seed Partners
  const partners = await Promise.all([
    prisma.partner.create({
      data: {
        nameAr: 'وزارة الثقافة المغربية',
        nameFr: 'Ministère de la Culture Marocain',
        descriptionAr: 'الشريك الرسمي للجمعية في مجال تنظيم الفعاليات الثقافية والأدبية الكبرى',
        descriptionFr: "Partenaire officiel de l'association dans l'organisation des grands événements culturels et littéraires",
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=250',
        website: 'https://www.minculture.gov.ma/',
        type: 'institutional'
      }
    }),
    prisma.partner.create({
      data: {
        nameAr: 'جامعة محمد الخامس',
        nameFr: 'Université Mohammed V',
        descriptionAr: 'شراكة استراتيجية في مجال البحث العلمي والمؤتمرات الأكاديمية',
        descriptionFr: 'Partenariat stratégique dans le domaine de la recherche scientifique et des conférences académiques',
        logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=250',
        website: 'https://www.um5.ac.ma/',
        type: 'academic'
      }
    }),
  ]);

  // Seed Collaborative Programs
  const programs = await Promise.all([
    prisma.collaborativeProgram.create({
      data: {
        titleAr: 'مشروع الترجمات الأدبية',
        titleFr: 'Projet de traductions littéraires',
        descriptionAr: 'مشروع مشترك مع المعهد الفرنسي لترجمة الأعمال الأدبية المغربية إلى اللغة الفرنسية والعكس',
        descriptionFr: "Projet conjoint avec l'Institut français pour la traduction d'œuvres littéraires marocaines vers le français et vice versa",
        partnerNameAr: 'المعهد الفرنسي بالمغرب',
        partnerNameFr: 'Institut Français du Maroc',
      }
    }),
    prisma.collaborativeProgram.create({
      data: {
        titleAr: 'ملتقى الشعراء الشباب',
        titleFr: 'Forum des jeunes poètes',
        descriptionAr: 'برنامج سنوي لاكتشاف ودعم المواهب الشعرية الشابة بالتعاون مع وزارة الثقافة',
        descriptionFr: 'Programme annuel pour découvrir et soutenir les jeunes talents poétiques en collaboration avec le Ministère de la Culture',
        partnerNameAr: 'وزارة الثقافة المغربية',
        partnerNameFr: 'Ministère de la Culture Marocain',
      }
    }),
  ]);

  console.log(`✅ Seeded partners content (${partnersContent.id}), ${partners.length} partners and ${programs.length} programs`);

  // Seed Cultural Channel Content and Videos
  const culturalContent = await prisma.culturalChannelContent.upsert({
    where: { id: 1 },
    create: {
      pageTitleAr: 'القناة الثقافية والأدبية',
      pageTitleFr: 'Chaîne Culturelle et Littéraire',
      pageDescriptionAr: 'مجموعة من الفيديوهات الثقافية والأدبية',
      pageDescriptionFr: 'Une collection de vidéos culturelles et littéraires',
    },
    update: {}
  });

  await prisma.culturalChannelVideo.deleteMany({});
  await prisma.culturalChannelVideo.createMany({
    data: [
      {
        youtubeId: 'N0VVXybI_Bk',
        titleAr: 'مناظرة: اللغة العربية وتجديد الخطاب الديني',
        titleFr: "Débat: La langue arabe et le renouvellement du discours religieux",
        descriptionAr: 'مناقشة فكرية حول اللغة العربية والخطاب الديني المعاصر.',
        descriptionFr: "Discussion intellectuelle sur la langue arabe et le discours religieux contemporain.",
        thumbnail: 'https://img.youtube.com/vi/N0VVXybI_Bk/mqdefault.jpg',
        publishDate: new Date('2024-01-15'),
        category: 'culture'
      },
      {
        youtubeId: 'gV6_1538O7E',
        titleAr: 'محاضرة: الكتابة بالعربية في الزمن الرقمي',
        titleFr: "Conférence: L'écriture en arabe à l'ère numérique",
        descriptionAr: 'محاضرة حول تحديات وفضاءات الكتابة الرقمية.',
        descriptionFr: "Conférence sur les défis et les espaces de l'écriture numérique.",
        thumbnail: 'https://img.youtube.com/vi/gV6_1538O7E/mqdefault.jpg',
        publishDate: new Date('2024-02-10'),
        category: 'littérature'
      },
      {
        youtubeId: 'MWOx7sXnl7g',
        titleAr: 'الترجمة وتطوير المعرفة',
        titleFr: 'La traduction et le développement du savoir',
        descriptionAr: 'نقاش حول دور الترجمة في إثراء المعرفة.',
        descriptionFr: 'Discussion sur le rôle de la traduction dans l’enrichissement du savoir.',
        thumbnail: 'https://img.youtube.com/vi/MWOx7sXnl7g/mqdefault.jpg',
        publishDate: new Date('2024-03-05'),
        category: 'traduction'
      }
    ]
  });

  console.log(`✅ Seeded cultural channel content (${culturalContent.id}) and videos`);

  // Seed Publications Issues
  await prisma.publicationIssue.deleteMany({ where: { magazine: 'AMIS_DIONYSOS' } });
  await prisma.publicationIssue.createMany({
    data: [
      {
        magazine: 'AMIS_DIONYSOS',
        number: 12,
        titleAr: 'عدد خاص: الفنون المعاصرة',
        titleFr: 'Édition spéciale: Arts contemporains',
        date: new Date('2024-03-01'),
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
        featuredAr: 'ملف خاص عن الفن المغربي المعاصر',
        featuredFr: "Dossier spécial sur l'art marocain contemporain",
        contentAr: 'مقالات متخصصة، حوارات، ومعرض مصور للأعمال الحديثة.',
        contentFr: "Articles spécialisés, entretiens et galerie d'œuvres modernes."
      },
      {
        magazine: 'AMIS_DIONYSOS',
        number: 11,
        titleAr: 'الأدب والذاكرة',
        titleFr: 'Littérature et mémoire',
        date: new Date('2024-02-01'),
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
        featuredAr: 'استكشاف العلاقة بين الأدب والذاكرة الجماعية',
        featuredFr: 'Exploration de la relation entre littérature et mémoire collective',
        contentAr: 'دراسات أكاديمية ونصوص إبداعية حول الذاكرة الثقافية.',
        contentFr: 'Études académiques et textes créatifs sur la mémoire culturelle.'
      }
    ]
  });

  await prisma.publicationIssue.deleteMany({ where: { magazine: 'ART_CHIV' } });
  await prisma.publicationIssue.createMany({
    data: [
      {
        magazine: 'ART_CHIV',
        number: 8,
        titleAr: 'الشعر والفلسفة',
        titleFr: 'Poésie et philosophie',
        date: new Date('2024-01-01'),
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
        featuredAr: 'يتقاطع الشعر مع الفكر الفلسفي',
        featuredFr: 'La poésie rencontre la pensée philosophique',
        contentAr: 'قصائد ودراسات حول الفلسفة والشعر.',
        contentFr: 'Poèmes et études sur la philosophie et la poésie.'
      },
      {
        magazine: 'ART_CHIV',
        number: 7,
        titleAr: 'أصوات نسائية في الأدب',
        titleFr: 'Voix féminines en littérature',
        date: new Date('2023-10-01'),
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
        featuredAr: 'إبداع نسائي مغربي معاصر',
        featuredFr: 'Créativité féminine marocaine contemporaine',
        contentAr: 'نصوص إبداعية ودراسات نقدية.',
        contentFr: 'Textes créatifs et études critiques.'
      }
    ]
  });

  await prisma.publicationIssue.deleteMany({ where: { magazine: 'BIAIS_ARTISTIQUES' } });
  await prisma.publicationIssue.createMany({
    data: [
      {
        magazine: 'BIAIS_ARTISTIQUES',
        number: 5,
        titleAr: 'الفن التفاعلي والتكنولوجيا',
        titleFr: 'Art interactif et technologie',
        date: new Date('2024-02-15'),
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
        featuredAr: 'حدود الفن الرقمي والتفاعل البصري',
        featuredFr: "Frontières de l'art numérique et de l'interaction visuelle",
        contentAr: 'مقابلات ودراسات حول مستقبل الفن الرقمي.',
        contentFr: 
          "Entretiens et études sur l'avenir de l'art numérique."
      }
    ]
  });

  console.log('✅ Seeded publications issues for Amis Dionysos, Art\'Chiv, and Biais Artistiques');

  // Optionally seed one PROEMES article if none exists
  const proemesCount = await prisma.article.count({ where: { category: 'PROEMES' as any } });
  if (proemesCount === 0) {
    await prisma.article.create({
      data: {
        titleAr: 'نثريات: نصوص قصيرة',
        titleFr: 'Proèmes: Textes courts',
        authorAr: 'مجموعة مؤلفين',
        authorFr: 'Collectif',
        date: new Date('2024-04-10'),
        category: 'PROEMES' as any,
        categoryLabelAr: 'نثريات',
        categoryLabelFr: 'Proèmes',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
        excerptAr: 'مختارات نثرية قصيرة.',
        excerptFr: 'Sélection de courts proèmes.',
        contentAr: 'نصوص قصيرة متنوعة...',
        contentFr: 'Textes courts variés...',
        additionalImages: [],
        published: true
      }
    });
    console.log('✅ Seeded one PROEMES article');
  }

  // Seed Books
  const books = await Promise.all([
    prisma.book.create({
      data: {
        titleAr: 'تاريخ الثقافة المغربية',
        titleFr: 'Histoire de la culture marocaine',
        authorAr: 'د. محمد الأندلسي',
        authorFr: 'Dr. Mohammed Andalusi',
        year: '2023',
        pages: 320,
        isbn: '978-9981-123-456-7',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
        descriptionAr: 'دراسة شاملة لتطور الثقافة المغربية عبر العصور، تتناول الجوانب الأدبية والفنية والاجتماعية',
        descriptionFr: "Étude complète de l'évolution de la culture marocaine à travers les âges, couvrant les aspects littéraires, artistiques et sociaux",
        summaryAr: 'يقدم هذا الكتاب نظرة معمقة على التراث الثقافي المغربي من خلال تحليل النصوص التاريخية والشواهد الأثرية. يستكشف المؤلف كيف تشكلت الهوية الثقافية المغربية عبر التفاعل مع الحضارات المختلفة.',
        summaryFr: "Ce livre offre un regard approfondi sur le patrimoine culturel marocain à travers l'analyse de textes historiques et de témoignages archéologiques. L'auteur explore comment l'identité culturelle marocaine s'est formée par l'interaction avec différentes civilisations.",
        downloadUrl: '/sample-book-1.pdf'
      }
    }),
    prisma.book.create({
      data: {
        titleAr: 'الشعر المغربي الحديث',
        titleFr: 'Poésie marocaine moderne',
        authorAr: 'أمينة الكتاني',
        authorFr: 'Amina Kettani',
        year: '2023',
        pages: 280,
        isbn: '978-9981-123-457-4',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
        descriptionAr: 'مختارات من أجمل القصائد المغربية المعاصرة مع دراسة نقدية معمقة',
        descriptionFr: 'Anthologie des plus beaux poèmes marocains contemporains avec une étude critique approfondie',
        summaryAr: 'مجموعة منتقاة من أروع الأعمال الشعرية المغربية الحديثة، تضم قصائد لأبرز الشعراء المعاصرين مع تحليل أدبي ونقدي يسلط الضوء على خصائص الشعر المغربي الحديث.',
        summaryFr: 'Collection soigneusement sélectionnée des plus belles œuvres poétiques marocaines modernes, comprenant des poèmes des poètes contemporains les plus éminents avec une analyse littéraire et critique mettant en lumière les caractéristiques de la poésie marocaine moderne.',
        downloadUrl: '/sample-book-2.pdf'
      }
    }),
    prisma.book.create({
      data: {
        titleAr: 'فن الخط العربي في المغرب',
        titleFr: 'Art de la calligraphie arabe au Maroc',
        authorAr: 'د. فاطمة المراكشي',
        authorFr: 'Dr. Fatima Marrakchi',
        year: '2022',
        pages: 450,
        isbn: '978-9981-123-458-1',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
        descriptionAr: 'دراسة معمقة لتطور فن الخط العربي في المغرب من العصر الوسيط إلى الوقت الحاضر',
        descriptionFr: "Étude approfondie de l'évolution de l'art de la calligraphie arabe au Maroc du Moyen Âge à nos jours",
        summaryAr: 'يتتبع هذا الكتاب تاريخ فن الخط العربي في المغرب، ويحلل الطرق والأساليب المختلفة التي طورها الخطاطون المغاربة عبر القرون. يضم الكتاب صورًا نادرة لمخطوطات تاريخية ونماذج من أعمال خطاطين معاصرين.',
        summaryFr: "Ce livre retrace l'histoire de l'art de la calligraphie arabe au Maroc et analyse les différentes méthodes et styles développés par les calligraphes marocains à travers les siècles. Il comprend des images rares de manuscrits historiques et des exemples d'œuvres de calligraphes contemporains.",
        downloadUrl: '/sample-book-3.pdf'
      }
    })
  ]);

  console.log(`✅ Created ${books.length} books`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
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
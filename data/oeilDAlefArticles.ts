
export interface OeilDAlefArticle {
  id: number;
  title: { ar: string; fr: string };
  author: { ar: string; fr: string };
  translator?: { ar: string; fr: string };
  date: string;
  category: 'visual-arts' | 'literary-thought' | 'proemes' | 'education';
  categoryLabel: { ar: string; fr: string };
  image: string;
  excerpt: { ar: string; fr: string };
  content: { ar: string; fr: string };
  additionalImages?: string[];
}

export const oeilDAlefArticles: OeilDAlefArticle[] = [
  // Visual Arts Articles
  {
    id: 1,
    title: {
      ar: 'الفن التشكيلي المعاصر في المغرب',
      fr: 'L\'art plastique contemporain au Maroc'
    },
    author: {
      ar: 'د. سعيد بنعيسى',
      fr: 'Dr. Said Benissa'
    },
    translator: {
      ar: 'أحمد الترجماني',
      fr: 'Ahmed Tarjamani'
    },
    date: '2024-01-15',
    category: 'visual-arts',
    categoryLabel: {
      ar: 'فنون بصرية',
      fr: 'Arts Visuels'
    },
    image: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=600&fit=crop',
    excerpt: {
      ar: 'استكشاف للتطورات الحديثة في الفن التشكيلي المغربي ودوره في الثقافة المعاصرة',
      fr: 'Exploration des développements récents de l\'art plastique marocain et son rôle dans la culture contemporaine'
    },
    content: {
      ar: 'يشهد الفن التشكيلي المغربي المعاصر تطورات مهمة ونوعية في السنوات الأخيرة، حيث يسعى الفنانون المغاربة إلى إيجاد توازن بين الأصالة والمعاصرة. هذا التطور يعكس الهوية الثقافية المغربية الغنية ويساهم في إثراء المشهد الفني العربي والعالمي.\n\nمن خلال هذا البحث، نتناول أهم التيارات الفنية السائدة في المغرب، والتقنيات المستخدمة، والموضوعات التي يعالجها الفنانون. كما نسلط الضوء على دور المؤسسات الثقافية في دعم وتطوير هذا الفن.\n\nإن الفن التشكيلي المغربي المعاصر يمثل جسراً حضارياً يربط بين التراث العريق والتطلعات المستقبلية، مما يجعله إضافة قيمة للثقافة الإنسانية المعاصرة.',
      fr: 'L\'art plastique marocain contemporain connaît des développements importants et qualitatifs ces dernières années, où les artistes marocains cherchent à trouver un équilibre entre authenticité et modernité. Cette évolution reflète la riche identité culturelle marocaine et contribue à enrichir la scène artistique arabe et mondiale.\n\nÀ travers cette recherche, nous abordons les principaux courants artistiques dominants au Maroc, les techniques utilisées et les sujets traités par les artistes. Nous mettons également en lumière le rôle des institutions culturelles dans le soutien et le développement de cet art.\n\nL\'art plastique marocain contemporain représente un pont civilisationnel qui relie le patrimoine ancestral aux aspirations futures, ce qui en fait un ajout précieux à la culture humaine contemporaine.'
    },
    additionalImages: [
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 2,
    title: {
      ar: 'التصوير الفوتوغرافي كوسيلة تعبير فني',
      fr: 'La photographie comme moyen d\'expression artistique'
    },
    author: {
      ar: 'لمياء الصقلي',
      fr: 'Lamia Sakli'
    },
    translator: {
      ar: 'محمد العلوي',
      fr: 'Mohamed Alaoui'
    },
    date: '2024-02-20',
    category: 'visual-arts',
    categoryLabel: {
      ar: 'فنون بصرية',
      fr: 'Arts Visuels'
    },
    image: 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50?w=800&h=600&fit=crop',
    excerpt: {
      ar: 'دراسة حول تطور فن التصوير الفوتوغرافي وتأثيره على الوعي البصري المعاصر',
      fr: 'Étude sur l\'évolution de l\'art photographique et son impact sur la conscience visuelle contemporaine'
    },
    content: {
      ar: 'يعتبر التصوير الفوتوغرافي من أهم وسائل التعبير الفني في العصر الحديث، حيث يجمع بين التقنية والإبداع لينتج أعمالاً فنية تحمل رسائل عميقة ومؤثرة. هذا الفن يتيح للمصور إمكانية توثيق الواقع وإعادة تشكيله بصرياً.\n\nمن خلال عدسة الكاميرا، يستطيع الفنان أن يحول اللحظات العادية إلى أعمال فنية استثنائية، مما يساهم في تشكيل الوعي البصري للمتلقي ويؤثر على فهمه للعالم المحيط به.',
      fr: 'La photographie est considérée comme l\'un des moyens d\'expression artistique les plus importants de l\'époque moderne, combinant technique et créativité pour produire des œuvres d\'art porteuses de messages profonds et impactants. Cet art permet au photographe de documenter la réalité et de la reformuler visuellement.\n\nÀ travers l\'objectif de la caméra, l\'artiste peut transformer des moments ordinaires en œuvres d\'art exceptionnelles, contribuant ainsi à façonner la conscience visuelle du récepteur et influençant sa compréhension du monde qui l\'entoure.'
    },
    additionalImages: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop'
    ]
  },
  
  // Literary Thought Articles
  {
    id: 3,
    title: {
      ar: 'النقد الأدبي المغربي المعاصر',
      fr: 'La critique littéraire marocaine contemporaine'
    },
    author: {
      ar: 'د. محمد برادة',
      fr: 'Dr. Mohamed Berrada'
    },
    translator: {
      ar: 'نادية بن علي',
      fr: 'Nadia Ben Ali'
    },
    date: '2024-01-10',
    category: 'literary-thought',
    categoryLabel: {
      ar: 'أدب وفكر',
      fr: 'Littérature et pensée'
    },
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
    excerpt: {
      ar: 'تحليل للمناهج النقدية الحديثة في الأدب المغربي ومساهمتها في الخطاب الثقافي',
      fr: 'Analyse des méthodes critiques modernes dans la littérature marocaine et leur contribution au discours culturel'
    },
    content: {
      ar: 'يشهد النقد الأدبي المغربي المعاصر تنوعاً في المناهج والتوجهات، مما يعكس ثراء المشهد الثقافي المغربي وتفاعله مع التطورات النقدية العالمية. هذا التنوع يساهم في إثراء الخطاب النقدي العربي بشكل عام.\n\nمن خلال دراسة أعمال النقاد المغاربة المعاصرين، نلاحظ تطوراً ملحوظاً في أدوات التحليل والتأويل، مما يجعل النقد المغربي يحتل مكانة مهمة في المشهد النقدي العربي والمغاربي.',
      fr: 'La critique littéraire marocaine contemporaine témoigne d\'une diversité dans les méthodes et orientations, reflétant la richesse de la scène culturelle marocaine et son interaction avec les développements critiques mondiaux. Cette diversité contribue à enrichir le discours critique arabe en général.\n\nÀ travers l\'étude des œuvres des critiques marocains contemporains, nous observons un développement notable dans les outils d\'analyse et d\'interprétation, ce qui fait que la critique marocaine occupe une place importante dans la scène critique arabe et maghrébine.'
    },
    additionalImages: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
    ]
  },
  {
    id: 4,
    title: {
      ar: 'الرواية المغربية الحديثة وقضايا الهوية',
      fr: 'Le roman marocain moderne et les questions d\'identité'
    },
    author: {
      ar: 'فاطمة المرنيسي',
      fr: 'Fatima Mernissi'
    },
    translator: {
      ar: 'سعاد الناصري',
      fr: 'Souad Nassiri'
    },
    date: '2024-03-05',
    category: 'literary-thought',
    categoryLabel: {
      ar: 'أدب وفكر',
      fr: 'Littérature et pensée'
    },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    excerpt: {
      ar: 'بحث في تطور الرواية المغربية ومعالجتها لقضايا الهوية والتراث',
      fr: 'Recherche sur l\'évolution du roman marocain et son traitement des questions d\'identité et de patrimoine'
    },
    content: {
      ar: 'تمثل الرواية المغربية الحديثة مرآة عاكسة للتحولات الاجتماعية والثقافية التي يشهدها المجتمع المغربي. من خلال معالجتها لقضايا الهوية والتراث، تساهم هذه الرواية في تشكيل الوعي الجمعي وطرح الأسئلة المهمة حول مستقبل المجتمع.\n\nيتناول الروائيون المغاربة موضوعات متنوعة تتراوح بين التراث والحداثة، بين الأصالة والمعاصرة، مما يجعل النص الروائي المغربي غنياً بالدلالات والإيحاءات.',
      fr: 'Le roman marocain moderne représente un miroir reflétant les transformations sociales et culturelles que connaît la société marocaine. À travers son traitement des questions d\'identité et de patrimoine, ce roman contribue à façonner la conscience collective et à poser des questions importantes sur l\'avenir de la société.\n\nLes romanciers marocains abordent des sujets variés allant du patrimoine à la modernité, de l\'authenticité à la contemporanéité, ce qui rend le texte romanesque marocain riche en significations et en suggestions.'
    },
    additionalImages: [
      'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=600&fit=crop'
    ]
  },
  
  // Proèmes Articles
  {
    id: 5,
    title: {
      ar: 'فن النثر الشعري في الأدب العربي',
      fr: 'L\'art de la prose poétique dans la littérature arabe'
    },
    author: {
      ar: 'أ. عبد الكبير الخطيبي',
      fr: 'Prof. Abdelkebir Khatibi'
    },
    translator: {
      ar: 'ياسمين الفاسي',
      fr: 'Yasmine Fassi'
    },
    date: '2024-02-15',
    category: 'proemes',
    categoryLabel: {
      ar: 'نثريات',
      fr: 'Proèmes'
    },
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop',
    excerpt: {
      ar: 'دراسة في تقنيات النثر الشعري وتطوره في الأدب العربي المعاصر',
      fr: 'Étude des techniques de la prose poétique et de son évolution dans la littérature arabe contemporaine'
    },
    content: {
      ar: 'يعد النثر الشعري من أهم الأشكال الأدبية التي شهدت تطوراً ملحوظاً في الأدب العربي المعاصر. هذا الفن يجمع بين خصائص النثر والشعر، مما يخلق نصوصاً أدبية تتميز بالجمال والعمق في آن واحد.\n\nمن خلال دراسة نماذج من النثر الشعري العربي، نكتشف ثراء هذا الفن وقدرته على التعبير عن المشاعر والأفكار بطريقة مبتكرة ومؤثرة. كما نتتبع تطوره التاريخي وتأثره بالتيارات الأدبية المختلفة.\n\nإن النثر الشعري يمثل إضافة مهمة للأدب العربي، حيث يفتح آفاقاً جديدة للإبداع والتعبير الأدبي.',
      fr: 'La prose poétique est considérée comme l\'une des formes littéraires les plus importantes qui ont connu un développement notable dans la littérature arabe contemporaine. Cet art combine les caractéristiques de la prose et de la poésie, créant des textes littéraires qui se distinguent par leur beauté et leur profondeur à la fois.\n\nÀ travers l\'étude de modèles de prose poétique arabe, nous découvrons la richesse de cet art et sa capacité à exprimer les sentiments et les idées de manière innovante et impactante. Nous suivons également son évolution historique et son influence par les différents courants littéraires.\n\nLa prose poétique représente un ajout important à la littérature arabe, ouvrant de nouveaux horizons pour la créativité et l\'expression littéraire.'
    },
    additionalImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop'
    ]
  },
  
  // Education Articles
  {
    id: 6,
    title: {
      ar: 'التربية الفنية في النظام التعليمي المغربي',
      fr: 'L\'éducation artistique dans le système éducatif marocain'
    },
    author: {
      ar: 'د. أحمد شراك',
      fr: 'Dr. Ahmed Cherrak'
    },
    translator: {
      ar: 'ليلى الحسني',
      fr: 'Leila Hasni'
    },
    date: '2024-03-10',
    category: 'education',
    categoryLabel: {
      ar: 'تربية',
      fr: 'Éducation'
    },
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    excerpt: {
      ar: 'تحليل لوضعية التربية الفنية في المناهج التعليمية ودورها في التنمية الثقافية',
      fr: 'Analyse de la situation de l\'éducation artistique dans les programmes éducatifs et son rôle dans le développement culturel'
    },
    content: {
      ar: 'تحتل التربية الفنية مكانة مهمة في النظام التعليمي المغربي، حيث تساهم في تنمية الحس الجمالي والإبداعي لدى الطلاب. هذه المادة تفتح آفاقاً جديدة للتعبير والإبداع، وتساعد في تكوين شخصية متوازنة ومتكاملة.\n\nمن خلال هذا البحث، نحلل واقع التربية الفنية في المناهج المغربية، والتحديات التي تواجهها، والحلول المقترحة لتطويرها. كما نسلط الضوء على دورها في التنمية الثقافية والحضارية للمجتمع.\n\nإن تطوير التربية الفنية يتطلب جهوداً متضافرة من جميع الأطراف المعنية، بهدف إعداد أجيال قادرة على المساهمة في النهضة الثقافية والفنية للوطن.',
      fr: 'L\'éducation artistique occupe une place importante dans le système éducatif marocain, contribuant au développement du sens esthétique et créatif chez les étudiants. Cette matière ouvre de nouveaux horizons pour l\'expression et la créativité, et aide à former une personnalité équilibrée et intégrée.\n\nÀ travers cette recherche, nous analysons la réalité de l\'éducation artistique dans les programmes marocains, les défis qu\'elle rencontre, et les solutions proposées pour son développement. Nous mettons également en lumière son rôle dans le développement culturel et civilisationnel de la société.\n\nLe développement de l\'éducation artistique nécessite des efforts conjugués de toutes les parties concernées, dans le but de préparer des générations capables de contribuer à la renaissance culturelle et artistique de la nation.'
    },
    additionalImages: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1606889464198-fcb18894cf50?w=600&h=600&fit=crop'
    ]
  }
];

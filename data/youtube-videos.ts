
import { Language } from '@/contexts/language/types';

export interface YouTubeVideo {
  id: string;
  title: {
    ar: string;
    fr: string;
  };
  thumbnail: string;
}

export const getYouTubeVideos = (): YouTubeVideo[] => [
  {
    id: "N0VVXybI_Bk",
    title: {
      ar: 'مناظرة حول موضوع: اللغة العربية وتجديد الخطاب الديني',
      fr: 'Débat sur le sujet: La langue arabe et le renouvellement du discours religieux'
    },
    thumbnail: "https://img.youtube.com/vi/N0VVXybI_Bk/mqdefault.jpg"
  },
  {
    id: "gV6_1538O7E",
    title: {
      ar: 'محاضرة في موضوع: الكتابة باللغة العربية في الزمن الرقمي',
      fr: 'Conférence sur: L\'écriture en langue arabe à l\'ère numérique'
    },
    thumbnail: "https://img.youtube.com/vi/gV6_1538O7E/mqdefault.jpg"
  },
  {
    id: "MWOx7sXnl7g",
    title: {
      ar: 'مناقشة موضوع: الترجمة وتطوير المعرفة',
      fr: 'Discussion sur: La traduction et le développement du savoir'
    },
    thumbnail: "https://img.youtube.com/vi/MWOx7sXnl7g/mqdefault.jpg"
  },
  {
    id: "3UFJH3ASV_g",
    title: {
      ar: 'خير جليس: الكاتب حسن أوريد',
      fr: 'Le meilleur compagnon: L\'écrivain Hassan Aourid'
    },
    thumbnail: "https://img.youtube.com/vi/3UFJH3ASV_g/mqdefault.jpg"
  },
  {
    id: "o6u2pqa4n-c",
    title: {
      ar: 'لقاء مع الكاتب المغربي ياسين عدنان',
      fr: 'Rencontre avec l\'écrivain marocain Yassin Adnan'
    },
    thumbnail: "https://img.youtube.com/vi/o6u2pqa4n-c/mqdefault.jpg"
  }
];


export type Language = 'ar' | 'fr';

export type TranslationType = {
  ar: string;
  fr: string;
};

export type TranslationsType = {
  [key: string]: TranslationType;
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: string;
}

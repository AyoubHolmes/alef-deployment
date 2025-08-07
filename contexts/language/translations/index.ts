
import { TranslationsType } from '../types';
import { navigationTranslations } from './navigation';
import { commonTranslations } from './common';
import { newsletterTranslations } from './newsletter';
import { aboutTranslations } from './about';
import { activitiesTranslations } from './activities';
import { contactTranslations } from './contact';
import { partnersTranslations } from './partners';

// Combine all translation categories
export const translations: TranslationsType = {
  ...navigationTranslations,
  ...commonTranslations,
  ...newsletterTranslations,
  ...aboutTranslations,
  ...activitiesTranslations,
  ...contactTranslations,
  ...partnersTranslations
};

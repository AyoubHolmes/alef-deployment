
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    // <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
          <footer className="bg-[#ebebeb] text-gray-700 border-t border-gray-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Logo */}
          <div className="flex justify-center md:justify-center order-1 md:order-1 lg:order-1 w-full mb-10 lg:mb-0">
            <img
              src="/lovable-uploads/7494d24e-9f75-4da7-af9e-fea8fc57e6fd.png"
              alt="ALEF Association"
              className="h-52 lg:h-60 w-auto"
            />
          </div>

          {/* Association Description */}
          <div className={`${isArabic ? 'text-center md:text-right lg:text-center' : 'text-center md:text-left lg:text-center'} space-y-4 order-2 md:order-3 lg:order-2 md:col-span-2 lg:col-span-1`}>
            <h3 className={`text-lg font-bold text-gray-800 ${isArabic ? 'font-cairo leading-relaxed' : 'font-montserrat'}`}>
              {isArabic
                ? 'جمعية ألف للثقافة والتنمية'
                : 'Association ALEF pour la Culture et le Développement'}
            </h3>
            <p
              className={`text-base text-gray-600 mx-auto max-w-sm lg:max-w-md ${isArabic ? 'leading-loose font-cairo' : 'leading-relaxed font-montserrat'}`}
            >
              {isArabic
                ? 'منظمة غير ربحية مكرسة لتعزيز الثقافة والتنمية المجتمعية من خلال الأنشطة الثقافية والتعليمية المتنوعة.'
                : "Organisation à but non lucratif dédiée à la promotion de la culture et du développement communautaire à travers des activités culturelles et éducatives diverses."}
            </p>
          </div>

          {/* Contact + Social */}
          <div className={`${isArabic ? 'text-center md:text-right lg:text-center' : 'text-center md:text-left lg:text-center'} space-y-6 order-3 md:order-2 lg:order-3`}>
            <h4 className={`text-lg font-bold text-gray-800 ${isArabic ? 'font-cairo' : 'font-montserrat'}`}>
              {isArabic ? 'تواصل معنا' : 'Contact'}
            </h4>

            {/* Contact Info List */}
            <div className="flex justify-center">
              <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-5 flex justify-center">
                  <MapPin size={18} className="text-gray-500 flex-shrink-0" />
                </div>
                <span className={`text-base text-gray-600 ${isArabic ? 'font-cairo' : 'font-montserrat'}`}>
                  {isArabic ? 'الدار البيضاء، المغرب' : 'Casablanca, Maroc'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 flex justify-center">
                  <Phone size={18} className="text-gray-500 flex-shrink-0" />
                </div>
                <span className={`text-base text-gray-600 ${isArabic ? 'font-cairo' : 'font-montserrat'}`}>
                  +212 5XX-XXX-XXX
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 flex justify-center">
                  <Mail size={18} className="text-gray-500 flex-shrink-0" />
                </div>
                <a
                  href="mailto:info@alefassociation.org"
                  className={`text-base text-gray-600 hover:text-gray-800 transition ${isArabic ? 'font-cairo' : 'font-montserrat'}`}
                >
                  info@alefassociation.org
                </a>
              </div>
              </div>
            </div>

            {/* Social Section */}
            <div className="space-y-3">
              <h5
                className={`font-semibold text-base text-gray-700 ${
                  isArabic ? 'font-cairo' : 'font-montserrat'
                }`}
              >
                {isArabic ? 'تابعونا على' : 'Réseaux sociaux'}
              </h5>
              <div className="flex gap-3 justify-center">
                {[Facebook, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition hover:scale-110"
                  >
                    <Icon size={18} className="text-gray-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-center text-gray-500 text-sm">
          <p className={`${isArabic ? 'font-cairo leading-relaxed' : 'font-montserrat'}`}>
            {isArabic
              ? `© ${currentYear} جمعية ألف للثقافة والتنمية. جميع الحقوق محفوظة.`
              : `© ${currentYear} Association ALEF pour la Culture et le Développement. Tous droits réservés.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

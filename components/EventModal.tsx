
import React from 'react';
import { useLanguage } from '@/contexts/language';
import { Calendar, MapPin, Users, GraduationCap, Eye, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface EventModalProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!event) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isRTL = language === 'ar';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={`max-w-4xl max-h-[90vh] overflow-y-auto`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <DialogHeader className={isRTL ? 'text-right' : 'text-left'}>
          <DialogTitle className={`text-2xl ${isRTL ? 'font-cairo text-right pr-8' : 'font-montserrat text-left pl-8'}`}>
            {event.title[language]}
          </DialogTitle>
          <DialogClose className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-4`}>
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Event Image */}
          {event.image && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img 
                src={event.image} 
                alt={event.title[language]} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Event Details */}
          <div className={`grid md:grid-cols-2 gap-8`}>
            {/* About Section */}
            <div className={`space-y-4 ${isRTL ? 'md:order-2' : 'md:order-2'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-cairo text-right' : 'font-montserrat text-left'}`}>
                {language === 'ar' ? 'حول الفعالية' : 'À propos de l\'événement'}
              </h3>
              <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right font-cairo' : 'text-left'}`}>
                {event.fullDescription[language]}
              </p>
            </div>
            
            {/* Details Section */}
            <div className={`space-y-4 ${isRTL ? 'md:order-1' : 'md:order-1'}`}>
              <h3 className={`text-lg font-semibold mb-6 ${isRTL ? 'font-cairo text-right' : 'font-montserrat text-left'}`}>
                {language === 'ar' ? 'تفاصيل الفعالية' : 'Détails de l\'événement'}
              </h3>
              
              <div className="space-y-6">
                {/* Date */}
                <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Calendar className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'التاريخ' : 'Date'}
                    </p>
                    <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                      {formatDate(event.startDate)}
                      {event.endDate !== event.startDate && (
                        <span> - {formatDate(event.endDate)}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'المكان' : 'Lieu'}
                    </p>
                    <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                      {event.location[language]}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-5 h-5 bg-alef-teal rounded-full mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                      {language === 'ar' ? 'الفئة' : 'Catégorie'}
                    </p>
                    <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                      {event.category[language]}
                    </p>
                  </div>
                </div>

                {/* Additional fields based on event type */}
                {event.artist && (
                  <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Eye className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'الفنان' : 'Artiste'}
                      </p>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {event.artist[language]}
                      </p>
                    </div>
                  </div>
                )}

                {event.speakers && (
                  <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Users className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'المتحدثون' : 'Intervenants'}
                      </p>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {event.speakers[language]}
                      </p>
                    </div>
                  </div>
                )}

                {event.instructor && (
                  <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <GraduationCap className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'المدرب' : 'Formateur'}
                      </p>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {event.instructor[language]}
                      </p>
                    </div>
                  </div>
                )}

                {event.capacity && (
                  <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Users className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'السعة' : 'Capacité'}
                      </p>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {event.capacity} {language === 'ar' ? 'مشارك' : 'participants'}
                      </p>
                    </div>
                  </div>
                )}

                {event.price && (
                  <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-5 h-5 bg-alef-coral rounded-full mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'السعر' : 'Prix'}
                      </p>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {event.price[language]}
                      </p>
                    </div>
                  </div>
                )}

                {event.duration && (
                  <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Calendar className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className={`font-medium text-sm mb-1 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {language === 'ar' ? 'المدة' : 'Durée'}
                      </p>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'font-cairo text-right' : 'text-left'}`}>
                        {event.duration[language]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;

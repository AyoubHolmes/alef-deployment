
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  imageUrl: string;
  titleKey: string;
  buttonKey: string;
  linkPath: string;
}

interface HeroSliderProps {
  slides: Slide[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ slides }) => {
  const { t, language, dir } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  // Navigation functions
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, slides.length]);
  
  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, slides.length]);
  
  const goToSlide = useCallback((index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating, currentSlide]);
  
  // In RTL mode, we swap the icons but keep their original orientation
  const PrevIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 
                className={`text-3xl md:text-5xl font-bold mb-6 ${language === 'ar' ? 'font-cairo' : 'font-montserrat'}`}
              >
                {t(slide.titleKey)}
              </h1>
              <a 
                href={slide.linkPath || ''} 
                className="btn-alef"
              >
                {t(slide.buttonKey)}
              </a>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows - Correctly positioned and oriented for RTL/LTR */}
      <button
        onClick={prevSlide}
        className={`absolute top-1/2 ${dir === 'rtl' ? 'right-4' : 'left-4'} z-20 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white transition-colors`}
        aria-label="Previous slide"
      >
        <PrevIcon size={24} />
      </button>
      <button
        onClick={nextSlide}
        className={`absolute top-1/2 ${dir === 'rtl' ? 'left-4' : 'right-4'} z-20 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full text-white transition-colors`}
        aria-label="Next slide"
      >
        <NextIcon size={24} />
      </button>
      
      {/* Dots - Using gap for consistent spacing in both directions */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

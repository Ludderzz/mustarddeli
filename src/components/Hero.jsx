import React, { useState, useEffect } from 'react';

// Actual imports
import SecondHero from '../assets/secondheropic.jpeg';
import Background from '../assets/background.jpg';
import ThirdMaybe from '../assets/thirdmaybe.jpeg';

export const Hero = ({ setView }) => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [SecondHero, Background, ThirdMaybe];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative min-h-svh w-full flex items-center justify-center overflow-hidden pt-32 pb-20 bg-deli-blue">
      
      {/* 1. Animated Slideshow Background */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Mustard Cafe Background ${index + 1}`} 
              className="w-full h-full object-cover object-top scale-105 animate-ken-burns" 
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-deli-blue/40 via-transparent to-deli-blue/80" />
      </div>

      {/* 2. The Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Top Badge */}
          <div className="hidden xs:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-deli-mustard animate-pulse"></span>
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Mustard cafe & deli</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.1] mb-6 drop-shadow-lg mt-4">
            <span className="whitespace-nowrap">
              Freshly <span className="italic text-deli-mustard font-normal">prepared</span>
            </span>
            <br />
            {/* Handmade & Straight Line Section */}
            <span className="whitespace-nowrap italic text-deli-mustard font-normal">
              Handmade{' '}
              <span className="relative inline-block px-1 text-white not-italic">
                daily
                {/* Straight Line SVG */}
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 md:h-2" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <line 
                    x1="0" y1="5" x2="100" y2="5"
                    stroke="#E2B13C" /* Deli-mustard gold */
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-deli-grey font-light max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
            The heart of Clevedon’s food scene. Speciality coffee, 
            artisan deli goods, and bespoke catering.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <button 
              onClick={() => setView('cafe')} 
              className="group relative w-full sm:w-auto px-10 py-4 bg-deli-blue text-white rounded-full font-bold overflow-hidden shadow-2xl transition-all active:scale-95 text-center cursor-pointer border border-white/10"
            >
              <span className="relative z-10 uppercase tracking-widest text-xs md:text-sm">Today's Specials</span>
              <div className="absolute inset-0 bg-deli-mustard translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block" />
            </button>
            
            <button 
              onClick={() => setView('catering')} 
              className="w-full sm:w-auto px-10 py-4 border border-white/40 text-white rounded-full font-bold uppercase tracking-widest text-xs md:text-sm backdrop-blur-sm hover:bg-white hover:text-deli-blue transition-all text-center cursor-pointer"
            >
              Catering Inquiry
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {images.map((_, i) => (
              <div 
                key={i}
                className={`h-1 transition-all duration-500 rounded-full ${
                  i === currentImage ? 'w-8 bg-deli-mustard' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

    </section>
  );
};
import React from 'react';
import backgroundImage from '../assets/background.jpg'

export const Hero = ({ setView }) => {
  return (
    <section className="relative min-h-svh w-full flex items-center justify-center overflow-hidden py-20">
      
      {/* 1. The Background */}
      <div className="absolute inset-0 z-0">
        <img 
            src={backgroundImage} 
            alt="Artisan Bread and Deli" 
            className="w-full h-full object-cover animate-ken-burns" 
          />
        <div className="absolute inset-0 bg-black/50" />
        {/* Updated from Green to Slate Blue Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-deli-blue/70 via-transparent to-deli-blue/90" />
      </div>

      {/* 2. The Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Top Badge */}
          <div className="hidden xs:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 md:mb-8">
            {/* Pulsing dot is now Mustard */}
            <span className="w-1.5 h-1.5 rounded-full bg-deli-mustard animate-pulse"></span>
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Mustard cafe & deli</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.1] mb-6 drop-shadow-lg">
            Freshly <span className="italic text-deli-mustard font-normal">Prepared</span><br />
          <span className="italic text-deli-mustard font-normal">  homemade</span> <span className="underline decoration-deli-mustard/40 underline-offset-8 md:underline-offset-12">daily</span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-deli-grey font-light max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
            The heart of Clevedon’s food scene. Specialty coffee, 
            artisan deli goods, and bespoke catering.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <button 
              onClick={() => setView('cafe')} 
              className="group relative w-full sm:w-auto px-10 py-4 bg-deli-blue text-white rounded-full font-bold overflow-hidden shadow-2xl transition-all active:scale-95 text-center cursor-pointer border border-white/10"
            >
              <span className="relative z-10 uppercase tracking-widest text-xs md:text-sm">Today's Specials</span>
              {/* Hover effect slides in Mustard Yellow */}
              <div className="absolute inset-0 bg-deli-mustard translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block" />
            </button>
            
            <button 
              onClick={() => setView('catering')} 
              className="w-full sm:w-auto px-10 py-4 border border-white/40 text-white rounded-full font-bold uppercase tracking-widest text-xs md:text-sm backdrop-blur-sm hover:bg-white hover:text-deli-blue transition-all text-center cursor-pointer"
            >
              Catering Inquiry
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>

    </section>
  );
};
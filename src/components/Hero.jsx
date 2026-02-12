import React from 'react';

export const Hero = () => {
  return (
    /* Changed h-screen to min-h-svh for better mobile browser support */
    <section className="relative min-h-svh w-full flex items-center justify-center overflow-hidden py-20">
      
      {/* 1. The Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" 
          alt="Artisan Bread and Deli" 
          /* Optimized animation speed for mobile performance */
          className="w-full h-full object-cover animate-[ken-burns_25s_ease_infinite]"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-b from-deli-green/70 via-transparent to-deli-green/90" />
      </div>

      {/* 2. The Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Top Badge - Hidden on very small screens to save space */}
          <div className="hidden xs:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-deli-gold animate-pulse"></span>
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Clevedon's Finest Artisan Deli</span>
          </div>

          {/* Main Heading - Responsive text sizes are key here */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-white leading-[1.1] mb-6 drop-shadow-lg">
            Freshly <span className="italic text-deli-gold font-normal">Sourced</span><br />
            Daily <span className="underline decoration-deli-gold/40 underline-offset-8 md:underline-offset-12">Handmade</span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
            The heart of Clevedon’s food scene. Specialty coffee, 
            artisan deli goods, and bespoke catering.
          </p>

          {/* Buttons - Stacked on mobile, side-by-side on desktop */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            <a 
              href="#menu" 
              className="group relative w-full sm:w-auto px-10 py-4 bg-deli-green text-white rounded-full font-bold overflow-hidden shadow-2xl transition-all active:scale-95 text-center"
            >
              <span className="relative z-10 uppercase tracking-widest text-xs md:text-sm">Today's Specials</span>
              <div className="absolute inset-0 bg-deli-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block" />
            </a>
            
            <a 
              href="#catering" 
              className="w-full sm:w-auto px-10 py-4 border border-white/40 text-white rounded-full font-bold uppercase tracking-widest text-xs md:text-sm backdrop-blur-sm hover:bg-white hover:text-deli-green transition-all text-center"
            >
              Catering Inquiry
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Scroll Indicator - Hidden on mobile to prevent clutter near navigation bars */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block opacity-30">
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent" />
      </div>

    </section>
  );
};
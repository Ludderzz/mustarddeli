import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* REMOVED: fixed, top-0, left-0, z-50. Added: relative */
    <nav className={`relative w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md py-4 shadow-md' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-deli-green rounded-lg flex items-center justify-center shadow-lg">
             <span className="text-white font-serif font-bold text-xl">D</span>
          </div>
          <span className={`text-2xl font-serif font-bold tracking-tight transition-colors ${
            isScrolled ? 'text-deli-green' : 'text-white'
          }`}>
            THE DELI
          </span>
        </div>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-[0.2em] ${
          isScrolled ? 'text-gray-600' : 'text-white/90'
        }`}>
          <a href="#menu" className="hover:text-deli-gold transition-colors italic">Cafe</a>
          <a href="#deli" className="hover:text-deli-gold transition-colors italic">Deli</a>
          <a href="#catering" className="hover:text-deli-gold transition-colors italic">Catering</a>
          <a 
            href="#contact" 
            className={`px-6 py-2 rounded-full border transition-all duration-500 ${
              isScrolled 
                ? 'border-deli-green text-deli-green hover:bg-deli-green hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-deli-green'
            }`}
          >
            Find Us
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button className={isScrolled ? 'text-deli-green' : 'text-white'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
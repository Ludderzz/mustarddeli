import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/bgremovelogo.png'; // Import your logo file

export const Navbar = ({ setView, currentView, forceSolid }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const useSolidStyle = isScrolled || forceSolid || isMobileMenuOpen;

  return (
    <>
      <nav 
        className={`fixed top-[40px] left-0 w-full z-[150] transition-all duration-500 ${
          useSolidStyle 
            ? 'bg-deli-grey/95 backdrop-blur-md py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo Image Section */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer z-[160]"
          >
            <img 
              src={logo} 
              alt="Mustard Cafe & Deli Logo" 
              className={`transition-all duration-500 object-contain ${
                useSolidStyle ? 'h-12 w-auto' : 'h-16 w-auto drop-shadow-md'
              }`} 
            />
          </button>

          {/* Desktop Navigation - Slate Blue focus */}
          <div className={`hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.25em] ${
            useSolidStyle ? 'text-deli-blue' : 'text-white/90'
          }`}>
            <button onClick={() => handleNavClick('home')} className={`hover:text-deli-mustard transition-colors ${currentView === 'home' ? 'text-deli-mustard' : ''}`}>Home</button>
            <button onClick={() => handleNavClick('cafe')} className={`hover:text-deli-mustard transition-colors ${currentView === 'cafe' ? 'text-deli-mustard' : ''}`}>Cafe</button>
            <button onClick={() => handleNavClick('deli')} className={`hover:text-deli-mustard transition-colors ${currentView === 'deli' ? 'text-deli-mustard' : ''}`}>Deli</button>
            <button onClick={() => handleNavClick('catering')} className={`hover:text-deli-mustard transition-colors ${currentView === 'catering' ? 'text-deli-mustard' : ''}`}>Catering</button>
            
            <a href="#location" className={`ml-4 px-6 py-2 rounded-full border-2 font-black text-[10px] transition-all duration-500 ${
              useSolidStyle 
                ? 'border-deli-blue text-deli-blue hover:bg-deli-blue hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-deli-blue'
            }`}>
              Find Us
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden z-[160]">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                useSolidStyle ? 'text-deli-blue bg-white/50' : 'text-white bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[140] bg-deli-grey transition-transform duration-500 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <img src={logo} alt="Logo" className="h-20 w-auto mb-4" />
          
          <button onClick={() => handleNavClick('home')} className={`text-4xl font-serif italic ${currentView === 'home' ? 'text-deli-mustard' : 'text-deli-blue'}`}>Home</button>
          <button onClick={() => handleNavClick('cafe')} className={`text-4xl font-serif italic ${currentView === 'cafe' ? 'text-deli-mustard' : 'text-deli-blue'}`}>Cafe Menu</button>
          <button onClick={() => handleNavClick('deli')} className={`text-4xl font-serif italic ${currentView === 'deli' ? 'text-deli-mustard' : 'text-deli-blue'}`}>The Deli Shop</button>
          <button onClick={() => handleNavClick('catering')} className={`text-4xl font-serif italic ${currentView === 'catering' ? 'text-deli-mustard' : 'text-deli-blue'}`}>Bespoke Catering</button>

          <div className="h-px w-12 bg-deli-blue/10 my-4" />

          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-deli-blue font-bold uppercase tracking-widest text-sm">Find Us & Contact</a>
        </div>
      </div>
    </>
  );
};
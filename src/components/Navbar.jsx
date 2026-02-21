import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/bgremovelogo.png';

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
      {/* FIX: Removed 'fixed top-0 left-0' and changed z-index.
          The Navbar is now positioned by the header container in App.jsx,
          allowing it to sit perfectly below the AnnouncementBar.
      */}
      <nav 
        className={`w-full relative transition-all duration-500 ${
          useSolidStyle 
            ? 'bg-[#f0ede6]/95 backdrop-blur-md py-3 shadow-lg border-b border-[#465d6a]/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          
          {/* Logo Section */}
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

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.25em] ${
            useSolidStyle ? 'text-[#465d6a]' : 'text-white/90'
          }`}>
            <button onClick={() => handleNavClick('home')} className={`hover:text-[#c8a011] transition-colors ${currentView === 'home' ? 'text-[#c8a011]' : ''}`}>Home</button>
            <button onClick={() => handleNavClick('cafe')} className={`hover:text-[#c8a011] transition-colors ${currentView === 'cafe' ? 'text-[#c8a011]' : ''}`}>Cafe</button>
            <button onClick={() => handleNavClick('deli')} className={`hover:text-[#c8a011] transition-colors ${currentView === 'deli' ? 'text-[#c8a011]' : ''}`}>Deli</button>
            <button onClick={() => handleNavClick('catering')} className={`hover:text-[#c8a011] transition-colors ${currentView === 'catering' ? 'text-[#c8a011]' : ''}`}>Catering</button>
            <button onClick={() => handleNavClick('gallery')} className={`hover:text-[#c8a011] transition-colors ${currentView === 'gallery' ? 'text-[#c8a011]' : ''}`}>Gallery</button>
            
            <a href="#location" className={`ml-4 px-6 py-2 rounded-full border-2 font-black text-[10px] transition-all duration-500 ${
              useSolidStyle 
                ? 'border-[#465d6a] text-[#465d6a] hover:bg-[#465d6a] hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-[#465d6a]'
            }`}>
              Find Us
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden z-[160]">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                useSolidStyle ? 'text-[#465d6a] bg-white/50' : 'text-white bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {/* FIX: Set 'inset-0' to 'fixed inset-0' to ensure it covers the screen 
          even though the nav itself is now relative. 
      */}
      <div className={`fixed inset-0 z-[140] bg-[#f0ede6] transition-transform duration-500 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          <img src={logo} alt="Logo" className="h-20 w-auto mb-4" />
          
          <button onClick={() => handleNavClick('home')} className={`text-4xl font-serif italic ${currentView === 'home' ? 'text-[#c8a011]' : 'text-[#465d6a]'}`}>Home</button>
          <button onClick={() => handleNavClick('cafe')} className={`text-4xl font-serif italic ${currentView === 'cafe' ? 'text-[#c8a011]' : 'text-[#465d6a]'}`}>Cafe Menu</button>
          <button onClick={() => handleNavClick('deli')} className={`text-4xl font-serif italic ${currentView === 'deli' ? 'text-[#c8a011]' : 'text-[#465d6a]'}`}>The Deli Shop</button>
          <button onClick={() => handleNavClick('catering')} className={`text-4xl font-serif italic ${currentView === 'catering' ? 'text-[#c8a011]' : 'text-[#465d6a]'}`}>Bespoke Catering</button>
          <button onClick={() => handleNavClick('gallery')} className={`text-4xl font-serif italic ${currentView === 'gallery' ? 'text-[#c8a011]' : 'text-[#465d6a]'}`}>Gallery</button>

          <div className="h-px w-12 bg-[#465d6a]/10 my-4" />

          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[#465d6a] font-bold uppercase tracking-widest text-sm">Find Us & Contact</a>
        </div>
      </div>
    </>
  );
};
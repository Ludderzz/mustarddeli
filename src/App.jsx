import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/DealsBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/About';
import { CafePage } from './pages/CafePage';
import { DeliPage } from './pages/DeliPage';
import { CateringPage } from './pages/CateringPage';
import { InfoSection } from './components/InfoSection'; 
import { ReviewsSection } from './components/Reviews';
import { Gallary } from './components/Gallary'; // Note: Ensure spelling matches your file (Gallery vs Gallary)
import Showcase from './pages/showcase';

function App() {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Handle scrolling to the location section from anywhere
  const handleLocationClick = (e) => {
    if (e) e.preventDefault();
    
    if (currentView !== 'home') {
      setCurrentView('home');
      // Small timeout to allow the home page to mount before scrolling
      setTimeout(() => {
        const element = document.getElementById('location');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('location');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#c8a011] selection:text-white bg-[#f0ede6] flex flex-col">
      
      {/* 1. FIXED HEADER UNIT */}
      <header className="fixed top-0 left-0 w-full z-50">
        <AnnouncementBar />
        <Navbar 
          setView={setCurrentView} 
          currentView={currentView} 
          forceSolid={currentView !== 'home'} 
        />
      </header>

      {/* 2. DYNAMIC CONTENT SECTION */}
      <main className={`flex-grow transition-all duration-500 ${
        currentView === 'home' 
          ? 'pt-0' 
          : 'pt-32 md:pt-44' 
      }`}>
        {/* HOME VIEW */}
        {currentView === 'home' && (
          <>
            <Hero setView={setCurrentView} />
            <AboutSection />
            <Gallary /> {/* Section preview on home page */}
            <ReviewsSection />
          </>
        )}
        
        {/* PAGE VIEWS */}
        {currentView === 'cafe' && <CafePage />}
        {currentView === 'deli' && <DeliPage />}
        {currentView === 'catering' && <CateringPage />}
        
        {/* FULL GALLERY PAGE VIEW */}
        {currentView === 'gallery' && <Showcase />}
      </main>

      {/* INFO SECTION (Above Footer) */}
      <InfoSection />
        
      {/* 3. FOOTER */}
      <footer className="py-16 bg-[#465d6a] text-white mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="mb-10 flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
              <button onClick={() => setCurrentView('home')} className="hover:text-[#c8a011] transition-colors cursor-pointer text-white">Home</button>
              <button onClick={() => setCurrentView('cafe')} className="hover:text-[#c8a011] transition-colors cursor-pointer text-white">Cafe</button>
              <button onClick={() => setCurrentView('deli')} className="hover:text-[#c8a011] transition-colors cursor-pointer text-white">Deli</button>
              <button onClick={() => setCurrentView('catering')} className="hover:text-[#c8a011] transition-colors cursor-pointer text-white">Catering</button>
              
              {/* Added Gallery to Footer */}
              <button onClick={() => setCurrentView('gallery')} className="hover:text-[#c8a011] transition-colors cursor-pointer text-white">Gallery</button>
              
              {/* Updated Location Link */}
              <button onClick={handleLocationClick} className="hover:text-[#c8a011] transition-colors cursor-pointer text-left text-white">Location</button>
              
              <a href="mailto:hello@mustarddeli.co.uk" className="hover:text-[#c8a011] transition-colors text-white">Contact</a>
            </div>
            
            <div className="h-px w-12 bg-[#c8a011]/30 mb-8" />
            
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
              © {new Date().getFullYear()} Mustard Cafe & Deli Clevedon
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
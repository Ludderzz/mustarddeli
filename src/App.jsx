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
    <div className="min-h-screen selection:bg-deli-mustard selection:text-white bg-deli-grey flex flex-col">
      
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
        {currentView === 'home' && (
          <>
            <Hero setView={setCurrentView} />
            <AboutSection />
            <ReviewsSection />
          </>
        )}
        
        {currentView === 'cafe' && <CafePage />}
        {currentView === 'deli' && <DeliPage />}
        {currentView === 'catering' && <CateringPage />}
      </main>

      {/* INFO SECTION (Above Footer) */}
      <InfoSection />
        
      {/* 3. FOOTER */}
      <footer className="py-16 bg-deli-blue text-white mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="mb-10 flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
              <button onClick={() => setCurrentView('home')} className="hover:text-deli-mustard transition-colors cursor-pointer">Home</button>
              <button onClick={() => setCurrentView('cafe')} className="hover:text-deli-mustard transition-colors cursor-pointer">Cafe</button>
              <button onClick={() => setCurrentView('deli')} className="hover:text-deli-mustard transition-colors cursor-pointer">Deli</button>
              <button onClick={() => setCurrentView('catering')} className="hover:text-deli-mustard transition-colors cursor-pointer">Catering</button>
              
              {/* Updated Location Link */}
              <button onClick={handleLocationClick} className="hover:text-deli-mustard transition-colors cursor-pointer text-left">Location</button>
              
              <a href="mailto:hello@mustarddeli.co.uk" className="hover:text-deli-mustard transition-colors">Contact</a>
            </div>
            
            <div className="h-px w-12 bg-deli-mustard/30 mb-8" />
            
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
import React from 'react';
import { AnnouncementBar } from './components/DealsBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';

function App() {
  return (
    <div className="min-h-screen selection:bg-deli-gold selection:text-white">
      {/* 1. EVERYTHING FIXED GOES HERE */}
      <header className="fixed top-0 left-0 w-full z-50">
        <AnnouncementBar />
        <Navbar />
      </header>

      {/* 2. MAIN CONTENT */}
      <main>
        {/* Hero should have enough padding or height to not be hidden by the header */}
        <Hero />
        <MenuSection />
      </main>

      <footer className="py-12 bg-deli-green text-white text-center">
        <p className="text-xs uppercase tracking-[0.2em] opacity-60">
          © {new Date().getFullYear()} The Clevedon Deli
        </p>
      </footer>
    </div>
  );
}

export default App;
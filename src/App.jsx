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
import { Gallary } from './components/Gallary'; 
import Showcase from './pages/showcase';
import { X, Send } from 'lucide-react';

// --- CONTACT MODAL COMPONENT ---
const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', message: '' });

  if (!isOpen) return null;

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    const phone = "447900462806"; // REPLACE WITH YOUR WHATSAPP NUMBER
    const text = `Hi Mustard! I'm ${formData.name}. ${formData.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-300 hover:text-deli-blue transition-colors">
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <span className="text-deli-mustard font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">Get in touch</span>
          <h2 className="text-3xl font-serif text-deli-blue italic">Contact Us</h2>
        </div>

        <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
          <input 
            required
            type="text" 
            placeholder="Your Name"
            className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-deli-mustard outline-none transition-all"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <textarea 
            required
            placeholder="How can we help?"
            className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-deli-mustard h-32 outline-none transition-all"
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
          <button type="submit" className="w-full bg-deli-blue text-white py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-deli-mustard transition-all shadow-lg">
            <Send size={14} /> Send via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleLocationClick = (e) => {
    if (e) e.preventDefault();
    if (currentView !== 'home') {
      setCurrentView('home');
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
      
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col">
        <AnnouncementBar />
        <Navbar 
          setView={setCurrentView} 
          currentView={currentView} 
          forceSolid={currentView !== 'home'} 
        />
      </header>

      <main className={`flex-grow transition-all duration-500 ${
        currentView === 'home' ? 'pt-0' : 'pt-40 md:pt-48' 
      }`}>
        {currentView === 'home' && (
          <>
            <Hero setView={setCurrentView} />
            <AboutSection />
            <Gallary /> 
            <ReviewsSection />
          </>
        )}
        
        {currentView === 'cafe' && <CafePage />}
        {currentView === 'deli' && <DeliPage />}
        {currentView === 'catering' && <CateringPage />}
        {currentView === 'gallery' && <Showcase />}
      </main>

      <InfoSection />

      {/* CONTACT MODAL */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        
      <footer className="py-16 bg-[#465d6a] text-white mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="mb-10 flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
              <button onClick={() => setCurrentView('home')} className="hover:text-[#c8a011] transition-colors cursor-pointer">Home</button>
              <button onClick={() => setCurrentView('cafe')} className="hover:text-[#c8a011] transition-colors cursor-pointer">Cafe</button>
              <button onClick={() => setCurrentView('deli')} className="hover:text-[#c8a011] transition-colors cursor-pointer">Deli</button>
              <button onClick={() => setCurrentView('catering')} className="hover:text-[#c8a011] transition-colors cursor-pointer">Catering</button>
              <button onClick={() => setCurrentView('gallery')} className="hover:text-[#c8a011] transition-colors cursor-pointer">Gallery</button>
              <button onClick={handleLocationClick} className="hover:text-[#c8a011] transition-colors cursor-pointer">Location</button>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-[#c8a011] transition-colors cursor-pointer">Contact</button>
            </div>
            
            <div className="h-px w-12 bg-[#c8a011]/30 mb-8" />
            
            <div className="text-center space-y-3">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">
                © {new Date().getFullYear()} Mustard Cafe & Deli Clevedon
              </p>
              <p className="text-[9px] uppercase tracking-[0.3em] opacity-40">
                Created & Managed by <a href="https://webcircuituk.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#c8a011] transition-colors underline decoration-[#c8a011]/30 underline-offset-4">WebCircuitUk</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
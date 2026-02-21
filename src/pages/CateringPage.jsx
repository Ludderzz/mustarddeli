import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, ArrowRight, Camera, Phone, MessageCircle, Send } from 'lucide-react';

// Import local gallery images
import food1 from '../assets/catering/food1.jpeg';
import food2 from '../assets/catering/food2.jpeg';
import food3 from '../assets/catering/food3.jpeg';
import food4 from '../assets/catering/food4.jpeg';
import food5 from '../assets/catering/food5.jpeg';
import food6 from '../assets/catering/food6.jpeg';
import food7 from '../assets/catering/food7.jpeg';
import food8 from '../assets/catering/food8.jpeg';
import food9 from '../assets/catering/food9.jpeg';

export const CateringPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // WhatsApp Form State
  const [showWaForm, setShowWaForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    postcode: '',
    address: '',
    guests: '',
    notes: ''
  });

  const galleryImages = [food1, food2, food3, food4, food5, food6, food7, food8, food9];

  useEffect(() => {
    fetchCateringMenu();
  }, []);

  const fetchCateringMenu = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('section', 'catering') 
      .order('number_items', { ascending: true });

    if (!error) {
      const rawCategories = [...new Set(data.map(item => item.category || 'Packages'))];
      const sortedCats = rawCategories.sort((a, b) => {
        if (a.toLowerCase().includes('set menu')) return -1;
        if (b.toLowerCase().includes('set menu')) return 1;
        return 0;
      });
      setMenuItems(data || []);
      setCategories(sortedCats);
    }
    setLoading(false);
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "441275877717"; // Replace with your WhatsApp-enabled number (no + or spaces)
    const message = `Hi Mustard Deli! I'm interested in the ${selectedItem.name}.%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Postcode:* ${formData.postcode}%0A` +
      `*Address:* ${formData.address}%0A` +
      `*Guests:* ${formData.guests}%0A` +
      `*Extra Info:* ${formData.notes}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return parseFloat(price.toString().replace('£', '').trim());
  };

  return (
    <div className="pt-6 md:pt-10 pb-24 min-h-screen bg-white relative font-sans text-slate-900">
      {/* HEADER SECTION */}
      <header className="container mx-auto px-6 mb-12 md:mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
          <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">Mustard Catering</span>
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
        </div>
        <h1 className="text-4xl md:text-8xl font-serif italic mb-4 leading-tight">
          <span className="text-deli-mustard">Bespoke</span>{' '}
          <span className="text-deli-blue not-italic font-bold">Catering</span>
        </h1>
      </header>

      <main className="container mx-auto px-4 md:px-6 max-w-6xl">
        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse text-2xl">Preparing the menu...</div>
        ) : (
          <div className="space-y-20 md:space-y-32">
            {categories.map((category) => {
              const items = menuItems.filter(item => (item.category || 'Packages') === category);
              const catLower = category.toLowerCase();

              if (catLower.includes('set menu')) {
                return (
                  <section key={category}>
                    <h2 className="text-2xl md:text-3xl font-serif text-deli-blue italic mb-12 text-center underline decoration-deli-mustard/30 underline-offset-8">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {items.map((item) => (
                        <div key={item.id} onClick={() => setSelectedItem(item)} className="bg-slate-50 p-8 rounded-[2.5rem] hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-deli-mustard/20 flex flex-col">
                          <h3 className="text-2xl font-serif text-deli-blue mb-4">{item.name}</h3>
                          <p className="text-slate-600 text-sm mb-8 whitespace-pre-line leading-relaxed flex-1">{item.description}</p>
                          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                             <span className="font-serif font-bold text-deli-blue text-lg">£{formatPrice(item.price)} <span className="text-[10px] text-slate-400 font-sans uppercase">pp</span></span>
                             <ArrowRight size={18} className="text-deli-mustard group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              return (
                <section key={category} className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-serif text-deli-blue italic underline decoration-deli-mustard/30 underline-offset-8">{category}</h2>
                    {catLower.includes('canap') && (
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-deli-mustard mt-4">Minimum order 12 per item</p>
                    )}
                  </div>
                  <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                    {items.map((item) => (
                      <div key={item.id} onClick={() => setSelectedItem(item)} className="flex flex-col md:grid md:grid-cols-12 p-8 px-8 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group gap-4 md:gap-0">
                        <div className="md:col-span-7">
                          <h3 className="font-serif text-lg text-deli-blue group-hover:text-deli-mustard transition-colors">{item.name}</h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between md:contents">
                          <div className="md:col-span-2 text-center font-serif text-lg text-slate-400">
                            {catLower.includes('platter') ? (item.tags || '10-12') : ''}
                          </div>
                          <div className="md:col-span-3 text-right">
                            <p className="font-serif font-bold text-lg text-deli-blue">£{formatPrice(item.price)}</p>
                            {catLower.includes('canap') && <p className="text-[8px] uppercase font-bold text-slate-400">per item</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* PHOTO GALLERY */}
        <section className="mt-40 border-t border-slate-100 pt-20">
          <div className="text-center mb-12">
            <span className="text-deli-mustard font-bold uppercase tracking-widest text-[10px]">Gallery</span>
            <h2 className="text-4xl font-serif text-deli-blue italic">Catering Inspiration</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square bg-slate-100 rounded-[2rem] overflow-hidden group relative shadow-sm hover:shadow-xl transition-all duration-500">
                <img src={img} alt="Catering" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-deli-blue/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL & FORM */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => {setSelectedItem(null); setShowWaForm(false);}} />
          <div className="relative bg-white w-full max-w-xl rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[95vh] flex flex-col">
            
            <div className="p-8 md:p-12 overflow-y-auto">
              <button onClick={() => {setSelectedItem(null); setShowWaForm(false);}} className="absolute top-8 right-8 text-slate-300 hover:text-deli-blue transition-colors"><X size={24} /></button>
              
              {!showWaForm ? (
                <>
                  <h2 className="text-3xl font-serif text-deli-blue italic mb-4 leading-tight">{selectedItem.name}</h2>
                  <div className="bg-slate-50 rounded-3xl p-6 mb-8 text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                    {selectedItem.ingredients || selectedItem.description}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a href="tel:01275877717" className="bg-slate-100 text-deli-blue py-5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
                      <Phone size={16} /> Call Deli
                    </a>
                    <button onClick={() => setShowWaForm(true)} className="bg-deli-blue text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-deli-mustard transition-all shadow-xl">
                      <MessageCircle size={16} /> WhatsApp Inquiry
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                  <div className="mb-6">
                    <button onClick={() => setShowWaForm(false)} className="text-deli-mustard font-bold text-[10px] uppercase tracking-widest mb-2 flex items-center gap-1">← Back to details</button>
                    <h2 className="text-2xl font-serif text-deli-blue italic">Inquiry Details</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <input required placeholder="Your Name" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-deli-mustard" 
                      onChange={e => setFormData({...formData, name: e.target.value})} />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input required placeholder="Postcode" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-deli-mustard" 
                        onChange={e => setFormData({...formData, postcode: e.target.value})} />
                      <input placeholder="Est. Guests" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-deli-mustard" 
                        onChange={e => setFormData({...formData, guests: e.target.value})} />
                    </div>

                    <input required placeholder="Event Address" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-deli-mustard" 
                      onChange={e => setFormData({...formData, address: e.target.value})} />

                    <textarea placeholder="Tell us more (Dates, Dietary reqs, etc.)" rows="3" className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-deli-mustard" 
                      onChange={e => setFormData({...formData, notes: e.target.value})} />
                  </div>

                  <button type="submit" className="w-full bg-deli-mustard text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl mt-4">
                    <Send size={16} /> Send to WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
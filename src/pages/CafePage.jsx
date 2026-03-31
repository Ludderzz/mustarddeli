import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Star } from 'lucide-react';

// IMPORT images from src/assets
import food1 from '../assets/cafe/cafe1.jpeg';
import food2 from '../assets/cafe/cafe2.jpeg';
import food3 from '../assets/cafe/cafe3.jpeg';
import food4 from '../assets/cafe/cafe4.jpeg';
import food5 from '../assets/cafe/cafe5.jpeg';
import food6 from '../assets/cafe/cafe6.jpeg';

export const CafePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryImages = [food1, food2, food3, food4, food5, food6];

  useEffect(() => {
    fetchCafeMenu();
  }, []);

  const fetchCafeMenu = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('section', 'cafe') 
      .order('number_items', { ascending: true })
      .order('created_at', { ascending: true });

    if (!error) setMenuItems(data || []);
    setLoading(false);
  };

  const formatPrice = (price) => {
    if (!price) return '';
    const cleanPrice = price.toString().replace('£', '').trim();
    return `£${cleanPrice}`;
  };

  const categories = [...new Set(menuItems.map(item => item.category || 'General'))];
  
  const sortedCategories = categories.sort((a, b) => {
    const order = { 'breakfast': 1, 'lunch': 2, 'takeaway': 3, 'children': 4, 'kids': 4, 'hot drinks': 5, 'cold drinks': 6 };
    return (order[a.toLowerCase()] || 99) - (order[b.toLowerCase()] || 99);
  });

  return (
    <div className="pt-4 pb-24 min-h-screen bg-[#fcfcfc] relative">
      
      {/* 1. HERO HEADER */}
      <header className="container mx-auto px-6 mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="h-px w-4 bg-deli-mustard" />
          <span className="text-deli-mustard font-black uppercase tracking-[0.2em] text-[8px]">Mustard Cafe</span>
          <div className="h-px w-4 bg-deli-mustard" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif italic leading-none mb-10">
          <span className="text-deli-mustard">The</span> <span className="text-deli-blue not-italic font-bold">Menu</span>
        </h1>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-4xl mx-auto px-4">
          {galleryImages.map((img, index) => (
            <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-md border-2 border-white transform transition-all hover:scale-105 bg-slate-100">
              <img src={img} alt="Featured dish" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </header>

      {/* 3. STICKY NAV */}
      {!loading && sortedCategories.length > 1 && (
        <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 mb-6 shadow-sm">
          <div className="flex justify-start md:justify-center gap-2 overflow-x-auto px-6 py-3 no-scrollbar">
            {sortedCategories.map(cat => (
              <a 
                key={cat} 
                href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="whitespace-nowrap px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-black uppercase tracking-widest text-deli-blue transition-all active:bg-deli-mustard active:text-white"
              >
                {cat}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* 4. MAIN MENU LIST */}
      <main className="container mx-auto px-4 md:px-6 max-w-2xl">
        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse text-sm">Setting the table...</div>
        ) : (
          <div className="space-y-10">
            {sortedCategories.map((category) => (
              <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl md:text-2xl font-serif text-deli-blue italic flex-shrink-0">
                    {category}
                  </h2>
                  <div className="h-px w-full bg-deli-mustard/10" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {menuItems
                    .filter(item => (item.category || 'General') === category)
                    .map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedItem(item)}
                        className="group cursor-pointer flex flex-col border-b border-slate-50 pb-3 last:border-0"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-base md:text-lg font-serif text-deli-blue group-hover:text-deli-mustard transition-colors leading-tight">
                            {item.name}
                            {item.is_deal && <Star size={12} className="inline ml-1 text-deli-mustard fill-deli-mustard" />}
                          </h3>
                          {/* UPDATED: Price color changed to text-deli-blue */}
                          <div className="font-serif text-deli-blue font-bold text-base md:text-lg whitespace-nowrap">
                            {item.is_deal && item.deal_price ? formatPrice(item.deal_price) : formatPrice(item.price)}
                          </div>
                        </div>
                        <p className="text-slate-500 font-light text-xs md:text-sm italic leading-snug">
                          {item.description}
                        </p>
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* 5. ITEM MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          <div className="relative bg-white w-full max-w-sm rounded-t-[2rem] md:rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 md:hidden" />
            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 text-slate-300"><X size={20} /></button>
            <div className="text-center">
              <h2 className="text-2xl font-serif text-deli-blue italic mb-2">{selectedItem.name}</h2>
              <p className="text-slate-500 italic text-sm mb-6 px-4 leading-relaxed">"{selectedItem.description}"</p>
              <div className="bg-slate-50 rounded-xl py-3 px-8 inline-block">
                <p className="text-2xl font-serif text-deli-blue font-bold">
                   {selectedItem.is_deal ? formatPrice(selectedItem.deal_price) : formatPrice(selectedItem.price)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
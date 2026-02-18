import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Star, ChevronRight } from 'lucide-react';

export const CafePage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchCafeMenu();
  }, []);

  const fetchCafeMenu = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('section', 'cafe') 
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
    const order = { 'breakfast': 1, 'lunch': 2, 'children': 3, 'kids': 3 };
    return (order[a.toLowerCase()] || 99) - (order[b.toLowerCase()] || 99);
  });

  return (
    <div className="pt-6 pb-24 min-h-screen bg-[#fcfcfc] relative">
      {/* 1. Hero Header - Scaled for Mobile */}
      <header className="container mx-auto px-6 mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-px w-6 bg-deli-mustard" />
          <span className="text-deli-mustard font-black uppercase tracking-[0.2em] text-[9px]">The Local Deli</span>
          <div className="h-px w-6 bg-deli-mustard" />
        </div>
        <h1 className="text-5xl md:text-8xl font-serif text-deli-blue italic leading-tight">
          The <span className="text-slate-900 not-italic font-bold">Menu</span>
        </h1>
      </header>

      {/* 2. STICKY NAV - Essential for Mobile UX */}
      {!loading && sortedCategories.length > 1 && (
        <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 mb-12 shadow-sm">
          <div className="flex justify-start md:justify-center gap-2 overflow-x-auto px-6 py-4 no-scrollbar">
            {sortedCategories.map(cat => (
              <a 
                key={cat} 
                href={`#${cat.toLowerCase()}`}
                className="whitespace-nowrap px-5 py-2 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-deli-blue active:bg-deli-mustard active:text-white transition-all shadow-sm"
              >
                {cat}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* 3. Menu List */}
      <main className="container mx-auto px-4 md:px-6 max-w-3xl">
        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Setting the table...</div>
        ) : (
          <div className="space-y-16">
            {sortedCategories.map((category) => (
              <section key={category} id={category.toLowerCase()} className="scroll-mt-28">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl md:text-4xl font-serif text-deli-blue italic flex-shrink-0">
                    {category}
                  </h2>
                  <div className="h-px w-full bg-deli-mustard/20" />
                </div>

                <div className="grid grid-cols-1 gap-8 md:gap-10">
                  {menuItems
                    .filter(item => (item.category || 'General') === category)
                    .map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedItem(item)}
                        className="group cursor-pointer flex flex-col"
                      >
                        {/* Title & Price Container */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-1 mb-2">
                          <h3 className="text-lg md:text-2xl font-serif text-deli-blue group-hover:text-deli-mustard transition-colors leading-tight flex items-center gap-2">
                            {item.name}
                            {item.is_deal && <Star size={14} className="text-deli-mustard fill-deli-mustard" />}
                          </h3>
                          
                          {/* Desktop Dots - Hidden on Mobile */}
                          <div className="hidden md:block flex-1 border-b-2 border-dotted border-slate-200 mx-4 mb-1.5 opacity-40" />
                          
                          {/* Price - Larger and distinct on Mobile */}
                          <div className="text-left md:text-right">
                            {item.is_deal && item.deal_price ? (
                              <div className="flex items-center md:items-end gap-2 md:flex-col leading-none">
                                <span className="text-[10px] text-slate-400 line-through">{formatPrice(item.price)}</span>
                                <span className="font-serif text-deli-mustard font-bold text-lg md:text-xl">{formatPrice(item.deal_price)}</span>
                              </div>
                            ) : (
                              <span className="font-serif text-slate-900 font-bold text-lg md:text-xl">{formatPrice(item.price)}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Description - Shorter line height for mobile reading */}
                        <p className="text-slate-500 font-light text-sm md:text-base italic leading-snug">
                          {item.description}
                        </p>

                        {/* Dietary Tags */}
                        {item.tags && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {item.tags.split(',').map(tag => (
                              <span key={tag} className="text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 bg-slate-100 text-slate-500 rounded">
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* 4. BOTTOM SHEET MODAL (Mobile Friendly) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedItem(null)} />
          
          <div className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Grabber for mobile feel */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8 md:hidden" />
            
            <button onClick={() => setSelectedItem(null)} className="absolute top-8 right-8 p-2 text-slate-400 hover:text-deli-blue">
              <X size={24} />
            </button>

            <div className="text-center">
              <span className="text-deli-mustard font-bold uppercase tracking-[0.2em] text-[9px] mb-4 block">Our Provisions</span>
              <h2 className="text-3xl md:text-5xl font-serif text-deli-blue italic mb-4 leading-tight">
                {selectedItem.name}
              </h2>
              
              <div className="h-px w-8 bg-deli-mustard/30 mx-auto mb-6" />
              
              <p className="text-slate-600 font-light leading-relaxed italic text-base md:text-xl mb-8">
                {selectedItem.description}
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 flex flex-col items-center">
                <p className="text-3xl font-serif text-deli-blue font-bold">
                  {selectedItem.is_deal ? formatPrice(selectedItem.deal_price) : formatPrice(selectedItem.price)}
                </p>
                {selectedItem.is_deal && <span className="text-deli-mustard font-black text-[9px] uppercase mt-2 tracking-widest">Daily Special Price</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Tag, Star, UtensilsCrossed } from 'lucide-react';

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
      .order('created_at', { ascending: true }); // Ascending often works better for menu order

    if (!error) setMenuItems(data || []);
    setLoading(false);
  };

  const formatPrice = (price) => {
    if (!price) return '';
    const cleanPrice = price.toString().replace('£', '').trim();
    return `£${cleanPrice}`;
  };

  // --- LOGIC: Group items by category ---
  const categories = [...new Set(menuItems.map(item => item.category || 'General'))];
  
  // Sort categories so Breakfast is likely first
  const sortedCategories = categories.sort((a, b) => {
    const order = { 'breakfast': 1, 'lunch': 2, 'children': 3, 'kids': 3 };
    return (order[a.toLowerCase()] || 99) - (order[b.toLowerCase()] || 99);
  });

  return (
    <div className="pt-10 pb-24 min-h-screen bg-white relative">
      {/* 1. Hero Header */}
      <header className="container mx-auto px-6 mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-deli-mustard" />
          <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">Mustard Cafe</span>
          <div className="h-px w-8 bg-deli-mustard" />
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-deli-blue italic">
          The <span className="text-slate-900 not-italic font-bold">Menu</span>
        </h1>
      </header>

      {/* 2. Menu Navigation (Jump to section) */}
      {!loading && sortedCategories.length > 1 && (
        <nav className="flex justify-center gap-4 mb-16 overflow-x-auto px-6 pb-2">
          {sortedCategories.map(cat => (
            <a 
              key={cat} 
              href={`#${cat.toLowerCase()}`}
              className="whitespace-nowrap px-4 py-1 border border-deli-mustard/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-deli-blue hover:bg-deli-mustard hover:text-white transition-all"
            >
              {cat}
            </a>
          ))}
        </nav>
      )}

      {/* 3. Fancy Menu List organized by Category */}
      <main className="container mx-auto px-6 max-w-4xl">
        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Setting the table...</div>
        ) : (
          <div className="space-y-24">
            {sortedCategories.map((category) => (
              <section key={category} id={category.toLowerCase()} className="scroll-mt-24">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-3xl md:text-4xl font-serif text-deli-blue italic flex-shrink-0">
                    {category}
                  </h2>
                  <div className="h-px w-full bg-slate-100" />
                </div>

                <div className="space-y-12">
                  {menuItems
                    .filter(item => (item.category || 'General') === category)
                    .map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedItem(item)}
                        className="group cursor-pointer relative"
                      >
                        {/* Item Header: Name ..... Price */}
                        <div className="flex items-end gap-2 mb-1">
                          <h3 className="text-xl md:text-2xl font-serif text-deli-blue group-hover:text-deli-mustard transition-colors leading-none flex-shrink-0">
                            {item.name}
                            {item.is_deal && <Star size={14} className="inline ml-2 text-deli-mustard fill-deli-mustard mb-1" />}
                          </h3>
                          
                          <div className="flex-1 border-b-2 border-dotted border-slate-200 mb-1.5 opacity-50" />
                          
                          <div className="flex-shrink-0 text-right">
                            {item.is_deal && item.deal_price ? (
                              <div className="flex flex-col items-end leading-none">
                                <span className="text-[10px] text-slate-400 line-through mb-1">{formatPrice(item.price)}</span>
                                <span className="font-serif text-deli-mustard font-bold text-xl">{formatPrice(item.deal_price)}</span>
                              </div>
                            ) : (
                              <span className="font-serif text-deli-blue font-bold text-xl leading-none">{formatPrice(item.price)}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Description */}
                        <div className="max-w-2xl">
                          <p className="text-slate-500 font-light text-sm md:text-base italic leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Optional Tags */}
                        {item.tags && (
                          <div className="flex gap-2 mt-2">
                            {item.tags.split(',').map(tag => (
                              <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-deli-mustard/60">
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

      {/* 4. QUICK VIEW MODAL (Minimalist) */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
          
          <div className="relative bg-white w-full max-w-lg rounded-[2rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-deli-blue transition-colors">
              <X size={24} />
            </button>

            <div className="text-center">
              <span className="text-deli-mustard font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Item Details</span>
              <h2 className="text-4xl md:text-5xl font-serif text-deli-blue italic mb-6 leading-tight">
                {selectedItem.name}
              </h2>
              
              <div className="h-px w-12 bg-deli-mustard/30 mx-auto mb-8" />
              
              <p className="text-slate-600 font-light leading-relaxed italic text-lg md:text-xl mb-8">
                "{selectedItem.description}"
              </p>

              <div className="flex flex-col items-center">
                <p className="text-4xl font-serif text-deli-blue font-bold">
                  {selectedItem.is_deal ? formatPrice(selectedItem.deal_price) : formatPrice(selectedItem.price)}
                </p>
                {selectedItem.is_deal && <span className="text-deli-mustard font-bold text-[10px] uppercase mt-2">Special Offer Applied</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
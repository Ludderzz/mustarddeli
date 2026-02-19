import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Utensils, ArrowRight, Minus, Plus, Mail, AlertCircle, Info, Camera } from 'lucide-react';

export const CateringPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [guestCount, setGuestCount] = useState(10); 
  const [categories, setCategories] = useState([]);
  
  const galleryPlaceholders = Array.from({ length: 12 });

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

  const formatPrice = (price) => {
    if (!price) return null;
    return parseFloat(price.toString().replace('£', '').trim());
  };

  return (
    <div className="pt-6 md:pt-10 pb-24 min-h-screen bg-white relative">
      <header className="container mx-auto px-6 mb-12 md:mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
          <span className="text-deli-mustard font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px]">Mustard Catering</span>
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
        </div>
        <h1 className="text-4xl md:text-8xl font-serif text-deli-blue italic mb-4 md:mb-6 leading-tight">
          Bespoke <span className="text-slate-900 not-italic font-bold">Catering</span>
        </h1>
      </header>

      <main className="container mx-auto px-4 md:px-6 max-w-6xl">
        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Setting the stage...</div>
        ) : (
          <div className="space-y-20 md:space-y-32">
            {categories.map((category) => {
              const items = menuItems.filter(item => (item.category || 'Packages') === category);
              const catLower = category.toLowerCase();

              // LAYOUT 1: SET MENUS (Box Grid)
              if (catLower.includes('set menu')) {
                return (
                  <section key={category}>
                    <h2 className="text-2xl md:text-3xl font-serif text-deli-blue italic mb-8 md:mb-12 text-center underline decoration-deli-mustard/30 underline-offset-8">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {items.map((item) => (
                        <div key={item.id} onClick={() => { setSelectedItem(item); setGuestCount(10); }} className="bg-deli-grey p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] hover:shadow-xl transition-all cursor-pointer group border-2 border-transparent hover:border-deli-mustard/20">
                          <h3 className="text-xl md:text-2xl font-serif text-deli-blue mb-3 md:mb-4">{item.name}</h3>
                          <p className="text-slate-500 italic text-sm mb-6 md:mb-8 line-clamp-3">{item.description}</p>
                          <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-slate-200">
                             <span className="font-serif font-bold text-deli-blue text-lg">£{formatPrice(item.price)} <span className="text-[10px] text-slate-400 font-sans uppercase">pp</span></span>
                             <ArrowRight size={18} className="text-deli-mustard group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              // LAYOUT 2 & 3: PLATTERS & CANAPES (Mobile-Responsive Table)
              return (
                <section key={category} className="max-w-4xl mx-auto">
                  <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-serif text-deli-blue italic underline decoration-deli-mustard/30 underline-offset-8">{category}</h2>
                    {catLower.includes('canap') && (
                      <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-deli-mustard mt-4 px-4">Minimum order 12 per item</p>
                    )}
                  </div>

                  <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                    {/* Header - Hidden on small mobile */}
                    <div className="hidden md:grid grid-cols-12 bg-slate-50 p-4 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                      <div className="col-span-7">Item / Description</div>
                      <div className="col-span-2 text-center">{catLower.includes('platter') ? 'Portions' : ''}</div>
                      <div className="col-span-3 text-right">Price</div>
                    </div>

                    {items.map((item) => (
                      <div key={item.id} onClick={() => setSelectedItem(item)} className="flex flex-col md:grid md:grid-cols-12 p-6 md:p-8 px-6 md:px-8 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group gap-4 md:gap-0">
                        <div className="md:col-span-7 pr-0 md:pr-4">
                          <h3 className="font-serif text-lg text-deli-blue group-hover:text-deli-mustard transition-colors">{item.name}</h3>
                          <p className="text-xs text-slate-400 italic mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        
                        <div className="flex items-center justify-between md:contents">
                          {/* Mobile Portion Label */}
                          <div className="md:col-span-2 text-center font-serif text-lg text-slate-600 self-center">
                            {catLower.includes('platter') ? (
                              <div className="flex flex-col md:block">
                                <span className="text-[8px] uppercase font-bold text-slate-300 md:hidden">Portions</span>
                                {item.tags || '10-12'}
                              </div>
                            ) : ''}
                          </div>
                          
                          <div className="md:col-span-3 text-right self-center">
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

        {/* PHOTO GALLERY - Improved Grid for Mobile */}
        <section className="mt-24 md:mt-40 border-t border-slate-100 pt-16 md:pt-20">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-deli-mustard font-bold uppercase tracking-widest text-[10px]">Gallery</span>
            <h2 className="text-3xl md:text-4xl font-serif text-deli-blue italic">Catering Inspiration</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryPlaceholders.map((_, i) => (
              <div key={i} className="aspect-square bg-slate-50 rounded-xl md:rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group hover:border-deli-mustard/30 transition-colors">
                <Camera size={20} className="mb-1 md:mb-2 opacity-50 group-hover:text-deli-mustard" />
                <span className="text-[7px] md:text-[8px] uppercase font-bold tracking-widest">Image {i + 1}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* MODAL - Mobile Optimization */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          <div className="relative bg-white w-full max-w-xl rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300 max-h-[92vh] flex flex-col">
            <div className="p-8 md:p-12 overflow-y-auto">
              <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-300 hover:text-deli-blue"><X size={24} /></button>
              
              <h2 className="text-3xl md:text-4xl font-serif text-deli-blue italic mb-4 pr-8 leading-tight">{selectedItem.name}</h2>
              
              <div className="bg-slate-50 rounded-2xl md:rounded-3xl p-5 md:p-6 mb-8 italic text-slate-500 text-sm whitespace-pre-line leading-relaxed">
                {selectedItem.ingredients || selectedItem.description}
              </div>
              
              <a href={`mailto:hello@clevedondeli.co.uk?subject=Catering Inquiry: ${selectedItem.name}`} className="w-full bg-deli-blue text-white py-4 md:py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-deli-mustard transition-all shadow-xl mb-4">
                <Mail size={16} /> Request Availability
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
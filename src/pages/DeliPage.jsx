import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';

export const DeliPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchDeliItems();
  }, []);

  const fetchDeliItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('section', 'deli') 
      .order('created_at', { ascending: false });

    if (!error) setItems(data);
    setLoading(false);
  };

  return (
    <div className="pt-6 md:pt-10 pb-24 min-h-screen bg-white relative font-sans text-slate-900">
      
      {/* 1. BRANDED HEADER */}
      <header className="container mx-auto px-6 mb-12 md:mb-24 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
          <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[9px] md:text-[10px]">Artisanal Larder</span>
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
        </div>
        <h1 className="text-4xl md:text-8xl font-serif italic mb-4 leading-tight text-deli-blue">
          Deli <span className="text-slate-900 not-italic font-bold">&</span> <span className="text-deli-mustard">Retail</span>
        </h1>
        <p className="mt-4 text-slate-400 font-light italic max-w-xl mx-auto text-sm md:text-lg px-4">
          Hand-selected local cheeses, cured meats, and pantry essentials.
        </p>
      </header>

      {/* 2. PROVISION LIST */}
      <main className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-deli-blue italic underline decoration-deli-mustard/30 underline-offset-8">Shop Provisions</h2>
        </div>

        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse text-2xl">Stocking the shelves...</div>
        ) : (
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="flex flex-col md:grid md:grid-cols-12 p-6 md:p-8 px-6 md:px-10 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group gap-2 md:gap-0"
              >
                {/* Item Info */}
                <div className="md:col-span-9 pr-0 md:pr-8">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl text-deli-blue group-hover:text-deli-mustard transition-colors leading-tight">
                        {item.name}
                    </h3>
                    {item.is_deal && (
                      <span className="bg-deli-mustard/10 text-deli-mustard text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                        Special
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-light italic leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between md:justify-end md:col-span-3 text-right">
                    <div className="md:hidden text-[10px] text-deli-mustard font-bold uppercase tracking-widest">View Detail</div>
                    <div className="flex items-center gap-4">
                        <p className="font-serif font-bold text-xl text-deli-blue">
                            {item.is_deal ? item.deal_price : item.price}
                        </p>
                        <ArrowRight size={18} className="text-deli-mustard group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. PRODUCT DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          
          <div className="relative bg-white w-full max-w-xl rounded-t-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300 max-h-[92vh] flex flex-col">
            <div className="p-8 md:p-12 overflow-y-auto">
              <button onClick={() => setSelectedItem(null)} className="absolute top-8 right-8 text-slate-300 hover:text-deli-blue transition-colors">
                <X size={24} />
              </button>

              <div className="text-center md:text-left mt-4">
                <span className="text-deli-mustard font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block">Item Selection</span>
                <h2 className="text-3xl md:text-5xl font-serif text-deli-blue italic mb-6 leading-tight">
                  {selectedItem.name}
                </h2>
                
                <div className="bg-slate-50 rounded-3xl p-6 md:p-8 mb-8">
                  <p className="text-slate-600 font-light leading-relaxed italic text-base md:text-lg">
                    "{selectedItem.description}"
                  </p>
                  
                  {selectedItem.ingredients && (
                    <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-deli-blue/60">
                      <MapPin size={14} className="text-deli-mustard" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{selectedItem.ingredients}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-serif text-deli-blue font-bold">
                        {selectedItem.is_deal ? selectedItem.deal_price : selectedItem.price}
                    </p>
                    {selectedItem.is_deal && <span className="text-deli-mustard font-bold text-[10px] uppercase tracking-widest">Artisan's Choice</span>}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-full md:w-auto px-10 py-4 bg-deli-blue text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-deli-mustard transition-all shadow-lg"
                  >
                    Close details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
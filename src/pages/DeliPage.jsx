import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, ShoppingBag, Award, MapPin, ArrowRight } from 'lucide-react';

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
    <div className="pt-10 pb-24 min-h-screen bg-white relative">
      {/* 1. Deli Hero Header */}
      <header className="container mx-auto px-6 mb-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-8 bg-deli-mustard" />
          <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">Artisanal Larder</span>
          <div className="h-px w-8 bg-deli-mustard" />
        </div>
        <h1 className="text-6xl md:text-8xl font-serif text-deli-blue italic">
          Deli <span className="text-slate-900 not-italic font-bold">&</span> Retail
        </h1>
        <p className="mt-6 text-slate-500 font-light italic max-w-xl mx-auto text-lg">
          Hand-selected local cheeses, cured meats, and pantry essentials.
        </p>
      </header>

      {/* 2. Fancy Larder List */}
      <main className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300 mb-12 text-center">Provision List</h2>

        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Stocking the shelves...</div>
        ) : (
          <div className="space-y-12">
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer relative"
              >
                {/* Header: Name ..... Price */}
                <div className="flex items-end gap-2 mb-1">
                  <h3 className="text-xl md:text-2xl font-serif text-deli-blue group-hover:text-deli-mustard transition-colors leading-none flex-shrink-0">
                    {item.name}
                    {item.is_deal && <Award size={14} className="inline ml-2 text-deli-mustard mb-1" />}
                  </h3>
                  
                  <div className="flex-1 border-b-2 border-dotted border-slate-200 mb-1.5 opacity-50" />
                  
                  <div className="flex-shrink-0 text-right leading-none">
                    <span className="font-serif text-deli-blue font-bold text-xl">
                      {item.is_deal ? item.deal_price : item.price}
                    </span>
                  </div>
                </div>
                
                {/* Description & Detail Prompt */}
                <div className="max-w-2xl flex justify-between items-end">
                  <p className="text-slate-500 font-light text-sm md:text-base italic leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-deli-mustard opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. PRODUCT DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
          
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedItem(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-deli-blue transition-colors">
              <X size={24} />
            </button>

            <div className="text-center">
              <span className="text-deli-mustard font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Larder Profile</span>
              <h2 className="text-4xl md:text-5xl font-serif text-deli-blue italic mb-6 leading-tight">
                {selectedItem.name}
              </h2>
              
              <div className="h-px w-12 bg-deli-mustard/30 mx-auto mb-8" />
              
              <div className="space-y-6 mb-8 text-center">
                <p className="text-slate-600 font-light leading-relaxed italic text-lg">
                  "{selectedItem.description}"
                </p>

                {selectedItem.ingredients && (
                  <div className="inline-flex items-center gap-2 bg-deli-grey px-4 py-2 rounded-full">
                    <MapPin size={12} className="text-deli-mustard" />
                    <span className="text-[10px] font-bold text-deli-blue uppercase tracking-widest">{selectedItem.ingredients}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center pt-6 border-t border-slate-100">
                <p className="text-4xl font-serif text-deli-blue font-bold">
                  {selectedItem.is_deal ? selectedItem.deal_price : selectedItem.price}
                </p>
                {selectedItem.is_deal && <span className="text-deli-mustard font-bold text-[10px] uppercase mt-2">Artisan's Choice</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, ShoppingBag, Award, MapPin } from 'lucide-react';

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
    <div className="pt-10 md:pt-10 pb-24 min-h-screen bg-deli-grey relative">
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
          Hand-selected local cheeses, cured meats, and pantry essentials from across the Somerset levels.
        </p>
      </header>

      {/* 2. Retail Grid */}
      <main className="container mx-auto px-6 max-w-6xl">
        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Stocking the shelves...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer bg-white rounded-[2rem] p-4 border border-transparent hover:border-deli-mustard/20 hover:shadow-2xl transition-all duration-500"
              >
                {/* Product Image Card */}
                <div className="aspect-square w-full rounded-[1.5rem] overflow-hidden bg-deli-grey mb-6 relative">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={item.name} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ShoppingBag size={48} strokeWidth={1} />
                    </div>
                  )}
                  
                  {item.is_deal && (
                    <div className="absolute top-4 left-4 bg-deli-mustard text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                      Staff Pick
                    </div>
                  )}
                </div>

                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-deli-blue group-hover:text-deli-mustard transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-serif text-deli-blue font-bold text-lg">
                      {item.is_deal ? item.deal_price : item.price}
                    </span>
                  </div>
                  <p className="text-slate-400 font-light text-xs line-clamp-2 italic">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. PRODUCT DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-deli-blue/90 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          
          <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left: Product Image */}
            <div className="md:w-1/2 bg-deli-grey relative h-64 md:h-auto border-b md:border-b-0 md:border-r border-slate-100">
              {selectedItem.image_url ? (
                <img src={selectedItem.image_url} className="w-full h-full object-cover" alt={selectedItem.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <ShoppingBag size={120} strokeWidth={0.5} />
                </div>
              )}
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md hover:bg-white text-deli-blue rounded-full transition-all md:hidden"
              >
                <X size={20} />
              </button>
            </div>

            {/* Right: Product Details */}
            <div className="md:w-1/2 p-8 md:p-14 overflow-y-auto relative">
               <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-8 right-8 p-2 text-slate-300 hover:text-deli-mustard transition-colors hidden md:block"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-deli-mustard font-bold uppercase tracking-widest text-[10px]">Larder Profile</span>
                {selectedItem.is_deal && (
                  <span className="flex items-center gap-1 bg-deli-mustard/10 text-deli-mustard text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">
                    <Award size={10} /> Artisan Choice
                  </span>
                )}
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-deli-blue italic mb-6 leading-tight">
                {selectedItem.name}
              </h2>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-3">The Details</h4>
                  <p className="text-slate-600 font-light leading-relaxed italic text-lg">
                    "{selectedItem.description}"
                  </p>
                </div>

                {selectedItem.ingredients && (
                  <div className="bg-deli-grey/50 p-6 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={12} className="text-deli-mustard" />
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Provenance</h4>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {selectedItem.ingredients}
                    </p>
                  </div>
                )}

                <div className="pt-8 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">Retail Price</h4>
                    <p className="text-4xl font-serif text-deli-blue font-bold">
                      {selectedItem.is_deal ? selectedItem.deal_price : selectedItem.price}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {selectedItem.tags?.split(',').map(tag => (
                      <span key={tag} className="px-4 py-2 bg-deli-grey rounded-xl text-[10px] font-bold text-deli-blue uppercase tracking-tighter">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
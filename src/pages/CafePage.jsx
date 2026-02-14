import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, CameraOff, Tag } from 'lucide-react';

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
      .order('created_at', { ascending: false });

    if (!error) setMenuItems(data || []);
    setLoading(false);
  };

  const formatPrice = (price) => {
    if (!price) return '';
    const cleanPrice = price.toString().replace('£', '').trim();
    return `£${cleanPrice}`;
  };

  return (
    <div className="pt-10 md:pt-10 pb-24 min-h-screen bg-deli-grey relative">
      {/* 1. Hero Header */}
      <header className="container mx-auto px-6 mb-12 md:mb-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
          <span className="text-deli-mustard font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-[10px]">The Kitchen</span>
          <div className="h-px w-6 md:w-8 bg-deli-mustard" />
        </div>
        <h1 className="text-5xl md:text-8xl font-serif text-deli-blue italic">
          Cafe <span className="text-slate-900 not-italic font-bold">&</span> Menu
        </h1>
      </header>

      {/* 2. Menu Grid */}
      <main className="container mx-auto px-6 max-w-5xl">
        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Sourcing ingredients...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-10">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedItem(item)}
                className={`group cursor-pointer rounded-3xl p-4 md:p-6 transition-all duration-300 flex gap-4 md:gap-6 border ${
                  item.is_deal 
                    ? 'bg-deli-mustard/5 border-deli-mustard/20 hover:bg-deli-mustard/10 shadow-sm' 
                    : 'bg-white border-transparent hover:border-deli-mustard/30 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex-1 relative">
                  {item.is_deal && (
                    <div className="flex items-center gap-1 mb-2">
                      <Tag size={10} className="text-deli-mustard fill-deli-mustard" />
                      <span className="text-deli-mustard text-[8px] font-black uppercase tracking-widest">
                        Daily Special
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl md:text-2xl font-serif text-deli-blue group-hover:text-deli-mustard transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <div className="text-right whitespace-nowrap ml-4">
                      {item.is_deal && item.deal_price ? (
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-400 line-through">{formatPrice(item.price)}</span>
                          <span className="font-serif text-deli-mustard font-bold text-lg md:text-xl">{formatPrice(item.deal_price)}</span>
                        </div>
                      ) : (
                        <span className="font-serif text-deli-blue font-bold text-lg md:text-xl">{formatPrice(item.price)}</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-slate-500 font-light text-xs md:text-sm italic line-clamp-2 pr-4">
                    {item.description}
                  </p>
                </div>

                {item.image_url && (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-deli-grey shadow-sm">
                    <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. PRODUCT DETAIL MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-deli-blue/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          
          <div className="relative bg-white w-full max-w-xl rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300 flex flex-col max-h-[95vh] md:max-h-[90vh]">
            
            {selectedItem.image_url ? (
              <div className="h-56 md:h-72 w-full relative">
                <img src={selectedItem.image_url} className="w-full h-full object-cover" alt={selectedItem.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2 bg-deli-blue/20 backdrop-blur-md text-white rounded-full hover:bg-deli-blue/40 transition-colors">
                  <X size={20} />
                </button>
              </div>
            ) : (
              <div className="p-6 pb-0 flex justify-end">
                <button onClick={() => setSelectedItem(null)} className="p-2 bg-deli-grey rounded-full text-deli-blue"><X size={20} /></button>
              </div>
            )}

            <div className="p-8 md:p-12 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-deli-mustard font-bold uppercase tracking-widest text-[10px]">Item Details</span>
                {selectedItem.is_deal && <span className="bg-deli-mustard text-white text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter">Special Offer</span>}
              </div>

              <h2 className="text-4xl md:text-5xl font-serif text-deli-blue italic mb-6 leading-tight">
                {selectedItem.name}
              </h2>

              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-3">Description</h4>
                  <p className="text-slate-600 font-light leading-relaxed italic text-lg md:text-xl">
                    "{selectedItem.description}"
                  </p>
                </div>

                <div className="pt-8 border-t border-deli-grey flex justify-between items-center pb-8 md:pb-0">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-1">Price</h4>
                    <p className="text-3xl md:text-4xl font-serif text-deli-blue font-bold">
                      {selectedItem.is_deal ? formatPrice(selectedItem.deal_price) : formatPrice(selectedItem.price)}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-end gap-2">
                    {selectedItem.tags?.split(',').map(tag => (
                      <span key={tag} className="px-3 py-1 bg-deli-grey rounded-full text-[10px] font-bold text-deli-blue uppercase tracking-tighter">
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
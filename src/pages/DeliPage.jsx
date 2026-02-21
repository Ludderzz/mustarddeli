import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, MapPin, ArrowRight, Sparkles, Store, CookingPot } from 'lucide-react';

export const DeliPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('larder'); 
  
  const [bottomInfo, setBottomInfo] = useState({ 
    content: '', 
    image_urls: [], 
    bread_content: '', 
    bread_image_urls: [] 
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  // PREFETCH IMAGES: When data arrives, pre-load the images for the inactive tab
  useEffect(() => {
    const prefetch = (urls) => {
      urls.forEach(url => {
        const img = new Image();
        img.src = `${url}?width=600&quality=75`;
      });
    };
    if (activeTab === 'larder' && bottomInfo.bread_image_urls.length > 0) {
      prefetch(bottomInfo.bread_image_urls);
    } else if (activeTab === 'bread' && bottomInfo.image_urls.length > 0) {
      prefetch(bottomInfo.image_urls);
    }
  }, [activeTab, bottomInfo]);

  const fetchAllData = async () => {
    setLoading(true);
    const [menuRes, infoRes] = await Promise.all([
      supabase.from('menu_items').select('*').eq('section', 'deli').order('created_at', { ascending: false }),
      supabase.from('deli_bottom_info').select('*').single()
    ]);

    if (!menuRes.error) setItems(menuRes.data);
    if (!infoRes.error && infoRes.data) setBottomInfo(infoRes.data);
    setLoading(false);
  };

  const renderPrice = (price) => {
    if (!price) return '';
    const cleanPrice = price.toString().replace('£', '').trim();
    return `£${cleanPrice}`;
  };

  // Helper to serve optimized images (Resizes to 600px width on the fly)
  const getOptimizedUrl = (url) => {
    if (!url) return '';
    return url.includes('supabase.co') ? `${url}?width=600&quality=75` : url;
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

        <h1 className="text-4xl md:text-8xl font-serif font-bold mb-4 leading-tight text-deli-blue tracking-tight">
          Deli <span className="text-deli-mustard">&</span> Retail
        </h1>
        
        <p className="mt-4 text-slate-400 font-light italic max-w-xl mx-auto text-sm md:text-lg px-4">
          Hand-selected local cheeses, artisan bread, and pantry essentials.
        </p>
      </header>

      {/* 2. TAKEAWAY MENU SECTION */}
      <main className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-serif text-deli-blue italic underline decoration-deli-mustard/30 underline-offset-8">Takeaway Menu</h2>
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
                <div className="md:col-span-9 pr-0 md:pr-8">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl text-deli-blue group-hover:text-deli-mustard transition-colors leading-tight">{item.name}</h3>
                    {item.is_deal && (
                      <span className="bg-deli-mustard/10 text-deli-mustard text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Special</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 font-light italic leading-relaxed">{item.description}</p>
                </div>

                <div className="flex items-center justify-between md:justify-end md:col-span-3 text-right">
                    <div className="md:hidden text-[10px] text-deli-mustard font-bold uppercase tracking-widest">View Detail</div>
                    <div className="flex items-center gap-4">
                        <p className="font-serif font-bold text-xl text-deli-blue">{renderPrice(item.is_deal ? item.deal_price : item.price)}</p>
                        <ArrowRight size={18} className="text-deli-mustard group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. UPDATED BOTTOM INFO WITH TABS */}
        <section className="mt-20 md:mt-32 border-t border-slate-100 pt-16">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-deli-mustard/10 rounded-full mb-6">
              <Sparkles size={14} className="text-deli-mustard" />
              <span className="text-[10px] font-black uppercase tracking-widest text-deli-mustard">The Mustard Deli</span>
            </div>
            
            <div className="flex bg-slate-50 p-1 rounded-2xl mb-10 max-w-xs mx-auto border border-slate-100">
              <button 
                onClick={() => setActiveTab('larder')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'larder' ? 'bg-white text-deli-blue shadow-sm' : 'text-slate-400'}`}
              >
                <CookingPot size={14} /> Deli
              </button>
              <button 
                onClick={() => setActiveTab('bread')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'bread' ? 'bg-white text-deli-blue shadow-sm' : 'text-slate-400'}`}
              >
                <Store size={14} /> Artisan Bread
              </button>
            </div>

            <p className="text-lg md:text-xl font-serif italic text-slate-600 leading-relaxed px-4 animate-in fade-in duration-500">
              {activeTab === 'larder' ? bottomInfo.content : bottomInfo.bread_content}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-12 px-2 md:px-0 min-h-[400px]">
            {(activeTab === 'larder' ? bottomInfo.image_urls : bottomInfo.bread_image_urls)?.map((url, index) => (
              <div 
                key={`${activeTab}-${index}`} 
                className="aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group border border-slate-100 bg-slate-100 animate-in fade-in zoom-in-95"
              >
                <img 
                  src={getOptimizedUrl(url)} 
                  alt={`Deli ${activeTab} gallery ${index}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  decoding="async"
                  fetchpriority={index < 3 ? "high" : "low"}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 4. PRODUCT DETAIL MODAL */}
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
                <h2 className="text-3xl md:text-5xl font-serif text-deli-blue italic mb-6 leading-tight">{selectedItem.name}</h2>
                <div className="bg-slate-50 rounded-3xl p-6 md:p-8 mb-8">
                  <p className="text-slate-600 font-light leading-relaxed italic text-base md:text-lg">"{selectedItem.description}"</p>
                  {selectedItem.ingredients && (
                    <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-deli-blue/60">
                      <MapPin size={14} className="text-deli-mustard" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{selectedItem.ingredients}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-100 gap-6">
                  <div className="text-center md:text-left">
                    <p className="text-4xl font-serif text-deli-blue font-bold">{renderPrice(selectedItem.is_deal ? selectedItem.deal_price : selectedItem.price)}</p>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="w-full md:w-auto px-10 py-4 bg-deli-blue text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-deli-mustard transition-all shadow-lg">
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
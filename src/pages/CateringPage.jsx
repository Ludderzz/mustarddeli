import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { X, Utensils, Users, Calendar, ArrowRight, Minus, Plus, Mail, AlertCircle } from 'lucide-react';

export const CateringPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [guestCount, setGuestCount] = useState(10); 
  
  const MINIMUM_GUESTS = 10;

  useEffect(() => {
    fetchCateringMenu();
  }, []);

  const fetchCateringMenu = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('section', 'catering') 
      .order('created_at', { ascending: false });

    if (!error) setMenuItems(data || []);
    setLoading(false);
  };

  const formatPrice = (price) => {
    if (!price) return null;
    return parseFloat(price.toString().replace('£', '').trim());
  };

  const calculateTotal = (price, count) => {
    const p = formatPrice(price);
    if (!p) return 'P.O.A';
    const validCount = count > 0 ? count : 0;
    return `£${(p * validCount).toFixed(2)}`;
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    setGuestCount(value === '' ? '' : parseInt(value));
  };

  return (
    <div className="pt-10 pb-24 min-h-screen bg-white relative">
      {/* 1. Header Section */}
      <header className="container mx-auto px-6 mb-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-8 bg-deli-mustard" />
          <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">Events & Gatherings</span>
          <div className="h-px w-8 bg-deli-mustard" />
        </div>
        <h1 className="text-5xl md:text-8xl font-serif text-deli-blue italic mb-6">
          Bespoke <span className="text-slate-900 not-italic font-bold">Catering</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-500 font-light italic text-lg">
          Artisan platters and curated menus delivered to your event.
        </p>
      </header>

      {/* 2. Service Highlights (Slimmer Design) */}
      <section className="container mx-auto px-6 mb-24 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Users size={20} />, title: "Corporate", desc: "Artisan platters for the office." },
            { icon: <Calendar size={20} />, title: "Private Events", desc: "Birthdays and family gatherings." },
            { icon: <Utensils size={20} />, title: "Grazing Tables", desc: "Stunning visual feasts." }
          ].map((service, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-deli-mustard mb-4">{service.icon}</div>
              <h3 className="text-lg font-serif font-bold text-deli-blue mb-2">{service.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Fancy Catering List */}
      <main className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-300 mb-12 text-center">Available Packages</h2>

        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Preparing menus...</div>
        ) : (
          <div className="space-y-12">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => {
                    setSelectedItem(item);
                    setGuestCount(10);
                }}
                className="group cursor-pointer relative"
              >
                {/* Header: Name ..... Price */}
                <div className="flex items-end gap-2 mb-1">
                  <h3 className="text-xl md:text-2xl font-serif text-deli-blue group-hover:text-deli-mustard transition-colors leading-none flex-shrink-0">
                    {item.name}
                  </h3>
                  
                  <div className="flex-1 border-b-2 border-dotted border-slate-200 mb-1.5 opacity-50" />
                  
                  <div className="flex-shrink-0 text-right leading-none">
                    <span className="font-serif text-deli-blue font-bold text-xl">
                      {item.price ? `£${formatPrice(item.price)}` : 'P.O.A'}
                    </span>
                    <span className="block text-[8px] uppercase font-bold text-slate-400 mt-1">per head</span>
                  </div>
                </div>
                
                {/* Description & Action */}
                <div className="max-w-2xl flex justify-between items-end">
                  <p className="text-slate-500 font-light text-sm md:text-base italic leading-relaxed">
                    {item.description}
                  </p>
                  <div className="text-deli-mustard opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-4">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 4. MODAL WITH INTERACTIVE ESTIMATOR */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                   <span className="text-deli-mustard font-bold uppercase tracking-widest text-[10px] mb-2 block">Catering Estimate</span>
                   <h2 className="text-3xl md:text-4xl font-serif text-deli-blue italic leading-tight">{selectedItem.name}</h2>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 text-slate-400 hover:text-deli-blue transition-colors"><X size={24} /></button>
              </div>
              
              {/* INTERACTIVE CALCULATOR */}
              <div className="bg-deli-grey p-8 rounded-[2rem] mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col items-center md:items-start">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-4 tracking-widest text-center md:text-left">Guest Count</p>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setGuestCount(Math.max(1, (guestCount || 0) - 1))}
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-deli-blue shadow-sm hover:bg-deli-blue hover:text-white transition-all"
                            >
                                <Minus size={16} />
                            </button>
                            
                            <input 
                                type="text"
                                value={guestCount}
                                onChange={handleInputChange}
                                className="w-16 text-center text-2xl font-serif font-bold text-deli-blue bg-transparent border-b-2 border-deli-blue/20 focus:outline-none focus:border-deli-mustard"
                            />

                            <button 
                                onClick={() => setGuestCount((guestCount || 0) + 1)}
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-deli-blue shadow-sm hover:bg-deli-blue hover:text-white transition-all"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="text-center md:text-right pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 md:pl-8">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 tracking-widest">Estimated Total</p>
                        <p className="text-5xl font-serif font-bold text-deli-blue">
                            {calculateTotal(selectedItem.price, guestCount)}
                        </p>
                    </div>
                </div>

                {guestCount > 0 && guestCount < MINIMUM_GUESTS && (
                    <div className="mt-6 flex items-center justify-center gap-2 text-deli-mustard italic text-xs">
                        <AlertCircle size={14} /> Min. spend may apply for under {MINIMUM_GUESTS} guests
                    </div>
                )}
              </div>

              <div className="mb-10 text-center">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-300 mb-3">Package Details</h4>
                  <p className="text-slate-500 text-sm leading-relaxed italic max-w-md mx-auto">
                      {selectedItem.description}
                  </p>
              </div>

              <a 
                  href={`mailto:hello@clevedondeli.co.uk?subject=Catering Inquiry: ${selectedItem.name}&body=Hi, I would like to inquire about the ${selectedItem.name} package for ${guestCount} guests.`}
                  className="w-full bg-deli-blue text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-deli-mustard transition-all shadow-xl"
              >
                  <Mail size={16} /> Request Package Availability
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
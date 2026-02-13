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
    <div className="pt-24 md:pt-40 pb-24 min-h-screen bg-deli-grey relative">
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
          From corporate lunches to intimate garden parties, we bring the best of our deli to your doorstep.
        </p>
      </header>

      {/* 2. Service Highlights */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Users size={24} />, title: "Corporate", desc: "Impress your team with artisan platters and fresh salads." },
            { icon: <Calendar size={24} />, title: "Private Events", desc: "Perfect for birthdays, anniversaries, and family wakes." },
            { icon: <Utensils size={24} />, title: "Grazing Tables", desc: "A stunning visual feast of cheeses, meats, and fruits." }
          ].map((service, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white border border-slate-100 flex flex-col items-center text-center group hover:bg-deli-blue transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="w-12 h-12 bg-deli-grey rounded-2xl flex items-center justify-center text-deli-blue mb-6 group-hover:bg-white group-hover:rotate-12 transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-deli-blue mb-3 group-hover:text-white">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-white/80">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Catering Menu Grid */}
      <main className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-2xl font-serif text-deli-blue italic mb-10 flex items-center gap-4">
          Our Catering Packages <div className="h-px flex-1 bg-deli-blue/10" />
        </h2>

        {loading ? (
          <div className="text-center py-20 font-serif italic text-deli-blue animate-pulse">Preparing menus...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => {
                    setSelectedItem(item);
                    setGuestCount(10);
                }}
                className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="h-56 overflow-hidden relative">
                  {item.image_url ? (
                    <img src={item.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                  ) : (
                    <div className="w-full h-full bg-deli-blue/5 flex items-center justify-center text-deli-blue/20">
                      <Utensils size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center">
                    <span className="text-deli-blue font-bold text-base font-serif leading-none">
                        {item.price ? `£${formatPrice(item.price)}` : 'P.O.A'}
                    </span>
                    <span className="text-[8px] uppercase tracking-tighter font-bold text-slate-400 mt-0.5">per head</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-deli-blue mb-2 group-hover:text-deli-mustard transition-colors">{item.name}</h3>
                  <p className="text-slate-500 text-sm italic font-light line-clamp-2 mb-4">{item.description}</p>
                  <div className="flex items-center text-deli-mustard text-[10px] font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                    View Details & Estimate <ArrowRight size={14} className="ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 5. MODAL WITH INTERACTIVE ESTIMATOR */}
      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-deli-blue/80 backdrop-blur-sm" onClick={() => setSelectedItem(null)} />
          <div className="relative bg-white w-full max-w-xl rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom md:zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
            
            <div className="p-8 md:p-10 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <span className="text-deli-mustard font-bold uppercase tracking-widest text-[10px] mb-2 block">Catering Package</span>
                   <h2 className="text-3xl md:text-4xl font-serif text-deli-blue italic leading-tight">{selectedItem.name}</h2>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-deli-grey rounded-full transition-colors text-deli-blue"><X size={24} /></button>
              </div>
              
              {/* ESTIMATOR CARD */}
              <div className="bg-deli-grey/50 border border-deli-blue/5 rounded-[2rem] p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-3 tracking-widest">Number of Guests</p>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setGuestCount(Math.max(1, (guestCount || 0) - 1))}
                                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-deli-blue hover:bg-deli-blue hover:text-white transition-all shadow-sm"
                            >
                                <Minus size={16} />
                            </button>
                            
                            <input 
                                type="text"
                                value={guestCount}
                                onChange={handleInputChange}
                                className="w-20 h-12 text-center text-2xl font-serif font-bold text-deli-blue bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-deli-mustard/20 focus:border-deli-mustard shadow-inner"
                                placeholder="0"
                            />

                            <button 
                                onClick={() => setGuestCount((guestCount || 0) + 1)}
                                className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-deli-blue hover:bg-deli-blue hover:text-white transition-all shadow-sm"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-widest">Estimated Total</p>
                        <p className="text-4xl font-serif font-bold text-deli-blue leading-none">
                            {calculateTotal(selectedItem.price, guestCount)}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2 italic">£{formatPrice(selectedItem.price)} per head</p>
                    </div>
                </div>

                {/* MINIMUM GUEST WARNING */}
                {guestCount > 0 && guestCount < MINIMUM_GUESTS && (
                    <div className="mt-4 flex items-center gap-2 text-deli-mustard bg-deli-mustard/5 p-3 rounded-xl border border-deli-mustard/20 animate-in fade-in slide-in-from-top-1">
                        <AlertCircle size={14} />
                        <p className="text-[10px] font-bold uppercase tracking-tight">Small events may be subject to a minimum spend.</p>
                    </div>
                )}
              </div>

              <div className="space-y-6 mb-10">
                <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">Package Details</h4>
                    <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line italic">
                        {selectedItem.description}
                    </p>
                </div>
                {selectedItem.ingredients && (
                  <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-2">Typically Includes</h4>
                      <div className="bg-deli-grey/30 p-4 rounded-xl border border-slate-100">
                        <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                            {selectedItem.ingredients}
                        </p>
                      </div>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-3">
                <a 
                    href={`mailto:hello@clevedondeli.co.uk?subject=Catering Inquiry: ${selectedItem.name}&body=Hi, I would like to inquire about the ${selectedItem.name} package for ${guestCount || '____'} guests.`}
                    className="w-full bg-deli-blue text-white py-5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-deli-mustard transition-all shadow-xl"
                >
                    <Mail size={16} /> Request This Package
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
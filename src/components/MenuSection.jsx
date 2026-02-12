import React, { useState, useEffect } from 'react';

const menuData = {
  cafe: {
    title: "The Morning Kitchen",
    description: "Served daily until 3 PM. Locally sourced from Clevedon artisans.",
    items: [
      { 
        name: "Avocado & Dukkah", 
        price: "£8.50", 
        desc: "Smashed Hass avocado, hazelnut dukkah, organic sourdough, lemon zest.", 
        tags: ["VG", "N"], 
        featured: true,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop"
      },
      { 
        name: "The Deli Breakfast", 
        price: "£11.00", 
        desc: "Local sausages, thick-cut smoked bacon, free-range eggs, house-made beans, toasted rye.", 
        tags: ["PRO"],
        featured: false 
      },
      { 
        name: "Wild Mushroom Toast", 
        price: "£9.50", 
        desc: "Pan-seared woodland mushrooms, truffle-infused butter, garlic, toasted brioche.", 
        tags: ["V"],
        featured: true 
      },
      { 
        name: "Smoked Salmon Bagel", 
        price: "£10.00", 
        desc: "Loch Duart salmon, whipped cream cheese, capers, pickled shallots, fresh dill.", 
        tags: ["F"],
        featured: false 
      },
      { 
        name: "Overnight Oats", 
        price: "£6.50", 
        desc: "Oats soaked in almond milk, seasonal berries, Clevedon honey, chia seeds.", 
        tags: ["VG", "GF"],
        featured: false 
      }
    ]
  },
  deli: {
    title: "The Curator's Counter",
    description: "Hand-selected cheeses, house-cured meats, and pantry essentials.",
    items: [
      { 
        name: "Artisan Cheese Board", 
        price: "£14.00", 
        desc: "A rotation of three West Country cheeses, seasonal grapes, house chutney, sourdough crackers.", 
        tags: ["V", "N"],
        featured: true,
        image: "https://images.unsplash.com/photo-1631379544355-8246395ba078?q=80&w=1000&auto=format&fit=crop"
      },
      { 
        name: "House-Cured Pastrami", 
        price: "£6.50", 
        desc: "100g thinly sliced, 14-day brined beef brisket, rubbed in black pepper and coriander.", 
        tags: ["GF"],
        featured: false 
      },
      { 
        name: "Local Honey & Preserves", 
        price: "£5.00", 
        desc: "Small-batch honey from Clevedon hives and seasonal fruit jams made in-house.", 
        tags: ["VG", "GF"],
        featured: false 
      },
      { 
        name: "The Deli Mezze", 
        price: "£12.50", 
        desc: "Nocellara olives, sun-dried tomatoes, stuffed peppers, artichoke hearts, balsamic glaze.", 
        tags: ["VG"],
        featured: true 
      }
    ]
  },
  catering: {
    title: "Bespoke Events",
    description: "From boardroom lunches to garden weddings. Minimum 10 guests.",
    items: [
      { 
        name: "Business Lunch Platter", 
        price: "£12pp", 
        desc: "Assorted premium wraps, seasonal fruit skewers, hand-cooked crisps, and mini cakes.", 
        tags: ["MIN-10"],
        featured: false 
      },
      { 
        name: "The Grazing Table", 
        price: "From £250", 
        desc: "Our signature spread: Italian meats, local cheeses, nuts, dried fruits, and artisan breads.", 
        tags: ["CUSTOM"],
        featured: true,
        image: "https://images.unsplash.com/photo-1540914124281-342587941389?q=80&w=1000&auto=format&fit=crop"
      },
      { 
        name: "Afternoon Tea Box", 
        price: "£18pp", 
        desc: "Handmade scones, clotted cream, strawberry jam, and four varieties of delicate sandwiches.", 
        tags: ["V"],
        featured: false 
      },
      { 
        name: "Canapé Selection", 
        price: "£15pp", 
        desc: "Choose 5 items: Mini crab cakes, beef carpaccio, pea & mint arancini, and more.", 
        tags: ["ELITE"],
        featured: true 
      }
    ]
  }
};

const Tag = ({ children }) => (
  <span className="text-[9px] font-bold px-2 py-0.5 border border-deli-green/20 text-deli-green rounded-sm tracking-tighter">
    {children}
  </span>
);

export const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('cafe');
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle smooth transition animation
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section id="menu" className="py-24 md:py-32 bg-deli-cream relative">
      {/* Decorative Texture/Background Elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-white to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-deli-gold" />
              <span className="text-deli-gold font-bold uppercase tracking-[0.3em] text-[10px]">Taste the Tradition</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-deli-green italic">
              Our <span className="text-gray-900 not-italic font-bold">Offerings</span>
            </h2>
            <p className="mt-6 text-gray-500 font-light text-lg">
              {menuData[activeTab].description}
            </p>
          </div>
          
          {/* Quick Stats/Badge */}
          <div className="hidden lg:flex gap-8 border-l border-gray-200 pl-8">
            <div className="text-center">
              <p className="text-2xl font-serif text-deli-green">100%</p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Fresh</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif text-deli-green">Daily</p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Baked</p>
            </div>
          </div>
        </div>

        {/* Navigation - Better Mobile Scrollability */}
        <div className="relative mb-20">
          <div className="flex items-center gap-8 md:gap-16 border-b border-gray-200 overflow-x-auto no-scrollbar pb-px">
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-4 text-xs md:text-sm uppercase tracking-[0.25em] font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                  activeTab === tab ? 'text-deli-green' : 'text-gray-400 hover:text-deli-green/60'
                }`}
              >
                {tab}
                <div className={`absolute bottom-0 left-0 h-0.5 bg-deli-gold transition-all duration-500 ${
                  activeTab === tab ? 'w-full' : 'w-0'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Featured Item with Image */}
            <div className="lg:col-span-4 space-y-8">
              {menuData[activeTab].items.filter(i => i.image).map((featuredItem, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4 transition-transform hover:-translate-y-2">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden mb-6">
                    <img 
                      src={featuredItem.image} 
                      alt={featuredItem.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-2xl font-serif text-deli-green italic">{featuredItem.name}</h4>
                      <span className="text-deli-gold font-bold">{featuredItem.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 font-light">{featuredItem.desc}</p>
                  </div>
                  <div className="absolute top-8 left-8 bg-deli-gold text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Chef's Pick
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: List of Items */}
            <div className="lg:col-span-8 grid md:grid-cols-1 gap-y-12">
              {menuData[activeTab].items.map((item, index) => (
                <div key={index} className="group flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-8 hover:border-deli-gold/30 transition-colors">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl md:text-3xl font-serif text-gray-900 group-hover:text-deli-green transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex gap-1">
                        {item.tags?.map(t => <Tag key={t}>{t}</Tag>)}
                      </div>
                      {item.featured && (
                        <span className="w-1.5 h-1.5 rounded-full bg-deli-gold" />
                      )}
                    </div>
                    <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed max-w-2xl italic">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Dotted line hidden on mobile for cleaner look */}
                    <div className="hidden md:block flex-1 border-b border-dotted border-gray-300 w-24 h-0 mb-2"></div>
                    <span className="text-2xl font-serif text-deli-green font-medium">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer / CTA Section */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="bg-deli-green rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Background SVG Motif */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <svg className="w-64 h-64" viewBox="0 0 24 24" fill="white">
                <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="text-center lg:text-left space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif text-white">Ready to taste the <span className="text-deli-gold italic">difference?</span></h3>
                <p className="text-white/60 max-w-md font-light">
                  Join us in-store for our rotating weekly specials or book our catering team for your next big event.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-deli-gold hover:bg-white hover:text-deli-green text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl active:scale-95">
                  Book a Table
                </button>
                <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all">
                  Contact Catering
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dietary Legend - Shows effort and professionalism */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 opacity-40">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Tag>VG</Tag> <span>Vegan Friendly</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Tag>GF</Tag> <span>Gluten Free</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Tag>N</Tag> <span>Contains Nuts</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Tag>V</Tag> <span>Vegetarian</span>
          </div>
        </div>
      </div>
    </section>
  );
};
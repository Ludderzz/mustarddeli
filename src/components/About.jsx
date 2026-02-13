import React from 'react';

const aboutData = {
  heritage: {
    title: "Our Clevedon Roots",
    description: "Founded on the belief that great food shouldn't be complicated. We spend our mornings sourcing from North Somerset farmers and artisan producers.",
    stats: [
      { label: "Local Partners", value: "12+" },
      { label: "Years in Clevedon", value: "15" },
      { label: "Daily Bakes", value: "100%" }
    ],
    // Updated image to a higher-end deli interior feel
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop"
  },
  values: [
    {
      name: "Artisanal Integrity",
      desc: "Every loaf is hand-kneaded and every preserve is small-batch. We don't believe in shortcuts.",
      icon: "🌾"
    },
    {
      name: "Sustainably Sourced",
      desc: "Our carbon footprint matters. 90% of our produce travels less than 30 miles to reach your plate.",
      icon: "🌍"
    },
    {
      name: "Community First",
      desc: "More than a deli, we're a hub for Clevedon creatives, coffee lovers, and foodies alike.",
      icon: "🤝"
    }
  ]
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-deli-grey relative overflow-hidden">
      {/* Subtle Background Pattern - Using the Grey palette */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstripe.png")` }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* 1. Heritage & Stats */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-32">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-deli-mustard" />
              <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">The Deli Story</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif text-deli-blue italic leading-[1.1]">
              Crafting <span className="text-slate-900 not-italic font-bold tracking-tight">Tradition</span> Daily.
            </h2>
            
            <p className="text-slate-600 font-light text-lg leading-relaxed">
              {aboutData.heritage.description}
            </p>

            <div className="grid grid-cols-3 gap-8 pt-6 border-t border-deli-blue/10">
              {aboutData.heritage.stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-3xl font-serif text-deli-blue">{stat.value}</p>
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video md:aspect-square lg:aspect-video border-8 border-white">
              <img 
                src={aboutData.heritage.image} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                alt="Our Deli Interior"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deli-blue/40 to-transparent" />
            </div>
            {/* Decorative Mustard Frame Offset */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-deli-mustard z-0 hidden md:block" />
          </div>
        </div>

        {/* 2. Values Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {aboutData.values.map((value, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-white/50 border border-transparent hover:border-deli-mustard/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="text-4xl mb-6">{value.icon}</div>
              <h3 className="text-2xl font-serif text-deli-blue mb-4 group-hover:text-deli-mustard transition-colors">
                {value.name}
              </h3>
              <p className="text-slate-500 font-light leading-relaxed italic">
                "{value.desc}"
              </p>
            </div>
          ))}
        </div>

        {/* 3. The CTA Block - Now using the Deli Blue */}
        <div className="mt-32">
          <div className="bg-deli-blue rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-deli-blue/20">
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <span className="font-serif italic text-[200px] text-white select-none">M</span>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="text-center lg:text-left space-y-4">
                <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                  Visit the <span className="text-deli-mustard italic">Counter</span>
                </h3>
                <p className="text-white/70 max-w-md font-light text-sm md:text-base leading-relaxed">
                  Experience our curated selection of retail goods and handmade treats in person. Located in the heart of Clevedon.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#location" className="bg-deli-mustard hover:bg-white hover:text-deli-blue text-white px-10 py-5 rounded-full font-bold text-xs text-center uppercase tracking-[0.2em] transition-all duration-500 shadow-lg active:scale-95">
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Producers Ribbon */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <span className="font-serif italic text-xl text-deli-blue">Somerset Dairy</span>
           <span className="font-serif italic text-xl text-deli-blue">The Bakehouse</span>
           <span className="font-serif italic text-xl text-deli-blue">Coastal Coffee</span>
           <span className="font-serif italic text-xl text-deli-blue">Hillside Honey</span>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
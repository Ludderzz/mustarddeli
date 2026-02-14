import React from 'react';
// Import your local image
import shopFront from '../assets/shopfront.jpg';

const aboutData = {
  heritage: {
    title: "Our Clevedon Roots",
    description: "Mustard is your local destination for the finest cheeses, meats, and artisan bread. We specialize in deli-made savouries, fresh salads, and handmade cakes—perfect for a relaxed lunch in our café or to takeaway for your own table.",
    image: shopFront
  },
  values: [
    {
      name: "The Deli Counter",
      desc: "From award-winning local cheeses to premium cured meats and our signature deli-made savouries, we curate the best of the West Country."
    },
    {
      name: "Freshly Prepared",
      desc: "Our daily salads and lunches are crafted on-site using seasonal produce, ensuring every bite is as fresh as the morning's delivery."
    },
    {
      name: "Eat-in or Away",
      desc: "Join us at the counter for a coffee and a slice of cake, or grab a wholesome lunch to go. Great food, wherever you choose to enjoy it."
    }
  ]
};

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-deli-grey relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstripe.png")` }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* 1. Heritage Content */}
        <div className="grid lg:grid-cols-12 gap-16 items-center mb-32">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-deli-mustard" />
              <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">The Deli Story</span>
            </div>
            
            {/* HEADLINE: Switched logic as requested */}
            <h2 className="text-5xl md:text-7xl font-serif text-deli-blue leading-[1.1]">
              <span className="not-italic font-bold tracking-tight">Passionate</span>{' '}
              <span className="italic text-deli-mustard font-normal">about</span>{' '}
              <span className="not-italic font-bold tracking-tight">food</span>.
            </h2>
            
            <p className="text-slate-600 font-light text-lg leading-relaxed">
              {aboutData.heritage.description}
            </p>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white p-1 inline-block w-full">
              <img 
                src={aboutData.heritage.image} 
                className="w-full h-auto rounded-xl object-cover" 
                alt="Mustard Deli Shop Front"
              />
            </div>
            {/* Decorative Mustard Frame Offset */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-deli-mustard z-0 hidden md:block" />
          </div>
        </div>

        {/* 2. Values Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {aboutData.values.map((value, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-white/50 border border-transparent hover:border-deli-mustard/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
              <h3 className="text-2xl font-serif text-deli-blue mb-4 group-hover:text-deli-mustard transition-colors">
                {value.name}
              </h3>
              <p className="text-slate-500 font-light leading-relaxed italic">
                "{value.desc}"
              </p>
            </div>
          ))}
        </div>

        {/* 3. The CTA Block */}
        <div className="mt-32">
          <div className="bg-deli-blue rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-deli-blue/20">
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
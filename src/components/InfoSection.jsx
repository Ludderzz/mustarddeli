import React from 'react';
import { Instagram, Facebook, MapPin, Clock, ExternalLink } from 'lucide-react';

export const InfoSection = () => {
  const openingHours = [
    { days: 'Mon - Tue', hours: 'Closed' },
    { days: 'Wed - Fri', hours: '09:00 - 16:00' },
    { days: 'Saturday', hours: '09:00 - 15:30' },
    { days: 'Sunday', hours: 'Closed' },
  ];

  const socials = [
    { icon: <Instagram size={20} />, link: '#', label: 'Instagram' },
    { icon: <Facebook size={20} />, link: '#', label: 'Facebook' },
  ];

  return (
    <section 
      id="location" 
      className="w-full border-t border-slate-100 bg-white scroll-mt-24 md:scroll-mt-40"
    >
      <div className="flex flex-col md:flex-row min-h-[500px]">
        
        {/* Details Side */}
        <div className="w-full md:w-1/2 p-6 sm:p-12 md:p-20 flex flex-col justify-center bg-deli-grey/30">
          <div className="max-w-md mx-auto md:mx-0 w-full">
            
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-deli-mustard" />
              <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">Visit Us</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif text-deli-blue italic mb-8 md:mb-10">
              In the heart of <span className="text-deli-mustard italic font-bold">Clevedon</span>
            </h2>

            <div className="space-y-8 md:space-y-10">
              {/* Address */}
              <div className="flex gap-4">
                <div className="text-deli-mustard flex-shrink-0 mt-1"><MapPin size={20} /></div>
                <div>
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-deli-blue mb-2">Location</h4>
                  <p className="text-slate-600 font-light italic leading-relaxed text-sm md:text-base">
                    21 Old St, Clevedon<br />North Somerset, BS21 6ND
                  </p>
                  {/* Mobile Quick Link */}
                  <a 
                    href="https://goo.gl/maps/YOUR_LINK_HERE" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-deli-mustard font-bold text-[10px] uppercase tracking-wider mt-3 hover:underline"
                  >
                    Get Directions <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="text-deli-mustard flex-shrink-0 mt-1"><Clock size={20} /></div>
                <div className="flex-1">
                  <h4 className="font-bold text-[10px] uppercase tracking-widest text-deli-blue mb-3">Opening Hours</h4>
                  <div className="space-y-2 max-w-[280px]">
                    {openingHours.map((slot, i) => (
                      <div key={i} className="flex justify-between text-xs md:text-sm border-b border-slate-200/50 pb-1">
                        <span className="text-slate-500 italic">{slot.days}</span>
                        <span className="text-deli-blue font-bold font-serif">{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Socials & Interaction */}
              <div className="pt-4 flex items-center justify-between md:justify-start md:gap-6">
                <div className="flex gap-4">
                  {socials.map((social, i) => (
                    <a 
                      key={i} 
                      href={social.link} 
                      className="w-10 h-10 rounded-full bg-deli-blue text-white flex items-center justify-center hover:bg-deli-mustard transition-all duration-300 shadow-md active:scale-95"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Side - Hidden on very small screens or made shorter */}
        <div className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-auto overflow-hidden border-t md:border-t-0 border-slate-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.344445582352!2d-2.85387432338902!3d51.43349617179471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4871ed36611488cb%3A0x6b3b55c3c3a44781!2s21%20Old%20St%2C%20Clevedon%20BS21%206ND!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Mustard Cafe Location"
            className="grayscale-[0.2] contrast-[1.1]"
          />
        </div>
      </div>
    </section>
  );
};
import React, { useState } from 'react';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  // This is the "Placeholder" for where the Admin data would feed in
  const announcement = {
    text: "This will be editable from admin panel",
    link: "#catering",
    isActive: true
  };

  if (!isVisible || !announcement.isActive) return null;

  return (
    <div className="relative z-60 bg-deli-gold text-white py-2.5 px-6">
      <div className="container mx-auto flex items-center justify-center text-center">
        <a 
          href={announcement.link} 
          className="flex items-center gap-3 group"
        >
          <span className="animate-pulse">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L1 21h22L12 2zm0 3.45l8.27 14.3H3.73L12 5.45zM11 16h2v2h-2zm0-6h2v4h-2z"/>
            </svg>
          </span>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] leading-none">
            {announcement.text} 
            <span className="hidden sm:inline-block ml-2 opacity-70 group-hover:opacity-100 transition-opacity underline underline-offset-4">
              Learn More &rarr;
            </span>
          </p>
        </a>

        {/* Dismiss Button - Professional touch */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close announcement"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
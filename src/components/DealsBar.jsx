import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Sparkles, X, ChevronRight } from 'lucide-react'; // Using Lucide for cleaner icons

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [announcementText, setAnnouncementText] = useState("Loading updates...");

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const { data, error } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'announcement_text')
          .single();
        
        if (error) throw error;
        if (data) setAnnouncementText(data.value);
      } catch (err) {
        setAnnouncementText("Welcome to Clevedon's Finest Artisan Deli");
      }
    };

    fetchAnnouncement();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative z-60 bg-deli-gold text-white py-2 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-center">
        
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Sparkle icon is much "friendlier" than a warning triangle */}
          <Sparkles size={14} className="text-white/80 animate-pulse" />
          
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] leading-none flex items-center gap-2">
            {announcementText} 
            
           
          </p>
        </div>

        {/* Dismiss Button - Simplified */}
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
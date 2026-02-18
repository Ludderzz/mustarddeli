import React, { useState, useEffect } from 'react';
import { Maximize2, Camera, ArrowUpRight } from 'lucide-react';

const Showcase = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const BEHOLD_API_URL = "https://feeds.behold.so/b5jRTdPFoetTBr5Gwq6i";
  
  // Update this list with any specific Post URLs you want to hide
  const blacklistedIds = [];

  useEffect(() => {
    // Adding a timestamp to the URL helps bypass browser caching for fresh data
    fetch(`${BEHOLD_API_URL}?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(data => {
        const rawPosts = data.posts || data; 
        
        if (Array.isArray(rawPosts)) {
          const onlyImages = rawPosts.filter(post => {
            const type = (post.mediaType || "").toUpperCase();
            
            // Only allow static images and multi-photo carousels
            const isImage = type === 'IMAGE' || type === 'CAROUSEL_ALBUM';
            
            const isBlacklisted = blacklistedIds.some(item => 
              post.id === item || post.permalink === item
            );

            return isImage && !isBlacklisted;
          });
          setPhotos(onlyImages);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Gallery Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#f0ede6] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#c8a011] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-serif italic text-[#465d6a] animate-pulse text-sm tracking-widest uppercase">
        Accessing Archive...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0ede6] text-[#465d6a]">
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="max-w-screen-xl mx-auto text-center relative z-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[1px] w-8 md:w-12 bg-[#c8a011]"></div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#c8a011]">
              Live Social Feed
            </span>
            <div className="h-[1px] w-8 md:w-12 bg-[#c8a011]"></div>
          </div>
          <h1 className="font-serif italic text-6xl md:text-8xl text-[#465d6a] mb-6 select-none">
            The Showcase
          </h1>
        </div>
      </section>

      <main className="max-w-screen-xl mx-auto px-4 md:px-8 pb-32">
        {photos.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {photos.map((photo) => {
              // Try the mediaUrl first, then the thumbnail
              const imgUrl = photo.mediaUrl || photo.thumbnailUrl;

              return (
                <div 
                  key={photo.id} 
                  className="relative group break-inside-avoid rounded-sm overflow-hidden border-[8px] border-white shadow-sm hover:shadow-2xl transition-all duration-500 ease-in-out hover:-translate-y-1 bg-white"
                >
                  <img 
                    src={imgUrl} 
                    alt="Mustard Deli Gallery"
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Final safety check: if image fails, try thumbnail, or hide if both fail
                      if (photo.thumbnailUrl && e.target.src !== photo.thumbnailUrl) {
                        e.target.src = photo.thumbnailUrl;
                      } else {
                        e.target.closest('.break-inside-avoid').style.display = 'none';
                      }
                    }}
                  />
                  
                  <a 
                    href={photo.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-[#465d6a]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div className="bg-[#f0ede6] p-4 rounded-full text-[#465d6a] scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                      <Maximize2 size={24} strokeWidth={1.5} />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[#f0ede6] font-black text-[10px] uppercase tracking-widest">
                      <span>View Post</span>
                      <ArrowUpRight size={12} />
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-32 border-2 border-dashed border-[#465d6a]/10 rounded-3xl">
            <Camera size={48} className="mx-auto text-[#465d6a]/20 mb-4" />
            <p className="font-serif italic text-[#465d6a]/60">Searching for new imagery...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Showcase;
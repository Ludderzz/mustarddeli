import React, { useRef } from 'react';
import reviewsData from '../assets/reviews.json';
import { Quote, Star, MoveRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const ReviewsSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Find the width of one card (including gap)
      const cardWidth = scrollRef.current.firstChild.offsetWidth + 32; // 32 is the gap (md:gap-8)
      
      const scrollTo = direction === 'left' 
        ? scrollLeft - cardWidth 
        : scrollLeft + cardWidth;
      
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-deli-mustard" />
              <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">Guest Books</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif text-deli-blue italic leading-tight">
              Kind <span className="text-deli-mustard italic font-bold tracking-tight">Words</span>
            </h2>
          </div>

          {/* Desktop Controls (Hidden on Mobile) */}
          <div className="hidden md:flex gap-3 mb-2">
            <button 
              onClick={() => scroll('left')}
              className="p-4 rounded-full border border-slate-100 text-deli-blue hover:bg-deli-mustard hover:text-white hover:border-deli-mustard transition-all duration-300 shadow-sm group"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-4 rounded-full border border-slate-100 text-deli-blue hover:bg-deli-mustard hover:text-white hover:border-deli-mustard transition-all duration-300 shadow-sm group"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Mobile Swipe Indicator (Hidden on Desktop) */}
          <div className="flex md:hidden items-center gap-2 text-deli-mustard/60 animate-pulse">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Swipe</span>
            <MoveRight size={16} />
          </div>
        </div>

        {/* The Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-6 px-6"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollPaddingLeft: '1.5rem', 
            scrollPaddingRight: '1.5rem'
          }}
        >
          {reviewsData.map((review) => (
            <div 
              key={review.id} 
              className="min-w-[85vw] md:min-w-[450px] snap-start bg-deli-grey/40 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between border border-transparent hover:border-deli-mustard/20 transition-all duration-500"
            >
              <div>
                <Quote className="text-deli-mustard mb-6 opacity-30" size={32} />
                <p className="text-xl md:text-2xl font-serif text-deli-mustard italic leading-relaxed mb-8">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-200/50">
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-deli-blue text-xs uppercase tracking-[0.2em]">
                    {review.author}
                  </h4>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill="#E2B13C" className="text-deli-mustard" />
                    ))}
                  </div>
                </div>
                
                <span className="hidden sm:block text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
                  {review.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </section>
  );
};
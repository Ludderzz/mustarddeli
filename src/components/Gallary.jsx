import React, { useState } from 'react';
import { X } from 'lucide-react';

// IMPORT ALL IMAGES
import shopFront from '../assets/shopfront.jpg';
import food1 from '../assets/food1.jpg'; // Spinach & Tomato Rolls
import food2 from '../assets/food2.jpg'; // Mini Yorkshires
import food3 from '../assets/food3.jpg'; // Traditional Sausage Rolls
import tart from '../assets/tart.jpg';
import sandwich from '../assets/sandwhich.jpg';
import cake1 from '../assets/cake1.jpg';

const galleryImages = [
  { id: 1, src: shopFront, alt: 'Mustard Deli Clevedon', category: 'Exterior' },
  { id: 2, src: food1, alt: 'Vegan Spinach & Tomato Rolls', category: 'Savory' },
  { id: 3, src: food2, alt: 'Mini Filled Yorkshire Puddings', category: 'Catering' },
  { id: 4, src: food3, alt: 'Traditional Sausage Rolls', category: 'Savory' },
  { id: 5, src: tart, alt: 'Handmade Bakewell Tart', category: 'Bakery' },
  { id: 6, src: sandwich, alt: 'Artisan Sandwich Platters', category: 'Catering' },
  { id: 7, src: cake1, alt: 'Blood Orange Polenta Cake', category: 'Bakery' },
];

export const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="h-px w-8 bg-deli-mustard" />
            <span className="text-deli-mustard font-bold uppercase tracking-[0.3em] text-[10px]">The Collection</span>
            <div className="h-px w-8 bg-deli-mustard" />
          </div>
          <h2 className="text-5xl font-serif text-deli-blue italic">
            Inside <span className="text-deli-mustard not-italic font-bold">Mustard</span>
          </h2>
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              onClick={() => setSelectedImg(image.src)}
              className="relative group overflow-hidden rounded-2xl cursor-pointer bg-deli-grey shadow-sm hover:shadow-2xl transition-all duration-500 break-inside-avoid"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-deli-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
                <span className="text-deli-mustard font-bold text-[10px] uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {image.category}
                </span>
                <p className="text-white font-serif italic text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-deli-blue/95 flex items-center justify-center p-4 md:p-12"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white hover:text-deli-mustard transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X size={40} />
          </button>
          <img 
            src={selectedImg} 
            className="max-w-full max-h-full rounded-lg shadow-2xl" 
            alt="Enlarged gallery view"
          />
        </div>
      )}
    </section>
  );
};
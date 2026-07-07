import React from 'react';
import { legalContent } from '../data/content';

export default function Hero() {
  const { city, tagline, about, images } = legalContent;

  return (
    <header id="about" className="relative py-32 md:py-48 flex items-center justify-center min-h-[85vh] overflow-hidden">
      
      {/* Real Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={images.hero} 
          alt="Legal Representation" 
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay to ensure white text is highly readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center md:text-left text-white w-full">
        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-legal-gold block mb-6 flex items-center justify-center md:justify-start">
          <span className="w-8 h-px bg-legal-gold mr-4"></span>
          Established Practice | {city}
        </span>
        
        <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-tight leading-tight mb-8 shadow-sm">
          {tagline}
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-12 font-sans font-light">
          {about}
        </p>
        
        <a 
          href="#intake" 
          className="inline-block font-sans text-xs font-medium uppercase tracking-widest bg-legal-gold text-black px-10 py-4 hover:bg-white transition-colors duration-300 shadow-lg"
        >
          Schedule Intake
        </a>
      </div>
    </header>
  );
}
import React from 'react';
import { legalContent } from '../data/content';

export default function PracticeAreas() {
  const { practiceAreas } = legalContent;

  return (
    <section id="services" className="bg-black py-24 md:py-32">
      {/* Section Heading */}
      <div className="text-center mb-20 md:mb-28 px-6">
        <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-white">
          Core Legal Competencies
        </h2>
        <div className="h-px w-20 bg-legal-gold mx-auto mt-8"></div>
      </div>

      {/* Stacked Practice Area Bands */}
      <div className="w-full">
        {practiceAreas.map((area, index) => {
          const num = String(index + 1).padStart(2, '0');
          const isLast = index === practiceAreas.length - 1;

          return (
            <div
              key={area.id}
              className={`
                group relative w-full
                border-l-2 border-legal-gold pl-8 md:pl-16
                py-12 md:py-16
                hover:pl-10 md:hover:pl-20
                hover:border-l-4 hover:border-legal-gold
                transition-all duration-300 ease-in-out
                ${!isLast ? 'border-b border-white/10' : ''}
              `}
            >
              {/* Giant Watermark Number */}
              <span
                className="
                  absolute left-4 md:left-10 top-1/2 -translate-y-1/2
                  text-7xl md:text-9xl font-serif font-bold
                  text-legal-gold/15 select-none pointer-events-none
                  leading-none
                "
                aria-hidden="true"
              >
                {num}
              </span>

              {/* Content — offset to clear the watermark */}
              <div className="relative z-10 max-w-5xl ml-12 md:ml-28">
                {/* Practice Area Label */}
                <span className="block text-xs tracking-widest uppercase font-sans text-legal-gold/60 mb-3">
                  Practice Area {num}
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif font-normal text-white mb-4 group-hover:text-legal-gold transition-colors duration-300">
                  {area.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg font-sans font-light text-neutral-400 leading-relaxed max-w-2xl">
                  {area.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
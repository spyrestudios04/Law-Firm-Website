import React, { useState, useEffect, useCallback } from 'react';
import { legalContent } from '../data/content';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Practice Areas' },
  { href: '#profile', label: 'Our Counsel' },
  { href: '#intake', label: 'Consultation' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // ── Scroll Spy via IntersectionObserver ──
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Lock body scroll when drawer is open ──
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleLinkClick = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <nav className="border-b border-black/10 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Brand Logo Identity */}
        <span className="font-sans font-bold tracking-widest text-xs sm:text-sm text-black">
          {legalContent.firmName}
        </span>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 font-sans text-xs uppercase tracking-widest font-medium">
          {NAV_LINKS.map(({ href, label }) => {
            const sectionId = href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? 'text-legal-gold'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Hamburger Button — Mobile Only */}
        <button
          type="button"
          aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-[60]"
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          <span
            className={`block h-[2px] w-5 bg-black rounded-full transition-all duration-300 origin-center ${
              drawerOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-black rounded-full transition-all duration-300 ${
              drawerOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-black rounded-full transition-all duration-300 origin-center ${
              drawerOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-24 px-8 space-y-2">
          {NAV_LINKS.map(({ href, label }, index) => {
            const sectionId = href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={`block py-3 border-b border-black/5 font-sans text-sm uppercase tracking-widest font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-legal-gold'
                    : 'text-black/60 hover:text-black hover:pl-2'
                }`}
                style={{
                  transitionDelay: drawerOpen ? `${index * 60}ms` : '0ms',
                  opacity: drawerOpen ? 1 : 0,
                  transform: drawerOpen ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        {/* Gold accent line at bottom of drawer */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-legal-gold" />
      </div>
    </nav>
  );
}
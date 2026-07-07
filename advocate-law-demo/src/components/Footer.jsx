import React from 'react';
import { legalContent } from '../data/content';

export default function Footer() {
  return (
    <footer className="border-t border-black/20 py-12 bg-neutral-900 text-neutral-400 font-sans text-xs">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <p>© {new Date().getFullYear()} {legalContent.firmName}. All Rights Reserved. Privileged Legal Information.</p>
        <p className="text-neutral-500 uppercase tracking-widest font-medium">Built for Legal Authorities</p>
      </div>
    </footer>
  );
}
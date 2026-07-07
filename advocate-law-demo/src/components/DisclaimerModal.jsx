import React, { useState, useEffect } from 'react';
import { legalContent } from '../data/content';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted the disclaimer in this session
    const hasAccepted = sessionStorage.getItem('disclaimerAccepted');
    
    if (!hasAccepted) {
      setIsOpen(true);
      // Lock background scrolling while modal is open
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem('disclaimerAccepted', 'true');
    setIsOpen(false);
    // Restore background scrolling
    document.body.style.overflow = 'auto';
  };

  const handleDecline = () => {
    // If they decline, redirect them away
    window.location.href = "https://www.google.com";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white max-w-2xl w-full border-t-4 border-legal-gold shadow-2xl p-8 md:p-12 relative">
        
        <div className="flex justify-center mb-6">
          <span className="font-sans font-bold tracking-widest text-sm text-black uppercase">
            {legalContent.firmName}
          </span>
        </div>

        <h2 className="text-2xl font-serif font-normal text-black text-center mb-6 border-b border-black/10 pb-4">
          Mandatory Legal Disclaimer
        </h2>

        <div className="font-sans text-sm text-neutral-600 space-y-4 h-64 overflow-y-auto pr-4 custom-scrollbar leading-relaxed">
          <p>
            The rules of the Bar Council of India strictly prohibit law firms and advocates from advertising or soliciting work in any manner. By clicking on <strong>"I Agree"</strong>, the user acknowledges and confirms the following:
          </p>
          
          <ul className="list-disc pl-5 space-y-3">
            <li>
              The user wishes to gain more information about <strong>{legalContent.firmName}</strong>, our practice areas, and our attorneys entirely of their own accord and for their personal information and use.
            </li>
            <li>
              The information is made available to the user only upon their specific request. Any material downloaded or information obtained from this website is done completely at the user's volition. 
            </li>
            <li>
              The transmission, receipt, or use of this website is not intended to, and will not, create any lawyer-client relationship whatsoever.
            </li>
            <li>
              None of the information or material contained on this website constitutes a legal opinion or amounts to any form of legal advice.
            </li>
          </ul>

          <p className="pt-2">
            <strong>{legalContent.firmName}</strong> is not liable for any consequence of any action taken by the user relying on the material or information provided on this website. In cases where the user has specific legal issues, they must always seek independent, professional legal advice.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end border-t border-black/10 pt-6">
          <button 
            onClick={handleDecline}
            className="px-6 py-3 font-sans text-xs uppercase tracking-widest font-medium text-neutral-500 hover:text-black transition-colors"
          >
            I Decline (Exit)
          </button>
          <button 
            onClick={handleAccept}
            className="bg-black text-white px-8 py-3 font-sans text-xs uppercase tracking-widest font-medium hover:bg-legal-gold transition-colors shadow-lg"
          >
            I Agree
          </button>
        </div>

      </div>
    </div>
  );
}
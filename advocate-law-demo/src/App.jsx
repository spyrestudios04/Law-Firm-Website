import React from 'react';
import './styles/index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PracticeAreas from './components/PracticeAreas';
import AttorneyProfile from './components/AttorneyProfile';
import IntakeSection from './components/IntakeSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import RevealWrapper from './components/RevealWrapper';
import Chatbot from './components/Chatbot';
import DisclaimerModal from './components/DisclaimerModal'; // <-- NEW IMPORT

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black antialiased selection:bg-black selection:text-white relative">
      
      {/* Mandatory BCI Pop-Up */}
      <DisclaimerModal />

      <Navbar />
      <Hero />

      <RevealWrapper><PracticeAreas /></RevealWrapper>
      <RevealWrapper><AttorneyProfile /></RevealWrapper>
      <RevealWrapper><IntakeSection /></RevealWrapper>
      <RevealWrapper><ContactSection /></RevealWrapper>

      <Footer />
      
      <WhatsAppWidget />
      <Chatbot />
    </div>
  );
}
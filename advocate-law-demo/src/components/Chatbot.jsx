import React, { useState, useRef, useEffect } from 'react';
import { legalContent } from '../data/content';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello. I am the virtual assistant for Advocate R. Sharma. Ask me a question about our services, fees, or practice areas." }
  ]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages]);

  // The core matching logic
  const analyzeInput = (userText) => {
    const textStr = userText.toLowerCase();
    
    // Clean input and split into words (ignoring basic stop words)
    const stopWords = ["is", "the", "in", "at", "a", "an", "of", "and", "to", "my", "i", "need", "help", "with"];
    const userWords = textStr.replace(/[^\w\s]/gi, '').split(" ").filter(w => !stopWords.includes(w) && w.length > 2);

    // Score FAQs based on how many keywords match
    let matches = legalContent.faqs.map(faq => {
      let score = 0;
      userWords.forEach(word => {
        if (faq.keywords.includes(word) || faq.question.toLowerCase().includes(word)) {
          score++;
        }
      });
      return { ...faq, score };
    });

    // Filter out zero scores and sort by highest score
    matches = matches.filter(m => m.score > 0).sort((a, b) => b.score - a.score);

    if (matches.length === 0) {
      return [{ 
        type: 'bot', 
        text: "I couldn't find a specific answer for that. Please use the Intake Form or our WhatsApp to speak with the advocate directly." 
      }];
    }

    if (matches[0].score >= 2 || matches.length === 1) {
      // High confidence match or only one match -> Provide answer directly
      return [{ type: 'bot', text: matches[0].answer }];
    } else {
      // Partial/Low confidence matches -> Suggest similar questions
      const suggestions = matches.slice(0, 3); // Take top 3
      return [{ 
        type: 'bot', 
        text: "I found a few related topics. Did you mean to ask:", 
        options: suggestions 
      }];
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate thinking delay for better UX
    setTimeout(() => {
      const botResponses = analyzeInput(input);
      setMessages(prev => [...prev, ...botResponses]);
    }, 600);
  };

  const handleOptionClick = (faq) => {
    // If user clicks a suggested question, act like they typed it
    setMessages(prev => [
      ...prev, 
      { type: 'user', text: faq.question },
      { type: 'bot', text: faq.answer }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button (Bottom Left) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-legal-gold transition-all duration-300 flex items-center justify-center border border-white/20"
      >
        {isOpen ? (
          <span className="font-sans font-bold text-lg">✕</span>
        ) : (
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
             <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 md:w-96 bg-white border border-black/20 shadow-2xl flex flex-col font-sans overflow-hidden">
          {/* Chat Header */}
          <div className="bg-black text-white px-4 py-3 flex justify-between items-center">
            <span className="text-sm uppercase tracking-widest font-semibold text-legal-gold">Legal Assistant AI</span>
          </div>

          {/* Chat Messages */}
          <div className="h-80 p-4 overflow-y-auto bg-neutral-50 space-y-4 flex flex-col">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`max-w-[85%] px-4 py-2 text-sm ${
                    msg.type === 'user' 
                      ? 'bg-black text-white rounded-l-lg rounded-tr-lg' 
                      : 'bg-white border border-black/10 text-black rounded-r-lg rounded-tl-lg shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                
                {/* Render clickable suggestions if the bot provided options */}
                {msg.options && (
                  <div className="mt-2 space-y-2 w-full pl-2">
                    {msg.options.map(opt => (
                      <button 
                        key={opt.id}
                        onClick={() => handleOptionClick(opt)}
                        className="block text-left text-xs bg-legal-gold/10 hover:bg-legal-gold/30 text-black border border-legal-gold/50 px-3 py-2 rounded-md transition-colors w-full"
                      >
                        {opt.question}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Area */}
          <form onSubmit={handleSend} className="border-t border-black/10 p-2 bg-white flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your legal question..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none focus:bg-neutral-100 transition-colors"
            />
            <button 
              type="submit" 
              className="bg-black text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-legal-gold transition-colors"
            >
              Ask
            </button>
          </form>
        </div>
      )}
    </>
  );
}
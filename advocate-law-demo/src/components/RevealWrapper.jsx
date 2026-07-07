import React, { useEffect, useRef, useState } from 'react';

export default function RevealWrapper({ children, delay = "delay-0" }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the element comes into the viewport, make it visible
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stop observing once it has revealed (so it doesn't animate out and in repeatedly)
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Triggers when 15% of the component is visible
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) observer.unobserve(domRef.current);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${delay} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
}
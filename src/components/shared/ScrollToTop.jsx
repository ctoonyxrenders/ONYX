'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      
      // Show button when scrolled more than 30px
      setIsVisible(scrollTop > 30);
      
      // Check if near footer (within 500px from bottom)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      
      setIsNearFooter(distanceFromBottom < 500);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed
 bottom-2 right-2
 lg:bottom-10 lg:right-10
 
 p-3
 
 rounded-full
 shadow-lg
 transition-all duration-300
 z-50
 ${
 isNearFooter
 ? 'bg-white' // White background when near footer
 : 'bg-[#114046]' // Teal background normally
 }
 ${
 isVisible
 ? 'opacity-100'
 : 'opacity-0 pointer-events-none'
 }
 `}
    >
      <ArrowUp 
        className={`w-6 h-6 transition-colors duration-300 ${
 isNearFooter
 ? 'text-black' // Black arrow when near footer
 : 'text-white' // White arrow normally
 }`}
      />
    </button>
  );
}
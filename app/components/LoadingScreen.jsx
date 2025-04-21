'use client';

import React, { useState, useEffect } from 'react';
import { JetBrains_Mono } from 'next/font/google';

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap',
});

// Pre-calculate dot opacities to ensure consistency
const dotOpacities = Array.from({ length: 400 }).map((_, i) => 0.4 + (i % 3) * 0.1);

const LoadingScreen = ({ progress = 0 }) => {
  const [text, setText] = useState('');
  const [mounted, setMounted] = useState(false);
  const [currentShape, setCurrentShape] = useState(0);
  const fullText = 'Loading...';

  // Array of clip-path shapes
  const shapes = [
    'circle(50% at 50% 50%)',
    'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // Diamond
    'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Hexagon
    'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)', // Octagon
    'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)', // Heptagon
    'circle(50% at 50% 50%)' // Back to circle for smooth loop
  ];

  useEffect(() => {
    setMounted(true);
    let currentIndex = 0;

    const textInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0;
      }
    }, 150); // Faster text animation

    // Shape changing interval
    const shapeInterval = setInterval(() => {
      setCurrentShape(prev => (prev + 1) % shapes.length);
    }, 1500); // Faster shape changes

    return () => {
      clearInterval(textInterval);
      clearInterval(shapeInterval);
    };
  }, []);

  const style = {
    clipPath: shapes[currentShape],
    transition: 'all 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: `rotate(${currentShape * 90}deg)`,
  };

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#0B061E] to-[#19072F] flex items-center justify-center z-50">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-700 to-purple-600 
            bg-[length:200%_100%] animate-gradientMove opacity-50" style={style} />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0B061E] to-[#19072F] flex items-center justify-center z-50 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Horizontal Lines */}
        <div className="absolute inset-0 grid grid-rows-[repeat(20,minmax(0,1fr))] gap-px">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="bg-white/30 animate-pulse" 
              style={{ animationDelay: `${i * 0.1}s` }} 
            />
          ))}
        </div>
        {/* Vertical Lines */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-px">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="bg-white/30 animate-pulse" 
              style={{ animationDelay: `${i * 0.1}s` }} 
            />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="relative w-48 h-48">
        {/* Animated gradient shape */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-700 to-purple-600 
            bg-[length:200%_100%] animate-gradientMove opacity-50 transition-transform"
          style={style}
        >
          {/* Inner gradient for additional effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent 
              animate-pulse transition-opacity"
            style={{ 
              animationDuration: '2s',
              clipPath: shapes[currentShape],
              transition: 'all 0.75s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </div>
        
        {/* Loading text and progress container */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${jetBrainsMono.className}`}>
          <div className="relative text-center min-w-[120px]">
            <span className="text-white text-2xl tracking-wider block transition-all duration-300 ease-in-out">
              {text}
            </span>
            <span className="text-white text-2xl tracking-wider opacity-0 absolute top-0 left-0 w-full">
              Loading...
            </span>
          </div>
          {progress > 0 && (
            <div className="mt-6 w-36 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-blue-700 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 
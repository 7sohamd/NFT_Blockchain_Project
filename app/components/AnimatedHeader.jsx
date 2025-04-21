'use client';

import React, { useState, useEffect } from 'react';

const AnimatedHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [visibleWords, setVisibleWords] = useState([]);
  const [nftGlowOpacity, setNftGlowOpacity] = useState(0);
  const [gradientOpacity, setGradientOpacity] = useState(0);
  
  // Split text into logical groups with proper spacing
  const words = ['Create', 'Your', 'Own', 'NFT', 'Dream', 'Gallery'];

  useEffect(() => {
    // Show words one by one with a delay
    words.forEach((_, index) => {
      setTimeout(() => {
        setVisibleWords(prev => [...prev, index]);
      }, index * 500);
    });

    // Start gradient transition after NFT word appears
    setTimeout(() => {
      // Gradually increase gradient opacity
      const startTime = Date.now();
      const duration = 1000; // Reduced from 2000ms to 1000ms (1 second)

      const animateGradient = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setGradientOpacity(progress);

        if (progress < 1) {
          requestAnimationFrame(animateGradient);
        }
      };

      requestAnimationFrame(animateGradient);
    }, 3000);

    // Start glow effect sooner and make it faster
    setTimeout(() => {
      setNftGlowOpacity(1);
    }, 3200); // Reduced from 3500ms to 3200ms
  }, []);

  const getNFTStyles = (word) => {
    if (word === 'NFT') {
      return {
        position: 'relative',
        display: 'inline-block',
        color: 'white',
        textShadow: `0 0 ${20 * nftGlowOpacity}px rgba(96, 165, 250, ${0.5 * nftGlowOpacity})`,
        transition: 'text-shadow 0.8s ease-in-out',
      };
    }
    return {};
  };

  return (
    <>
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .moving-gradient {
          background: linear-gradient(
            90deg,
            #60a5fa,
            #2dd4bf,
            #ec4899,
            #fbbf24,
            #60a5fa
          );
          background-size: 400% 100%;
          animation: gradientMove 8s ease infinite;
        }
      `}</style>
      <h1
        className="text-6xl md:text-7xl mb-6"
        style={{ 
          fontFamily: "'Monument Extended', serif",
          lineHeight: '0.95' // Reduced line height for tighter spacing
        }}
      >
        <span 
          className={`inline-block transition-all duration-300 cursor-pointer ${
            isHovered ? 'text-blue-400 scale-110' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? '/' : '\\'}
        </span>
        {' '}
        <div className="space-y-0"> {/* Minimal space between lines */}
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block transition-opacity duration-2000 mr-4 ${
                visibleWords.includes(index) ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                ...getNFTStyles(word),
                marginBottom: '-0.1em', // Negative margin to bring lines closer
              }}
            >
              {word}
              {word === 'NFT' && (
                <span
                  className="absolute inset-0 moving-gradient"
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    opacity: gradientOpacity,
                    transition: 'opacity 1s ease-in-out', // Reduced from 2s to 1s
                  }}
                >
                  NFT
                </span>
              )}
            </span>
          ))}
        </div>
      </h1>
    </>
  );
};

export default AnimatedHeader; 
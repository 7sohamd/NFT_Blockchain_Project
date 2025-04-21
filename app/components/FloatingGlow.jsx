'use client';

import React, { useEffect, useState } from 'react';

const FloatingGlow = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Function to generate new random position
    const generateNewPosition = () => {
      return {
        x: Math.random() * 60 + 20, // Keep within 20-80% of screen width for bigger orb
        y: Math.random() * 60 + 20  // Keep within 20-80% of screen height for bigger orb
      };
    };

    // Update target position every 12 seconds (even slower)
    const intervalId = setInterval(() => {
      setTargetPosition(generateNewPosition());
    }, 12000);

    // Smooth movement animation with much slower interpolation
    const animationId = setInterval(() => {
      setPosition(current => ({
        x: current.x + (targetPosition.x - current.x) * 0.005, // Reduced from 0.01 to 0.005
        y: current.y + (targetPosition.y - current.y) * 0.005
      }));
    }, 50);

    return () => {
      clearInterval(intervalId);
      clearInterval(animationId);
    };
  }, [targetPosition]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{
        background: 'transparent'
      }}
    >
      {/* Main glow */}
      <div 
        className="absolute w-[1000px] h-[1000px] rounded-full transition-transform duration-1000 ease-in-out"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0.1) 35%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'pulse 8s ease-in-out infinite'
        }}
      />
      
      {/* Secondary glow for enhanced effect */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full transition-transform duration-1000 ease-in-out"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at center, rgba(244, 114, 182, 0.15) 0%, rgba(244, 114, 182, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'secondaryPulse 8s ease-in-out infinite',
          animationDelay: '0.5s'
        }}
      />
    </div>
  );
};

export default FloatingGlow; 
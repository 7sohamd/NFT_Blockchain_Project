'use client';

import React, { useState, useEffect } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let frame;
    let currentX = 0;
    let currentY = 0;
    
    const updateCursorPosition = (e) => {
      // Instead of setting position directly, we store the target position
      const targetX = e.clientX;
      const targetY = e.clientY;
      
      const animate = () => {
        // Smooth interpolation
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        
        currentX += dx * 0.2; // Adjust speed by changing this multiplier
        currentY += dy * 0.2;
        
        setPosition({ x: currentX, y: currentY });
        
        frame = requestAnimationFrame(animate);
      };
      
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(6, 182, 212, 0.2) 25%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: '180px',
          height: '180px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(6, 182, 212, 0.3) 25%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.55) 0%, rgba(6, 182, 212, 0.4) 25%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(4px)',
        }}
      />
    </div>
  );
};

export default CursorGlow; 
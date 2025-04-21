'use client';

import React from 'react';

const GlowButton = ({ children, className = '', roundedFull = true }) => {
  return (
    <button
      className={`relative group transform transition-all duration-300 hover:scale-[1.02] ${roundedFull ? 'rounded-full' : 'rounded-lg'} ${className}`}
    >
      {/* Gradient background with enhanced glow */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-700 to-purple-600 
        bg-[length:200%_100%] animate-gradientMove rounded-[inherit] transition-all duration-300
        opacity-90 group-hover:opacity-100
        group-hover:shadow-[0_0_25px_5px_rgba(139,92,246,0.4)]
        group-hover:shadow-purple-500/50"
      />
      
      {/* Glow overlay */}
      <div 
        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-50 
        transition-opacity duration-300 bg-gradient-to-r from-purple-400/20 via-blue-500/20 to-purple-400/20"
      />
      
      {/* Content with subtle text glow */}
      <div className="relative z-10 px-6 py-3 group-hover:text-white transition-colors duration-300
                    group-hover:shadow-white group-hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        {children}
      </div>
    </button>
  );
};

export default GlowButton; 
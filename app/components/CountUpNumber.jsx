'use client';

import React, { useState, useEffect } from 'react';

const CountUpNumber = ({ end, duration = 1000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      const current = Math.min((progress / duration) * end, end);
      
      setCount(Math.floor(current));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <span style={{ fontFamily: "'Monument Extended', serif" }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default CountUpNumber; 
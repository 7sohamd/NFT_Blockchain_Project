'use client';

import React, { useEffect, useRef } from 'react';

const SplineScene = () => {
  const splineContainerRef = useRef(null);

  useEffect(() => {
    const container = splineContainerRef.current;
    if (!container) return;

    const preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventScroll = (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    container.addEventListener('wheel', preventDefault, { passive: false });
    container.addEventListener('mousewheel', preventDefault, { passive: false });
    container.addEventListener('DOMMouseScroll', preventDefault, { passive: false });
    container.addEventListener('touchmove', preventDefault, { passive: false });
    container.addEventListener('keydown', preventScroll);

    return () => {
      container.removeEventListener('wheel', preventDefault);
      container.removeEventListener('mousewheel', preventDefault);
      container.removeEventListener('DOMMouseScroll', preventDefault);
      container.removeEventListener('touchmove', preventDefault);
      container.removeEventListener('keydown', preventScroll);
    };
  }, []);

  useEffect(() => {

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {

      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .spline-watermark {
          display: none !important;
        }
        spline-viewer::part(watermark) {
          display: none !important;
        }
        spline-viewer {
          --zoom: 1 !important;
        }
      `}</style>
      <div className="flex justify-center items-center">
        <div className="relative w-[1000px] h-[800px]">
          <div 
            ref={splineContainerRef}
            className="absolute top-50 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px]"
            style={{
              clipPath: 'inset(0 0 100px 0)',
              overflow: 'hidden',
              touchAction: 'none'
            }}
          >
            <spline-viewer 
              url="https://prod.spline.design/PobOTBNzew89OdK9/scene.splinecode"
              className="w-full h-full"
              style={{ 
                borderRadius: '1.5rem',
                '--spline-viewer-watermark': 'none !important'
              }}
              disable-zoom="true"
              camera-control="false"
              zoom="1"
              scroll-control="false"
              touch-control="false"
              loading-anim-type="spinner-small-light"
            ></spline-viewer>
          </div>
        </div>
      </div>
    </>
  );
};

export default SplineScene; 
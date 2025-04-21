'use client';

import React, { Suspense, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import TypewriterText from "./components/TypewriterText";
import GlowButton from "./components/GlowButton";
import LoadingScreen from "./components/LoadingScreen";
import { JetBrains_Mono } from 'next/font/google';

const SplineScene = dynamic(() => import('./components/SplineScene'), {
  loading: () => <LoadingScreen progress={75} />,
  ssr: false
});

const ParticleBackground = dynamic(() => import('./components/ParticlesBackground'), {
  loading: () => <LoadingScreen progress={25} />,
  ssr: false
});

const AnimatedHeader = dynamic(() => import('./components/AnimatedHeader'), {
  loading: () => <div className="h-24" />,
  ssr: false
});

const FloatingGlow = dynamic(() => import('./components/FloatingGlow'), {
  loading: () => null,
  ssr: false
});

const CursorGlow = dynamic(() => import('./components/CursorGlow'), {
  loading: () => null,
  ssr: false
});

const CountUpNumber = dynamic(() => import('./components/CountUpNumber'), {
  loading: () => <span>0</span>,
  ssr: false
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  display: 'swap',
});

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B061E] to-[#19072F] text-white overflow-hidden relative">
      <FloatingGlow />
      
      <Suspense fallback={<LoadingScreen progress={25} />}>
        <ParticleBackground />
      </Suspense>
      <img
        src="/Group1.png"
        alt="Background Pattern"
        className="absolute right-0 top-0 h-full object-cover pointer-events-none opacity-90 z-0"
      />

      <div className="flex justify-between items-center px-10 py-6 relative z-50">
        <div className={`flex gap-10 text-sm ${jetBrainsMono.className}`}>
          <a href="#" className="hover:underline">Drop</a>
          <a href="#" className="hover:underline">Marketplace</a>
          <a href="#" className="hover:underline">Creator</a>
          <a href="#" className="hover:underline">Community</a>
        </div>
        <GlowButton className={`text-xs ${jetBrainsMono.className}`}>
          Connect to wallet
        </GlowButton>
      </div>

      <div className="px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 relative">
        <div className="z-20 relative">
          <AnimatedHeader />
          
          <p className={`text-sm text-gray-300 max-w-md mb-6 ${jetBrainsMono.className}`}>
            <TypewriterText text="The largest NFT marketplace. Authentic and truly unique digital creation. Signed and issued by the creator, made possible by blockchain technology." />
          </p>

          <div className="flex items-center gap-6">
            <GlowButton className={`text-sm ${jetBrainsMono.className} flex items-center gap-2`}>
              <span>Discover NFT</span>
              <span className="text-lg">↗</span>
            </GlowButton>

            <button 
              className={`w-20 h-20 flex items-center justify-center rounded-full border-2 border-white/30 text-xs text-center ${jetBrainsMono.className} relative group transition-all duration-500 ease-in-out hover:border-white/50 rotate-12 hover:rotate-[-12deg]`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 via-blue-700/20 to-purple-600/20 bg-[length:200%_100%] animate-gradientMove opacity-50 group-hover:opacity-70 transition-opacity duration-500 ease-in-out"></div>
              <span className="relative z-10">explore artworks</span>
            </button>
          </div>

          <div className="mt-10 flex gap-12 text-sm">
            <div>
              <p className="text-white font-bold text-xl">
                <Suspense fallback={<span>0</span>}>
                  <CountUpNumber end={25.5} duration={1500} suffix=" K" />
                </Suspense>
              </p>
              <p className={`text-gray-400 ${jetBrainsMono.className}`}>Artwork</p>
            </div>
            <div>
              <p className="text-white font-bold text-xl">
                <Suspense fallback={<span>0</span>}>
                  <CountUpNumber end={15.5} duration={1500} suffix="+ M" />
                </Suspense>
              </p>
              <p className={`text-gray-400 ${jetBrainsMono.className}`}>Artist</p>
            </div>
            <div>
              <p className="text-white font-bold text-xl">
                <Suspense fallback={<span>0</span>}>
                  <CountUpNumber end={10.5} duration={1500} suffix="+ K" />
                </Suspense>
              </p>
              <p className={`text-gray-400 ${jetBrainsMono.className}`}>Auction</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <Suspense fallback={<LoadingScreen progress={75} />}>
            <SplineScene />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register ScrollTrigger safely for Next.js environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ItzFizzScrollPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text helper to maintain clean DOM structure
  const headlineText = "WELCOME ITZFIZZ";
  const renderLetters = () => {
    return headlineText.split('').map((char, index) => (
      <span key={index} className="inline-block min-w-[0.5em]">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useGSAP(
    () => {
      // 1. MASTER TIMELINE CALIBRATION
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=250%', // Total scroll depth
          scrub: 2,      // High-inertia "heavy" feel
        }
      });

      // 2. CAR MOTION: Center-Lock Sync
      // Moves to 100vw and pulls back 50% of its own width
      tl.fromTo('.car-element',
        { 
          x: '0vw', 
          xPercent: 0 
        },
        { 
          x: '100vw', 
          xPercent: -50, 
          ease: 'none', // Critical for synchronization
          duration: 100 
        },
        0
      );

      // 3. ROAD FILL: Center-Lock Sync
      // Growth perfectly matches the car's midline progression
      tl.fromTo('.road-fill',
        { scaleX: 0 },
        { 
          scaleX: 1, 
          ease: 'none', 
          duration: 100 
        },
        0
      );

      // 4. PERSISTENT MILESTONE REVEALS
      const milestones = [
        { id: '.m-1', pos: 15 },
        { id: '.m-2', pos: 40 },
        { id: '.m-3', pos: 65 },
        { id: '.m-4', pos: 85 },
      ];

      milestones.forEach((m) => {
        gsap.set(m.id, { opacity: 0, scale: 0.5, y: 20 });
        tl.to(m.id, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 8, 
          ease: 'power2.out'
        }, m.pos);
      });
    },
    { scope: containerRef }
  );

  return (
    // overflow-x-clip hides the car as it exits the right boundary
    <div className="overflow-x-clip w-full bg-black">
      <main ref={containerRef} className="relative w-full h-screen text-white font-sans">
        
        {/* --- ROAD SECTION --- */}
        <div className="absolute top-1/2 left-0 w-full h-32 md:h-48 -translate-y-1/2 bg-neutral-900 border-t-2 border-b-2 border-neutral-800 z-0 overflow-hidden">
          {/* Road Fill (Syncs to Car Center) */}
          <div className="road-fill absolute top-0 left-0 w-full h-full bg-white origin-left scale-x-0 z-[1] will-change-transform" />
        </div>

        {/* --- HEADLINE (Stealth Reveal) --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none text-neutral-900">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic">
            {renderLetters()}
          </h1>
        </div>

        {/* --- MILESTONES --- */}
        <div className="m-1 absolute top-[15%] left-[10%] z-20 w-56 md:w-80 p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20">
          <h3 className="text-3xl md:text-4xl font-bold">58%</h3>
          <p className="text-sm font-medium opacity-90 text-indigo-50">Increase in pick up point use</p>
        </div>

        <div className="m-2 absolute bottom-[15%] left-[30%] z-20 w-56 md:w-80 p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/20">
          <h3 className="text-3xl md:text-4xl font-bold">23%</h3>
          <p className="text-sm font-medium opacity-90 text-emerald-50">Decreased in customer phone calls</p>
        </div>

        <div className="m-3 absolute top-[15%] left-[55%] z-20 w-56 md:w-80 p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl shadow-blue-500/20">
          <h3 className="text-3xl md:text-4xl font-bold">27%</h3>
          <p className="text-sm font-medium opacity-90 text-blue-50">Increase in pick up point use</p>
        </div>

        <div className="m-4 absolute bottom-[15%] left-[80%] z-20 w-56 md:w-80 p-6 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 shadow-xl shadow-rose-500/20">
          <h3 className="text-3xl md:text-4xl font-bold">40%</h3>
          <p className="text-sm font-medium opacity-90 text-rose-50">Decreased in customer phone calls</p>
        </div>

        {/* --- THE CAR --- */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none z-30">
          <div className="car-element relative w-[250px] h-[125px] md:w-[400px] md:h-[200px] will-change-transform">
            <Image 
              src="/car.png" 
              alt="3D Car" 
              fill 
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]" 
              priority
            />
          </div>
        </div>

      </main>
    </div>
  );
}
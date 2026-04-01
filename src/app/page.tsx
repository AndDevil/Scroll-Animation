'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PerfectSyncScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Note: We keep the span-split for clean layout, but we've removed the GSAP stagger
  const headlineText = "HIRE ME!";
  const renderLetters = () => {
    return headlineText.split('').map((char, index) => (
      <span key={index} className="inline-block min-w-[0.5em]">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=400%',
          scrub: 0.5,
        }
      });

      // 1. CAR MOTION (Sync'd to Front Bumper)
      tl.fromTo('.car-element',
        { x: '0vw', xPercent: 0 },
        { x: '110vw', xPercent: -100, ease: 'none', duration: 100 },
        0
      );

      // 2. ROAD FILL (Sync'd to Back Bumper / Anchor)
      // Using bg-white as the "paint" to reveal the dark headline
      tl.fromTo('.road-fill',
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', duration: 100 },
        0
      );

      // 3. MILESTONE REVEALS (Fade & Scale In, Stay Visible)
      const milestones = [
        { id: '.m-1', pos: 15 },
        { id: '.m-2', pos: 40 },
        { id: '.m-3', pos: 65 },
        { id: '.m-4', pos: 85 },
      ];

      milestones.forEach((m) => {
        // Initial state: Invisible and small
        gsap.set(m.id, { opacity: 0, scale: 0.5, y: 20 });

        // Animation: Reveal and stay permanent
        tl.to(m.id, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 8, // Smooth reveal duration
          ease: 'power2.out'
        }, m.pos);
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="overflow-x-clip w-full bg-black">
      <main ref={containerRef} className="relative w-full h-screen text-white font-sans">
        
        {/* --- ROAD SECTION --- */}
        {/* Base Road Color: neutral-900 */}
        <div className="absolute top-1/2 left-0 w-full h-32 md:h-48 -translate-y-1/2 bg-neutral-900 z-0 overflow-hidden">
          {/* Road Fill: Using White to contrast with the dark headline */}
          <div className="road-fill absolute top-0 left-0 w-full h-full bg-white origin-left scale-x-0 z-[1] will-change-transform" />
        </div>

        {/* --- HEADLINE --- */}
        {/* Color: text-neutral-900 (Matches the road exactly) */}
        {/* Animation: None (Static, Opacity 1) */}
        {/* Z-Index: 10 (Sits on top of road and fill, but behind car) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 pointer-events-none text-neutral-900">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter uppercase italic opacity-100">
            {renderLetters()}
          </h1>
        </div>

        {/* --- MILESTONES (Positioned by % to match Timeline Math) --- */}
        {/* Card 1: Indigo to Purple */}
        <div className="m-1 absolute top-[15%] left-[10%] z-20 w-64 p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20">
          <h3 className="text-4xl font-bold">58%</h3>
          <p className="text-sm font-medium opacity-90">Efficiency Increase</p>
        </div>

        {/* Card 2: Emerald to Teal */}
        <div className="m-2 absolute bottom-[15%] left-[30%] z-20 w-64 p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/20">
          <h3 className="text-4xl font-bold">23%</h3>
          <p className="text-sm font-medium opacity-90">Cost Reduction</p>
        </div>

        {/* Card 3: Blue to Cyan */}
        <div className="m-3 absolute top-[15%] left-[55%] z-20 w-64 p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl shadow-blue-500/20">
          <h3 className="text-4xl font-bold">44k</h3>
          <p className="text-sm font-medium opacity-90">Active Users</p>
        </div>

        {/* Card 4: Rose to Orange */}
        <div className="m-4 absolute bottom-[15%] left-[80%] z-20 w-64 p-6 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 shadow-xl shadow-rose-500/20">
          <h3 className="text-4xl font-bold">99%</h3>
          <p className="text-sm font-medium opacity-90">Uptime Saturation</p>
        </div>

        {/* --- THE CAR --- */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none z-30">
          <div className="car-element relative w-[250px] h-[125px] md:w-[400px] md:h-[200px] will-change-transform">
            <Image 
              src="/car.png" 
              alt="Car" 
              fill 
              className="object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]" 
              priority
            />
          </div>
        </div>

      </main>
    </div>
  );
}
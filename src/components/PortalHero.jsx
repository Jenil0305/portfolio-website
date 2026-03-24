import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortalHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Pin and Scale animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // 3x the viewport height for pacing
        pin: true,
        scrub: 1, // Smooth scrub
      }
    });

    // We scale the text aggressively. Setting transformOrigin to center of the "O"
    // Since it's an SVG, we can define the viewBox and know exactly where "O" is,
    // or just use generic center if it's placed centrally. Let's assume it scales from ~40% width.
    tl.to(textRef.current, {
      scale: 150, 
      transformOrigin: '40% 50%',
      ease: 'power2.inOut',
      opacity: 0,
      force3D: true // Hardware acceleration
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Starry/Particle Background (CSS basic version) */}
      <div className="absolute inset-0 select-none pointer-events-none opacity-50">
        <div className="absolute w-1 h-1 bg-white rounded-full top-1/4 left-1/4 animate-ping" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-1/2 left-3/4 animate-pulse" />
        <div className="absolute w-2 h-2 bg-brand-neon rounded-full top-3/4 left-1/3" />
      </div>

      <div ref={textRef} className="z-10 w-full flex justify-center items-center will-change-transform translate-z-0">
        {/* Removed expensive drop-shadow filter which caused lag during scale */}
        <svg viewBox="0 0 1000 200" className="w-[80vw] h-auto font-black">
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#fff" className="text-[120px] tracking-tighter" style={{ textShadow: '0 0 40px rgba(57,255,20,0.3)' }}>
            FRONTEND <tspan fill="none" stroke="#39ff14" strokeWidth="2">x</tspan> AI
          </text>
        </svg>
      </div>
      
      {/* Small scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-gray-400">
        <span className="text-sm font-mono uppercase mb-2 text-brand-neon">Scroll to enter</span>
        <div className="w-[1px] h-10 bg-brand-neon/50" />
      </div>
    </section>
  );
};

export default PortalHero;

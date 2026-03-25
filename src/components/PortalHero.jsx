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
        end: '+=250%', 
        pin: true,
        scrub: true,
        anticipatePin: 1,
      }
    });

    tl.to(textRef.current, {
      scale: 30, // Reduced from 100 to prevent compositor layer dumping
      opacity: 0, // Swapped from autoAlpha to avoid visibility toggling reflows
      rotation: 0.01, // Forces strict GPU matrix layout, stops reverse lag
      ease: 'none',
      force3D: true,
      z: 0.1, // Force 3D context
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      
      {/* Dynamic Starfield Background */}
      <div className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-neon/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Hardware-accelerated HTML Text */}
      <div 
        ref={textRef} 
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none backface-hidden"
        style={{ transformOrigin: '50% 50%', willChange: 'transform, opacity' }}
      >
        <h1 className="text-[25vw] sm:text-[18vw] leading-none font-black tracking-tighter text-white uppercase drop-shadow-[0_0_50px_rgba(57,255,20,0.3)]">
          JN<span className="text-brand-neon">LABS</span>
        </h1>
        <p className="mt-4 text-sm sm:text-2xl md:text-3xl font-light tracking-[0.3em] sm:tracking-[0.6em] uppercase text-neutral-500 whitespace-nowrap">
          3D × WEB × AI
        </p>
      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-sm tracking-widest uppercase font-bold text-white">Scroll to enter the studio</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-neon to-transparent" />
      </div>

    </section>
  );
};

export default PortalHero;


import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PortalHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Pin and Scale animation - reduced scale on mobile for better performance
    const endScroll = isMobile ? '+=150%' : '+=250%';
    const scaleAmount = isMobile ? 15 : 30;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: endScroll, 
        pin: true,
        scrub: true,
        anticipatePin: 1,
      }
    });

    tl.to(textRef.current, {
      scale: scaleAmount,
      opacity: 0,
      rotation: 0.01,
      ease: 'none',
      force3D: true,
      z: 0.1,
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

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
        className="relative z-10 flex flex-col items-center justify-center pointer-events-none backface-hidden px-4"
        style={{ transformOrigin: '50% 50%', willChange: 'transform, opacity' }}
      >
        <h1 className="text-[20vw] sm:text-[18vw] md:text-[15vw] leading-none font-black tracking-tighter text-white uppercase drop-shadow-[0_0_50px_rgba(57,255,20,0.3)] text-center">
          JN<span className="text-brand-neon">LABS</span>
        </h1>
        <p className="mt-2 sm:mt-4 text-[3vw] sm:text-2xl md:text-3xl font-light tracking-[0.2em] sm:tracking-[0.6em] uppercase text-neutral-500 whitespace-nowrap">
          3D × WEB × AI
        </p>
      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-xs sm:text-sm tracking-widest uppercase font-bold text-white text-center px-4">Scroll to enter the studio</span>
        <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-brand-neon to-transparent" />
      </div>

    </section>
  );
};

export default PortalHero;


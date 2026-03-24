import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = () => {
  const containerRef = useRef(null);
  const laptopRef = useRef(null);
  const lidRef = useRef(null);
  const screenContentRef = useRef(null);
  const panelsRef = useRef([]);

  useEffect(() => {
    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // 4x scroll length
        pin: true,
        scrub: 1,
      }
    });

    // Phase 1: Open Lid (Lid rotates from closed to open)
    // Assuming closed means rotateX(-90deg) assuming hinge is at the bottom.
    tl.to(lidRef.current, {
      rotateX: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, 0);

    // Turn on screen content opacity
    tl.to(screenContentRef.current, {
      opacity: 1,
      duration: 0.2
    }, 0.8);

    // Phase 2: Zoom into the screen
    // We scale the whole laptop up significantly so the screen viewport fills the screen
    tl.to(laptopRef.current, {
      scale: 5,
      y: '120vh', // Move it down so the screen centers
      duration: 1.5,
      ease: 'power3.inOut'
    }, 1);

    // Phase 3: Blur background (screen) and show panels sequentially
    tl.to(screenContentRef.current, {
      filter: 'blur(5px) brightness(0.5)',
      duration: 0.5
    }, 2.5);

    // Stagger in panels
    panelsRef.current.forEach((panel, index) => {
      // Panel enters
      tl.fromTo(panel, 
        { autoAlpha: 0, x: index % 2 === 0 ? -100 : 100 }, 
        { autoAlpha: 1, x: 0, duration: 0.5 }, 
        2.5 + index * 0.8
      );
      // Panel leaves (except the last one which leaves on scale down)
      if (index < panelsRef.current.length - 1) {
        tl.to(panel, {
          autoAlpha: 0,
          x: index % 2 === 0 ? 100 : -100,
          duration: 0.5
        }, 3.0 + index * 0.8);
      }
    });

    // Phase 4: Scale down into a clickable card
    tl.to(laptopRef.current, {
      scale: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, '+=0.5');

    // Remove blur and panels for exit state
    tl.to(screenContentRef.current, {
      filter: 'blur(0px) brightness(1)',
      duration: 0.5
    }, '<');

    tl.to(panelsRef.current[panelsRef.current.length - 1], {
      autoAlpha: 0,
      duration: 0.5
    }, '<');

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center perspective-[2000px]">
      
      {/* 3D Laptop Assembly */}
      <div 
        ref={laptopRef} 
        className="relative w-[800px] h-[500px] transform-style-3d origin-center"
      >
        
        {/* Laptop Lid */}
        <div 
          ref={lidRef} 
          className="absolute bottom-0 left-0 w-full h-full origin-bottom transform-style-3d"
          style={{ transform: 'rotateX(-95deg)' }}
        >
          {/* Back of Lid (Aluminum cover) */}
          <div className="absolute inset-0 bg-neutral-800 rounded-t-3xl border border-neutral-700 backface-hidden flex items-center justify-center transform rotate-y-180 translate-z-[1px]">
            {/* Fake glowing apple/logo */}
            <div className="w-16 h-16 bg-white/20 blur-sm rounded-full" />
          </div>

          {/* Front of Lid (Screen bezel) */}
          <div className="absolute inset-0 bg-black rounded-t-3xl border border-neutral-800 flex flex-col items-center justify-center p-4 backface-hidden">
            
            {/* Web cam */}
            <div className="w-2 h-2 rounded-full bg-neutral-800 mb-2 border border-neutral-700" />
            
            {/* The Screen Output */}
            <div className="relative w-full flex-1 bg-neutral-900 rounded overflow-hidden">
              
              {/* Dummy Salon Website inside Screen */}
              <div ref={screenContentRef} className="absolute inset-0 opacity-0 bg-[url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                <div className="relative z-10 w-full h-full flex flex-col p-8 pointer-events-none">
                  <header className="flex justify-between items-center text-white border-b border-white/10 pb-4">
                    <h1 className="text-2xl font-serif">Lumiere Salon</h1>
                    <nav className="flex gap-4 text-sm font-light">
                      <span>Services</span><span>Barbers</span><span>Book</span>
                    </nav>
                  </header>
                  <div className="flex-1 flex items-center justify-center flex-col text-center">
                    <h2 className="text-4xl text-white font-light mb-4">Elevate Your Style</h2>
                    <button className="px-6 py-2 bg-white text-black text-sm uppercase">Reserve Spot</button>
                  </div>
                </div>
              </div>

              {/* Floating Panels Container (Rendered on top of the screen content) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 flex items-center justify-center perspective-[1000px]">
                
                {/* Panel A */}
                <div 
                  ref={el => panelsRef.current[0] = el}
                  className="absolute p-6 w-[60%] bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl"
                  style={{ visibility: 'hidden' }}
                >
                  <h3 className="text-3xl font-bold mb-2 text-brand-neon">Modernized the Booking Flow</h3>
                  <p className="text-neutral-300">Reduced friction by 40% with a seamless, AI-driven single-page booking application.</p>
                </div>

                {/* Panel B */}
                <div 
                  ref={el => panelsRef.current[1] = el}
                  className="absolute p-6 w-[60%] bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl"
                  style={{ visibility: 'hidden' }}
                >
                  <h3 className="text-3xl font-bold mb-2 text-brand-neon">Lightning Fast Load Times</h3>
                  <p className="text-neutral-300">Achieved a perfect 100 on Lighthouse. Next-gen image formats and aggressive caching mechanisms.</p>
                </div>

                {/* Panel C */}
                <div 
                  ref={el => panelsRef.current[2] = el}
                  className="absolute p-6 w-[60%] bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl"
                  style={{ visibility: 'hidden' }}
                >
                  <h3 className="text-3xl font-bold mb-2 text-brand-neon">AI-Optimized Assets</h3>
                  <p className="text-neutral-300">Utilized Stable Diffusion and programmatic pipelines to generate ultra-high-res hero components instantly.</p>
                </div>

              </div>

            </div>
            
            {/* Logo text at bottom bezel */}
            <div className="text-[8px] text-neutral-600 font-sans mt-2 tracking-widest">MACBOOK PRO</div>
          </div>
        </div>

        {/* Laptop Base (Keyboard area) */}
        <div 
          className="absolute top-full left-0 w-full h-[400px] origin-top transform-style-3d bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-b-3xl border border-neutral-700 flex justify-center p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{ transform: 'rotateX(80deg)' }}
        >
          {/* Keyboard Dummy */}
          <div className="w-[85%] h-[60%] bg-black/40 rounded-xl grid grid-cols-12 gap-1 p-2">
            {[...Array(60)].map((_, i) => (
              <div key={i} className="bg-black/80 rounded border border-white/5" />
            ))}
          </div>
          {/* Trackpad Dummy */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-32 bg-white/5 rounded-xl border border-white/10" />
        </div>

      </div>

      {/* Final Exit State Call to Action (Hidden during animation, could be revealed at end) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 opacity-0 pointer-events-none transition-opacity duration-1000 group-hover:opacity-100">
         {/* This is a placeholder for the "Visit Live Site" button logic */}
      </div>

    </section>
  );
};

export default CaseStudy;

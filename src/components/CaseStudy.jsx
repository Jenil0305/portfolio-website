import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = () => {
  const containerRef = useRef(null);
  const laptopRef = useRef(null);
  const lidRef = useRef(null);
  const screenContentRef = useRef(null);
  const panelsRef = useRef([]);
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
    let ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: Simple fade-in animation without complex 3D transforms
        gsap.fromTo(laptopRef.current,
          { autoAlpha: 0, scale: 0.8 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
            }
          }
        );

        // Show screen content immediately
        gsap.set(screenContentRef.current, { opacity: 1 });

        // Stagger in panels with simple animation
        panelsRef.current.forEach((panel) => {
          gsap.fromTo(panel,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
              }
            }
          );
        });
      } else {
        // Desktop: Full 3D animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            pin: true,
            scrub: 1,
          }
        });

        // Phase 1: Open Lid
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
        tl.to(laptopRef.current, {
          scale: 5,
          y: '120vh',
          duration: 1.5,
          ease: 'power3.inOut'
        }, 1);

        // Phase 3: Blur background and show panels
        tl.to(screenContentRef.current, {
          filter: 'blur(5px) brightness(0.5)',
          duration: 0.5
        }, 2.5);

        // Stagger in panels
        panelsRef.current.forEach((panel, index) => {
          tl.fromTo(panel,
            { autoAlpha: 0, x: index % 2 === 0 ? -100 : 100 },
            { autoAlpha: 1, x: 0, duration: 0.5 },
            2.5 + index * 0.8
          );
          if (index < panelsRef.current.length - 1) {
            tl.to(panel, {
              autoAlpha: 0,
              x: index % 2 === 0 ? 100 : -100,
              duration: 0.5
            }, 3.0 + index * 0.8);
          }
        });

        // Phase 4: Scale down
        tl.to(laptopRef.current, {
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power2.inOut'
        }, '+=0.5');

        tl.to(screenContentRef.current, {
          filter: 'blur(0px) brightness(1)',
          duration: 0.5
        }, '<');

        tl.to(panelsRef.current[panelsRef.current.length - 1], {
          autoAlpha: 0,
          duration: 0.5
        }, '<');
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile Layout - Simplified card-based view
  if (isMobile) {
    return (
      <section ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden py-16 px-4">
        <h2 className="text-3xl font-black text-center mb-8 tracking-tighter uppercase text-white">
          Featured Work
        </h2>
        
        {/* Mobile Laptop Card */}
        <div ref={laptopRef} className="relative w-full max-w-md mx-auto bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
          {/* Screen Content */}
          <div 
            ref={screenContentRef}
            className="relative w-full aspect-video bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2000&auto=format&fit=crop')` 
            }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative z-10 w-full h-full flex flex-col p-4 justify-center items-center text-center">
              <h1 className="text-xl font-serif text-white mb-2">Lumiere Salon</h1>
              <p className="text-sm text-white/80 mb-3">Where Luxury Meets the Booking Button</p>
              <button className="px-4 py-2 bg-white text-black text-xs uppercase rounded-lg font-bold">Reserve Spot</button>
            </div>
          </div>
        </div>

        {/* Achievement Panels - Stacked vertically on mobile */}
        <div className="mt-8 space-y-4 max-w-md mx-auto">
          <div 
            ref={el => panelsRef.current[0] = el}
            className="p-5 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl text-white"
          >
            <h3 className="text-lg font-bold mb-2 text-brand-neon">Modernized the Booking Flow</h3>
            <p className="text-sm text-neutral-300">Replaced a clunky multi-step form with a single-page, AI-guided booking experience — cutting drop-offs by 40%.</p>
          </div>

          <div 
            ref={el => panelsRef.current[1] = el}
            className="p-5 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl text-white"
          >
            <h3 className="text-lg font-bold mb-2 text-brand-neon">Lightning Fast Load Times</h3>
            <p className="text-sm text-neutral-300">A perfect 100 Lighthouse score. Next-gen image formats, edge caching, and zero render-blocking scripts.</p>
          </div>
        </div>
      </section>
    );
  }

  // Desktop Layout - Full 3D animation
  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center perspective-[2000px]">
      
      {/* Responsive Wrapper for 3D elements acting as Base Scale */}
      <div className="w-full h-full flex items-center justify-center transform scale-[0.45] sm:scale-75 md:scale-90 lg:scale-100">
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
                      <h2 className="text-4xl text-white font-light mb-4 text-shadow-md">Where Luxury Meets the Booking Button</h2>
                      <button className="px-6 py-2 bg-white text-black text-sm uppercase">Reserve Spot</button>
                    </div>
                  </div>
                </div>

                {/* Floating Panels Container */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-20 flex items-center justify-center perspective-[1000px]">
                  
                  {/* Panel A */}
                  <div 
                    ref={el => panelsRef.current[0] = el}
                    className="absolute p-6 w-[70%] sm:w-[60%] bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl"
                    style={{ visibility: 'hidden' }}
                  >
                    <h3 className="text-xl sm:text-3xl font-bold mb-2 text-brand-neon">Modernized the Booking Flow</h3>
                    <p className="text-sm sm:text-base text-neutral-300">Replaced a clunky multi-step form with a single-page, AI-guided booking experience — cutting drop-offs by 40% and turning browsers into booked clients.</p>
                  </div>

                  {/* Panel B */}
                  <div 
                    ref={el => panelsRef.current[1] = el}
                    className="absolute p-6 w-[70%] sm:w-[60%] bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl text-white shadow-2xl"
                    style={{ visibility: 'hidden' }}
                  >
                    <h3 className="text-xl sm:text-3xl font-bold mb-2 text-brand-neon">Lightning Fast Load Times</h3>
                    <p className="text-sm sm:text-base text-neutral-300">A perfect 100 Lighthouse score. Next-gen image formats, edge caching, and zero render-blocking scripts — because slow sites lose customers before the first scroll.</p>
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
      </div>

    </section>
  );
};

export default CaseStudy;

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Braces, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProcessTimeline = () => {
  const containerRef = useRef(null);
  const lineFillRef = useRef(null);
  const dotRef = useRef(null);
  const nodesRef = useRef([]);

  const steps = [
    { title: '01. Discovery & Strategy', icon: Search, side: 'left' },
    { title: '02. AI-Assisted Wireframing', icon: PenTool, side: 'right' },
    { title: '03. Immersive Frontend Development', icon: Braces, side: 'left' },
    { title: '04. Deployment & Handoff', icon: Rocket, side: 'right' },
  ];

  useEffect(() => {
    // Animate the line fill and dot
    gsap.to(lineFillRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    gsap.to(dotRef.current, {
      top: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    // Animate nodes fading in
    nodesRef.current.forEach((node, i) => {
      const isLeft = steps[i].side === 'left';
      gsap.fromTo(node,
        { autoAlpha: 0, x: isLeft ? -50 : 50, filter: 'blur(10px)' },
        {
          autoAlpha: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 60%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-neutral-950 overflow-hidden text-white flex flex-col items-center">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-neon/20 via-black to-black" />

      <h2 className="text-6xl font-black mb-32 z-10 text-center tracking-tighter uppercase relative">
        The Process
      </h2>

      {/* The Central Line Container */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col gap-64 pb-32">
        
        {/* The underlying dark line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
        
        {/* The active glowing line fill */}
        <div 
          ref={lineFillRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-brand-neon origin-top drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]"
          style={{ transform: 'scaleY(0)' }}
        />

        {/* The Neon Dot */}
        <div 
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-6 bg-brand-neon rounded-full -mt-3 shadow-[0_0_20px_rgba(57,255,20,1),0_0_60px_rgba(57,255,20,0.5)] z-20"
        />

        {/* The Nodes */}
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLeft = step.side === 'left';

          return (
            <div 
              key={index} 
              ref={el => nodesRef.current[index] = el}
              className={`relative w-full flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`w-1/2 ${isLeft ? 'pr-20 text-right' : 'pl-20 text-left'}`}>
                <div className={`flex items-center gap-6 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <Icon className="text-brand-neon" size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-light tracking-wide">{step.title}</h3>
                    <p className="text-neutral-500 mt-2 max-w-sm ml-auto mr-0 font-light text-lg">
                      {isLeft 
                        ? (index === 0 ? "We start by understanding your business, your customers, and the gap between them. Goals, constraints, and competitors are mapped before a single line of code is written." : "This is where it gets visual. 3D scenes, WebGL shaders, GSAP animations, and glassmorphic UI come together into a site that stops thumbs and starts conversions.")
                        : (index === 1 ? "JNlabs uses intelligent design systems to blueprint the site architecture — layouts, flows, and component hierarchies that are scalable before the first pixel is placed." : "Deployed to production pipelines with zero downtime. Clean documentation, optimized assets, and a site that's ready to perform from day one — no cleanup required.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
      </div>
    </section>
  );
};

export default ProcessTimeline;

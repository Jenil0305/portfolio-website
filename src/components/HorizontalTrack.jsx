import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Sparkles, BrainCircuit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HorizontalTrack = () => {
  const SectionRef = useRef(null);
  const TrackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal scroll effect for all devices
      const trackWidth = TrackRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollDistance = trackWidth - windowWidth;
      // On mobile, increase scroll distance so it takes more effort to scroll through
      const scrollMultiplier = windowWidth < 768 ? 1.8 : 1;
      const totalScrollDistance = scrollDistance * scrollMultiplier;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: SectionRef.current,
          start: 'top top',
          end: () => `+=${totalScrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onLeave: () => {
            // Hide the section after pin releases to prevent ghost panel
            gsap.set(SectionRef.current, { autoAlpha: 0 });
          },
          onEnterBack: () => {
            // Show it again when scrolling back up
            gsap.set(SectionRef.current, { autoAlpha: 1 });
          },
        }
      });

      tl.to(TrackRef.current, {
        x: () => -scrollDistance,
        ease: 'none',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={SectionRef} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      
      {/* Absolute Title Pinned basically */}
      <h2 className="absolute top-6 sm:top-12 left-6 sm:left-12 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/50 z-10 
                     mix-blend-overlay uppercase pointer-events-none">
        The Stack
      </h2>

      <div 
        ref={TrackRef} 
        className="flex h-full w-[300vw] items-center"
      >
        
        {/* Stop 1: The Aesthetic */}
        <div className="stack-item w-[100vw] h-full flex flex-col justify-center items-center p-6 sm:p-10 md:p-20 shrink-0">
          <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex-1 space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-brand-neon">
                <Sparkles size={28} className="lg:w-10 lg:h-10 shrink-0" />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-widest">The Aesthetic</h3>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed">
                Interfaces so precise they feel inevitable. JNlabs crafts every pixel with purpose — glassmorphic layers, fluid motion, and hyper-responsive layouts built in Tailwind and vanilla CSS. Design isn't decoration. It's conversion architecture.
              </p>
            </div>
            <div className="w-full lg:flex-1 h-56 sm:h-72 lg:h-96 relative flex items-center justify-center mt-6 lg:mt-0 transform scale-[0.6] sm:scale-75 lg:scale-100 origin-center pointer-events-none lg:pointer-events-auto">
              <div className="relative w-full max-w-[500px] h-[350px] lg:h-full">
                {/* Frosted glass dummy UI elements */}
                <div className="absolute top-0 lg:top-10 left-0 lg:left-10 w-64 h-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl skew-y-3 hover:skew-y-0 transition-transform duration-500" />
                <div className="absolute top-28 lg:top-40 right-0 lg:right-10 w-48 h-48 bg-white/5 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_0_50px_rgba(57,255,20,0.1)] -skew-x-6 z-10" />
                <div className="absolute bottom-4 lg:bottom-10 left-10 lg:left-20 w-80 h-24 bg-gradient-to-r from-brand-neon/20 to-transparent backdrop-blur border border-brand-neon/30 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Stop 2: The Engine */}
        <div className="stack-item w-[100vw] h-full flex flex-col justify-center items-center p-6 sm:p-10 md:p-20 shrink-0 bg-[#111]">
          <div className="w-full max-w-4xl flex flex-col lg:flex-row-reverse items-center gap-6 lg:gap-12">
            <div className="flex-1 space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 text-white">
                <Code2 size={28} className="lg:w-10 lg:h-10 text-blue-500 shrink-0" />
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light uppercase tracking-widest">The Engine</h3>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-neutral-400 font-light leading-relaxed">
                React, Next.js, Vite, and Three.js form the backbone of every JNlabs build. Type-safe, component-driven, and optimized for brutal performance — each site is engineered to load fast, scale clean, and never break under pressure.
              </p>
            </div>
            <div className="flex w-full lg:flex-1 min-h-64 lg:h-96 relative items-center justify-center mt-8 lg:mt-0">
              {/* Fake Code Block */}
              <div className="w-[90%] sm:w-[85%] lg:w-full h-auto lg:h-full bg-[#1e1e1e] rounded-xl border border-[#333] p-4 lg:p-6 shadow-2xl flex flex-col font-mono text-[10px] sm:text-xs lg:text-sm">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-green-400 mb-2">// hyper-optimized.tsx</div>
                <div className="text-purple-400 mb-1">export const <span className="text-yellow-200">Engine</span> = () =&gt; {'{'}</div>
                <div className="text-blue-300 ml-4 mb-1">const state = <span className="text-yellow-200">usePerformantStore</span>();</div>
                <div className="text-gray-400 ml-4 mb-1">return (</div>
                <div className="text-blue-400 ml-8">&lt;<span className="text-teal-300">Architecture</span> mode="godlike" /&gt;</div>
                <div className="text-gray-400 ml-4 mb-1">);</div>
                <div className="text-purple-400">{'}'};</div>
                <div className="mt-auto self-end text-neutral-600 animate-pulse">Running securely...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stop 3: The AI Edge */}
        <div className="stack-item w-[100vw] h-full flex flex-col justify-center items-center p-6 sm:p-10 md:p-20 shrink-0 bg-black">
          <div className="w-full max-w-5xl flex items-center justify-center flex-col text-center space-y-4 lg:space-y-10">
            <BrainCircuit size={48} className="text-brand-neon animate-pulse sm:block hidden" />
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-blue-500">
              The AI Edge
            </h3>
            <p className="text-base sm:text-lg md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed">
              AI isn't a buzzword here — it's in the pipeline. JNlabs uses generative models, automated asset creation, and intelligent code acceleration to ship in days what used to take weeks. The result: premium output, without the premium timeline.
            </p>
            
            {/* Glowing nodes fake setup */}
            <div className="flex relative w-full h-24 lg:h-32 justify-between items-center mt-6 lg:mt-12 transform scale-75 lg:scale-100 origin-center max-w-[100vw] lg:max-w-lg px-2 lg:px-0">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-brand-neon flex items-center justify-center animate-ping">
                <div className="w-4 h-4 bg-brand-neon rounded-full" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-neon to-brand-neon/10" />
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                <div className="text-xs tracking-widest text-brand-neon uppercase font-mono">Agent</div>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-neon/10 to-blue-500" />
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <div className="w-4 h-4 bg-blue-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalTrack;

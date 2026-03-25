import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MorphFooter = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Parallax effect on the content
    gsap.fromTo(contentRef.current,
      { y: -150 },
      {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full min-h-screen bg-[#050505] text-white flex items-center justify-center overflow-hidden py-24 md:py-32 border-t border-white/5">
      
      {/* Subtle Neon Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-neon/5 rounded-full blur-[120px] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
        
        {/* Massive Mail Link */}
        <div className="flex-1 text-center md:text-left mt-10 md:mt-0">
          <h2 className="text-[20vw] md:text-[8vw] font-black leading-none tracking-tighter uppercase text-white hover:text-brand-neon transition-colors duration-500 cursor-pointer">
            Let's <br className="hidden md:block"/>Build.
          </h2>
          <p className="mt-6 md:mt-8 text-lg sm:text-2xl font-light text-neutral-400">You've got a vision. JNlabs has the tools, the team, and the AI pipeline to make it real — fast.</p>
        </div>

        {/* Minimal Parallax Form in Dark Mode */}
        <div className="flex-1 w-full max-w-md">
          <form className="flex flex-col gap-6 md:gap-8 w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-brand-neon focus-within:text-white transition-colors">Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-black/40 border-b border-white/20 rounded-t-lg py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-neon focus:bg-white/5 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-brand-neon focus-within:text-white transition-colors">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-black/40 border-b border-white/20 rounded-t-lg py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-neon focus:bg-white/5 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase text-brand-neon focus-within:text-white transition-colors">Inquiry</label>
              <textarea 
                placeholder="Tell me about your vision..." 
                rows="4"
                className="w-full bg-black/40 border-b border-white/20 rounded-t-lg py-3 px-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-neon focus:bg-white/5 transition-all resize-none"
              />
            </div>
            <button type="submit" className="mt-4 w-full py-4 bg-brand-neon text-black hover:bg-white hover:scale-[1.02] transition-all font-bold tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Ignite Project
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default MorphFooter;

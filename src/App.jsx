import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PortalHero from './components/PortalHero';
import HorizontalTrack from './components/HorizontalTrack';
import CaseStudy from './components/CaseStudy';
import ProcessTimeline from './components/ProcessTimeline';
import MorphFooter from './components/MorphFooter';
import SocialsSection from './components/SocialsSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // gsap.ticker.lagSmoothing(0); // Disabled to allow GSAP to handle frame spikes more gracefully

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-brand-neon selection:text-black">
      <PortalHero />
      <HorizontalTrack />
      <CaseStudy />
      <ProcessTimeline />
      <SocialsSection />
      <MorphFooter />
    </div>
  );
}

export default App;

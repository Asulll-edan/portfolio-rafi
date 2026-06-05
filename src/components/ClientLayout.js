'use client';

import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import GlobalParticles from '@/components/GlobalParticles';

export default function ClientLayout({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let lenis;
    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };
    initLenis();
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return (
    <>
      <LoadingScreen onFinish={() => setLoaded(true)} />
      {loaded && (
        <div style={{ position: 'relative' }}>
          <GlobalParticles />
          {children}
        </div>
      )}
    </>
  );
}
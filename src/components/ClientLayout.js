'use client';

import { useEffect } from 'react';

export default function ClientLayout({ children }) {
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
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </>
  );
}
// PATH: src/app/layout.js

'use client';

import './globals.css';
import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout({ children }) {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Init Lenis smooth scroll
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

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Custom cursor — only on pointer: fine (desktop)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    dot.style.opacity = '1';
    ring.style.opacity = '1';

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12);
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    const onEnterLink = () => {
      dot.style.transform += ' scale(2)';
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'var(--accent-cyan)';
    };

    const onLeaveLink = () => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'var(--accent-gold)';
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loaded]);

  return (
    <html lang="id">
      <head>
        <title>Muhammad Sultan Rafi — Portfolio</title>
        <meta name="description" content="Portfolio Muhammad Sultan Rafi — Frontend Developer, UI Designer, Creative Coder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Custom Cursor */}
        <div
          ref={cursorDotRef}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '8px', height: '8px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-gold)',
            pointerEvents: 'none',
            zIndex: 99999,
            opacity: 0,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
        <div
          ref={cursorRingRef}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '40px', height: '40px',
            borderRadius: '50%',
            border: '1.5px solid var(--accent-gold)',
            pointerEvents: 'none',
            zIndex: 99998,
            opacity: 0,
            transition: 'width 0.2s, height 0.2s, border-color 0.2s',
            willChange: 'transform',
          }}
        />

        <LoadingScreen onFinish={() => setLoaded(true)} />
        {loaded && children}
      </body>
    </html>
  );
}
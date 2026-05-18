// PATH: src/components/LoadingScreen.js

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;

    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const timer = setInterval(() => {
      current++;
      const t = current / steps;
      setProgress(Math.round(ease(t) * 100));

      if (current >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onFinish, 700);
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000B18',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            overflow: 'hidden',
          }}
        >
          {/* Scanline effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,195,0,0.015) 2px, rgba(255,195,0,0.015) 4px)',
            pointerEvents: 'none',
          }} />

          {/* Corner decorations */}
          {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
            <div key={pos} style={{
              position: 'absolute',
              width: '40px', height: '40px',
              ...(pos.includes('top') ? { top: '24px' } : { bottom: '24px' }),
              ...(pos.includes('left') ? { left: '24px' } : { right: '24px' }),
              borderTop: pos.includes('top') ? '2px solid rgba(255,195,0,0.4)' : 'none',
              borderBottom: pos.includes('bottom') ? '2px solid rgba(255,195,0,0.4)' : 'none',
              borderLeft: pos.includes('left') ? '2px solid rgba(255,195,0,0.4)' : 'none',
              borderRight: pos.includes('right') ? '2px solid rgba(255,195,0,0.4)' : 'none',
            }} />
          ))}

          {/* MSR Logo with glitch */}
          <div style={{ position: 'relative', marginBottom: '48px' }}>
            {/* Glitch layers */}
            <div style={{
              position: 'absolute',
              inset: 0,
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(72px, 16vw, 120px)',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: 'var(--accent-cyan)',
              animation: 'glitch-clip1 3s infinite',
              userSelect: 'none',
            }}>MSR</div>
            <div style={{
              position: 'absolute',
              inset: 0,
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(72px, 16vw, 120px)',
              fontWeight: 800,
              letterSpacing: '0.15em',
              color: 'var(--accent-gold)',
              animation: 'glitch-clip2 3s infinite',
              userSelect: 'none',
            }}>MSR</div>

            {/* Main text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(72px, 16vw, 120px)',
                fontWeight: 800,
                letterSpacing: '0.15em',
                color: '#F0F4F8',
                textShadow: '0 0 30px rgba(255,195,0,0.5), 0 0 60px rgba(255,195,0,0.2)',
                animation: 'glitch 4s infinite',
                userSelect: 'none',
              }}
            >
              MSR
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(10px, 2vw, 13px)',
              color: '#8BA3C7',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '48px',
            }}
          >
            Initializing Portfolio...
          </motion.p>

          {/* Progress bar */}
          <div style={{ width: 'min(300px, 70vw)', position: 'relative' }}>
            <div style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #FFC300, #219EBC)',
                  boxShadow: '0 0 10px rgba(255,195,0,0.6)',
                  borderRadius: '2px',
                  width: `${progress}%`,
                }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Progress number */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '12px',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'rgba(255,195,0,0.6)',
                letterSpacing: '0.1em',
              }}>
                LOADING
              </span>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--accent-gold)',
                fontWeight: 500,
              }}>
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
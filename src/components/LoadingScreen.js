// PATH: src/components/LoadingScreen.js

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Inline SVG doodle stars / sparkles */
const DoodleStar = ({ x, y, size = 20, color = '#FFC300', rotate = 0, delay = 0 }) => (
  <motion.svg
    initial={{ opacity: 0, scale: 0, rotate: rotate - 30 }}
    animate={{ opacity: 1, scale: 1, rotate }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
    style={{ position: 'absolute', left: x, top: y, width: size, height: size }}
    viewBox="0 0 24 24" fill="none"
  >
    <path
      d="M12 2 L13.5 9 L20 8 L15 13 L18 20 L12 16 L6 20 L9 13 L4 8 L10.5 9 Z"
      stroke={color} strokeWidth="1.8" strokeLinejoin="round"
      fill={color + '22'}
    />
  </motion.svg>
);

const DoodleCircle = ({ x, y, r, color, delay = 0 }) => (
  <motion.svg
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ delay, duration: 1.2, ease: 'easeInOut' }}
    style={{ position: 'absolute', left: x - r, top: y - r, width: r * 2, height: r * 2 }}
    viewBox={`0 0 ${r * 2} ${r * 2}`} fill="none"
  >
    <motion.circle
      cx={r} cy={r} r={r - 3}
      stroke={color} strokeWidth="2" strokeDasharray="6 4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay, duration: 1.2 }}
    />
  </motion.svg>
);

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [letters, setLetters] = useState([false, false, false]);

  useEffect(() => {
    // Animate letters one by one
    setTimeout(() => setLetters([true, false, false]), 200);
    setTimeout(() => setLetters([true, true, false]), 500);
    setTimeout(() => setLetters([true, true, true]), 800);

    const duration = 2400;
    const interval = 20;
    const steps = duration / interval;
    let current = 0;
    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const timer = setInterval(() => {
      current++;
      setProgress(Math.round(ease(current / steps) * 100));
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
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'fixed', inset: 0,
            backgroundColor: '#000B18',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 99999, overflow: 'hidden',
          }}
        >
          {/* SVG filter for sketchy effect */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <filter id="sketchy-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* Doodle background decorations */}
          <DoodleStar x="8%" y="10%" size={28} color="#FFC300" rotate={15} delay={0.3} />
          <DoodleStar x="88%" y="8%" size={22} color="#219EBC" rotate={-20} delay={0.5} />
          <DoodleStar x="5%" y="75%" size={18} color="#219EBC" rotate={30} delay={0.7} />
          <DoodleStar x="90%" y="80%" size={24} color="#FFC300" rotate={-10} delay={0.4} />
          <DoodleCircle x={80} y={80} r={40} color="rgba(255,195,0,0.2)" delay={0.2} />
          <DoodleCircle x={300} y={500} r={55} color="rgba(33,158,188,0.2)" delay={0.4} />
          {/* Squiggly lines */}
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            style={{ position: 'absolute', top: '15%', left: '5%', width: '160px', height: '40px' }}
            viewBox="0 0 160 40" fill="none"
          >
            <motion.path
              d="M0 20 Q20 5 40 20 Q60 35 80 20 Q100 5 120 20 Q140 35 160 20"
              stroke="rgba(255,195,0,0.25)" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 1.5 }}
            />
          </motion.svg>
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            style={{ position: 'absolute', bottom: '15%', right: '5%', width: '160px', height: '40px' }}
            viewBox="0 0 160 40" fill="none"
          >
            <motion.path
              d="M0 20 Q20 35 40 20 Q60 5 80 20 Q100 35 120 20 Q140 5 160 20"
              stroke="rgba(33,158,188,0.25)" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            />
          </motion.svg>

          {/* Rough border frame */}
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: '24px', width: 'calc(100% - 48px)', height: 'calc(100% - 48px)' }}
            viewBox="0 0 100 100" preserveAspectRatio="none" fill="none"
          >
            <motion.rect
              x="1" y="1" width="98" height="98"
              stroke="#FFC300" strokeWidth="0.5"
              strokeDasharray="4 3" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </motion.svg>

          {/* Corner doodle brackets */}
          {[
            { t: 16, l: 16, transform: 'none' },
            { t: 16, r: 16, transform: 'scaleX(-1)' },
            { b: 16, l: 16, transform: 'scaleY(-1)' },
            { b: 16, r: 16, transform: 'scale(-1)' },
          ].map((pos, i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              style={{
                position: 'absolute',
                top: pos.t, bottom: pos.b, left: pos.l, right: pos.r,
                width: 32, height: 32,
                transform: pos.transform,
              }}
              viewBox="0 0 32 32" fill="none"
            >
              <path d="M2 16 L2 2 L16 2" stroke="#FFC300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          ))}

          {/* MSR Logo — hand-drawn letter style */}
          <div style={{ position: 'relative', marginBottom: '16px', display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
            {['M', 'S', 'R'].map((letter, i) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, y: 30, rotate: -8 }}
                animate={letters[i] ? { opacity: 1, y: 0, rotate: i === 1 ? -2 : i === 0 ? 1 : 2 } : {}}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  fontSize: 'clamp(60px, 14vw, 110px)',
                  fontWeight: 400,
                  color: i === 0 ? '#FFC300' : i === 1 ? '#F0F4F8' : '#219EBC',
                  lineHeight: 1,
                  display: 'inline-block',
                  textShadow: i === 0
                    ? '3px 3px 0 rgba(255,195,0,0.2), -1px -1px 0 rgba(255,195,0,0.1)'
                    : i === 2
                      ? '3px 3px 0 rgba(33,158,188,0.2)'
                      : '2px 2px 0 rgba(240,244,248,0.1)',
                  letterSpacing: '-0.02em',
                }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Underline scribble */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ position: 'absolute', bottom: '-8px', left: 0, right: 0, width: '100%', height: '12px' }}
              viewBox="0 0 200 12" preserveAspectRatio="none" fill="none"
            >
              <motion.path
                d="M0 8 Q50 3 100 8 Q150 13 200 8"
                stroke="#FFC300" strokeWidth="3" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.svg>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            style={{
              fontFamily: "'Kalam', cursive",
              fontSize: 'clamp(12px, 2.5vw, 16px)',
              color: 'rgba(139,163,199,0.8)',
              letterSpacing: '0.15em',
              marginBottom: '56px',
              textAlign: 'center',
            }}
          >
            ✏️ sketching the portfolio...
          </motion.p>

          {/* Progress bar — doodle style */}
          <div style={{ width: 'min(320px, 72vw)', position: 'relative' }}>
            {/* Track */}
            <div style={{
              width: '100%', height: '10px',
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,195,0,0.25)',
              borderRadius: '30px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Fill */}
              <motion.div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #FFC300, #219EBC)',
                  borderRadius: '30px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Shimmer */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(60deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 12px)',
                  animation: 'spin-slow 2s linear infinite',
                }} />
              </motion.div>
            </div>

            {/* Pencil tip icon at end of bar */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-8px',
                left: `calc(${progress}% - 10px)`,
                fontSize: '18px',
                transition: 'left 0.1s',
                filter: 'drop-shadow(0 0 4px rgba(255,195,0,0.5))',
              }}
            >✏️</motion.div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '18px',
            }}>
              <span style={{
                fontFamily: "'Kalam', cursive",
                fontSize: '13px',
                color: 'rgba(255,195,0,0.5)',
              }}>drawing...</span>
              <span style={{
                fontFamily: "'Permanent Marker', cursive",
                fontSize: '16px',
                color: '#FFC300',
              }}>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
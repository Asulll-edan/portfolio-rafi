'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const YogyaLogo = () => (
  <img
    src="assets/images/Yogya_Group.png"
    alt="Yogya Group"
    width={180}
    height={180}
    style={{ objectFit: 'contain', mixBlendMode: 'screen', display: 'block' }}
  />
);

const internData = [
  {
    id: 1,
    status: 'done',
    company: 'PT Akur Pratama',
    brand: 'Yogya Group',
    role: 'IT Intern',
    period: 'April 2026 – September 2026',
    duration: '6 bulan · Bandung',
    tags: ['IT Division', 'Procurement Tech'],
    logo: YogyaLogo,
  },
  { id: 2, status: 'soon' },
  { id: 3, status: 'soon' },
];

function DoneCard({ intern, index, isInView }) {
  const [hovered, setHovered] = useState(false);
  const Logo = intern.logo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '260px',
        cursor: 'default',
      }}
    >
      {/* Logo — greyscale + dim on hover, stays visible */}
      <motion.div
        animate={{
          opacity: hovered ? 0.25 : 1,
          filter: hovered ? 'grayscale(1) blur(1px)' : 'grayscale(0) blur(0px)',
          scale: hovered ? 0.95 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Logo />
      </motion.div>

      {/* Hover info — overlaid centered on top of logo */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '5px',
              pointerEvents: 'none',
              padding: '0 12px',
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03, duration: 0.22, ease: 'easeOut' }}
              style={{ fontSize: '15px', fontWeight: 600, color: '#F0F4F8', lineHeight: 1.3 }}
            >
              {intern.company}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07, duration: 0.22, ease: 'easeOut' }}
              style={{ fontSize: '13px', color: 'rgba(240,244,248,0.7)' }}
            >
              {intern.role}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.11, duration: 0.22, ease: 'easeOut' }}
              style={{ fontSize: '12px', color: 'rgba(240,244,248,0.5)', fontFamily: 'monospace', letterSpacing: '0.04em' }}
            >
              {intern.period}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.22, ease: 'easeOut' }}
              style={{ fontSize: '11px', color: 'rgba(240,244,248,0.4)', fontFamily: 'monospace' }}
            >
              {intern.duration}
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.22, ease: 'easeOut' }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', marginTop: '6px' }}
            >
              {intern.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.18, ease: 'easeOut' }}
                  style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(240,244,248,0.55)',
                    fontFamily: 'monospace',
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SoonCard({ index, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 0.35, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        minHeight: '260px',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '1px dashed rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
      <span style={{
        fontSize: '10px',
        color: 'rgba(240,244,248,0.4)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
      }}>
        Next PKL
      </span>
      <span style={{ fontSize: '13px', color: 'rgba(240,244,248,0.4)', fontWeight: 500 }}>
        Coming soon
      </span>
    </motion.div>
  );
}

export default function InternHistory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="intern-history"
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-main)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          style={{ marginBottom: '56px' }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#219EBC',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>
            03 / Experience
          </span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5vw, 54px)',
            fontWeight: 800,
            color: '#F0F4F8',
            margin: '8px 0 0',
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}>
            Intern{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFC300 20%, #219EBC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              History
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '32px',
          alignItems: 'center',
        }}>
          {internData.map((intern, i) =>
            intern.status === 'done' ? (
              <DoneCard key={intern.id} intern={intern} index={i} isInView={isInView} />
            ) : (
              <SoonCard key={intern.id} index={i} isInView={isInView} />
            )
          )}
        </div>

      </div>
    </section>
  );
}
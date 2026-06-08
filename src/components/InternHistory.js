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
      initial={{ opacity: 0, y: 32, rotate: Math.random() * 2 - 1 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ rotate: -1, scale: 1.02 }}
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
        background: hovered ? 'rgba(0,53,102,0.45)' : 'rgba(0,29,61,0.5)',
        border: `2px solid ${hovered ? 'rgba(255,195,0,0.45)' : 'rgba(255,195,0,0.12)'}`,
        borderRadius: '8px',
        padding: '28px 20px',
        boxShadow: hovered ? '4px 4px 0 rgba(255,195,0,0.18)' : '2px 2px 0 rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Corner tick marks saat hover */}
      {hovered && (
        <>
          <svg style={{ position: 'absolute', top: 6, left: 6, width: 12, height: 12 }} viewBox="0 0 10 10" fill="none">
            <path d="M1 5 L1 1 L5 1" stroke="#FFC300" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
          <svg style={{ position: 'absolute', bottom: 6, right: 6, width: 12, height: 12 }} viewBox="0 0 10 10" fill="none">
            <path d="M9 5 L9 9 L5 9" stroke="#FFC300" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </>
      )}

      {/* Logo */}
      <motion.div
        animate={{
          opacity: hovered ? 0.18 : 1,
          filter: hovered ? 'grayscale(1) blur(1px)' : 'grayscale(0) blur(0px)',
          scale: hovered ? 0.95 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Logo />
      </motion.div>

      {/* Hover info */}
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
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '5px',
              pointerEvents: 'none',
              padding: '0 16px',
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.03, duration: 0.22 }}
              style={{
                fontFamily: "'Permanent Marker', Arial, sans-serif",
                fontSize: '16px',
                color: '#F0F4F8',
                lineHeight: 1.3,
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
              }}
            >
              {intern.company}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.07, duration: 0.22 }}
              style={{
                fontFamily: "'Patrick Hand', Arial, sans-serif",
                fontSize: '14px',
                color: '#FFC300',
                fontWeight: 700,
              }}
            >
              {intern.role}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.11, duration: 0.22 }}
              style={{
                fontFamily: "'Kalam', Arial, sans-serif",
                fontSize: '12px',
                color: 'rgba(240,244,248,0.55)',
                letterSpacing: '0.04em',
              }}
            >
              {intern.period}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.22 }}
              style={{
                fontFamily: "'Kalam', Arial, sans-serif",
                fontSize: '11px',
                color: 'rgba(240,244,248,0.4)',
              }}
            >
              {intern.duration}
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.22 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center', marginTop: '8px' }}
            >
              {intern.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.18 }}
                  style={{
                    fontFamily: "'Kalam', Arial, sans-serif",
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    border: '1.5px dashed rgba(255,195,0,0.3)',
                    color: 'rgba(240,244,248,0.6)',
                    background: 'rgba(255,195,0,0.04)',
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
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        minHeight: '260px',
        background: 'rgba(0,29,61,0.3)',
        border: '2px dashed rgba(255,195,0,0.15)',
        borderRadius: '8px',
        padding: '28px 20px',
        opacity: 0.5,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          border: '2px dashed rgba(255,195,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="rgba(255,195,0,0.5)" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="rgba(255,195,0,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      <span style={{
        fontFamily: "'Kalam', Arial, sans-serif",
        fontSize: '10px',
        color: 'rgba(240,244,248,0.4)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>
        Next PKL
      </span>

      <span style={{
        fontFamily: "'Patrick Hand', Arial, sans-serif",
        fontSize: '14px',
        color: 'rgba(240,244,248,0.4)',
      }}>
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
      {/* Big watermark */}
      <div style={{
        position: 'absolute', top: '5%', right: '3%',
        fontFamily: "'Permanent Marker', Arial, sans-serif",
        fontSize: 'clamp(100px, 18vw, 180px)',
        color: 'rgba(255,195,0,0.04)',
        userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
      }}>04</div>

      {/* Doodle scattered stars */}
      {[
        { x: '88%', y: '15%', size: 20, color: 'rgba(255,195,0,0.2)', rot: 15 },
        { x: '4%',  y: '20%', size: 16, color: 'rgba(33,158,188,0.2)', rot: -20 },
        { x: '92%', y: '70%', size: 18, color: 'rgba(255,195,0,0.15)', rot: 30 },
      ].map((s, i) => (
        <svg key={i} style={{
          position: 'absolute', left: s.x, top: s.y,
          width: s.size, height: s.size,
          transform: `rotate(${s.rot}deg)`, pointerEvents: 'none',
        }} viewBox="0 0 24 24" fill="none">
          <path d="M12 2 L14 9 L21 9 L15 14 L17 21 L12 17 L7 21 L9 14 L3 9 L10 9 Z"
            stroke={s.color} strokeWidth="1.5" strokeLinejoin="round"
            fill={s.color.replace('0.2', '0.05').replace('0.15', '0.05')} />
        </svg>
      ))}

      {/* Doodle BG lines */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', opacity: 0.03,
      }} fill="none">
        {[...Array(6)].map((_, i) => (
          <line key={i}
            x1="0" y1={`${i * 18}%`}
            x2="100%" y2={`${i * 18 + 9}%`}
            stroke="#FFC300" strokeWidth="1" strokeDasharray="8 6" />
        ))}
      </svg>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '56px' }}
        >
          <span style={{
            fontFamily: "'Kalam', Arial, sans-serif",
            fontSize: '15px',
            color: '#219EBC',
            letterSpacing: '0.15em',
          }}>✏️ 04 / Experience</span>

          <h2 style={{
            fontFamily: "'Permanent Marker', Arial, sans-serif",
            fontSize: 'clamp(30px, 5vw, 54px)',
            color: '#F0F4F8',
            marginTop: '8px',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)',
          }}>
            Intern{' '}
            <span style={{ color: '#FFC300', position: 'relative' }}>
              History
              <svg style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '8px' }}
                viewBox="0 0 100 8" preserveAspectRatio="none" fill="none">
                <path d="M0 5 Q25 1 50 5 Q75 9 100 5" stroke="#FFC300" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
          alignItems: 'stretch',
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
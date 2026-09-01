'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const YogyaLogo = () => (
  <img
    src="assets/images/Yogya_Group.png"
    alt="Yogya Group"
    width={160}
    height={160}
    style={{ objectFit: 'contain', filter: 'grayscale(100%) brightness(1.2)', display: 'block' }}
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
    duration: '6 months · Bandung',
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '280px',
        background: hovered ? 'rgba(255, 195, 0, 0.05)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'rgba(255, 195, 0, 0.3)' : 'var(--border-color)'}`,
        borderRadius: '16px',
        padding: '32px 24px',
        transition: 'all 0.2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <motion.div
        animate={{
          opacity: hovered ? 0.2 : 1,
          scale: hovered ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <Logo />
      </motion.div>

      {/* Info overlay on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '24px',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
              }}
            >
              {intern.company}
            </motion.div>

            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.05 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--accent-primary)',
                marginBottom: '12px',
              }}
            >
              {intern.role}
            </motion.div>

            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                marginBottom: '4px',
              }}
            >
              {intern.period}
            </motion.div>

            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginBottom: '16px',
              }}
            >
              {intern.duration}
            </motion.div>

            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '6px', 
                justifyContent: 'center',
              }}
            >
              {intern.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 500,
                    padding: '4px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 195, 0, 0.2)',
                    color: 'var(--text-secondary)',
                    background: 'rgba(255, 195, 0, 0.05)',
                  }}
                >
                  {tag}
                </span>
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        minHeight: '280px',
        background: 'var(--bg-card)',
        border: '1px dashed var(--border-color)',
        borderRadius: '16px',
        padding: '32px 24px',
        opacity: 0.5,
      }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '2px dashed var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="var(--text-muted)" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Next Internship
      </span>

      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--text-muted)',
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
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--accent-primary)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>Experience</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: '12px',
            letterSpacing: '-0.02em',
          }}>
            Internship <span className="gradient-text">History</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
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

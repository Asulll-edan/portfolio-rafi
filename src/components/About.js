'use client';

import Image from "next/image";

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFlutter, FaGolang, FaDocker } from 'react-icons/fa6';

function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = 20;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TiltCard({ children }) {
  const cardRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.15s ease', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-section)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Doodle BG lines — style from about 2 */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', opacity: 0.04,
      }} fill="none">
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14 + 7}%`}
            stroke="#FFC300" strokeWidth="1" strokeDasharray="8 6" />
        ))}
      </svg>

      {/* Big doodle number watermark — style from about 2 */}
      <div style={{
        position: 'absolute', top: '5%', right: '3%',
        fontFamily: "'Permanent Marker', Arial, sans-serif",
        fontSize: 'clamp(100px, 18vw, 180px)',
        color: 'rgba(255,195,0,0.04)',
        userSelect: 'none', pointerEvents: 'none',
        lineHeight: 1,
      }}>01</div>

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Section Label — style from about 2 */}
        <motion.div
          initial={{ opacity: 0, rotate: -2 }}
          animate={isInView ? { opacity: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '60px' }}
        >
          <span style={{
            fontFamily: "'Kalam', Arial, sans-serif",
            fontSize: '15px',
            color: '#219EBC',
            letterSpacing: '0.15em',
          }}>✏️ 01 / About Me</span>
          <h2 style={{
            fontFamily: "'Permanent Marker', Arial, sans-serif",
            fontSize: 'clamp(30px, 5vw, 54px)',
            color: '#F0F4F8',
            marginTop: '8px',
            letterSpacing: '0.01em',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)',
          }}>
            The Person Behind{' '}
            <span style={{ color: '#FFC300', position: 'relative' }}>
              the Code
              {/* Doodle underline */}
              <svg style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '10px' }}
                viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
                <path d="M0 7 Q25 2 50 7 Q75 12 100 7" stroke="#FFC300" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>

          {/* Photo — style from about 2, image path from about 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -3 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <TiltCard>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '380px',
                margin: '0 auto',
              }}>
                {/* Offset shadow rectangle (doodle effect) */}
                <div style={{
                  position: 'absolute', inset: 0,
                  border: '2px solid rgba(255,195,0,0.2)',
                  borderRadius: '8px',
                  transform: 'translate(8px, 8px)',
                }} />

                {/* Photo frame — style from about 2 */}
                <div style={{
                  aspectRatio: '4/5',
                  background: 'rgba(0,29,61,0.7)',
                  border: '2px solid rgba(255,195,0,0.35)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '6px 6px 0 rgba(255,195,0,0.1)',
                }}>
                  {/* Image path from about 1 */}
                  <Image
                    src="/assets/images/rafi.jpg"
                    alt="Muhammad Sultan Rafi"
                    layout="fill"
                    objectFit="cover"
                  />

                  {/* Bottom gradient */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                    background: 'linear-gradient(to top, rgba(0,29,61,0.8), transparent)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Floating status badge — style from about 2 */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-16px',
                    background: 'rgba(0,11,24,0.95)',
                    border: '2px solid rgba(255,195,0,0.35)',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    boxShadow: '3px 3px 0 rgba(255,195,0,0.15)',
                  }}
                >
                  <div style={{
                    fontFamily: "'Kalam', Arial, sans-serif",
                    fontSize: '11px',
                    color: '#FFC300',
                    marginBottom: '2px',
                  }}>Things to do</div>
                  <div style={{
                    fontFamily: "'Patrick Hand', Arial, sans-serif",
                    fontSize: '13px',
                    color: '#F0F4F8',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span style={{
                      width: '8px', height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#219EBC',
                      display: 'inline-block',
                      animation: 'pulse-glow-cyan 2s infinite',
                    }} />
                    Open to Collab
                  </div>
                </motion.div>

                {/* Location badge — style from about 2, text from about 1 */}
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '-16px',
                    background: 'rgba(0,11,24,0.95)',
                    border: '2px solid rgba(33,158,188,0.35)',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    boxShadow: '3px 3px 0 rgba(33,158,188,0.1)',
                    fontFamily: "'Kalam', Arial, sans-serif",
                    fontSize: '13px',
                    color: '#219EBC',
                  }}
                >
                  📍 Bandung, Indonesia
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Text Content — style from about 2, teks & icon dari about 1 */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Paragraf dari about 1 */}
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "'Patrick Hand', Arial, sans-serif",
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.75,
                color: 'rgba(240,244,248,0.75)',
                marginBottom: '20px',
              }}
            >
              I'm a 17-year-old Vocational High School (SMK) student based in Bandung,
              Indonesia. I love creating modern websites, enjoy working with clients,
              and always stay patient during projects — except when bugs suddenly appear.
            </motion.p>

            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: "'Patrick Hand', Arial, sans-serif",
                fontSize: 'clamp(15px, 2vw, 18px)',
                lineHeight: 1.75,
                color: 'rgba(240,244,248,0.75)',
                marginBottom: '32px',
              }}
            >
              I specialize in{' '}
              <span style={{ color: '#FFC300', fontWeight: 700 }}>Laravel</span>{' '}
              development, building clean, responsive, and modern fullstack web applications.
              And several other technologies such as:
            </motion.p>

            {/* Tech icon cards — style from about 2 (doodle card), icon/path dari about 1 */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                marginBottom: '36px',
              }}
            >
              {[
                {
                  label: 'Flutter',
                  icon: (
                    <img
                      src="assets/icons/flutter.png"
                      alt="Flutter"
                      style={{ width: 40, height: 40, objectFit: 'contain' }}
                    />
                  ),
                },
                {
                  label: 'AJAX(JavaScript)',
                  icon: (
                    <img
                      src="assets/icons/ajax.png"
                      alt="AJAX"
                      style={{ width: 60, height: 40, objectFit: 'contain' }}
                    />
                  ),
                },
                {
                  label: 'Golang',
                  icon: <FaGolang size={34} color="#00ADD8" />,
                },
                {
                  label: 'Docker',
                  icon: <FaDocker size={34} color="#2496ED" />,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ rotate: -1, scale: 1.04 }}
                  style={{
                    background: 'rgba(0,29,61,0.5)',
                    border: '2px solid rgba(255,195,0,0.25)',
                    borderRadius: '8px',
                    padding: '20px 12px',
                    textAlign: 'center',
                    boxShadow: '3px 3px 0 rgba(255,195,0,0.08)',
                  }}
                >
                  <div style={{
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    {item.icon}
                  </div>
                  <div style={{
                    fontFamily: "'Kalam', Arial, sans-serif",
                    fontSize: '11px',
                    color: 'rgba(139,163,199,0.8)',
                    letterSpacing: '0.05em',
                    lineHeight: 1.3,
                  }}>
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

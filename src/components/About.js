'use client';

import Image from "next/image";
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaFlutter, FaGolang, FaDocker } from 'react-icons/fa6';
import { MapPin, CheckCircle } from 'react-feather';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '60px' }}
        >
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--accent-primary)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>About Me</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: '12px',
            letterSpacing: '-0.02em',
          }}>
            The Person Behind{' '}
            <span className="gradient-text">the Code</span>
          </h2>
        </motion.div>

        {/* Main Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              margin: '0 auto',
            }}>
              {/* Photo frame */}
              <div style={{
                aspectRatio: '4/5',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <Image
                  src="/assets/images/rafi.jpg"
                  alt="Muhammad Sultan Rafi"
                  layout="fill"
                  objectFit="cover"
                />

                {/* Bottom gradient */}
                <div style={{
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  right: 0, 
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
                }} />
              </div>

              {/* Status badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: 'rgba(0, 29, 61, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--text-primary)',
                  fontWeight: 500,
                }}>
                  <CheckCircle size={16} color="var(--accent-primary)" />
                  Open to Collaborate
                </div>
              </motion.div>

              {/* Location badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(0, 29, 61, 0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                <MapPin size={14} color="var(--accent-blue)" />
                Bandung, Indonesia
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 2vw, 17px)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
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
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 2vw, 17px)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginBottom: '32px',
              }}
            >
              I specialize in{' '}
              <span style={{ 
                color: 'var(--accent-primary)', 
                fontWeight: 600 
              }}>Laravel</span>{' '}
              development, building clean, responsive, and modern fullstack web applications.
            </motion.p>

            {/* Tech icon cards */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '12px',
                marginBottom: '32px',
              }}
            >
              {[
                {
                  label: 'Flutter',
                  icon: (
                    <img
                      src="assets/icons/flutter.png"
                      alt="Flutter"
                      style={{ width: 32, height: 32, objectFit: 'contain' }}
                    />
                  ),
                },
                {
                  label: 'AJAX',
                  icon: (
                    <img
                      src="assets/icons/ajax.png"
                      alt="AJAX"
                      style={{ width: 48, height: 32, objectFit: 'contain' }}
                    />
                  ),
                },
                {
                  label: 'Golang',
                  icon: <FaGolang size={32} color="#00ADD8" />,
                },
                {
                  label: 'Docker',
                  icon: <FaDocker size={32} color="#2496ED" />,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05, y: -4 }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '20px 12px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    marginBottom: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '32px',
                  }}>
                    {item.icon}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    fontWeight: 500,
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

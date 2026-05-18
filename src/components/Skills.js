'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    key: 'frontend',
    label: 'Frontend',
    color: '#FFC300',
    skills: [
      { name: 'React / Next.js', icon: '⚛️', level: 92 },
      { name: 'JavaScript (ES6+)', icon: '🟨', level: 90 },
      { name: 'HTML & CSS', icon: '🌐', level: 95 },
      { name: 'Tailwind CSS', icon: '💨', level: 88 },
      { name: 'Framer Motion', icon: '🎬', level: 82 },
      { name: 'Three.js / R3F', icon: '🔷', level: 72 },
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    color: '#219EBC',
    skills: [
      { name: 'Git / GitHub', icon: '🐙', level: 88 },
      { name: 'VS Code', icon: '💻', level: 95 },
      { name: 'Vercel / Netlify', icon: '🚀', level: 85 },
      { name: 'Webpack / Vite', icon: '⚡', level: 78 },
      { name: 'npm / pnpm', icon: '📦', level: 90 },
      { name: 'Docker', icon: '🐳', level: 60 },
    ],
  },
  {
    key: 'design',
    label: 'Design',
    color: '#FFD60A',
    skills: [
      { name: 'Figma', icon: '🎨', level: 88 },
      { name: 'UI/UX Design', icon: '✏️', level: 82 },
      { name: 'Prototyping', icon: '📐', level: 80 },
      { name: 'Design Systems', icon: '🧩', level: 78 },
      { name: 'Adobe XD', icon: '🖊️', level: 72 },
      { name: 'Illustrator', icon: '🖌️', level: 65 },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    color: '#4CC9F0',
    skills: [
      { name: 'Node.js', icon: '🟩', level: 75 },
      { name: 'Express.js', icon: '🛤️', level: 72 },
      { name: 'REST APIs', icon: '🔌', level: 80 },
      { name: 'MongoDB', icon: '🍃', level: 68 },
      { name: 'PostgreSQL', icon: '🐘', level: 62 },
      { name: 'Firebase', icon: '🔥', level: 70 },
    ],
  },
];

function ProgressBar({ level, color, inView }) {
  return (
    <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}aa, ${color})`,
          borderRadius: '2px',
          boxShadow: `0 0 6px ${color}66`,
        }}
      />
    </div>
  );
}

function SkillCard({ skill, color, inView, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(0,53,102,0.5)' : 'rgba(0,53,102,0.2)',
        border: `1px solid ${hovered ? color + '44' : 'rgba(255,195,0,0.1)'}`,
        borderRadius: '12px',
        padding: '16px',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? `0 8px 24px rgba(0,0,0,0.2), 0 0 16px ${color}22` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>{skill.icon}</span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: hovered ? '#F0F4F8' : 'var(--text-muted)',
            transition: 'color 0.2s',
          }}>{skill.name}</span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color,
          fontWeight: 600,
        }}>{skill.level}%</span>
      </div>
      <ProgressBar level={skill.level} color={color} inView={inView} />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState('frontend');

  const activeCategory = skillCategories.find(c => c.key === activeTab);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-main)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG decoration */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(33,158,188,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '60px' }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>02 / Skills</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            color: '#F0F4F8',
            marginTop: '8px',
            letterSpacing: '-0.02em',
          }}>
            My{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFC300, #219EBC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Arsenal</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '40px',
          }}
        >
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: activeTab === cat.key ? cat.color : 'rgba(0,53,102,0.3)',
                border: `1px solid ${activeTab === cat.key ? cat.color : 'rgba(255,195,0,0.1)'}`,
                borderRadius: '8px',
                padding: '10px 24px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: activeTab === cat.key ? '#001D3D' : 'var(--text-muted)',
                cursor: 'none',
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '12px',
          }}
        >
          {activeCategory.skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              color={activeCategory.color}
              inView={isInView}
              delay={i * 0.06}
            />
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            marginTop: '60px',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Always Learning', 'Detail Oriented', 'Performance Focused', 'User Centered'].map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(255,195,0,0.05)',
                border: '1px solid rgba(255,195,0,0.15)',
                borderRadius: '100px',
                padding: '8px 20px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
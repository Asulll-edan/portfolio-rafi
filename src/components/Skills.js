'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  SiLaravel, 
  SiPhp, 
  SiNodedotjs, 
  SiGo, 
  SiPython,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiFlutter,
  SiDart,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiKubernetes
} from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';

// Logo components dengan warna asli
const logos = {
  Laravel: () => <SiLaravel size={24} color="#FF2D20" />,
  PHP: () => <SiPhp size={24} color="#777BB4" />,
  'Node.js': () => <SiNodedotjs size={24} color="#339933" />,
  Golang: () => <SiGo size={24} color="#00ADD8" />,
  Python: () => <SiPython size={24} color="#3776AB" />,
  'REST API': () => <FaDatabase size={24} color="#219EBC" />,
  'Next.js': () => <SiNextdotjs size={24} color="#000000" />,
  JavaScript: () => <SiJavascript size={24} color="#F7DF1E" />,
  AJAX: () => <SiJavascript size={24} color="#0066CC" />,
  'HTML & CSS': () => (
    <div style={{ display: 'flex', gap: '4px' }}>
      <SiHtml5 size={20} color="#E34F26" />
      <SiCss size={20} color="#1572B6" />
    </div>
  ),
  'Tailwind CSS': () => <SiTailwindcss size={24} color="#06B6D4" />,
  Bootstrap: () => <SiBootstrap size={24} color="#7952B3" />,
  Flutter: () => <SiFlutter size={24} color="#02569B" />,
  Dart: () => <SiDart size={24} color="#0175C2" />,
  PostgreSQL: () => <SiPostgresql size={24} color="#4169E1" />,
  MySQL: () => <SiMysql size={24} color="#4479A1" />,
  DBeaver: () => <FaDatabase size={24} color="#EE7536" />,
  Docker: () => <SiDocker size={24} color="#2496ED" />,
  Kubernetes: () => <SiKubernetes size={24} color="#326CE5" />,
  Husky: () => (
    <div style={{ 
      width: '24px', 
      height: '24px', 
      backgroundColor: '#333333',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#FFFFFF'
    }}>🐶</div>
  ),
};

const skillCategories = [
  {
    key: 'backend',
    label: 'Backend',
    skills: ['Laravel', 'PHP', 'Node.js', 'Golang', 'Python', 'REST API'],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    skills: ['Next.js', 'JavaScript', 'AJAX', 'HTML & CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    key: 'mobile',
    label: 'Mobile',
    skills: ['Flutter', 'Dart'],
  },
  {
    key: 'database',
    label: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'DBeaver'],
  },
  {
    key: 'devops',
    label: 'DevOps & Tools',
    skills: ['Docker', 'Kubernetes', 'Husky'],
  },
];

function SkillCard({ name, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const Logo = logos[name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255, 195, 0, 0.05)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'rgba(255, 195, 0, 0.3)' : 'var(--border-color)'}`,
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {/* Logo box */}
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s ease',
      }}>
        {Logo && <Logo />}
      </div>

      {/* Name */}
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 500,
        color: hovered ? 'var(--text-primary)' : 'var(--text-secondary)',
        transition: 'all 0.2s ease',
        flex: 1,
      }}>
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeTab, setActiveTab] = useState('backend');
  const activeCategory = skillCategories.find(c => c.key === activeTab);

  return (
    <section
      id="skills"
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
          }}>Skills</span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: '12px',
            letterSpacing: '-0.02em',
          }}>
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ 
            display: 'flex', 
            gap: '8px', 
            flexWrap: 'wrap', 
            marginBottom: '32px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0',
          }}
        >
          {skillCategories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  borderRadius: '0',
                  padding: '12px 20px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px',
          }}
        >
          {activeCategory.skills.map((name, i) => (
            <SkillCard
              key={name}
              name={name}
              index={i}
              inView={isInView}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

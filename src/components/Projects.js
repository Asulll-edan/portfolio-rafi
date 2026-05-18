'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment gateway integration, and advanced analytics dashboard. Built for scale with micro-service architecture.',
    category: 'Web',
    stack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/msultan',
    featured: true,
    color: '#FFC300',
  },
  {
    id: 2,
    title: 'Design System UI Kit',
    description: 'Comprehensive UI component library with 80+ components, dark/light mode, accessibility-first design, and Storybook documentation.',
    category: 'UI/UX',
    stack: ['React', 'Storybook', 'Figma', 'Tailwind'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/msultan',
    featured: true,
    color: '#219EBC',
  },
  {
    id: 3,
    title: 'Task Manager App',
    description: 'Cross-platform mobile task manager with drag-and-drop, collaboration features, and intelligent deadline predictions.',
    category: 'Mobile',
    stack: ['React Native', 'Firebase', 'Expo'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/msultan',
    featured: false,
    color: '#FFC300',
  },
  {
    id: 4,
    title: 'Portfolio Generator',
    description: 'AI-powered portfolio website generator. Input your info, get a stunning, responsive portfolio in seconds.',
    category: 'Web',
    stack: ['Next.js', 'OpenAI', 'Tailwind'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/msultan',
    featured: false,
    color: '#219EBC',
  },
  {
    id: 5,
    title: 'Real Estate Dashboard',
    description: 'Data-rich analytics dashboard for real estate agents with interactive maps, property comparisons, and market trend visualizations.',
    category: 'UI/UX',
    stack: ['React', 'D3.js', 'Mapbox', 'Recharts'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/msultan',
    featured: false,
    color: '#FFD60A',
  },
  {
    id: 6,
    title: 'Fitness Tracker Mobile',
    description: 'Health and fitness tracking app with workout plans, nutrition logging, progress charts and wearable device sync.',
    category: 'Mobile',
    stack: ['React Native', 'Redux', 'HealthKit'],
    demo: 'https://demo.example.com',
    github: 'https://github.com/msultan',
    featured: false,
    color: '#4CC9F0',
  },
];

const categories = ['All', 'Web', 'Mobile', 'UI/UX'];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        backgroundColor: 'var(--bg-section)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '-100px', right: '-100px',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,195,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>03 / Projects</span>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            color: '#F0F4F8',
            marginTop: '8px',
            letterSpacing: '-0.02em',
          }}>
            Selected{' '}
            <span style={{
              background: 'linear-gradient(135deg, #FFC300, #219EBC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Work</span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: activeFilter === cat ? 'rgba(255,195,0,0.12)' : 'rgba(0,53,102,0.3)',
                border: `1px solid ${activeFilter === cat ? 'rgba(255,195,0,0.4)' : 'rgba(255,195,0,0.08)'}`,
                borderRadius: '8px',
                padding: '8px 20px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '13px',
                fontWeight: activeFilter === cat ? 600 : 400,
                color: activeFilter === cat ? 'var(--accent-gold)' : 'var(--text-muted)',
                cursor: 'none',
                transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isInView={isInView}
                featured={project.featured}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project, index, isInView, featured, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: 'rgba(0,29,61,0.6)',
        border: `1px solid ${hovered ? project.color + '55' : 'rgba(255,195,0,0.08)'}`,
        borderRadius: '16px',
        padding: '28px',
        backdropFilter: 'blur(12px)',
        cursor: 'none',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'none',
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${project.color}22` : '0 4px 20px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
        gridColumn: featured ? 'span 1' : 'span 1',
      }}
    >
      {/* Featured badge */}
      {featured && (
        <div style={{
          position: 'absolute', top: '16px', right: '16px',
          background: 'rgba(255,195,0,0.1)',
          border: '1px solid rgba(255,195,0,0.3)',
          borderRadius: '100px',
          padding: '3px 10px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '9px',
          color: 'var(--accent-gold)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>Featured</div>
      )}

      {/* Project color dot */}
      <div style={{
        width: '40px', height: '40px',
        borderRadius: '10px',
        background: project.color + '22',
        border: `1px solid ${project.color}44`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        fontSize: '18px',
      }}>
        {project.category === 'Web' ? '🌐' : project.category === 'Mobile' ? '📱' : '🎨'}
      </div>

      {/* Category */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        color: project.color,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        marginBottom: '8px',
      }}>{project.category}</div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 'clamp(18px, 2.5vw, 22px)',
        fontWeight: 700,
        color: '#F0F4F8',
        marginBottom: '12px',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
      }}>{project.title}</h3>

      {/* Description */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: '14px',
        color: 'var(--text-muted)',
        lineHeight: 1.6,
        marginBottom: '20px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{project.description}</p>

      {/* Stack badges */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {project.stack.map((tech) => (
          <span key={tech} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
            padding: '3px 10px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--text-muted)',
          }}>{tech}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: project.color,
            textDecoration: 'none',
            cursor: 'none',
          }}
        >
          ↗ Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '13px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            cursor: 'none',
          }}
        >
          GitHub →
        </a>
        <span style={{
          marginLeft: 'auto',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.2)',
        }}>View details</span>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 5000,
        }}
      />
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        style={{
          position: 'fixed',
          bottom: 0, left: 0, right: 0,
          maxHeight: '80vh',
          background: '#001D3D',
          border: '1px solid rgba(255,195,0,0.15)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          padding: 'clamp(24px, 5vw, 48px)',
          zIndex: 5001,
          overflowY: 'auto',
        }}
      >
        {/* Handle */}
        <div style={{
          width: '40px', height: '4px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '2px',
          margin: '0 auto 32px',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '32px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: project.color,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}>{project.category}</div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 800,
              color: '#F0F4F8',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}>{project.title}</h3>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '15px',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
            }}>{project.description}</p>
          </div>

          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>Tech Stack</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
              {project.stack.map(t => (
                <span key={t} style={{
                  background: project.color + '15',
                  border: `1px solid ${project.color}33`,
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: project.color,
                }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
                flex: 1,
                background: project.color,
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#001D3D',
                textDecoration: 'none',
                textAlign: 'center',
                cursor: 'none',
              }}>↗ Live Demo</a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                flex: 1,
                background: 'rgba(0,53,102,0.4)',
                border: '1px solid rgba(255,195,0,0.15)',
                borderRadius: '10px',
                padding: '14px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                color: '#F0F4F8',
                textDecoration: 'none',
                textAlign: 'center',
                cursor: 'none',
              }}>GitHub →</a>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '20px', right: '20px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '36px', height: '36px',
            color: 'var(--text-muted)',
            fontSize: '18px',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >✕</button>
      </motion.div>
    </>
  );
}
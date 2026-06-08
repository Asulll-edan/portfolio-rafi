'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Real brand SVG logos inline — dari skill 1
const logos = {
  Laravel: () => (
    <svg viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01a.823.823 0 0 1-.089.042c-.011.005-.023.003-.034.007a.791.791 0 0 1-.2.028.791.791 0 0 1-.2-.028c-.012-.004-.024-.002-.035-.007a.823.823 0 0 1-.09-.042L.402 39.944A.8.8 0 0 1 0 39.25V6.334c0-.072.01-.143.028-.209.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.022.055-.047.088-.065h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.018.059.043.088.065.026.02.055.037.078.06.028.028.048.06.071.093.018.024.04.045.055.071.023.04.036.082.051.124.008.023.022.044.028.068a.809.809 0 0 1 .028.208v20.976l8.007-4.614v-10.96c0-.072.01-.143.028-.208.006-.024.02-.045.028-.068.015-.042.028-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.052-.04.078-.06.03-.022.056-.047.089-.065h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533c.034.018.06.043.09.065.025.02.054.037.077.06.028.028.048.061.072.093.018.024.04.045.054.071.023.039.036.082.051.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.644 2.678v9.124l8.007-4.614zm-9.61 16.505v-9.13l-4.57 2.619-13.05 7.4v9.216l17.62-10.105zM1.602 7.719v31.531l17.619 10.105v-9.216l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.718L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.613 8.006-4.613-8.006-4.609zm4.164 28.764l4.645-2.678V7.719l-3.363 1.936-4.645 2.678v20.092l3.363-1.936zM39.243 7.164l-8.006 4.614 8.006 4.613 8.005-4.613-8.005-4.614zm-.801 10.605l-4.644-2.678-3.363-1.936v9.124l4.644 2.678 3.363 1.937v-9.125zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.61-9.211 5.303-8.395 4.833 7.993 4.528z" fill="#FF2D20"/>
    </svg>
  ),
  PHP: () => (
   <img
    src="assets/icons/PHP-logo.png"
    alt="AJAX"
    style={{ width: 40, height: 20, objectFit: 'contain' }}
  />
  ),
  'Node.js': () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 42 42.061 42 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L20.1 90.777c-.428-.209-.743-.895-.743-1.228V38.407c0-.343.284-.734.655-.934l44.084-25.616c.353-.2.741-.2 1.093 0l44.06 25.616c.37.2.656.591.656.934v51.142c0 .333-.29.991-.71 1.205L65.227 117.104c-.35.196-.741.196-1.12-.027L52.66 110.29c-.349-.211-.894-.414-1.154-.261l-.059.033-9.532 5.634c-.261.153-.261.412 0 .567L64.48 128.16c1.326.814 3.091 1.003 4.512 1.003 1.398 0 3.186-.189 4.512-1.003l43.895-25.395c2.827-1.617 4.601-4.754 4.601-8.018V38.407c0-3.319-1.827-6.422-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.452 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.995 1.24.995h5.754c.354 0 .692-.143.94-.396.24-.272.367-.613.335-.979-.891-10.568-7.912-15.493-22.111-15.493-12.631 0-20.166 5.334-20.166 14.275 0 9.698 7.497 12.378 19.829 13.582 14.661 1.298 15.678 3.244 15.678 6.45-.001 4.984-4.093 7.002-13.561 7.002z"/>
    </svg>
  ),
  'REST API': () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path d="M3 7h18M3 12h18M3 17h12" stroke="#219EBC" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="20" cy="17" r="2.2" stroke="#FFC300" strokeWidth="1.6"/>
    </svg>
  ),
  'Next.js': () => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <mask id="mask0_408_134" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black"/>
      </mask>
      <g mask="url(#mask0_408_134)">
        <circle cx="90" cy="90" r="90" fill="black"/>
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1V69.3L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_408_134)"/>
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)"/>
      </g>
      <defs>
        <linearGradient id="paint0_linear_408_134" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint1_linear_408_134" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#F7DF1E" d="M2 1h125v125H2z"/>
      <path fill="#000" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
    </svg>
  ),
  AJAX: () => (
  <img
    src="assets/icons/ajax.png"
    alt="AJAX"
    style={{ width: 40, height: 20, objectFit: 'contain' }}
  />
),
  'HTML & CSS': () => (
    <svg viewBox="0 0 52 30" xmlns="http://www.w3.org/2000/svg" width="36" height="22">
      <path d="M0 0l4.5 25.6L13 28l8.5-2.4L26 0H0z" fill="#E44D26"/>
      <path d="M13 25.2l6.8-1.9 3.7-20.8H13v22.7z" fill="#F16529"/>
      <path d="M13 11.5H8.5l-.3-3.1H13V5.2H5.2l.8 9H13v-2.7zM13 19.3l-.1.2-3.5-1-.2-2.5H6.9l.4 5.3 5.7 1.6V19.3z" fill="#EBEBEB"/>
      <path d="M13 11.5v2.7h4.1l-.4 4.4-3.7 1v3.1l5.7-1.6.6-6.8.2-2.8H13zM13 5.2v3.2h7.5l.3-3.2H13z" fill="#fff"/>
      <path d="M26 0l4.5 25.6L39 28l8.5-2.4L52 0H26z" fill="#1572B6"/>
      <path d="M39 25.2l6.8-1.9 3.7-20.8H39v22.7z" fill="#33A9DC"/>
      <path d="M39 13.9h4.3l-.4 4.5-3.9 1v3.1l5.8-1.6.4-4.2.5-5.5H39v2.7zM39 5.2v3.2h8.3l.2-3.2H39zM39 11.5h-4.4l-.3-3.1H39V5.2h-7.8l.8 9H39v-2.7zM39 19.3l-.1.2-3.5-1-.2-2.5h-3.3l.4 5.3 5.7 1.6V19.3z" fill="#fff"/>
    </svg>
  ),
  'Tailwind CSS': () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z" fill="#38BDF8"/>
    </svg>
  ),
  Bootstrap: () => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
      <path fill="#7952B3" d="M8.695 0h110.61C123.85 0 128 4.152 128 9.273v109.454c0 5.12-4.152 9.273-9.273 9.273H8.695C3.574 128 0 123.848 0 118.727V9.273C0 4.152 3.574 0 8.695 0z"/>
      <path fill="#fff" d="M43.988 31.988H67.8c5.856 0 10.507.64 13.953 1.92 3.446 1.28 6.187 3.2 8.222 5.76 2.036 2.56 3.054 5.547 3.054 8.96 0 2.987-.784 5.76-2.35 8.32-1.566 2.56-3.867 4.694-6.903 6.4 4.267 1.494 7.467 3.84 9.6 7.04 2.133 3.2 3.2 6.827 3.2 10.88 0 3.733-.907 7.253-2.72 10.56-1.813 3.307-4.32 5.867-7.52 7.68-3.2 1.813-7.147 2.72-11.84 2.72H43.988zm12.8 27.52h8.747c4.053 0 6.933-.747 8.64-2.24 1.707-1.494 2.56-3.627 2.56-6.4 0-2.56-.8-4.48-2.4-5.76-1.6-1.28-4.267-1.92-8-1.92h-9.547zm0 26.88h10.24c4.48 0 7.68-.853 9.6-2.56 1.92-1.707 2.88-3.947 2.88-6.72 0-2.56-.96-4.587-2.88-6.08-1.92-1.493-4.96-2.24-9.12-2.24H56.788z"/>
    </svg>
  ),
  Flutter: () => (
      <img
    src="assets/icons/flutter.png"
    alt="AJAX"
    style={{ width: 60, height: 40, objectFit: 'contain' }}
  />
  ),
 Dart: () => (
  <img
    src="assets/icons/Dart_logo.png"
    alt="Dart"
    style={{ width: 25, height: 25, objectFit: 'contain' }}
  />
),
  PostgreSQL: () => (
     <img
    src="assets/icons/pgsql.png"
    alt="AJAX"
    style={{ width: 50, height: 30, objectFit: 'contain' }}
  />
  ),
  MySQL: () => (
     <img
    src="assets/icons/mysql.png"
    alt="AJAX"
    style={{ width: 60, height: 40, objectFit: 'contain' }}
  />
  ),
 DBeaver: () => (
  <img
    src="assets/icons/DBeaver_logo.png"
    alt="DBeaver"
    style={{ width: 40, height: 40, objectFit: 'contain' }}
  />
),
  Docker: () => (
    <img
    src="assets/icons/Docker_logo.png"
    alt="AJAX"
    style={{ width: 60, height: 40, objectFit: 'contain' }}
  />
  ),
};

// Kategori & skill names dari skill 1
const skillCategories = [
  {
    key: 'backend',
    label: 'Backend',
    color: '#219EBC',
    skills: ['Laravel', 'PHP', 'Node.js', 'REST API'],
  },
  {
    key: 'frontend',
    label: 'Frontend',
    color: '#FFC300',
    skills: ['Next.js', 'JavaScript', 'AJAX', 'HTML & CSS', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    key: 'mobile',
    label: 'Mobile ',
    color: '#FFC300',
    skills: ['Flutter', 'Dart'],
  },
  {
    key: 'database',
    label: 'Database',
    color: '#219EBC',
    skills: ['PostgreSQL', 'MySQL', 'DBeaver'],
  },
  {
    key: 'tools',
    label: 'Tools',
    color: '#219EBC',
    skills: ['Docker'],
  },
];

// SkillCard — style dari skill 2 (doodle: 2px border, boxShadow offset, corner ticks, Patrick Hand font)
function SkillCard({ name, color, index, inView }) {
  const [hovered, setHovered] = useState(false);
  const Logo = logos[name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: Math.random() * 2 - 1 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ rotate: -1, scale: 1.03 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(0,53,102,0.45)' : 'rgba(0,29,61,0.5)',
        border: `2px solid ${hovered ? color + '55' : 'rgba(255,195,0,0.12)'}`,
        borderRadius: '8px',
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        transition: 'all 0.2s',
        boxShadow: hovered ? `4px 4px 0 ${color}22` : '2px 2px 0 rgba(0,0,0,0.2)',
        cursor: 'none',
        position: 'relative',
      }}
    >

      
      {/* Corner tick marks — dari skill 2 */}
      {hovered && (
        <>
          <svg style={{ position: 'absolute', top: 4, left: 4, width: 10, height: 10 }} viewBox="0 0 10 10" fill="none">
            <path d="M1 5 L1 1 L5 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
          <svg style={{ position: 'absolute', bottom: 4, right: 4, width: 10, height: 10 }} viewBox="0 0 10 10" fill="none">
            <path d="M9 5 L9 9 L5 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        </>
      )}

      {/* Logo box */}
      <div style={{
        width: '42px',
        height: '42px',
        borderRadius: '8px',
        background: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.2s',
      }}>
        {Logo && <Logo />}
      </div>

      {/* Name — font dari skill 2 */}
      <span style={{
        fontFamily: "'Patrick Hand', Arial, sans-serif",
        fontSize: '15px',
        fontWeight: hovered ? 700 : 400,
        color: hovered ? '#F0F4F8' : 'rgba(240,244,248,0.75)',
        transition: 'all 0.2s',
        flex: 1,
      }}>
        {name}
      </span>

      {/* Accent dot */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.18 }}
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
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
        backgroundColor: 'var(--bg-main)',
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Big watermark — dari skill 2 */}
      <div style={{
        position: 'absolute', top: '5%', left: '2%',
        fontFamily: "'Permanent Marker', Arial, sans-serif",
        fontSize: 'clamp(100px, 18vw, 180px)',
        color: 'rgba(33,158,188,0.04)',
        userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
      }}>02</div>

      {/* Doodle scattered stars — dari skill 2 */}
      {[
        { x: '90%', y: '10%', size: 20, color: 'rgba(255,195,0,0.2)', rot: 15 },
        { x: '95%', y: '50%', size: 16, color: 'rgba(33,158,188,0.2)', rot: -20 },
        { x: '2%', y: '80%', size: 18, color: 'rgba(255,195,0,0.15)', rot: 30 },
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

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header — style dari skill 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '52px' }}
        >
          <span style={{
            fontFamily: "'Kalam', Arial, sans-serif",
            fontSize: '15px',
            color: '#219EBC',
            letterSpacing: '0.15em',
          }}>✏️ 02 / Skills</span>
          <h2 style={{
            fontFamily: "'Permanent Marker', Arial, sans-serif",
            fontSize: 'clamp(30px, 5vw, 54px)',
            color: '#F0F4F8',
            marginTop: '8px',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)',
          }}>
            My{' '}
            <span style={{ color: '#FFC300', position: 'relative' }}>
              Stack
              <svg style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '8px' }}
                viewBox="0 0 100 8" preserveAspectRatio="none" fill="none">
                <path d="M0 5 Q25 1 50 5 Q75 9 100 5" stroke="#FFC300" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </motion.div>

        {/* Tabs — notebook tab style dari skill 2 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.12 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '0' }}
        >
          {skillCategories.map((cat) => {
            const isActive = activeTab === cat.key;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                whileHover={{ y: -3, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: isActive ? cat.color : 'rgba(0,29,61,0.6)',
                  border: `2px solid ${isActive ? cat.color : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '8px 8px 0 0',
                  padding: '10px 20px',
                  fontFamily: "'Kalam', Arial, sans-serif",
                  fontSize: '15px',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? '#001D3D' : 'rgba(240,244,248,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: isActive ? `0 -3px 0 ${cat.color}44` : 'none',
                  transform: isActive ? 'translateY(0)' : 'translateY(3px)',
                }}
              >
                {cat.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab content box — notebook box dari skill 2 */}
        <div style={{
          background: 'rgba(0,29,61,0.3)',
          border: '2px solid rgba(255,195,0,0.15)',
          borderRadius: '0 12px 12px 12px',
          padding: 'clamp(20px, 4vw, 40px)',
          boxShadow: '4px 4px 0 rgba(255,195,0,0.06)',
          position: 'relative',
          marginBottom: '48px',
        }}>
          {/* Notebook hole punches — dari skill 2 */}
          {[20, 50, 80].map((pct) => (
            <svg key={pct} style={{
              position: 'absolute', left: '-16px', top: `${pct}%`,
              width: 14, height: 14, transform: 'translateY(-50%)',
            }} viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="rgba(255,195,0,0.2)" strokeWidth="1.5" />
              <circle cx="7" cy="7" r="2" fill="rgba(0,11,24,0.8)" />
            </svg>
          ))}

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: '12px',
            }}
          >
            {activeCategory.skills.map((name, i) => (
              <SkillCard
                key={name}
                name={name}
                color={activeCategory.color}
                index={i}
                inView={isInView}
              />
            ))}
          </motion.div>
        </div>

        {/* Doodle tags — dari skill 2 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center',
          }}
        >
          {['✦ Always Learning', '✦ Detail Oriented', '✦ Performance Focused', '✦ User Centered'].map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ rotate: -2, scale: 1.05 }}
              style={{
                background: 'rgba(255,195,0,0.05)',
                border: '2px dashed rgba(255,195,0,0.2)',
                borderRadius: '6px',
                padding: '8px 18px',
                fontFamily: "'Kalam', Arial, sans-serif",
                fontSize: '14px',
                color: 'rgba(139,163,199,0.8)',
              }}
            >{tag}</motion.span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}


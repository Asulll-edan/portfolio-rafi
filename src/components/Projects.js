// PATH: src/components/Projects.js

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Wewok Cafe",
    description:
      "This is MY FIRST PROJECT (Newbie) for early class a website coffe cafe, Solutions for who wont queuing for too long",
    category: "Web",
    stack: ["PHP native", "JavaScript", "MySql", "Bootstrap"],
    demo: "https://wewok.page.gd",
    github: "https://github.com/Asulll-edan/cafe-wewok",
    featured: true,
    color: "#FFC300",
    icon: (
      <img
        src="/assets/icons/logo_cafe.png"
        alt="Wewok Cafe"
        style={{ width: 70, height: 60, objectFit: "contain" }}
      />
    ),
  },
  {
    id: 2,
    title: "Rumah Anak Sekolah",
    description:
      "Rumahnya Anak Sekolah (RAS) is a modern digital platform designed specifically for students, it serves as a Student Lifestyle Marketplace, where students can shop, eat, connect, and grow within a community built around school life.",
    category: "Web",
    stack: ["Laravel", "Ajax JS", "Node.js", "PHP", "PostgreSQL", "Bootstrap", "REST API"],
    demo: "https://rumah-sekolah.up.railway.app",
    github: "https://github.com/Asulll-edan/project-web-iseng",
    featured: true,
    color: "#219EBC",
    icon: (
      <img
        src="/assets/icons/logo_ras.png"
        alt="Rumah Anak Sekolah"
        style={{ width: 80, height: 70, objectFit: "contain" }}
      />
    ),
  },
  {
    id: 3,
    title: "Task Manager App",
    description:
      "Cross-platform mobile task manager with drag-and-drop, collaboration features, and intelligent deadline predictions.",
    category: "Mobile",
    stack: ["React Native", "Firebase", "Expo"],
    demo: "#",
    github: "#",
    featured: false,
    color: "#FFC300",
    emoji: "📋",
    inDev: true,
  },
  {
    id: 4,
    title: "Smart moneybox",
    description:
      "An IoT-enabled smart moneybox that tracks savings goals, provides real-time feedback, and encourages financial discipline through gamification.",
    category: "Arduino",
    stack: ["Arduino C++", "MQTT", "TCS3200", "ESP8266", "Node.js"],
    demo: null,
    github: null,
    featured: false,
    color: "#FFC300",
    icon: (
      <img
        src="/assets/icons/keren-removebg-preview.png"
        alt="Smart Moneybox"
        style={{ width: 60, height: 60, objectFit: "contain" }}
      />
    ),
    inDev: true,
  },
];

const categories = ["All", "Web", "Mobile", "UI/UX", "Arduino"];

/* Doodle pin for cards */
const DoodlePin = ({ color }) => (
  <svg
    width="16"
    height="24"
    viewBox="0 0 16 24"
    fill="none"
    style={{
      position: "absolute",
      top: -10,
      left: "50%",
      transform: "translateX(-50%)",
    }}
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      fill={color}
      stroke="rgba(0,0,0,0.3)"
      strokeWidth="1"
    />
    <path
      d="M8 14 L8 22"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

function ProjectCard({ project, index, isInView, onClick }) {
  const [hovered, setHovered] = useState(false);
  const initRot = (index % 2 === 0 ? -1 : 1) * (0.5 + (index % 3) * 0.4);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, rotate: initRot * 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: initRot } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ rotate: 0, scale: 1.02, zIndex: 10 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: "rgba(0,29,61,0.7)",
        border: `2px solid ${hovered ? project.color + "66" : "rgba(255,195,0,0.12)"}`,
        borderRadius: "8px",
        padding: "28px 24px 24px",
        cursor: "none",
        position: "relative",
        boxShadow: hovered
          ? `5px 5px 0 ${project.color}33, 8px 8px 0 ${project.color}11`
          : `3px 3px 0 rgba(0,0,0,0.2)`,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Pin decoration for featured */}
      {project.featured && <DoodlePin color={project.color} />}

      {/* Featured tape-strip */}
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "-8px",
            background: project.color,
            padding: "3px 12px",
            fontFamily: "'Kalam', cursive",
            fontSize: "11px",
            fontWeight: 700,
            color: "#001D3D",
            clipPath: "polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)",
            boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
          }}
        >
          Featured ★
        </div>
      )}

      {/* Big emoji */}
      <div
        style={{
          fontSize: "36px",
          marginBottom: "14px",
          animation: hovered ? "wiggle 0.4s ease" : "none",
          display: "inline-block",
        }}
      >
        {project.icon || project.emoji}
      </div>

      {/* Category label */}
      <div
        style={{
          fontFamily: "'Kalam', cursive",
          fontSize: "12px",
          color: project.color,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        {project.category}
      </div>

      <h3
        style={{
          fontFamily: "'Permanent Marker', cursive",
          fontSize: "clamp(17px,2.2vw,21px)",
          color: "#F0F4F8",
          marginBottom: "10px",
          lineHeight: 1.2,
          letterSpacing: "0.01em",
          textShadow: "1px 1px 0 rgba(0,0,0,0.3)",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontFamily: "'Patrick Hand', cursive",
          fontSize: "14px",
          color: "rgba(139,163,199,0.85)",
          lineHeight: 1.6,
          marginBottom: "18px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      {/* Stack badges — doodle sticker style */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        {project.stack.map((tech) => (
          <span
            key={tech}
            style={{
              background: `${project.color}11`,
              border: `1.5px solid ${project.color}33`,
              borderRadius: "20px",
              padding: "3px 10px",
              fontFamily: "'Kalam', cursive",
              fontSize: "12px",
              color: project.color,
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'Kalam', cursive",
              fontSize: "14px",
              fontWeight: 700,
              color: project.color,
              textDecoration: "none",
              cursor: "none",
            }}
          >
            ↗ Demo
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'Kalam', cursive",
              fontSize: "14px",
              color: "rgba(240,244,248,0.5)",
              textDecoration: "none",
              cursor: "none",
            }}
          >
            GitHub →
          </a>
        )}
        {!project.inDev && (
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'Kalam', cursive",
              fontSize: "12px",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            tap for details ✦
          </span>
        )}
      </div>

      {/* In-dev glassmorphism overlay */}
      {project.inDev && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "8px",
            background: "rgba(0, 10, 28, 0.62)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            zIndex: 5,
          }}
        >
          <div
            style={{
              fontFamily: "'Permanent Marker', cursive",
              fontSize: "24px",
              color: "#FFC300",
              border: "2.5px solid #FFC300",
              borderRadius: "6px",
              padding: "6px 20px",
              transform: "rotate(-8deg)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              background: "rgba(0,15,35,0.5)",
              boxShadow: "3px 3px 0 rgba(255,195,0,0.15)",
              textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
            }}
          >
            In Dev
          </div>
          <span
            style={{
              fontFamily: "'Patrick Hand', cursive",
              fontSize: "13px",
              color: "rgba(139,163,199,0.75)",
              transform: "rotate(-1deg)",
            }}
          >
            masih di develop yaa
          </span>
        </div>
      )}

      {/* Hand-drawn corner ticks on hover */}
      {hovered && (
        <>
          <svg
            style={{
              position: "absolute",
              top: 4,
              left: 4,
              width: 12,
              height: 12,
            }}
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M1 6 L1 1 L6 1"
              stroke={project.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
          <svg
            style={{
              position: "absolute",
              bottom: 4,
              right: 4,
              width: 12,
              height: 12,
            }}
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M11 6 L11 11 L6 11"
              stroke={project.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </>
      )}
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
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          zIndex: 5000,
        }}
      />
      <motion.div
        initial={{ y: "100%", opacity: 0, rotate: -1 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 280 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "80vh",
          background: "#001D3D",
          border: "2px solid rgba(255,195,0,0.2)",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "clamp(20px,5vw,48px)",
          zIndex: 5001,
          overflowY: "auto",
          boxShadow: "0 -6px 0 rgba(255,195,0,0.08)",
        }}
      >
        {/* Handle — doodle squiggle */}
        <svg
          style={{
            display: "block",
            margin: "0 auto 28px",
            width: "60px",
            height: "10px",
          }}
          viewBox="0 0 60 10"
          fill="none"
        >
          <path
            d="M0 5 Q15 1 30 5 Q45 9 60 5"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
            gap: "32px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>
              {project.icon || project.emoji}
            </div>
            <div
              style={{
                fontFamily: "'Kalam', cursive",
                fontSize: "12px",
                color: project.color,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              {project.category}
            </div>
            <h3
              style={{
                fontFamily: "'Permanent Marker', cursive",
                fontSize: "clamp(22px,4vw,34px)",
                color: "#F0F4F8",
                marginBottom: "16px",
                textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "'Patrick Hand', cursive",
                fontSize: "16px",
                color: "rgba(240,244,248,0.75)",
                lineHeight: 1.7,
              }}
            >
              {project.description}
            </p>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Kalam', cursive",
                fontSize: "12px",
                color: "rgba(139,163,199,0.7)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Tech Stack
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "32px",
              }}
            >
              {project.stack.map((t) => (
                <span
                  key={t}
                  style={{
                    background: `${project.color}15`,
                    border: `2px solid ${project.color}44`,
                    borderRadius: "6px",
                    padding: "6px 14px",
                    fontFamily: "'Kalam', cursive",
                    fontSize: "13px",
                    color: project.color,
                    boxShadow: `2px 2px 0 ${project.color}11`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    background: project.color,
                    border: `2px solid ${project.color}`,
                    borderRadius: "8px",
                    padding: "14px",
                    fontFamily: "'Kalam', cursive",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#001D3D",
                    textDecoration: "none",
                    textAlign: "center",
                    cursor: "none",
                    boxShadow: `3px 3px 0 ${project.color}44`,
                  }}
                >
                  ↗ Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    background: "rgba(0,53,102,0.4)",
                    border: "2px solid rgba(255,195,0,0.2)",
                    borderRadius: "8px",
                    padding: "14px",
                    fontFamily: "'Kalam', cursive",
                    fontSize: "15px",
                    color: "#F0F4F8",
                    textDecoration: "none",
                    textAlign: "center",
                    cursor: "none",
                    boxShadow: "3px 3px 0 rgba(255,195,0,0.08)",
                  }}
                >
                  GitHub →
                </a>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255,255,255,0.06)",
            border: "2px solid rgba(255,195,0,0.2)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            color: "rgba(240,244,248,0.6)",
            fontSize: "16px",
            cursor: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Kalam', cursive",
          }}
        >
          ✕
        </button>
      </motion.div>
    </>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        backgroundColor: "var(--bg-section)",
        padding: "clamp(80px,12vw,140px) clamp(20px,5vw,80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Big watermark */}
      <div
        style={{
          position: "absolute",
          top: "5%",
          right: "2%",
          fontFamily: "'Permanent Marker', cursive",
          fontSize: "clamp(100px,18vw,180px)",
          color: "rgba(255,195,0,0.04)",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        03
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: "48px" }}
        >
          <span
            style={{
              fontFamily: "'Kalam', cursive",
              fontSize: "15px",
              color: "#219EBC",
              letterSpacing: "0.15em",
            }}
          >
            ✏️ 03 / Projects
          </span>
          <h2
            style={{
              fontFamily: "'Permanent Marker', cursive",
              fontSize: "clamp(30px,5vw,54px)",
              color: "#F0F4F8",
              marginTop: "8px",
              textShadow: "3px 3px 0 rgba(0,0,0,0.2)",
            }}
          >
            Selected <span style={{ color: "#FFC300" }}>Work</span>
          </h2>
        </motion.div>

        {/* Filter — doodle sticker tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ rotate: -2, y: -2 }}
              whileTap={{ scale: 0.94 }}
              style={{
                background:
                  activeFilter === cat
                    ? "rgba(255,195,0,0.12)"
                    : "rgba(0,29,61,0.5)",
                border: `2px solid ${activeFilter === cat ? "rgba(255,195,0,0.5)" : "rgba(255,195,0,0.1)"}`,
                borderRadius: "6px",
                padding: "8px 22px",
                fontFamily: "'Kalam', cursive",
                fontSize: "15px",
                fontWeight: activeFilter === cat ? 700 : 400,
                color:
                  activeFilter === cat ? "#FFC300" : "rgba(240,244,248,0.6)",
                cursor: "none",
                transition: "all 0.2s",
                boxShadow:
                  activeFilter === cat
                    ? "3px 3px 0 rgba(255,195,0,0.15)"
                    : "2px 2px 0 rgba(0,0,0,0.15)",
                transform: activeFilter === cat ? "rotate(-1deg)" : "none",
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px,1fr))",
            gap: "28px",
            paddingTop: "16px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isInView={isInView}
                onClick={() => !project.inDev && setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

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
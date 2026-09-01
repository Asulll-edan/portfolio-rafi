// PATH: src/components/Projects.js

"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Wewok Cafe",
    description:
      "My first project - a coffee cafe website solution for customers who don't want to queue for too long. Built with native PHP and Bootstrap.",
    category: "Web",
    stack: ["PHP native", "JavaScript", "MySQL", "Bootstrap"],
    demo: "https://wewok.page.gd",
    github: "https://github.com/Asulll-edan/cafe-wewok",
    featured: true,
    icon: (
      <img
        src="/assets/icons/logo_cafe.png"
        alt="Wewok Cafe"
        style={{ width: 60, height: 50, objectFit: "contain" }}
      />
    ),
  },
  {
    id: 2,
    title: "Rumah Anak Sekolah",
    description:
      "A modern digital platform designed for students - a Student Lifestyle Marketplace where students can shop, eat, connect, and grow within a school community.",
    category: "Web",
    stack: ["Laravel", "Ajax JS", "Node.js", "PHP", "PostgreSQL", "Bootstrap", "REST API"],
    demo: "https://rumah-sekolah.up.railway.app",
    github: "https://github.com/Asulll-edan/project-web-iseng",
    featured: true,
    icon: (
      <img
        src="/assets/icons/logo_ras.png"
        alt="Rumah Anak Sekolah"
        style={{ width: 70, height: 60, objectFit: "contain" }}
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
    emoji: "📋",
    inDev: true,
  },
  {
    id: 4,
    title: "Smart Moneybox",
    description:
      "An IoT-enabled smart moneybox that tracks savings goals, provides real-time feedback, and encourages financial discipline through gamification.",
    category: "Arduino",
    stack: ["Arduino C++", "MQTT", "TCS3200", "ESP8266", "Node.js"],
    demo: null,
    github: null,
    featured: false,
    icon: (
      <img
        src="/assets/icons/keren-removebg-preview.png"
        alt="Smart Moneybox"
        style={{ width: 50, height: 50, objectFit: "contain" }}
      />
    ),
    inDev: true,
  },
];

const categories = ["All", "Web", "Mobile", "UI/UX", "Arduino"];

function ProjectCard({ project, index, isInView, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${hovered ? "var(--border-hover)" : "var(--border-color)"}`,
        borderRadius: "16px",
        padding: "24px",
        cursor: project.inDev ? "default" : "pointer",
        position: "relative",
        transition: "all 0.2s ease",
        overflow: "hidden",
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
              background: "var(--accent-primary)",
              padding: "4px 12px",
              borderRadius: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 600,
              color: "#001D3D",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
          }}
        >
          Featured
        </div>
      )}

      {/* Icon/Emoji */}
      <div
        style={{
          fontSize: "36px",
          marginBottom: "16px",
          display: "inline-block",
        }}
      >
        {project.icon || project.emoji}
      </div>

      {/* Category */}
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--accent-primary)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "8px",
        }}
      >
        {project.category}
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(18px, 2.2vw, 22px)",
          fontWeight: 600,
          color: "var(--text-primary)",
          marginBottom: "12px",
          lineHeight: 1.3,
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "20px",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      {/* Stack badges */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {project.stack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            style={{
              background: "rgba(255, 195, 0, 0.1)",
              border: "1px solid rgba(255, 195, 0, 0.2)",
              borderRadius: "6px",
              padding: "4px 10px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--accent-primary)",
            }}
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span
            style={{
              background: "rgba(255, 195, 0, 0.1)",
              border: "1px solid rgba(255, 195, 0, 0.2)",
              borderRadius: "6px",
              padding: "4px 10px",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--accent-primary)",
            }}
          >
            +{project.stack.length - 3}
          </span>
        )}
      </div>

      {/* Links */}
      {!project.inDev && (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--accent-primary)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View Demo →
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
              }}
            >
              GitHub
            </a>
          )}
        </div>
      )}

      {/* In-dev overlay */}
      {project.inDev && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: 600,
              color: "var(--accent-primary)",
              padding: "8px 20px",
              border: "1px solid var(--accent-primary)",
              borderRadius: "8px",
            }}
          >
            In Development
          </div>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "var(--text-muted)",
            }}
          >
            Coming soon
          </span>
        </div>
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
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          zIndex: 5000,
        }}
      />
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "85vh",
          background: "var(--bg-section)",
          border: "1px solid var(--border-color)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          padding: "clamp(24px, 5vw, 48px)",
          zIndex: 5001,
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            color: "var(--text-primary)",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>
              {project.icon || project.emoji}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--accent-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "12px",
              }}
            >
              {project.category}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "16px",
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {project.description}
            </p>
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px",
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
                    background: "rgba(255, 195, 0, 0.1)",
                    border: "1px solid rgba(255, 195, 0, 0.2)",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "var(--accent-primary)",
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
                    background: "var(--accent-primary)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#ffffff",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  View Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "14px",
                    fontFamily: "var(--font-body)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
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
        padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{ marginBottom: "48px" }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--accent-primary)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Projects
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginTop: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            Selected <span className="gradient-text">Work</span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background:
                  activeFilter === cat
                    ? "rgba(255, 195, 0, 0.1)"
                    : "var(--bg-card)",
                border: `1px solid ${
                  activeFilter === cat
                    ? "rgba(255, 195, 0, 0.3)"
                    : "var(--border-color)"
                }`,
                borderRadius: "8px",
                padding: "8px 20px",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: activeFilter === cat ? 600 : 400,
                color:
                  activeFilter === cat
                    ? "var(--accent-primary)"
                    : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s ease",
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
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
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

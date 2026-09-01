// PATH: src/components/Hero.js

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { CheckCircle } from "react-feather";

const ThreeCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const roles = ["Laravel Developer", "Backend Developer", "Fullstack Engineer"];

export default function Hero() {
  const ref = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Three.js canvas background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.3 }}>
        <ThreeCanvas />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 29, 61, 0.8) 100%)",
        }}
      />

      {/* Main content */}
      <motion.div
        style={{
          y,
          opacity,
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "40px 24px",
          maxWidth: "900px",
          width: "100%",
        }}
      >
       

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 8vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
            color: "var(--text-primary)",
          }}
        >
          Hi, I'm{" "}
          <span className="gradient-text">
            Rafi
          </span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 600,
            color: "var(--text-secondary)",
            marginBottom: "24px",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.span
            key={roleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {roles[roleIndex]}
          </motion.span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 2vw, 18px)",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          A 17-year-old vocational student from Bandung, Indonesia, specializing in building modern, 
          responsive web applications with Laravel and Next.js
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
        >
          <motion.button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "var(--accent-primary)",
              border: "none",
              borderRadius: "12px",
              padding: "14px 32px",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#001D3D",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            View Projects
          </motion.button>

          <motion.button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: "transparent",
              border: "1px solid var(--border-color)",
              borderRadius: "12px",
              padding: "14px 32px",
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {["Laravel", "Next.js", "PostgreSQL", "Docker"].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              style={{
                background: "rgba(255, 195, 0, 0.1)",
                border: "1px solid rgba(255, 195, 0, 0.2)",
                borderRadius: "8px",
                padding: "6px 14px",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{
            width: "20px",
            height: "32px",
            border: "2px solid var(--border-color)",
            borderRadius: "12px",
            padding: "4px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{
              width: "3px",
              height: "8px",
              background: "var(--accent-primary)",
              borderRadius: "2px",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// PATH: src/components/Hero.js

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const roles = ["Laravel Developer", "Back-end Developer", "Software Engineer"];

/* Hand-drawn arrow */
const DoodleArrow = () => (
  <svg
    width="52"
    height="32"
    viewBox="0 0 52 32"
    fill="none"
    style={{ display: "inline-block", marginLeft: 6 }}
  >
    <path
      d="M2 16 Q18 6 40 16 M33 8 L42 16 L33 24"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Doodle curly bracket */
const DoodleBracket = ({
  side = "left",
  color = "rgba(255,195,0,0.35)",
  size = 70,
}) => (
  <svg
    width={size * 0.45}
    height={size}
    viewBox="0 0 28 70"
    fill="none"
    style={{
      transform: side === "right" ? "scaleX(-1)" : "none",
      flexShrink: 0,
    }}
  >
    <path
      d="M22 3 Q6 3 6 14 L6 30 Q6 35 2 35 Q6 35 6 40 L6 56 Q6 67 22 67"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

/* Typewriter with blinking cursor */
function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, 48);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.55, ease: "linear" }}
        style={{
          color: "#FFC300",
          fontFamily: "'Permanent Marker', cursive",
          marginLeft: "2px",
        }}
      >
        |
      </motion.span>
    </span>
  );
}

/* Floating ambient doodle element */
const Float = ({ children, x, y, delay = 0, dur = 3.6 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -10, 0],
    }}
    transition={{ 
      opacity: { delay, duration: 0.6 },
      scale: { delay, duration: 0.6 },
      y: { delay, duration: dur, repeat: Infinity, ease: 'easeInOut' }
    }}
    style={{
      position: 'absolute', left: x, top: y,
      pointerEvents: 'none', zIndex: 1,
    }}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  const ref = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const onMove = (e) => {
      setSpotlight({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Cycle roles every 3.5s
  useEffect(() => {
    const t = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 3500);
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
        background:
          "linear-gradient(180deg, #001324 0%, #001d3d 60%, #003566 100%)",
      }}
    >
      {/* SVG turbulence filter for sketchy lines */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="sketchy">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Three.js canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <ThreeCanvas />
      </div>

      {/* Mouse spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: `radial-gradient(700px at ${spotlight.x}% ${spotlight.y}%, rgba(255,195,0,0.045) 0%, transparent 65%)`,
          transition: "background 0.1s",
        }}
      />

      {/* Fine dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage: `radial-gradient(rgba(33,158,188,0.18) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* ── Floating ambient doodles ── */}

      {/* Top-left: dashed circle */}
      <Float x="4%" y="12%" delay={0.4} dur={4.2}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle
            cx="30"
            cy="30"
            r="24"
            stroke="rgba(255,195,0,0.28)"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
          <circle
            cx="30"
            cy="30"
            r="10"
            stroke="rgba(255,195,0,0.14)"
            strokeWidth="1.5"
          />
          <circle cx="30" cy="30" r="3" fill="rgba(255,195,0,0.3)" />
        </svg>
      </Float>

      {/* Top-right: star */}
      <Float x="82%" y="6%" delay={0.6} dur={3.8}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <path
            d="M26 4 L30 19 L45 19 L33 29 L37 44 L26 35 L15 44 L19 29 L7 19 L22 19 Z"
            stroke="rgba(33,158,188,0.4)"
            strokeWidth="2"
            strokeLinejoin="round"
            fill="rgba(33,158,188,0.06)"
          />
        </svg>
      </Float>

      {/* Left-mid: rotated dashed square */}
      <Float x="3%" y="60%" delay={0.9} dur={5.0}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <rect
            x="5"
            y="5"
            width="34"
            height="34"
            rx="4"
            stroke="rgba(33,158,188,0.28)"
            strokeWidth="1.8"
            strokeDasharray="5 3"
            transform="rotate(14 22 22)"
          />
        </svg>
      </Float>

      {/* Right-mid: smaller star */}
      <Float x="80%" y="62%" delay={0.5} dur={4.5}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path
            d="M22 4 L25 14 L35 14 L27 21 L30 31 L22 25 L14 31 L17 21 L9 14 L19 14 Z"
            stroke="rgba(255,195,0,0.32)"
            strokeWidth="1.8"
            fill="rgba(255,195,0,0.05)"
          />
        </svg>
      </Float>

      {/* Bottom-left: cross / plus */}
      <Float x="8%" y="82%" delay={1.1} dur={3.5}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4 L16 28 M4 16 L28 16"
            stroke="rgba(255,195,0,0.22)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </Float>

      {/* Bottom-right: triangle */}
      <Float x="78%" y="80%" delay={0.8} dur={4.0}>
        <svg width="36" height="32" viewBox="0 0 36 32" fill="none">
          <path
            d="M18 3 L34 29 L2 29 Z"
            stroke="rgba(33,158,188,0.28)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="rgba(33,158,188,0.04)"
          />
        </svg>
      </Float>

      {/* Squiggly lines — animated draw */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        style={{
          position: "absolute",
          left: "4%",
          top: "42%",
          width: "130px",
          height: "28px",
          zIndex: 1,
        }}
        viewBox="0 0 130 28"
        fill="none"
      >
        <motion.path
          d="M0 14 Q16 4 32 14 Q48 24 64 14 Q80 4 96 14 Q112 24 128 14"
          stroke="rgba(255,195,0,0.18)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.7, duration: 1.4, ease: "easeInOut" }}
        />
      </motion.svg>
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.5 }}
        style={{
          position: "absolute",
          right: "4%",
          top: "58%",
          width: "110px",
          height: "28px",
          zIndex: 1,
        }}
        viewBox="0 0 110 28"
        fill="none"
      >
        <motion.path
          d="M0 14 Q14 24 28 14 Q42 4 56 14 Q70 24 84 14 Q98 4 110 14"
          stroke="rgba(33,158,188,0.18)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.0, duration: 1.4, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* ── Main content ── */}
      <motion.div
        style={{
          y,
          opacity,
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "28px 24px",
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {/* Name with doodle brackets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <DoodleBracket side="left" color="rgba(255,195,0,0.38)" size={84} />

          <h1
            style={{
              fontFamily: "'Permanent Marker', cursive",
              fontSize: "clamp(28px, 6.5vw, 76px)",
              fontWeight: 400,
              color: "#F0F4F8",
              lineHeight: 1.08,
              letterSpacing: "0.015em",
              textShadow:
                "4px 4px 0 rgba(0,0,0,0.35), 0 0 60px rgba(255,195,0,0.06)",
              margin: 0,
            }}
          >
            <TypewriterText text="Hai, i'm Rafi" />
          </h1>

          <DoodleBracket side="right" color="rgba(255,195,0,0.38)" size={84} />
        </motion.div>

        {/* Hand-drawn underline */}
        <motion.svg
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            width: "min(520px, 82%)",
            height: "14px",
            margin: "0 auto 10px",
            display: "block",
          }}
          viewBox="0 0 520 14"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M4 9 Q130 2 260 9 Q390 16 516 9"
            stroke="#FFC300"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1.0 }}
            filter="url(#sketchy)"
          />
        </motion.svg>

        {/* Subtitle — small handwritten note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.5 }}
          style={{
            fontFamily: "'Kalam', cursive",
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "rgba(139,163,199,0.7)",
            letterSpacing: "0.08em",
            marginBottom: "36px",
          }}
        >
          — vocational high school(SMK) Student · Bandung, Indonesia —
        </motion.p>

        {/* Cycling role chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.75 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "56px",
          }}
        >
          {roles.map((role, i) => {
            const isActive = i === roleIndex;
            const colors = [
              {
                border: "rgba(255,195,0,0.5)",
                bg: "rgba(255,195,0,0.08)",
                text: "#FFC300",
                shadow: "rgba(255,195,0,0.2)",
              },
              {
                border: "rgba(33,158,188,0.5)",
                bg: "rgba(33,158,188,0.08)",
                text: "#219EBC",
                shadow: "rgba(33,158,188,0.2)",
              },
              {
                border: "rgba(240,244,248,0.25)",
                bg: "rgba(240,244,248,0.05)",
                text: "rgba(240,244,248,0.6)",
                shadow: "transparent",
              },
            ];
            const c = colors[i];
            return (
              <motion.span
                key={role}
                animate={{
                  scale: isActive ? 1.06 : 1,
                  opacity: isActive ? 1 : 0.55,
                  rotate: isActive ? (i % 2 === 0 ? -1.5 : 1.5) : 0,
                }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontFamily: "'Kalam', cursive",
                  fontSize: "clamp(14px, 2.2vw, 20px)",
                  fontWeight: isActive ? 700 : 400,
                  color: c.text,
                  padding: "5px 18px",
                  background: c.bg,
                  border: `2px solid ${c.border}`,
                  borderRadius: "6px",
                  boxShadow: isActive ? `3px 3px 0 ${c.shadow}` : "none",
                  transition: "box-shadow 0.3s",
                  cursor: "default",
                }}
              >
                {role}
              </motion.span>
            );
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <motion.button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{
              rotate: -1.5,
              scale: 1.05,
              boxShadow: "6px 6px 0 rgba(255,195,0,0.3)",
            }}
            whileTap={{ scale: 0.96, rotate: 0 }}
            style={{
              background: "#FFC300",
              border: "2px solid #FFC300",
              borderRadius: "8px",
              padding: "14px 34px",
              fontFamily: "'Permanent Marker', cursive",
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#001324",
              cursor: "none",
              boxShadow: "4px 4px 0 rgba(255,195,0,0.28)",
              display: "flex",
              alignItems: "center",
              letterSpacing: "0.01em",
            }}
          >
            View My Work <DoodleArrow />
          </motion.button>

          <motion.button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            whileHover={{
              rotate: 1.5,
              scale: 1.05,
              boxShadow: "6px 6px 0 rgba(33,158,188,0.22)",
            }}
            whileTap={{ scale: 0.96, rotate: 0 }}
            style={{
              background: "rgba(0,40,80,0.35)",
              border: "2px solid rgba(33,158,188,0.45)",
              borderRadius: "8px",
              padding: "14px 34px",
              fontFamily: "'Kalam', cursive",
              fontSize: "clamp(15px, 2vw, 19px)",
              fontWeight: 700,
              color: "#F0F4F8",
              cursor: "none",
              backdropFilter: "blur(14px)",
              boxShadow: "4px 4px 0 rgba(33,158,188,0.12)",
            }}
          >
            Contact Me ✉️
          </motion.button>
        </motion.div>

        {/* Doodle tags below buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "28px",
          }}
        >
          {[
            "✦ Open to Work",
            "✦ Based in Bandung",
            "✦ Available Freelance",
          ].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4 + i * 0.12 }}
              whileHover={{ rotate: -2, scale: 1.05 }}
              style={{
                fontFamily: "'Kalam', cursive",
                fontSize: "12px",
                color: "rgba(139,163,199,0.6)",
                padding: "4px 14px",
                border: "2px dashed rgba(255,195,0,0.18)",
                borderRadius: "6px",
                background: "rgba(255,195,0,0.03)",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "'Kalam', cursive",
            fontSize: "12px",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.12em",
          }}
        >
          scroll ↓
        </span>

        <motion.svg
          animate={{ y: [0, 9, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
        >
          <path
            d="M11 2 Q18 2 18 9 L18 25 Q18 32 11 32 Q4 32 4 25 L4 9 Q4 2 11 2"
            stroke="rgba(255,195,0,0.3)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <motion.circle
            cx="11"
            cy="9"
            r="3"
            fill="rgba(255,195,0,0.7)"
            animate={{ cy: [9, 21, 9] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.div>

      {/* keyframe styles */}
      <style>{`
        @keyframes float-y {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}

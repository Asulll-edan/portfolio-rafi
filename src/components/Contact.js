"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
// import {Instagram, Linkedin, Github, Mail} from 'lucide-react';

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Asulll-edan",
    color: "#F0F4F8",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 .5C5.648.5.5 5.648.5 12a11.5 11.5 0 0 0 7.86 10.924c.575.106.785-.25.785-.556 0-.274-.01-1-.015-1.962-3.197.695-3.872-1.54-3.872-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.045-.714.08-.7.08-.7 1.156.082 1.764 1.188 1.764 1.188 1.027 1.76 2.695 1.252 3.352.957.104-.744.402-1.252.732-1.54-2.553-.29-5.237-1.277-5.237-5.684 0-1.256.45-2.283 1.188-3.087-.12-.29-.515-1.46.112-3.045 0 0 .968-.31 3.172 1.18a10.95 10.95 0 0 1 5.776 0c2.203-1.49 3.17-1.18 3.17-1.18.63 1.585.234 2.755.115 3.045.74.804 1.186 1.83 1.186 3.087 0 4.418-2.688 5.39-5.25 5.675.414.356.782 1.06.782 2.137 0 1.543-.014 2.787-.014 3.167 0 .31.206.668.79.555A11.502 11.502 0 0 0 23.5 12C23.5 5.648 18.352.5 12 .5Z" />
      </svg>
    ),
  },

  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-sultan-rafi-6b263138a/",
    color: "#0A66C2",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.5 8h4V24h-4V8zm7 0h3.84v2.16h.06c.54-1.02 1.86-2.1 3.82-2.1 4.08 0 4.84 2.68 4.84 6.16V24h-4v-7.02c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.83-2.7 3.72V24h-4V8z" />
      </svg>
    ),
  },

  {
    label: "Instagram",
    href: "https://instagram.com/msrfi_",
    color: "#E4405F",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4zm8.75 1a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
      </svg>
    ),
  },

  {
    label: "Email",
    href: "mailto:muhsulrafi32@gmail.com",
    color: "#FFC300",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.4-.5L12 11l7.6-6H4.4zM20 7.2l-7.37 5.82a1 1 0 0 1-1.26 0L4 7.2v11.3a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [ripple, setRipple] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleButtonClick = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 600);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(0,29,61,0.5)",
    border: "1px solid rgba(255,195,0,0.12)",
    borderRadius: "10px",
    padding: "14px 16px",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "14px",
    color: "#F0F4F8",
    outline: "none",
    backdropFilter: "blur(8px)",
    transition: "border-color 0.2s, box-shadow 0.2s",
    resize: "none",
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        backgroundColor: "var(--bg-main)",
        padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG glow */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,195,0,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "12px",
              color: "var(--accent-cyan)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            04 / Contact
          </span>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "#F0F4F8",
              marginTop: "8px",
              letterSpacing: "-0.02em",
            }}
          >
            Let's{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFC300, #219EBC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Build Together
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(14px, 2vw, 16px)",
              color: "var(--text-muted)",
              marginTop: "16px",
              maxWidth: "500px",
              margin: "16px auto 0",
              lineHeight: 1.7,
            }}
          >
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something remarkable together.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Name */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,195,0,0.4)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255,195,0,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,195,0,0.12)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,195,0,0.4)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255,195,0,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,195,0,0.12)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  style={{ ...inputStyle }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255,195,0,0.4)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255,195,0,0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,195,0,0.12)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                onClick={handleButtonClick}
                whileHover={
                  status !== "loading"
                    ? { scale: 1.02, boxShadow: "0 0 30px rgba(255,195,0,0.4)" }
                    : {}
                }
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                disabled={status === "loading"}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background:
                    status === "success"
                      ? "rgba(34,197,94,0.2)"
                      : status === "error"
                        ? "rgba(239,68,68,0.2)"
                        : "linear-gradient(135deg, #FFC300, #FFD60A)",
                  border:
                    status === "success"
                      ? "1px solid rgba(34,197,94,0.4)"
                      : status === "error"
                        ? "1px solid rgba(239,68,68,0.4)"
                        : "none",
                  borderRadius: "10px",
                  padding: "16px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  color:
                    status === "idle" || status === "loading"
                      ? "#001D3D"
                      : "#F0F4F8",
                  cursor: status === "loading" ? "not-allowed" : "none",
                  marginTop: "8px",
                  width: "100%",
                  transition: "all 0.3s",
                }}
              >
                {/* Ripple */}
                {ripple && (
                  <span
                    style={{
                      position: "absolute",
                      left: ripple.x,
                      top: ripple.y,
                      width: "10px",
                      height: "10px",
                      marginLeft: "-5px",
                      marginTop: "-5px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.3)",
                      animation: "ripple 0.6s linear",
                      pointerEvents: "none",
                    }}
                  />
                )}

                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ animation: "spin-slow 0.8s linear infinite" }}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="60"
                          strokeDashoffset="40"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sending...
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ color: "#4ade80" }}
                    >
                      ✓ Pesan terkirim!
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ color: "#f87171" }}
                    >
                      ✕ Gagal kirim, coba lagi
                    </motion.span>
                  )}
                  {status === "idle" && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Send Message →
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* Social & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Quick info */}
            <div
              style={{
                background: "rgba(0,53,102,0.2)",
                border: "1px solid rgba(255,195,0,0.1)",
                borderRadius: "16px",
                padding: "28px",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#F0F4F8",
                  marginBottom: "20px",
                  letterSpacing: "-0.01em",
                }}
              >
                Quick Info
              </h3>

              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#FF0000"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25
                       7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 
                       9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                    </svg>
                  ),
                  label: "Location",
                  value: "Indonesia",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#219EBC"
                    >
                     <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zm2.4-.5L12 11l7.6-6H4.4zM20 7.2l-7.37 5.82a1 1 0 0 1-1.26 0L4 7.2v11.3a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.2z" />
                    </svg>
                  ),
                  label: "Email",
                  value: "muhsulrafi32@gmail.com",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#FFC300"
                    >
                      <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zm0 11L5.5
                       9.82v3.68c0 2.49 2.24 4.5 6.5 4.5s6.5-2.01 6.5-4.5V9.82L12 13z" />
                    </svg>
                  ),
                  label: "School time",
                  value: "While busy, and no open Gmail",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{item.icon}</span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "13px",
                        color: "#F0F4F8",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <h3
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Find me on
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(0,53,102,0.25)",
                      border: "1px solid rgba(255,195,0,0.08)",
                      borderRadius: "10px",
                      padding: "12px 16px",
                      textDecoration: "none",
                      cursor: "none",
                      backdropFilter: "blur(8px)",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <span style={{ color: social.color }}>{social.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#F0F4F8",
                      }}
                    >
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

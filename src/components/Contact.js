"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, Mail, BookOpen, GitHub, Linkedin, Instagram } from "react-feather";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Asulll-edan",
    color: "#333333",
    icon: <GitHub size={20} />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-sultan-rafi-6b263138a/",
    color: "#0A66C2",
    icon: <Linkedin size={20} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/msrfi_",
    color: "#E4405F",
    icon: <Instagram size={20} />,
  },
  {
    label: "Email",
    href: "mailto:muhsulrafi32@gmail.com",
    color: "#FFC300",
    icon: <Mail size={20} />,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

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

  const inputStyle = (field) => ({
    width: "100%",
    background: "var(--bg-card)",
    border: `1px solid ${focusedField === field ? "var(--accent-primary)" : "var(--border-color)"}`,
    borderRadius: "12px",
    padding: "14px 16px",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    color: "var(--text-primary)",
    outline: "none",
    transition: "all 0.2s ease",
    resize: "none",
  });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: "clamp(80px, 12vw, 140px) clamp(20px, 5vw, 80px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--accent-primary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>Contact</span>

          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginTop: "12px",
            letterSpacing: "-0.02em",
          }}>
            Let's <span className="gradient-text">Work Together</span>
          </h2>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2vw, 17px)",
            color: "var(--text-secondary)",
            marginTop: "16px",
            maxWidth: "600px",
            margin: "16px auto 0",
            lineHeight: 1.7,
          }}>
            Have an idea or project you'd like to collaborate on? Or just want to chat? 
            Feel free to reach out!
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          alignItems: "start",
        }}>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Name */}
              <div>
                <label style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}>Name</label>
                <input
                  type="text" 
                  name="name" 
                  value={form.name}
                  onChange={handleChange} 
                  placeholder="Your name" 
                  required
                  style={inputStyle("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}>Email</label>
                <input
                  type="email" 
                  name="email" 
                  value={form.email}
                  onChange={handleChange} 
                  placeholder="your@email.com" 
                  required
                  style={inputStyle("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}>Message</label>
                <textarea
                  name="message" 
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required 
                  rows={6}
                  style={inputStyle("message")}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                disabled={status === "loading"}
                style={{
                  background:
                    status === "success" ? "#10b981"
                    : status === "error" ? "#ef4444"
                    : "var(--accent-primary)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px",
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#ffffff",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  width: "100%",
                  transition: "all 0.2s ease",
                }}
              >
                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <motion.span 
                      key="loading" 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                        style={{ animation: "spin 0.8s linear infinite" }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
                          strokeDasharray="60" strokeDashoffset="40" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ✓ Message sent!
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ✕ Failed to send
                    </motion.span>
                  )}
                  {status === "idle" && (
                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            {/* Contact Info */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              padding: "28px",
            }}>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px",
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "20px",
              }}>Contact Info</h3>

              {[
                {
                  icon: <MapPin size={18} color="#FF6B6B" />,
                  label: "Location",
                  value: "Bandung, Indonesia",
                },
                {
                  icon: <Mail size={18} color="#FFC300" />,
                  label: "Email",
                  value: "muhsulrafi32@gmail.com",
                },
                {
                  icon: <BookOpen size={18} color="#219EBC" />,
                  label: "Availability",
                  value: "Open for opportunities",
                },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: i < 2 ? "1px solid var(--border-color)" : "none",
                }}>
                  <span>{item.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "4px",
                    }}>{item.label}</div>
                    <div style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <h3 style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}>Connect With Me</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      textDecoration: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span style={{ color: social.color }}>{social.icon}</span>
                    <span style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                    }}>{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

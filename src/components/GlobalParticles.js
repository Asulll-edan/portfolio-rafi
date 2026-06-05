'use client';

import { useEffect, useRef } from 'react';

export default function GlobalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const getPageHeight = () => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = getPageHeight();
    };

    // Tunggu konten load dulu
    setTimeout(resize, 500);
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 60 : 150;

    const initParticles = () => {
      const h = getPageHeight();
      return Array.from({ length: COUNT }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * h,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.6 + 0.2),
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.5 + 0.15,
        color: Math.random() > 0.5 ? '#FFC300' : '#219EBC',
      }));
    };

    let particles = initParticles();

    const cubes = isMobile ? [] : (() => {
      const h = getPageHeight();
      return Array.from({ length: 8 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * h,
        size: 20 + Math.random() * 40,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        color: Math.random() > 0.5 ? 'rgba(255,195,0,0.1)' : 'rgba(33,158,188,0.1)',
        floatY: Math.random() * Math.PI * 2,
        floatSpeed: 0.008 + Math.random() * 0.008,
      }));
    })();

    const drawCube = (x, y, size, rot, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      const off = size * 0.35;
      ctx.strokeRect(-size / 2 + off, -size / 2 - off, size, size);
      [[-size/2,-size/2],[size/2,-size/2],[size/2,size/2],[-size/2,size/2]].forEach(([cx,cy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + off, cy - off);
        ctx.stroke();
      });
      ctx.restore();
    };

    const animate = () => {
      const h = getPageHeight();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cubes
      cubes.forEach((c) => {
        c.rot += c.rotSpeed;
        c.floatY += c.floatSpeed;
        drawCube(c.x, c.y + Math.sin(c.floatY) * 6, c.size, c.rot, c.color);
      });

      // Particles naik dari bawah ke atas
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        // Reset ke paling bawah halaman
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
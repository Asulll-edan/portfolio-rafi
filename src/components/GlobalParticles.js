'use client';

import { useEffect, useRef } from 'react';

export default function GlobalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 40 : 100;

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.5 + 0.2),
      speedX: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.5 ? '#FFC300' : '#219EBC',
    }));

    const cubes = isMobile ? [] : Array.from({ length: 6 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 20 + Math.random() * 40,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      color: Math.random() > 0.5 ? 'rgba(255,195,0,0.12)' : 'rgba(33,158,188,0.12)',
      floatY: Math.random() * Math.PI * 2,
      floatSpeed: 0.008 + Math.random() * 0.008,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
    }));

    const drawCube = (x, y, size, rot, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      const off = size * 0.35;
      ctx.strokeRect(-size / 2 + off, -size / 2 - off, size, size);
      const corners = [
        [-size/2, -size/2], [size/2, -size/2],
        [size/2, size/2],   [-size/2, size/2],
      ];
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + off, cy - off);
        ctx.stroke();
      });
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cubes.forEach((c) => {
        c.rot += c.rotSpeed;
        c.floatY += c.floatSpeed;
        c.x += c.driftX;
        c.y += c.driftY;
        if (c.x < -100) c.x = window.innerWidth + 100;
        if (c.x > window.innerWidth + 100) c.x = -100;
        if (c.y < -100) c.y = window.innerHeight + 100;
        if (c.y > window.innerHeight + 100) c.y = -100;
        drawCube(c.x, c.y + Math.sin(c.floatY) * 6, c.size, c.rot, c.color);
      });

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
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
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.8,
      }}
    />
  );
}
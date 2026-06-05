'use client';

import { useEffect, useRef } from 'react';

export default function GlobalParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let pageHeight = 0;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      canvas.height = pageHeight;
    };

    updateSize();
    setTimeout(updateSize, 1000);
    window.addEventListener('resize', updateSize);

    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 50 : 120;

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * pageHeight,
      size: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.5 + 0.15),
      speedX: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#FFC300' : '#219EBC',
    }));

    const CUBE_COUNT = isMobile ? 0 : 7;
    const cubes = Array.from({ length: CUBE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * pageHeight,
      size: 18 + Math.random() * 35,
      rot: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.007,
      color: Math.random() > 0.5
        ? 'rgba(255,195,0,0.13)'
        : 'rgba(33,158,188,0.13)',
      floatY: Math.random() * Math.PI * 2,
      floatSpeed: 0.007 + Math.random() * 0.007,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
    }));

    const drawCube = (x, y, size, rot, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      // Front face
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      // Back face
      const off = size * 0.35;
      ctx.strokeRect(-size / 2 + off, -size / 2 - off, size, size);
      // Connect corners
      [
        [-size/2, -size/2],
        [size/2,  -size/2],
        [size/2,   size/2],
        [-size/2,  size/2],
      ].forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + off, cy - off);
        ctx.stroke();
      });
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cubes
      cubes.forEach((c) => {
        c.rot += c.rotSpeed;
        c.floatY += c.floatSpeed;
        c.x += c.driftX;
        c.y += c.driftY;

        if (c.x < -80) c.x = window.innerWidth + 80;
        if (c.x > window.innerWidth + 80) c.x = -80;
        if (c.y < -80) c.y = pageHeight + 80;
        if (c.y > pageHeight + 80) c.y = -80;

        drawCube(
          c.x,
          c.y + Math.sin(c.floatY) * 6,
          c.size, c.rot, c.color
        );
      });

      // Draw particles (naik dari bawah ke atas)
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = pageHeight + 10;
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
      window.removeEventListener('resize', updateSize);
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
        zIndex: 1,
        opacity: 0.75,
      }}
    />
  );
}
'use client';

import { useRef, useEffect } from 'react';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    let scene, camera, renderer, particles, geometry1, geometry2;

    const init = async () => {
      const THREE = await import('three');

      const canvas = canvasRef.current;
      if (!canvas) return;

      const isMobile = window.innerWidth < 768;
      const PARTICLE_COUNT = isMobile ? 50 : 200;

      // Renderer
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      // Particles
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);
      const sizes = new Float32Array(PARTICLE_COUNT);

      const colorGold = new THREE.Color('#FFC300');
      const colorCyan = new THREE.Color('#219EBC');

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

        const c = Math.random() > 0.5 ? colorGold : colorCyan;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        sizes[i] = Math.random() * 3 + 1;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });

      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Floating torus
      if (!isMobile) {
        const torusGeo = new THREE.TorusGeometry(1.2, 0.02, 8, 60);
        const torusMat = new THREE.MeshBasicMaterial({
          color: 0x219EBC,
          transparent: true,
          opacity: 0.15,
          wireframe: true,
        });
        geometry1 = new THREE.Mesh(torusGeo, torusMat);
        geometry1.position.set(3.5, 0, -1);
        scene.add(geometry1);

        // Octahedron
        const octaGeo = new THREE.OctahedronGeometry(0.8, 0);
        const octaMat = new THREE.MeshBasicMaterial({
          color: 0xFFC300,
          transparent: true,
          opacity: 0.08,
          wireframe: true,
        });
        geometry2 = new THREE.Mesh(octaGeo, octaMat);
        geometry2.position.set(-3.5, 0.5, -1);
        scene.add(geometry2);
      }

      // Mouse parallax
      let mouseX = 0, mouseY = 0;
      const handleMouse = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', handleMouse);

      // Resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      // Animate
      const animate = (time) => {
        animId = requestAnimationFrame(animate);
        const t = time * 0.001;

        if (particles) {
          particles.rotation.y = t * 0.04 + mouseX * 0.05;
          particles.rotation.x = t * 0.02 + mouseY * 0.03;
        }

        if (geometry1) {
          geometry1.rotation.x = t * 0.3;
          geometry1.rotation.y = t * 0.2;
        }

        if (geometry2) {
          geometry2.rotation.x = -t * 0.25;
          geometry2.rotation.z = t * 0.15;
          geometry2.position.y = 0.5 + Math.sin(t * 0.8) * 0.3;
        }

        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;

        renderer.render(scene, camera);
      };
      animate(0);

      // Cleanup
      return () => {
        window.removeEventListener('mousemove', handleMouse);
        window.removeEventListener('resize', handleResize);
      };
    };

    const cleanup = init();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
      cleanup.then(fn => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
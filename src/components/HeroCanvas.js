'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 50 : 200;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particles
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const colorGold = new THREE.Color('#FFC300');
    const colorCyan = new THREE.Color('#219EBC');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = Math.random() > 0.5 ? colorGold : colorCyan;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
canvas.width = 64; canvas.height = 64;
const ctx = canvas.getContext('2d');
const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
gradient.addColorStop(0, 'rgba(255,255,255,1)');
gradient.addColorStop(1, 'rgba(255,255,255,0)');
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(32, 32, 32, 0, Math.PI * 2);
ctx.fill();
const particleTex = new THREE.CanvasTexture(canvas);

const particleMat = new THREE.PointsMaterial({
  size: isMobile ? 0.08 : 0.12,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true,
  map: particleTex,
  alphaTest: 0.01,
  depthWrite: false,
});

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Rotating wireframe geometries
    const geometries = [];

    if (!isMobile) {
      const geoData = [
        { geo: new THREE.OctahedronGeometry(1.5, 0), pos: [-3, 1, -2], color: '#FFC300', speed: 0.003 },
        { geo: new THREE.IcosahedronGeometry(0.8, 0), pos: [3.5, -1, -1], color: '#219EBC', speed: 0.005 },
        { geo: new THREE.TetrahedronGeometry(1, 0), pos: [2, 2, -3], color: '#FFC300', speed: 0.004 },
      ];

      geoData.forEach(({ geo, pos, color, speed }) => {
        const mat = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.15,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...pos);
        mesh.userData.speed = speed;
        scene.add(mesh);
        geometries.push(mesh);
      });
    }

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let animId;
    let frame = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      // Rotate particle
const positions = particleGeo.attributes.position.array;
for (let i = 0; i < PARTICLE_COUNT; i++) {
  positions[i * 3 + 1] += 0.005; // naik ke atas
  if (positions[i * 3 + 1] > 10) {
    positions[i * 3 + 1] = -10; // reset ke bawah
  }
}
particleGeo.attributes.position.needsUpdate = true;

      // Lerp camera to mouse
      camera.position.x += (mouseX - camera.position.x) * 0.03;
      camera.position.y += (-mouseY - camera.position.y) * 0.03;

      // Rotate geometries
      geometries.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.speed;
        mesh.rotation.y += mesh.userData.speed * 1.3;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Dispose
      particleGeo.dispose();
      particleMat.dispose();
      geometries.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
}
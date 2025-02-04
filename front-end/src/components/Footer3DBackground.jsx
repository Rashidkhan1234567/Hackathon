import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Footer3DBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, 200);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: 0x1890ff,
      transparent: true,
      opacity: 0.5,
    });

    // Add particles
    for (let i = 0; i < 30; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        Math.random() * 20 - 10,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
      particle.userData = {
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: Math.random() * 0.02 - 0.01,
      };
      particles.add(particle);
    }
    scene.add(particles);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x1890ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation
    const animate = () => {
      particles.children.forEach(particle => {
        particle.rotation.x += particle.userData.rotationSpeed;
        particle.rotation.y += particle.userData.rotationSpeed;
        particle.position.y += particle.userData.speed;

        if (particle.position.y > 5) {
          particle.position.y = -5;
        }
      });

      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, 200);
      camera.aspect = window.innerWidth / 200;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="footer-background" />;
};

export default Footer3DBackground;

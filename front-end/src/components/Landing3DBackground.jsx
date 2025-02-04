import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Landing3DBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      canvas: mountRef.current
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create floating particles instead of text geometries
    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const particleMaterial = new THREE.MeshPhongMaterial({
      color: 0x1890ff,
      transparent: true,
      opacity: 0.6,
      shininess: 100
    });

    // Add particles
    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      particle.position.set(
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20
      );
      
      particle.userData = {
        originalY: particle.position.y,
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        amplitude: Math.random() * 2,
        offset: Math.random() * Math.PI * 2
      };

      particles.add(particle);
    }
    scene.add(particles);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x1890ff, 1);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x722ed1, 1);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    camera.position.z = 30;

    // Animation
    let time = 0;
    const animate = () => {
      time += 0.005;

      particles.children.forEach(particle => {
        // Floating animation
        particle.position.y = particle.userData.originalY + 
          Math.sin(time + particle.userData.offset) * particle.userData.amplitude;
        
        // Rotation
        particle.rotation.x += particle.userData.rotationSpeed;
        particle.rotation.y += particle.userData.rotationSpeed;
        
        // Gentle spiral motion
        const radius = 0.5;
        particle.position.x += Math.sin(time) * radius * particle.userData.speed;
        particle.position.z += Math.cos(time) * radius * particle.userData.speed;

        // Keep particles in bounds
        if (particle.position.y > 20) particle.position.y = -20;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={mountRef} className="landing-background" />;
};

export default Landing3DBackground;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Header3DBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 80, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, 80);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating lines effect
    const lines = new THREE.Group();
    const lineCount = 15;

    for (let i = 0; i < lineCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      const length = Math.random() * 5 + 3;
      
      for (let j = 0; j < length; j++) {
        points.push(
          new THREE.Vector3(
            (j - length/2) * 2,
            Math.sin(j * 0.5) * 0.5,
            Math.random() * 2 - 1
          )
        );
      }
      
      geometry.setFromPoints(points);
      
      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
          color: 0x1890ff,
          transparent: true,
          opacity: 0.5
        })
      );

      line.position.set(
        Math.random() * 40 - 20,
        Math.random() * 4 - 2,
        Math.random() * 4 - 2
      );

      line.userData = {
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: Math.random() * 0.02 - 0.01
      };

      lines.add(line);
    }
    scene.add(lines);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x1890ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 15;

    // Animation
    const animate = () => {
      lines.children.forEach(line => {
        line.rotation.z += line.userData.rotationSpeed;
        line.position.x += line.userData.speed;

        if (line.position.x > 20) {
          line.position.x = -20;
        }
      });

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, 80);
      camera.aspect = window.innerWidth / 80;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="header-background" />;
};

export default Header3DBackground;

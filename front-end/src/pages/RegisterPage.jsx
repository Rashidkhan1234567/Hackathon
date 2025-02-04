import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography, Modal, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { UserOutlined, IdcardOutlined, MailOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "../styles/RegisterPage.css";
import Background3D from '../components/Background3D';
import { loan_request, register } from "../api/controllers/user.controller";

const { Title } = Typography;

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const createParticles = () => {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      }));
    };

    setParticles(createParticles());
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Update mouse position
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Update cursor effects
      const cursorEffect = document.querySelector('.cursor-effect');
      const cursorGlow = document.querySelector('.cursor-glow');
      
      if (cursorEffect && cursorGlow) {
        cursorEffect.style.left = `${e.clientX}px`;
        cursorEffect.style.top = `${e.clientY}px`;
        
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
        
        // Add scale effect when near form elements
        const formElements = document.querySelectorAll('.custom-input, .register-button');
        let isNearElement = false;
        
        formElements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const distance = Math.hypot(
            e.clientX - (rect.left + rect.width/2),
            e.clientY - (rect.top + rect.height/2)
          );
          
          if (distance < 100) {
            isNearElement = true;
            cursorEffect.style.transform = 'translate(-50%, -50%) scale(1.2)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
          }
        });
        
        if (!isNearElement) {
          cursorEffect.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      }

      const pupils = document.querySelectorAll('.pupil');
      pupils.forEach(pupil => {
        const rect = pupil.getBoundingClientRect();
        const x = (rect.left + rect.width / 2);
        const y = (rect.top + rect.height / 2);
        
        const angle = Math.atan2(e.clientY - y, e.clientX - x);
        const distance = Math.min(5, Math.sqrt(Math.pow(e.clientX - x, 2) + Math.pow(e.clientY - y, 2)) / 20);
        
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const card = document.querySelector('.register-card');
    const container = document.querySelector('.register-container');
    let bounds;
    let requestId;
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const lerp = (start, end, factor = 0.1) => {
      return start + (end - start) * factor;
    };

    const updateCardRotation = () => {
      if (!card) return;

      currentRotation.x = lerp(currentRotation.x, targetRotation.x);
      currentRotation.y = lerp(currentRotation.y, targetRotation.y);

      card.style.transform = `
        perspective(1000px)
        rotateX(${currentRotation.x}deg)
        rotateY(${currentRotation.y}deg)
        translateZ(10px)
      `;

      requestId = requestAnimationFrame(updateCardRotation);
    };

    const rotateElement = (e) => {
      if (!card || !bounds) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      
      const center = {
        x: bounds.width / 2,
        y: bounds.height / 2
      };
      
      const distanceX = leftX - center.x;
      const distanceY = topY - center.y;
      
      targetRotation.x = -(distanceY / center.y) * 10;
      targetRotation.y = (distanceX / center.x) * 10;
    };

    const handleMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.classList.add('tilt-effect');
      document.addEventListener('mousemove', rotateElement);
      requestId = requestAnimationFrame(updateCardRotation);
    };

    const handleMouseLeave = () => {
      document.removeEventListener('mousemove', rotateElement);
      card.classList.remove('tilt-effect');
      
      targetRotation = { x: 0, y: 0 };
      // Allow smooth return to initial position
      requestAnimationFrame(updateCardRotation);
      
      // Clean up animation after return to initial position
      setTimeout(() => {
        cancelAnimationFrame(requestId);
        currentRotation = { x: 0, y: 0 };
        card.style.transform = `
          perspective(1000px)
          rotateX(0deg)
          rotateY(0deg)
          translateZ(0px)
        `;
      }, 300);
    };

    if (card && container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('mousemove', rotateElement);
      cancelAnimationFrame(requestId);
    };
  }, []);

  // Add 3D mouse tracking
  useEffect(() => {
    const card = document.querySelector('.register-card');
    const glowEffect = document.querySelector('.glow-effect-3d');

    const handleMouseMove = (e) => {
      if (!card || !glowEffect) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Update CSS variables for glow effect
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);

      // Calculate tilt
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
      const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 5;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(10px)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Add container tilt effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const rotateX = (clientY / innerHeight - 0.5) * -20;
      const rotateY = (clientX / innerWidth - 0.5) * 20;

      container.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
      `;

      const xOffset = (clientX / innerWidth - 0.5) * 50;
      const yOffset = (clientY / innerHeight - 0.5) * 50;
      container.style.setProperty('--x-offset', `${xOffset}px`);
      container.style.setProperty('--y-offset', `${yOffset}px`);
    };

    const handleMouseLeave = () => {
      container.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
      `;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const formItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Get loan details from localStorage
      const loanDetails = JSON.parse(localStorage.getItem('loanDetails'));
      const guarantorsDetails = JSON.parse(localStorage.getItem('guarantorsDetails'));
      
     
      // Send registration request with all data
      // const result = await register(loanDetails);
      const result = await loan_request(guarantorsDetails);
      

      if (result.success) {
        // Clear localStorage after successful registration
        // localStorage.removeItem('loanDetails');
        // localStorage.removeItem('guarantorsDetails');

        Modal.success({
          title: (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircleOutlined style={{ 
                color: '#52c41a', 
                fontSize: 32,
                filter: 'drop-shadow(0 2px 4px rgba(82, 196, 26, 0.2))'
              }} />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginLeft: 12 }}
              >
                Registration Successful!
              </motion.span>
            </motion.div>
          ),
          content: (
            <motion.div 
              className="success-modal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p>Thank you for registering with us!</p>
              <p>Please check your inbox for login credentials.</p>
            </motion.div>
          ),
          onOk: () => navigate('/login'),
          okText: "Go to Login",
          className: "custom-modal"
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      message.error({
        content: error.message || "Registration failed. Please check your details and try again.",
        className: "custom-message-error",
        duration: 5
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="register-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Background3D />
      {/* Add cursor effects */}
      <div className="cursor-effect" />
      <div className="cursor-glow" />

      {/* Add particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100],
            z: [0, 50],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
        />
      ))}

      <motion.div 
        className="register-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        whileHover={{ translateZ: 30 }}
      >
        <div className="glow-effect-3d" />
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Title level={2} className="register-title">Create Account</Title>
        </motion.div>

        <Form 
          form={form}
          onFinish={handleSubmit} 
          layout="vertical"
          className="register-form form-item-3d"
        >
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Enter your full name"
                className="custom-input"
              />
            </Form.Item>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <Form.Item
              name="cnic"
              rules={[
                { required: true, message: "Please enter your CNIC" },
                { pattern: /^\d{5}-\d{7}-\d{1}$/, message: "Please enter valid CNIC format (e.g., 12345-1234567-1)" }
              ]}
            >
              <Input 
                prefix={<IdcardOutlined />}
                placeholder="CNIC (e.g., 12345-1234567-1)"
                className="custom-input"
              />
            </Form.Item>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: 'email', message: "Please enter a valid email" }
              ]}
            >
              <Input 
                prefix={<MailOutlined />}
                type="email" 
                placeholder="Enter your email"
                className="custom-input"
              />
            </Form.Item>
          </motion.div>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <Button 
              type="primary" 
              htmlType="submit"
              loading={loading}
              className="register-button"
              block
            >
              Register
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </motion.div>
  );
}

export default RegisterPage;

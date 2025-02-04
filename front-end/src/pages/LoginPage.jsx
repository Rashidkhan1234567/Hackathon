import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { motion } from "framer-motion";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/LoginPage.css";
import Background3D from "../components/Background3D";
import { login } from "../api/controllers/user.controller";

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const formItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // API call simulation
      const result = await login(values);
      if(result.message == "/dashboard" || result.message == "/forget_password"){
        message.success("Login successful!");
        navigate(result.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        message.error(error.response.data.message);
      }else{
        message.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Add particles effect
  useEffect(() => {
    const createParticles = () => {
      return Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 20 + 10,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      }));
    };

    setParticles(createParticles());
  }, []);

  // Enhanced 3D tilt effect
  useEffect(() => {
    const card = document.querySelector(".login-card");
    let bounds;
    let requestId;
    let targetRotation = { x: 0, y: 0, z: 0 };
    let currentRotation = { x: 0, y: 0, z: 0 };

    const lerp = (start, end, factor = 0.1) => start + (end - start) * factor;

    const updateCardRotation = () => {
      if (!card) return;

      currentRotation.x = lerp(currentRotation.x, targetRotation.x);
      currentRotation.y = lerp(currentRotation.y, targetRotation.y);
      currentRotation.z = lerp(currentRotation.z, targetRotation.z);

      const transform = `
        perspective(1000px)
        rotateX(${currentRotation.x}deg)
        rotateY(${currentRotation.y}deg)
        rotateZ(${currentRotation.z}deg)
        translateZ(30px)
      `;

      card.style.transform = transform;
      requestId = requestAnimationFrame(updateCardRotation);
    };

    const handleMouseMove = (e) => {
      if (!card || !bounds) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const percentX = (mouseX - centerX) / (bounds.width / 2);
      const percentY = -((mouseY - centerY) / (bounds.height / 2));

      targetRotation.x = percentY * 20; // Max rotation of 20 degrees
      targetRotation.y = percentX * 20;
      targetRotation.z = percentX * percentY * 5;
    };

    const handleMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      document.addEventListener("mousemove", handleMouseMove);
      requestId = requestAnimationFrame(updateCardRotation);
    };

    const handleMouseLeave = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      targetRotation = { x: 0, y: 0, z: 0 };
    };

    card?.addEventListener("mouseenter", handleMouseEnter);
    card?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card?.removeEventListener("mouseenter", handleMouseEnter);
      card?.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(requestId);
    };
  }, []);

  // Add container tilt effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let bounds;
    let requestId;
    let targetRotation = { x: 0, y: 0, z: 0 };
    let currentRotation = { x: 0, y: 0, z: 0 };

    const lerp = (start, end, factor = 0.05) => start + (end - start) * factor;

    const updateContainerRotation = () => {
      if (!container) return;

      currentRotation.x = lerp(currentRotation.x, targetRotation.x);
      currentRotation.y = lerp(currentRotation.y, targetRotation.y);
      currentRotation.z = lerp(currentRotation.z, targetRotation.z);

      container.style.transform = `
        perspective(1000px)
        rotateX(${currentRotation.x}deg)
        rotateY(${currentRotation.y}deg)
        rotateZ(${currentRotation.z}deg)
      `;

      requestId = requestAnimationFrame(updateContainerRotation);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate rotation based on cursor position
      const rotateY = (clientX / innerWidth - 0.5) * 20;
      const rotateX = (clientY / innerHeight - 0.5) * -20;
      const rotateZ =
        (clientX / innerWidth - 0.5) * (clientY / innerHeight - 0.5) * 5;

      targetRotation = {
        x: rotateX,
        y: rotateY,
        z: rotateZ,
      };

      // Start animation if not already running
      if (!requestId) {
        requestId = requestAnimationFrame(updateContainerRotation);
      }
    };

    const handleMouseLeave = () => {
      targetRotation = { x: 0, y: 0, z: 0 };
    };

    const handleMouseEnter = () => {
      bounds = container.getBoundingClientRect();
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(requestId);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="login-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
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
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="login-card"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        whileHover={{ translateZ: 30 }}
      >
        <div className="glow-effect" />
        <div className="glow-effect-3d" />

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Title level={2} className="login-title">
            Welcome Back
          </Title>
        </motion.div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          className="login-form"
        >
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                className="custom-input"
                size="large"
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
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
                className="custom-input"
                size="large"
              />
            </Form.Item>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={formItemVariants}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-button"
              block
            >
              Login
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import { motion } from "framer-motion";
import { MailOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import Background3D from "../components/Background3D";
import { forget_password } from "../api/controllers/user.controller";
import "../styles/ForgetPasswordPage.css";

const { Title } = Typography;

const ForgetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  // Copy the particles and animation effects from LoginPage
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

  const handleForgetPassword = async (values) => {
    setLoading(true);
    try {
      const response = await forget_password(values);
      if (response.message == "New password sent to your email") {
        message.open({
          type: 'success',
          content: "Password updated successfully! Redirecting to dashboard...",
          duration: 3,
          className: 'custom-message-success'
        });
        
        // Add a slight delay before navigation
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // If response exists but success is false
        throw new Error(response.message || "Failed to update password");
      }
    } catch (error) {
      // Check for specific error messages from backend
      const errorMessage = error.message || "Failed to update password. Please try again.";
      
      message.open({
        type: 'error',
        content: errorMessage,
        duration: 5,
        className: 'custom-message-error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Same animation variants as LoginPage
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

  // Add card tilt effect
  useEffect(() => {
    const card = document.querySelector(".forget-password-card");
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

      targetRotation.x = percentY * 20;
      targetRotation.y = percentX * 20;
      targetRotation.z = percentX * percentY * 5;

      // Update glow effect position
      card.style.setProperty(
        "--mouse-x",
        `${((mouseX - bounds.left) / bounds.width) * 100}%`
      );
      card.style.setProperty(
        "--mouse-y",
        `${((mouseY - bounds.top) / bounds.height) * 100}%`
      );
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

  return (
    <motion.div
      ref={containerRef}
      className="forget-password-container"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Background3D />
      <div className="cursor-effect" />
      <div className="cursor-glow" />

      {/* Particles effect */}
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
        className="forget-password-card"
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
          <Title level={2} className="forget-password-title">
            Reset Password
          </Title>
        </motion.div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleForgetPassword}
          className="forget-password-form"
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
              name="oldPassword"
              rules={[
                { required: true, message: "Please enter your old password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter old password"
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
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please enter your new password" },
              ]}
            >
              <Input.Password
                prefix={<UnlockOutlined />}
                placeholder="Enter new password"
                className="custom-input"
                size="large"
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
              className="forget-password-button"
              block
            >
              Update Password
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default ForgetPasswordPage;

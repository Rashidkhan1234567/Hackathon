import React from "react";
import { Layout, Row, Col, Space, Typography, Divider } from "antd";
import {
  GithubOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  FacebookOutlined,
  BankOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import Footer3DBackground from './Footer3DBackground';

const { Footer } = Layout;
const { Title, Text, Paragraph } = Typography;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      <Footer3DBackground />
      <div className="footer-content">
        <Row gutter={[30, 30]} justify="space-between">
          {/* Company Info */}
          <Col xs={24} sm={24} md={8} lg={8}>
            <div className="footer-logo">
              <BankOutlined className="footer-logo-icon" />
              <div className="footer-logo-text">
                <Title level={4}>Microfinance</Title>
                <Text>Financial Solutions</Text>
              </div>
            </div>
            <Paragraph className="company-description">
              Empowering dreams through flexible and accessible financial
              solutions for a better tomorrow.
            </Paragraph>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5}>Quick Links</Title>
            <ul className="footer-links">
              <li>
                <Link to="/">About Us</Link>
              </li>
              <li>
                <Link to="/">Our Services</Link>
              </li>
              <li>
                <Link to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/">Terms & Conditions</Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5}>Contact Us</Title>
            <ul className="contact-info">
              <li>
                <PhoneOutlined /> +92 123 4567890
              </li>
              <li>
                <MailOutlined /> info@microfinance.com
              </li>
              <li>
                <GlobalOutlined /> www.microfinance.com
              </li>
            </ul>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        {/* Bottom Section */}
        <Row justify="space-between" align="middle" className="footer-bottom">
          <Col xs={24} md={12} className="copyright-text">
            <Text>© 2025 Microfinance Solutions. All rights reserved.</Text>
          </Col>
          <Col xs={24} md={12}>
            <Space size="large" className="social-links">
              <Link
                to="https://github.com/rashidkhan1234567"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon github"
              >
                <GithubOutlined />
              </Link>
              <Link
                href="https://www.linkedin.com/in/rashid-khan-4213ab299/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <LinkedinOutlined />
              </Link>
              <Link
                to="https://www.instagram.com/leovibesx/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
              >
                <InstagramOutlined />
              </Link>
              <Link
                to="https://www.facebook.com/profile.php?id=100051994561410"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook"
              >
                <FacebookOutlined />
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;

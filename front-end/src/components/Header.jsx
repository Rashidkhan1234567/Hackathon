import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { BankOutlined, HomeOutlined, PhoneOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/Header.css';
import Header3DBackground from './Header3DBackground';

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="app-header">
      <Header3DBackground />
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <BankOutlined className="logo-icon" />
          <div className="logo-text">
            <span className="logo-text-main">Microfinance</span>
            <span className="logo-text-sub">Financial Solutions</span>
          </div>
        </Link>
      </div>

      <Menu theme="dark" mode="horizontal" className="nav-menu">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="contact" icon={<PhoneOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>

      <Space className="auth-buttons">
        <Link to="/login">
          <Button type="primary" icon={<UserOutlined />} className="login-btn">
            Login
          </Button>
        </Link>
        <Link to="/admin-login">
          <Button type="default" icon={<LockOutlined />} className="admin-btn">
            Admin
          </Button>
        </Link>
      </Space>
    </Header>
  );
};

export default AppHeader;

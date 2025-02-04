import React from 'react';
import { Spin } from 'antd';
import '../styles/LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <Spin size="large" />
        <p>Processing...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;

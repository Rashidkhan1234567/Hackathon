import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AppHeader from "./components/Header";
import AppFooter from "./components/Footer";
import { ConfigProvider } from "antd";
import { BankOutlined } from "@ant-design/icons";
import "./styles/PageTransition.css";
import WeddingLoanPage from "./pages/LoanPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";

const PageWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Remove initial loader
    const initialLoader = document.querySelector(".initial-loader");
    if (initialLoader) {
      initialLoader.style.opacity = "0";
      setTimeout(() => initialLoader.remove(), 300);
    }

    // Modified to include both "/" and "/loan" paths
    if (location.pathname === "/" || location.pathname === "/loan") {
      document.body.classList.add("loading");
      // Add root loaded class
      document.getElementById("root").classList.add("loaded");

      const timer = setTimeout(() => {
        setIsLoading(false);
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
      }, 1500); // Increased time for better animation visibility

      return () => {
        clearTimeout(timer);
        document.body.classList.remove("loading", "loaded");
      };
    }
  }, [location]);

  // Modified to include both "/" and "/loan" paths
  if (location.pathname !== "/" && location.pathname !== "/loan") {
    return children;
  }

  return (
    <div className={`page-wrapper ${isLoading ? "loading" : "animate-in"}`}>
      <div className="loading-overlay">
        <div className="loading-logo">
          <div className="loading-icon">
            <BankOutlined />
          </div>
          <div className="loading-text">
            Microfinance
            <div className="loading-subtext">Financial Solutions</div>
          </div>
        </div>
      </div>
      {!isLoading && <div className="content-wrapper">{children}</div>}
    </div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  return (
    <ConfigProvider>
      <Router>
        <PageWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <div className="home-container">
                  <AppHeader />
                  <LandingPage />
                  <AppFooter />
                </div>
              }
            />
            <Route
              path="/loan"
              element={
                <div className="home-container">
                  <AppHeader />
                  <WeddingLoanPage />
                  <AppFooter />
                </div>
              }
            />
            <Route path="/login" element={
              <div className="home-container">
              {/* <AppHeader /> */}
              <LoginPage />
              {/* <AppFooter /> */}
            </div>
              } />
            <Route path="/register" element={
              <div className="home-container">
              {/* <AppHeader /> */}
              <RegisterPage />
              {/* <AppFooter /> */}
            </div>
              } />
            <Route path="/forget_password" element={
              <div className="home-container">
              {/* <AppHeader /> */}
              <ForgetPasswordPage />
              {/* <AppFooter /> */}
            </div>
              } />
          </Routes>
        </PageWrapper>
      </Router>
    </ConfigProvider>
  );
};

export default App;

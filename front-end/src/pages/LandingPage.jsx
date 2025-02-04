import { useEffect, useState } from 'react'; 
import { Layout, Typography, Card, Row, Col, List, Button, Spin, message } from 'antd';
import { HomeOutlined, ShopOutlined, BankOutlined, ReadOutlined, ArrowRightOutlined, ThunderboltOutlined, SecurityScanOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import LoadingOverlay from '../components/LoadingOverlay';
import Landing3DBackground from '../components/Landing3DBackground';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCardIndex, setLoadingCardIndex] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    // Add entrance class to body for background animation
    document.body.classList.add('page-loaded');
    return () => document.body.classList.remove('page-loaded');
  }, []);

  const loanCategories = [
    {
      title: "Wedding Loans",
      icon: <BankOutlined className="category-icon" />,
      maxLoan: 500000,
      loanPeriod: 3,
      description: "Start your new life journey with our flexible wedding loans",
      subCategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      gradient: "wedding-gradient",
      themeColor: "#4F46E5"
    },
    {
      title: "Home Construction Loans",
      icon: <HomeOutlined className="category-icon home" />,
      maxLoan: 1000000,
      loanPeriod: 5,
      description: "Build your dream home with our construction financing options",
      subCategories: ["Structure", "Finishing", "Loan"],
      gradient: "home-gradient"
    },
    {
      title: "Business Startup Loans",
      icon: <ShopOutlined className="category-icon business" />,
      maxLoan: 1000000,
      loanPeriod: 5,
      description: "Transform your business ideas into reality",
      subCategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
      gradient: "business-gradient"
    },
    {
      title: "Education Loans",
      icon: <ReadOutlined className="category-icon education" />,
      maxLoan: 1000000,
      loanPeriod: 5,
      description: "Invest in your future with our education financing solutions",
      subCategories: ["University Fees", "Child Fees Loan"],
      gradient: "education-gradient"
    }
  ];

  const animateTitle = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} style={{ '--char-index': i }}>
        {char}
      </span>
    ));
  };

  const handleApplyNow = async (e, category, index) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Store loan data immediatelyy
    const { title, maxLoan, loanPeriod, description, subCategories } = category;
    const selectedLoan = { title, maxLoan, loanPeriod, description, subCategories };
    localStorage.setItem('selectedLoan', JSON.stringify(selectedLoan));
    
    // Navigate without delay
    navigate('/loan');
  };

  const handleScroll = (e) => {
    if (window.innerWidth <= 1400) {
      const container = e.target;
      const scrollPosition = container.scrollLeft;
      const cardWidth = 320; // card width + gap
      const newActiveCard = Math.round(scrollPosition / cardWidth);
      setActiveCard(newActiveCard);
    }
  };

  return (
    <Layout className={`modern-layout ${isLoaded ? 'loaded' : ''}`}>
      <Landing3DBackground />
      {pageLoading && <LoadingOverlay />}
      <Content className={loading ? 'page-blur' : ''}>
        <div className="entrance-overlay"></div>
        <div className={`hero-section ${isLoaded ? 'animate-hero' : ''}`}>
          <Title level={1} className="main-title">
            {animateTitle('Welcome to Microfinance Solutions')}
          </Title>
          <Paragraph className="hero-subtitle">
            Empowering dreams through flexible and accessible financial solutions
          </Paragraph>
          <Button type="primary" size="large" className="cta-button">
            Explore Loans <ArrowRightOutlined className="btn-icon" />
          </Button>
        </div>

        <div className="category-section" onScroll={handleScroll}>
          <Row>
            {loanCategories.map((category, index) => (
              <Col key={index} className={`animate-card-entrance delay-${index}`}>
                <Card
                  className={`loan-card ${category.gradient}`}
                  cover={
                    <div className="card-icon-wrapper">
                      {category.icon}
                      <Title level={4} className="icon-title">
                        {category.title}
                      </Title>
                    </div>
                  }
                >
                  <div className="card-content">
                    <Paragraph className="loan-description">
                      {category.description}
                    </Paragraph>
                    
                    <div className="loan-details">
                      <div className="loan-amount">
                        <span className="detail-label">Maximum Loan</span>
                        <h3 className="detail-value">Rs. {category.maxLoan.toLocaleString()}</h3>
                      </div>
                      <div className="loan-period">
                        <span className="detail-label">Duration</span>
                        <h3 className="detail-value">{category.loanPeriod} years</h3>
                      </div>
                    </div>

                    <List
                      className="subcategory-list"
                      dataSource={category.subCategories}
                      renderItem={(item) => (
                        <List.Item className="subcategory-item">
                          <ArrowRightOutlined className="arrow-icon" />
                          <span>{item}</span>
                        </List.Item>
                      )}
                    />
                    
                    <Button 
                      type="primary" 
                      className="apply-button"
                      onClick={(e) => handleApplyNow(e, category, index)}
                    >
                      Apply Now
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            {loanCategories.map((_, index) => (
              <div 
                key={index}
                className={`scroll-dot ${activeCard === index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className={`features-section ${isLoaded ? 'animate-features' : ''}`}>
          <Title level={2} className="section-title">Why Choose Us?</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={8}>
              <Card className="feature-card processing-card">
                <ThunderboltOutlined className="feature-icon" />
                <Title level={4}>Quick Processing</Title>
                <Paragraph>Fast loan approval and disbursement process</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="feature-card flexible-card">
                <SecurityScanOutlined className="feature-icon" />
                <Title level={4}>Flexible Terms</Title>
                <Paragraph>Customizable repayment options to suit your needs</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card className="feature-card support-card">
                <CustomerServiceOutlined className="feature-icon" />
                <Title level={4}>Support</Title>
                <Paragraph>24/7 customer support and guidance</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default LandingPage;

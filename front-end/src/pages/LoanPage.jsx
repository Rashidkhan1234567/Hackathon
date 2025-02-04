import React, { useState, useEffect, useRef } from 'react';
import { Layout, Typography, Form, Input, Button, Select, Row, Col, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/LoanPage.css';
import LoadingOverlay from '../components/LoadingOverlay';
import { motion } from 'framer-motion';
import { UserOutlined, IdcardOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const LoanPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const selectedLoan = JSON.parse(localStorage.getItem('selectedLoan'));
    if (selectedLoan) {
      setLoanData(selectedLoan);
      form.setFieldsValue({
        category: selectedLoan.title,
        maxLoan: selectedLoan.maxLoan,
        loanPeriod: selectedLoan.loanPeriod,
      });
    } else {
      navigate('/register');
    }
  }, [form, navigate]);

  const guarantorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const validateGuarantors = (values) => {
    const guarantor1 = values.guarantor1;
    const guarantor2 = values.guarantor2;

    if (!guarantor1 || !guarantor2) {
      message.error('Both guarantors are required');
      return false;
    }

    if (guarantor1.cnic === guarantor2.cnic) {
      message.error('Guarantors must have different CNICs');
      return false;
    }

    if (guarantor1.email === guarantor2.email) {
      message.error('Guarantors must have different email addresses');
      return false;
    }

    return true;
  };

  const handleSubmit = async (values) => {
    if (!validateGuarantors(values)) return;

    setLoading(true);
    try {
      const loanDetails = {
        ...values,
      };
      
      localStorage.setItem('loanDetails', JSON.stringify(loanDetails));
      message.success('Loan application saved successfully!');
      navigate('/register');
    } catch (error) {
      message.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // Add 3D tilt effect
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
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="loan-page-container">
      <Layout ref={containerRef} className="loan-page">
        {/* Add cursor effects */}
        <div className="cursor-effect" />
        <div className="cursor-glow" />
        <Content className={loading ? 'page-blur' : ''}>
          {loading && (
            <div className="loading-overlay">
              <Spin size="large" />
            </div>
          )}
          <Title level={2} className="page-title">{loanData?.title} Loan Application</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="loan-form"
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              name="amount"
              label="Loan Amount"
              rules={[
                { required: true, message: 'Please enter the loan amount' },
                { validator: (_, value) => 
                    value <= loanData?.maxLoan 
                    ? Promise.resolve() 
                    : Promise.reject(new Error(`Amount cannot exceed Rs. ${loanData?.maxLoan}`))
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="initialAmount"
              label="Initial Amount"
              rules={[{ required: true, message: 'Please enter the initial amount' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="duration"
              label="Duration (Years)"
              rules={[{ required: true, message: 'Please enter the duration' }]}
            >
              <Input type="number" max={loanData?.loanPeriod} />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="subcategory"
              label="Subcategory"
              rules={[{ required: true, message: 'Please select a subcategory' }]}
            >
              <Select>
                {loanData?.subCategories.map((sub, index) => (
                  <Option key={index} value={sub}>{sub}</Option>
                ))}
              </Select>
            </Form.Item>
            <Title level={4} className="guarantor-section-title">Guarantor Information</Title>
          
            {/* Guarantor 1 */}
            <motion.div
              variants={guarantorVariants}
              initial="hidden"
              animate="visible"
              className="guarantor-section"
            >
              <Typography.Text strong>First Guarantor</Typography.Text>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={['guarantor1', 'name']}
                    rules={[{ required: true, message: 'Please enter guarantor name' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Full Name"
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['guarantor1', 'cnic']}
                    rules={[
                      { required: true, message: 'Please enter CNIC' },
                      { pattern: /^\d{5}-\d{7}-\d{1}$/, message: 'Invalid CNIC format' }
                    ]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="CNIC (e.g., 12345-1234567-1)"
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['guarantor1', 'email']}
                    rules={[
                      { required: true, message: 'Please enter email' },
                      { type: 'email', message: 'Invalid email format' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Email Address"
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={['guarantor1', 'location']}
                    rules={[{ required: true, message: 'Please enter complete address' }]}
                  >
                    <Input.TextArea
                      prefix={<HomeOutlined />}
                      placeholder="Complete Address"
                      className="custom-input"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </motion.div>

            {/* Guarantor 2 */}
            <motion.div
              variants={guarantorVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="guarantor-section"
            >
              <Typography.Text strong>Second Guarantor</Typography.Text>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={['guarantor2', 'name']}
                    rules={[{ required: true, message: 'Please enter guarantor name' }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Full Name"
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['guarantor2', 'cnic']}
                    rules={[
                      { required: true, message: 'Please enter CNIC' },
                      { pattern: /^\d{5}-\d{7}-\d{1}$/, message: 'Invalid CNIC format' }
                    ]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="CNIC (e.g., 12345-1234567-1)"
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['guarantor2', 'email']}
                    rules={[
                      { required: true, message: 'Please enter email' },
                      { type: 'email', message: 'Invalid email format' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Email Address"
                      className="custom-input"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name={['guarantor2', 'location']}
                    rules={[{ required: true, message: 'Please enter complete address' }]}
                  >
                    <Input.TextArea
                      prefix={<HomeOutlined />}
                      placeholder="Complete Address"
                      className="custom-input"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button type="primary" htmlType="submit" className="submit-btn" block>
                Submit Application
              </Button>
            </motion.div>
          </Form>
        </Content>
      </Layout>
    </div>
  );
};

export default LoanPage;

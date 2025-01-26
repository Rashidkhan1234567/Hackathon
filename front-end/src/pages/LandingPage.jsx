import React, { useState } from "react";
import { Card, Select, Input, Button, Typography, Form, Slider } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

const categories = [
  {
    title: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: 500000,
    loanPeriod: 3, // in years
  },
  {
    title: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: 1000000,
    loanPeriod: 5, // in years
  },
  {
    title: "Business Startup Loans",
    subcategories: [
      "Buy Stall",
      "Advance Rent for Shop",
      "Shop Assets",
      "Shop Machinery",
    ],
    maxLoan: 1000000,
    loanPeriod: 5, // in years
  },
  {
    title: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    loanPeriod: 4, // in years
  },
];

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [amount, setAmount] = useState(0);
  const [timePeriod, setTimePeriod] = useState(0);
  const [calculatedLoan, setCalculatedLoan] = useState(null);
  const navigate = useNavigate();

  const handleCategoryChange = (value) => {
    const category = categories.find((cat) => cat.title === value);
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setAmount(0);
    setTimePeriod(category?.loanPeriod || 0);
    setCalculatedLoan(null);
  };

  const handleCalculate = () => {
    if (!selectedCategory || !amount || !timePeriod) return;
    if (amount > selectedCategory.maxLoan) {
      alert(
        `Loan amount exceeds the maximum limit of PKR ${selectedCategory.maxLoan}`
      );
      return;
    }
    setCalculatedLoan({
      amount,
      loanPeriod: `${timePeriod} years`,
      monthlyInstallment: (amount / (timePeriod * 12)).toFixed(2),
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #4caf50, #81c784)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          backgroundColor: "#ffffff",
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#4caf50" }}>
          Apply for a Loan
        </Title>
        <Form layout="vertical">
          {/* Select Category */}
          <Form.Item label="Select Category">
            <Select
              placeholder="Choose a category"
              onChange={handleCategoryChange}
              value={selectedCategory?.title || null}
            >
              {categories.map((category) => (
                <Option key={category.title} value={category.title}>
                  {category.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Select Subcategory */}
          {selectedCategory && (
            <Form.Item label="Select Subcategory">
              <Select
                placeholder="Choose a subcategory"
                onChange={(value) => setSelectedSubcategory(value)}
                value={selectedSubcategory || null}
              >
                {selectedCategory.subcategories.map((subcategory) => (
                  <Option key={subcategory} value={subcategory}>
                    {subcategory}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {/* Enter Loan Amount */}
          {selectedCategory && (
            <Form.Item label="Enter Loan Amount">
              <Input
                type="number"
                placeholder={`Maximum PKR ${selectedCategory.maxLoan}`}
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount || ""}
              />
            </Form.Item>
          )}

          {/* Select Time Period */}
          {selectedCategory && (
            <Form.Item label="Select Time Period (Years)">
              <Slider
                min={1}
                max={selectedCategory.loanPeriod}
                onChange={(value) => setTimePeriod(value)}
                value={timePeriod}
                marks={{
                  1: "1 year",
                  [selectedCategory.loanPeriod]: `${selectedCategory.loanPeriod} years`,
                }}
              />
            </Form.Item>
          )}

          {/* Calculate Button */}
          <Form.Item>
            <Button
              type="primary"
              block
              onClick={handleCalculate}
              disabled={!selectedCategory || !amount || !timePeriod}
            >
              Calculate
            </Button>
          </Form.Item>

          {/* Display Calculated Loan Details */}
          {calculatedLoan && (
            <div
              style={{
                padding: "16px",
                border: "1px solid #4caf50",
                borderRadius: "8px",
                marginBottom: "16px",
                backgroundColor: "#f1f8e9",
              }}
            >
              <Text>
                <strong>Loan Amount:</strong> PKR {calculatedLoan.amount}
              </Text>
              <br />
              <Text>
                <strong>Loan Period:</strong> {calculatedLoan.loanPeriod}
              </Text>
              <br />
              <Text>
                <strong>Monthly Installment:</strong> PKR{" "}
                {calculatedLoan.monthlyInstallment}
              </Text>
            </div>
          )}

          {/* Process Button */}
          <Form.Item>
            <Button
              type="default"
              block
              onClick={() => navigate("/guarantors")}
              disabled={!calculatedLoan}
            >
              Process
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LandingPage;

import React from "react";
import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

const LoanSlip = () => {
  const slipDetails = {
    loanType: "Wedding Loan",
    amount: "$10,000",
    duration: "5 Years",
    startDate: "2021-01-01",
    dueDate: "2026-01-01",
    monthlyPayment: "$200",
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <Title level={3}>Loan Payment Slip</Title>
      <Paragraph>
        <strong>Loan Type:</strong> {slipDetails.loanType}
      </Paragraph>
      <Paragraph>
        <strong>Loan Amount:</strong> {slipDetails.amount}
      </Paragraph>
      <Paragraph>
        <strong>Duration:</strong> {slipDetails.duration}
      </Paragraph>
      <Paragraph>
        <strong>Start Date:</strong> {slipDetails.startDate}
      </Paragraph>
      <Paragraph>
        <strong>Due Date:</strong> {slipDetails.dueDate}
      </Paragraph>
      <Paragraph>
        <strong>Monthly Payment:</strong> {slipDetails.monthlyPayment}
      </Paragraph>
      <Button type="primary" style={{ marginTop: 20 }} block>
        Download PDF
      </Button>
    </div>
  );
};

export default LoanSlip;

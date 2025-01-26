import React from "react";
import { Button, Card, Typography, Table } from "antd";

const { Title } = Typography;

const Dashboard = () => {
  const loanData = [
    {
      key: "1",
      loanType: "Wedding Loan",
      amount: "$10,000",
      duration: "5 Years",
      dueDate: "2026-01-01",
      status: "Active",
    },
    {
      key: "2",
      loanType: "Business Loan",
      amount: "$20,000",
      duration: "3 Years",
      dueDate: "2025-05-15",
      status: "Completed",
    },
  ];

  const columns = [
    {
      title: "Loan Type",
      dataIndex: "loanType",
      key: "loanType",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>Dashboard</Title>
      <Card style={{ marginBottom: 20 }}>
        <Title level={4}>Welcome, User!</Title>
        <p>Your current loan details are listed below:</p>
      </Card>
      <Table dataSource={loanData} columns={columns} pagination={false} />
      <Button type="primary" style={{ marginTop: 20 }} block>
        Generate Slip
      </Button>
    </div>
  );
};

export default Dashboard;

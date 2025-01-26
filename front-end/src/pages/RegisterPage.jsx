import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { register } from "../api/controllers/user.controllers";

const { Title } = Typography;

function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { name, cnic, email } = values;
    const response = await register(name, cnic, email)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Register</Title>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="cnic"
          label="CNIC"
          rules={[{ required: true, message: "Please enter CNIC" }]}
        >
          <Input placeholder="Enter CNIC" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input type="email" placeholder="Enter email" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default RegisterPage;

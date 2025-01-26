import React from "react";
import { Form, Input, Button, Row, Col, Typography, Card } from "antd";
import "antd/dist/reset.css";

const { Title } = Typography;

function GuarantorsPage() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Guarantor Details Submitted:", values);
    // API call or any further processing can be done here
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}
    >
      <Col span={16}>
        <Card
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title level={3} style={{ textAlign: "center" }}>
            Guarantors Information
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{}}
            style={{ marginTop: "16px" }}
          >
            <Title level={4}>Guarantor 1</Title>
            <Form.Item
              name="guarantor1Name"
              label="Name"
              rules={[
                { required: true, message: "Please enter guarantor's name" },
              ]}
            >
              <Input placeholder="Enter guarantor's name" />
            </Form.Item>
            <Form.Item
              name="guarantor1Email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Enter guarantor's email" />
            </Form.Item>
            <Form.Item
              name="guarantor1CNIC"
              label="CNIC"
              rules={[
                { required: true, message: "Please enter guarantor's CNIC" },
              ]}
            >
              <Input placeholder="Enter guarantor's CNIC" />
            </Form.Item>
            <Form.Item
              name="guarantor1Location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please enter guarantor's location",
                },
              ]}
            >
              <Input placeholder="Enter guarantor's location" />
            </Form.Item>

            <Title level={4} style={{ marginTop: "24px" }}>
              Guarantor 2
            </Title>
            <Form.Item
              name="guarantor2Name"
              label="Name"
              rules={[
                { required: true, message: "Please enter guarantor's name" },
              ]}
            >
              <Input placeholder="Enter guarantor's name" />
            </Form.Item>
            <Form.Item
              name="guarantor2Email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Enter guarantor's email" />
            </Form.Item>
            <Form.Item
              name="guarantor2CNIC"
              label="CNIC"
              rules={[
                { required: true, message: "Please enter guarantor's CNIC" },
              ]}
            >
              <Input placeholder="Enter guarantor's CNIC" />
            </Form.Item>
            <Form.Item
              name="guarantor2Location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please enter guarantor's location",
                },
              ]}
            >
              <Input placeholder="Enter guarantor's location" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Guarantor Details
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default GuarantorsPage;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth/actions";
import { Card, Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const onFinish = async (values) => {
    try {
      const result = await dispatch(login(values)).unwrap();
      notification.success({ message: "Logged in" });
      navigate("/users");
    } catch (err) {
      notification.error({ message: "Login failed", description: err });
    }
  };

  return (
    <div className="login-root">
      <Card style={{ width: 520 }}>
        <h2 style={{ textAlign: "center" }}>Log in</h2>

        <Form
          name="login"
          initialValues={{ remember: true, email: "eve.holt@reqres.in", password: "cityslicka" }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input password" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

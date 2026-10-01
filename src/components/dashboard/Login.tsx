"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Alert, Typography, message, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loginThunk } from "@/app/store/slices/authSlice";
import type { AppDispatch, RootState } from "@/app/store/store";
import { forgetPassword } from "@/app/api/backend/auth";

const { Text, Title } = Typography;

export const LoginForm = ({ role }: { role: "admin" | "client" }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [showForgot, setShowForgot] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const onLogin = (values: { email: string; password: string }) => {
    dispatch(loginThunk({ ...values, role }));
  };

  const onForgotPassword = async (values: { email: string }) => {
    try {
      setForgotLoading(true);
      await forgetPassword({ email: values.email });
      setForgotLoading(false);
    } catch (err: any) {
      message.error(err?.message || "Failed to send reset link");
    } finally {
      setForgotLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsRedirecting(true);
      router.push(`/dashboard/${role}`);
    }
  }, [isAuthenticated, role, router]);

  // Show loading spinner while redirecting
  if (isRedirecting || (isAuthenticated && !error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Spin size="large" />
        <Text type="secondary">Redirecting to dashboard...</Text>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: error ? 1 : 0,
          marginBottom: error ? 20 : 0,
        }}
      >
        {error && <Alert type="error" showIcon message={error} />}
      </motion.div>

      {!showForgot ? (
        // 🔹 Login Form
        <Form layout="vertical" name="login-form" onFinish={onLogin}>
          <Title level={4}>Sign In</Title>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-primary" />}
              placeholder="example@gmail.com"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-primary" />}
              placeholder="********"
            />
          </Form.Item>

          <Form.Item>
            <Text
              type="secondary"
              className="cursor-pointer hover:text-blue-500"
              onClick={() => setShowForgot(true)}
            >
              Forgot Password?
            </Text>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      ) : (
        // 🔹 Forgot Password Form
        <Form layout="vertical" name="forgot-form" onFinish={onForgotPassword}>
          <Title level={4}>Reset Your Password</Title>
          <Text type="secondary">
            Enter your email address and we'll send you a reset link.
          </Text>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-primary" />}
              placeholder="example@gmail.com"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={forgotLoading}
            >
              Send Reset Link
            </Button>
          </Form.Item>

          <Form.Item>
            <Text
              type="secondary"
              className="cursor-pointer hover:text-blue-500"
              onClick={() => setShowForgot(false)}
            >
              ← Back to Login
            </Text>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default LoginForm;
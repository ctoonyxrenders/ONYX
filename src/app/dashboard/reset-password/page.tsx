"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { resetPassword } from "@/app/api/backend/auth";

const { Title, Text } = Typography;

const ResetPasswordPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onFinish = async (values: { password: string; confirmPassword: string }) => {
        if (values.password !== values.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        setLoading(true);
        try {
            await resetPassword({ token: token as string, newPassword: values.password });
            router.push("/dashboard/login");
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <div className="text-center mb-6">
                    <Title level={3}>Reset Your Password</Title>
                    <Text type="secondary">
                        Please enter your new password below.
                    </Text>
                </div>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                            { required: true, message: "Please enter your new password!" },
                            { min: 6, message: "Password must be at least 6 characters." },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder="Enter new password" />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Passwords do not match!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm new password" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                            disabled={!token}
                        >
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ResetPasswordPage;

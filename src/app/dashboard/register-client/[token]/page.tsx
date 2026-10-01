"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    Typography,
    Row,
    Col,
    Spin,
    Upload,
} from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
    HomeOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { useRouter, useParams } from "next/navigation"; // ✅ useParams instead of useSearchParams
import { RegisterClientBody } from "@/types/api";
import { registerClientApi } from "@/app/api/backend/admin";
import toast from "react-hot-toast";
import { getInviteEmail } from "@/app/api/backend/auth";

const { Title } = Typography;

const RegisterClientPage: React.FC = () => {
    const { token } = useParams<{ token: string }>(); // ✅ get token from URL params

    const [email, setEmail] = useState("");
    const [emailLoading, setEmailLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchEmailFromToken = async () => {
            try {
                setEmailLoading(true);
                console.log("TOKEN", token)
                const res = await getInviteEmail(token as string);
                if (res.success && res.data?.email) {
                    setEmail(res.data.email);
                }
            } catch (err) {
                toast.error("Failed to fetch invitation email.");
            } finally {
                setEmailLoading(false);
            }
        };
        if (token) {
            fetchEmailFromToken();
        }
    }, [token]);

    const onFinish = async (values: RegisterClientBody) => {
        try {
            if (!token) {
                toast.error("Invalid or missing token.");
                return;
            }
            setLoading(true);

            values.token = token as string;
            values.companyLogo = ""; // temporary
            values.profilePic = ""; // temporary

            const payload = {
                ...values,
                role: "client",
            };

            const res = await registerClientApi(payload);
            if (res.success) {
                router.push("/dashboard/login");
            } else {
                toast.error(res.message || "Registration failed.");
            }
        } catch (error: any) {
            console.error("Registration Error:", error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row
            justify="center"
            align="middle"
            style={{ minHeight: "100vh", background: "#f0f2f5" }}
        >
            <Col xs={22} sm={18} md={12} lg={8}>
                <div
                    style={{
                        padding: "2rem",
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                >
                    <Title
                        level={3}
                        style={{ textAlign: "center", marginBottom: "1.5rem" }}
                    >
                        Register Client
                    </Title>

                    <Form layout="vertical" onFinish={onFinish}>
                        {/* Full Name */}
                        <Form.Item
                            name="name"
                            label="Full Name"
                            rules={[{ required: true, message: "Please enter your full name" }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="John Doe" />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item label="Email" required>
                            {emailLoading ? (
                                <Spin />
                            ) : (
                                <>
                                    <Input
                                        prefix={<MailOutlined />}
                                        value={email}
                                        disabled
                                    />
                                    {/* Hidden field to submit email */}
                                    <Form.Item name="email" initialValue={email} hidden>
                                        <Input />
                                    </Form.Item>
                                </>
                            )}
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: "Please enter a password" }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="********" />
                        </Form.Item>

                        {/* Client Picture Upload */}
                        <Form.Item
                            label="Client Profile"
                            name="profilePic"
                            valuePropName="file"
                            getValueFromEvent={(e) => (e.fileList ? [e.fileList[0]] : [])}
                        >
                            <Upload listType="picture-card" beforeUpload={() => false} maxCount={1}>
                                <div>Upload</div>
                            </Upload>
                        </Form.Item>

                        {/* Company Logo Upload */}
                        <Form.Item
                            label="Company Logo"
                            name="companyLogo"
                            valuePropName="file"
                            getValueFromEvent={(e) => (e.fileList ? [e.fileList[0]] : [])}
                        >
                            <Upload listType="picture-card" beforeUpload={() => false} maxCount={1}>
                                <div>Upload</div>
                            </Upload>
                        </Form.Item>

                        {/* Company Name */}
                        <Form.Item
                            name="companyName"
                            label="Company Name"
                            rules={[{ required: true, message: "Please enter your company name" }]}
                        >
                            <Input prefix={<TeamOutlined />} placeholder="Tech Solutions" />
                        </Form.Item>

                        {/* Address */}
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: "Please enter your address" }]}
                        >
                            <Input prefix={<HomeOutlined />} placeholder="123 Main Street, City" />
                        </Form.Item>

                        {/* Phone */}
                        <Form.Item
                            name="phoneNo"
                            label="Phone Number"
                            rules={[{ required: true, message: "Please enter your phone number" }]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="+1234567890" />
                        </Form.Item>

                        {/* Submit */}
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ borderRadius: "8px", height: "45px" }}
                                disabled={loading}
                            >
                                {loading ? <Spin /> : "Register"}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default RegisterClientPage;

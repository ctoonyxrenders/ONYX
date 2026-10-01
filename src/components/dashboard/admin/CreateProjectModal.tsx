'use client';

import { getAllClientsForProjectsApi } from "@/app/api/backend/admin";
import { CreateProjectBody } from "@/types/api";
import { Modal, Form, Input, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const CreateProjectModal = ({
    visible,
    onCancel,
    onCreate,
    loading = false
}: {
    visible: boolean;
    onCancel: () => void;
    onCreate: (values: CreateProjectBody) => void;
    loading?: boolean;
}) => {
    const [clientsList, setClientsList] = useState<
        { id: string; name: string; email: string }[] | undefined
    >([]);

    useEffect(() => {
        const fetchClients = async () => {
            const res = await getAllClientsForProjectsApi();
            if (res.success) {
                setClientsList(
                    res.data?.map((client) => ({
                        id: client._id,
                        name: client.name,
                        email: client.email,
                    }))
                );
            } else {
                console.error("Failed to fetch clients:", res.message);
            }
        };
        fetchClients();
    }, []);

    const [form] = Form.useForm();

    // Function to format date to ISO string
    const formatDateToISO = (dateString?: string): string | null => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString();
    };

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                const formattedValues: CreateProjectBody = {
                    ...values,
                    startDate: formatDateToISO(values.startDate)!, // ✅ always required
                    endDate: values.endDate ? formatDateToISO(values.endDate) : null, // ✅ optional
                    currency: "usd",
                };

                onCreate(formattedValues);
                form.resetFields();
            })
            .catch((info) => {
                console.error("Validation Failed:", info);
            });
    };

    return (
        <Modal
            title="Create New Project"
            open={visible}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={handleOk}
            confirmLoading={loading}
            okType="primary"
            okText="Create"
        >
            <Form form={form} layout="vertical">
                {/* Client */}
                <Form.Item
                    name="clientId"
                    label="Client"
                    rules={[{ required: true, message: "Please select a client" }]}
                >
                    <Select placeholder="Select client">
                        {clientsList?.map((client) => (
                            <Option key={client.id} value={client.id}>
                                {client?.name} ({client.email})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Title */}
                <Form.Item
                    name="title"
                    label="Project Title"
                    rules={[{ required: true, message: "Please enter project title" }]}
                >
                    <Input placeholder="Enter project title" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Please enter project description" }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter project description" />
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Please select status" }]}
                >
                    <Select placeholder="Select status">
                        <Option value="pending">pending</Option>
                        <Option value="completed">completed</Option>
                    </Select>
                </Form.Item>

                {/* Start Date */}
                <Form.Item
                    name="startDate"
                    label="Start Date"
                    rules={[{ required: true, message: "Please select start date" }]}
                >
                    <Input type="date" />
                </Form.Item>

                {/* End Date (optional) */}
                <Form.Item
                    name="endDate"
                    label="End Date"
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const start = getFieldValue("startDate");
                                if (!value) {
                                    return Promise.resolve(); // ✅ allow empty endDate
                                }
                                if (start && new Date(value) <= new Date(start)) {
                                    return Promise.reject(
                                        new Error("End date must be after start date")
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <Input type="date" />
                </Form.Item>

                {/* Budget */}
                <Form.Item
                    name="budget"
                    label="Budget"
                    rules={[{ required: true, message: "Please enter budget" }]}
                >
                    <InputNumber min={0} placeholder="Enter budget" className="w-full" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateProjectModal;

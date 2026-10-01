'use client';

import { getAllClientsForProjectsApi, getClientsApi } from "@/app/api/backend/admin";
import { CreateProject, CreateProjectBody, ProjectApiResponse } from "@/types/api";
import { Modal, Form, Input, Select, InputNumber, Switch, Space, Typography, Divider } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Option } = Select;
const { Text, Title } = Typography;

// Currency options
const currencyOptions = ["$ USD"];

const ViewEditProjectModal = ({
    visible,
    onCancel,
    onUpdate,
    project,
    isEditMode,
    setIsEditMode,
    loading = false
}: {
    visible: boolean;
    onCancel: () => void;
    onUpdate: (values: CreateProjectBody) => void;
    project: ProjectApiResponse | null;
    isEditMode: boolean;
    setIsEditMode: (value: boolean) => void;
    loading?: boolean;
}) => {

    const [clientsList, setClientsList] = useState<{ id: string; name: string; email: string }[] | undefined>([]);


    useEffect(() => {
        const fetchClients = async () => {
            const res = await getAllClientsForProjectsApi();
            if (res.success) {
                setClientsList(res.data?.map(client => ({
                    id: client._id,
                    name: client.name,
                    email: client.email
                })));
            } else {
                console.error("Failed to fetch clients:", res.message);
            }
        }
        fetchClients();
    }, [])

    const [form] = Form.useForm();

    // Reset form when project changes
    useEffect(() => {
        if (project) {
            const formattedStartDate = project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '';
            const formattedEndDate = project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '';

            form.setFieldsValue({
                client: project.clientId?._id,
                title: project.title,
                description: project.description,
                status: project.status,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                budget: project.budget,
                currency: project.currency
            });
        }
    }, [project, form]);

    // Function to format date to ISO string
    const formatDateToISO = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toISOString();
    };

    const handleOk = () => {
        if (!isEditMode) {
            onCancel();
            return;
        }
        form.setFieldValue('clientId', project?.clientId?._id)
        form.validateFields()
            .then(values => {
                console.log("VALUES", values)
                values = {
                    ...values,
                    currency: "usd"
                }
                // Format the dates to ISO string format
                const formattedValues = {
                    ...values,
                    startDate: formatDateToISO(values.startDate),
                    endDate: values.endDate ? formatDateToISO(values.endDate) : null,
                };
                onUpdate(formattedValues);
            })
            .catch(info => {
                console.error("Validation Failed:", info);
            });
    };

    const handleCancel = () => {
        setIsEditMode(false);
        form.resetFields();
        onCancel();
    };

    const toggleMode = (checked: boolean) => {
        setIsEditMode(checked);
    };

    if (!project) return null;

    return (
        <Modal
            title={
                <div className="flex items-center justify-between w-full pr-8">
                    <Title level={4} style={{ margin: 0 }}>
                        {isEditMode ? 'Edit Project' : 'View Project'}
                    </Title>
                    <div className="flex items-center space-x-2 space-y-1">

                        <Switch
                            checked={isEditMode}
                            onChange={toggleMode}
                            checkedChildren="Edit"
                            unCheckedChildren="View"
                            size="default"
                        />

                    </div>
                </div>
            }
            open={visible}
            onCancel={handleCancel}
            onOk={handleOk}
            okText={isEditMode ? "Update" : "Close"}
            cancelText="Cancel"
            confirmLoading={loading}
            width={700}
            style={{ top: 20 }}
        >
            <Divider />

            <Form form={form} layout="vertical" disabled={!isEditMode}>
                <Form.Item
                    name="clientId"
                    label="Client"
                    rules={[{ required: true, message: "Please select a client" }]}
                >

                    <div className="p-2 bg-gray-50 rounded border">
                        <Text strong>
                            {project.clientId?.name} ({project.clientId?.email})
                        </Text>
                    </div>

                </Form.Item>

                <Form.Item
                    name="title"
                    label="Project Title"
                    rules={[{ required: true, message: "Please enter project title" }]}
                >
                    {!isEditMode ? (
                        <div className="p-2 bg-gray-50 rounded border">
                            <Text>{project.title}</Text>
                        </div>
                    ) : (
                        <Input placeholder="Enter project title" />
                    )}
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: "Please enter project description" }]}
                >
                    {!isEditMode ? (
                        <div className="p-2 bg-gray-50 rounded border min-h-[100px]">
                            <Text>{project.description}</Text>
                        </div>
                    ) : (
                        <Input.TextArea rows={4} placeholder="Enter project description" />
                    )}
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Please select status" }]}
                >
                    {!isEditMode ? (
                        <div className="p-2 bg-gray-50 rounded border">
                            <Text className="capitalize">{project.status}</Text>
                        </div>
                    ) : (
                        <Select placeholder="Select status">
                            {/* <Option value="ongoing">Ongoing</Option> */}
                            <Option value="completed">Completed</Option>
                            <Option value="pending">Pending</Option>
                        </Select>
                    )}
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[{ required: true, message: "Please select start date" }]}
                    >
                        {!isEditMode ? (
                            <div className="p-2 bg-gray-50 rounded border">
                                <Text>{new Date(project.startDate).toLocaleDateString()}</Text>
                            </div>
                        ) : (
                            <Input type="date" />
                        )}
                    </Form.Item>

                    <Form.Item
                        name="endDate"
                        label="End Date"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || !getFieldValue('startDate')) {
                                        return Promise.resolve();
                                    }
                                    if (new Date(value) <= new Date(getFieldValue('startDate'))) {
                                        return Promise.reject(new Error('End date must be after start date'));
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        {!isEditMode ? (
                            <div className="p-2 bg-gray-50 rounded border">
                                <Text>{new Date(project.endDate).toLocaleDateString()}</Text>
                            </div>
                        ) : (
                            <Input type="date" />
                        )}
                    </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                        name="budget"
                        label="Budget"
                        rules={[{ required: true, message: "Please enter budget" }]}
                    >
                        {!isEditMode ? (
                            <div className="p-2 bg-gray-50 rounded border">
                                <Text strong>{project.currency} {project.budget?.toLocaleString()}</Text>
                            </div>
                        ) : (
                            <InputNumber min={0} placeholder="Enter budget" className="w-full" />
                        )}
                    </Form.Item>

                    <Form.Item
                        name="currency"
                        label="Currency"
                        rules={[{ required: true, message: "Please select currency" }]}
                    >
                        <div className="p-2 bg-gray-50 rounded border">
                            <Text>{project.currency}</Text>
                        </div>

                    </Form.Item>
                </div>

                {/* Additional Project Info in View Mode */}
                {!isEditMode && (
                    <>
                        <Divider />
                        <div className="bg-gray-50 p-4 rounded">
                            <Title level={5}>Project Information</Title>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <Text type="secondary">Created:</Text>
                                    <br />
                                    <Text>{new Date(project.createdAt).toLocaleDateString()}</Text>
                                </div>
                                <div>
                                    <Text type="secondary">Last Updated:</Text>
                                    <br />
                                    <Text>{new Date(project.updatedAt).toLocaleDateString()}</Text>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default ViewEditProjectModal;
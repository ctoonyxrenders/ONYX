'use client';

import { RootState } from "@/app/store/store";
import { InvoiceContentMessage, Invoice } from "@/types/api";
import {
    CalendarOutlined,
    DollarCircleOutlined,
    FileTextOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { Tag, Modal, Typography, Divider, Spin, Alert } from "antd";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getInvoiceWithId } from "@/app/api/backend/chat";

const { Text, Title } = Typography;

const RenderInvoiceCard = (invoice: InvoiceContentMessage) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState<Invoice | null>(null);

    const handleOpenModal = async () => {
        setIsModalOpen(true);
        setLoading(true);
        try {
            const res = await getInvoiceWithId(invoice._id);
            if (res.success && res.data) {
                setInvoiceDetails(res.data);
                console.log("res", res.data);
            } else {
                console.error("Failed to fetch invoice:", res.message);
            }
        } catch (err) {
            console.error("Error fetching invoice:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setInvoiceDetails(null);
    };

    return (
        <>
            <div
                style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 12,
                    padding: 16,
                    background: "#ffffff",
                    maxWidth: 420,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                }}
            >
                {/* Header: Invoice */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <FileTextOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                    <h3 style={{ margin: 0, fontSize: 16, color: "#1890ff", flex: 1 }}>
                        Invoice
                    </h3>
                </div>

                {/* Button to open modal */}
                <p
                    className="text-blue-600 hover:underline flex items-center cursor-pointer"
                    onClick={handleOpenModal}
                >
                    <InfoCircleOutlined style={{ marginRight: 6 }} /> View Invoice
                </p>
            </div>

            {/* Modal */}
            <Modal
                title={
                    <div className="flex items-center">
                        <FileTextOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                        <span>Invoice Details</span>
                    </div>
                }
                open={isModalOpen}
                onCancel={handleCloseModal}
                footer={null}
                width={600}
            >
                <Divider />

                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <Spin size="large" />
                    </div>
                ) : invoiceDetails ? (
                    invoiceDetails.isDeleted ? (
                        <Alert
                            message="This invoice has been deleted"
                            type="error"
                            showIcon
                        />
                    ) : (
                        <div className="space-y-4">
                            {/* Status */}
                            <div>
                                <Text strong>Status: </Text>
                                <Tag
                                    color={
                                        invoiceDetails.status === "paid"
                                            ? "green"
                                            : invoiceDetails.status === "unpaid"
                                                ? "red"
                                                : "orange"
                                    }
                                >
                                    {invoiceDetails.status?.toUpperCase()}
                                </Tag>
                            </div>

                            {/* Description */}
                            <div>
                                <Title level={5}>Description</Title>
                                <Text>{invoiceDetails.description}</Text>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <CalendarOutlined />
                                    <Text strong>Issued:</Text>
                                    <Text>
                                        {dayjs(invoiceDetails.issueDate).format("MMM D, YYYY")}
                                    </Text>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CalendarOutlined />
                                    <Text strong>Due:</Text>
                                    <Text>
                                        {dayjs(invoiceDetails.dueDate).format("MMM D, YYYY")}
                                    </Text>
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="flex items-center space-x-2">
                                <DollarCircleOutlined style={{ color: "#52c41a" }} />
                                <Text strong>Amount:</Text>
                                <Text>
                                    {invoiceDetails.currency}{" "}
                                    {invoiceDetails.amount?.toLocaleString()}
                                </Text>
                            </div>

                            {/* Project Info */}
                            {invoiceDetails.projectId && (
                                <div className="bg-gray-50 p-3 rounded border">
                                    <Title level={5}>Project Information</Title>
                                    <Text strong>{invoiceDetails.projectId.title}</Text>
                                    <br />
                                    <Text>{invoiceDetails.projectId.description}</Text>
                                </div>
                            )}

                            {/* Metadata */}
                            <Divider />
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <Text type="secondary">Created:</Text>
                                    <br />
                                    <Text>
                                        {dayjs(invoiceDetails.createdAt).format("MMM D, YYYY")}
                                    </Text>
                                </div>
                                <div>
                                    <Text type="secondary">Last Updated:</Text>
                                    <br />
                                    <Text>
                                        {dayjs(invoiceDetails.updatedAt).format("MMM D, YYYY")}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <Text type="secondary">No invoice details found.</Text>
                )}
            </Modal>
        </>
    );
};

export default RenderInvoiceCard;

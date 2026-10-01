'use client';

import { RootState } from "@/app/store/store";
import { ProjectContentMessage, ProjectApiResponse } from "@/types/api";
import {
    CalendarOutlined,
    DollarCircleOutlined,
    InfoCircleOutlined,
    ProjectOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Modal, Typography, Divider, Spin, Alert } from "antd";
import { getProjectWithId } from "@/app/api/backend/chat";

const { Text, Title } = Typography;

const RenderProjectCard = (project: ProjectContentMessage) => {
    const { user } = useSelector((state: RootState) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectDetails, setProjectDetails] = useState<ProjectApiResponse | null>(null);

    const handleOpenModal = async () => {
        setIsModalOpen(true);
        setLoading(true);
        try {
            const res = await getProjectWithId(project._id);
            if (res.success && res.data) {
                setProjectDetails(res.data);
            } else {
                console.error("Failed to fetch project:", res.message);
            }
        } catch (err) {
            console.error("Error fetching project:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setProjectDetails(null);
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
                {/* Title */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <ProjectOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                    <h3 style={{ margin: 0, fontSize: 16, color: "#1890ff" }}>
                        {project.name}
                    </h3>
                </div>

                {/* Button to open modal */}
                <p
                    className="text-blue-600 hover:underline flex items-center cursor-pointer"
                    onClick={handleOpenModal}
                >
                    <InfoCircleOutlined style={{ marginRight: 6 }} /> View Project
                </p>
            </div>

            {/* Modal */}
            <Modal
                title={
                    <div className="flex items-center">
                        <ProjectOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                        <span>Project Details</span>
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
                ) : projectDetails ? (
                    projectDetails.isDeleted ? (
                        <Alert
                            message="This project has been deleted"
                            type="error"
                            showIcon
                        />
                    ) : (
                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <Title level={5}>Title</Title>
                                <Text>{projectDetails.title}</Text>
                            </div>

                            {/* Description */}
                            <div>
                                <Title level={5}>Description</Title>
                                <Text>{projectDetails.description}</Text>
                            </div>

                            {/* Status */}
                            <div>
                                <Title level={5}>Status</Title>
                                <Text>{projectDetails.status}</Text>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <CalendarOutlined />
                                    <Text strong>Start Date:</Text>
                                    <Text>
                                        {dayjs(projectDetails.startDate).format("MMM D, YYYY")}
                                    </Text>
                                </div>
                                {projectDetails.endDate && (
                                    <div className="flex items-center space-x-2">
                                        <CalendarOutlined />
                                        <Text strong>End Date:</Text>
                                        <Text>
                                            {dayjs(projectDetails.endDate).format("MMM D, YYYY")}
                                        </Text>
                                    </div>
                                )}
                            </div>

                            {/* Budget */}
                            <div className="flex items-center space-x-2">
                                <DollarCircleOutlined style={{ color: "#52c41a" }} />
                                <Text strong>Budget:</Text>
                                <Text>
                                    {projectDetails.currency}{" "}
                                    {projectDetails.budget?.toLocaleString()}
                                </Text>
                            </div>

                            {/* Metadata */}
                            <Divider />
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <Text type="secondary">Created:</Text>
                                    <br />
                                    <Text>
                                        {dayjs(projectDetails.createdAt).format("MMM D, YYYY")}
                                    </Text>
                                </div>
                                <div>
                                    <Text type="secondary">Last Updated:</Text>
                                    <br />
                                    <Text>
                                        {dayjs(projectDetails.updatedAt).format("MMM D, YYYY")}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <Text type="secondary">No project details found.</Text>
                )}
            </Modal>
        </>
    );
};

export default RenderProjectCard;

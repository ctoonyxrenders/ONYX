"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Badge,
  Dropdown,
  Space,
  Modal,
  Spin,
  Alert,
  Descriptions,
} from "antd";
import { EyeOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import { getClientProjects } from "@/app/api/backend/client";
import { ClientProject } from "@/types/api";
import { format } from "date-fns";

const ProjectList = () => {
  const [list, setList] = useState<ClientProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ClientProject | null>(null);

  // ✅ Fetch projects with pagination
  const fetchProjects = async (
    currentPage = page,
    currentPageSize = pageSize
  ) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getClientProjects({
        page: currentPage,
        limit: currentPageSize,
      });

      console.log("RESPONSE PROJECTS", res.data)

      if (res.success && res.data) {
        // Expect API to return { data: [...], meta: { totalItems } }
        setList(res.data as ClientProject[]);
        setTotal(res.meta?.totalitems || res.data.length);
      } else {
        setError(res.message || "Failed to fetch projects");
        setList([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Network error while fetching projects");
      setList([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page, pageSize]);

  const getStatus = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge status="success" text="Completed" />;
      case "pending":
        return <Badge status="warning" text="Pending" />;
      default:
        return <Badge status="default" text="Unknown" />;
    }
  };

  const viewDetails = (row: ClientProject) => {
    setSelectedRow(row);
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRow(null);
  };
  const handleRefresh = () => {
    fetchProjects(page, pageSize);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <span className="font-medium">{title || "Untitled"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        let badgeProps = {
          text: status.charAt(0).toUpperCase() + status.slice(1),
          status: "default" as
            | "success"
            | "error"
            | "processing"
            | "default"
            | "warning",
          className:
            "capitalize min-w-[130px] text-center rounded-full px-4 py-1.5 text-sm font-medium flex items-center justify-center border shadow-sm",
        };

        switch (status.toLowerCase()) {
          case "ongoing":
            badgeProps = {
              ...badgeProps,
              status: "processing",
              className:
                badgeProps.className +
                " border-blue-300 bg-blue-50 text-blue-700",
            };
            break;
          case "completed":
            badgeProps = {
              ...badgeProps,
              status: "success",
              className:
                badgeProps.className +
                " border-green-300 bg-green-50 text-green-700",
            };
            break;
          case "pending":
            badgeProps = {
              ...badgeProps,
              status: "warning",
              className:
                "capitalize w-[130px] rounded-full px-2 py-2 text-sm font-medium flex items-center justify-center border border-yellow-300 bg-yellow-50 text-yellow-700",
            };
            break;
          default:
            badgeProps = {
              ...badgeProps,
              status: "default",
              className:
                "capitalize w-[120px] rounded-full px-4 py-1.5 text-sm font-medium flex items-center justify-center border border-gray-300 bg-gray-50 text-gray-700 shadow-sm",
            };
            break;
        }

        return <Badge {...badgeProps} />;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "desc",
      render: (_: any, record: ClientProject) => {
        if (!record.description) {
          return (
            <span style={{ color: "#999", fontStyle: "italic" }}>
              No description
            </span>
          );
        }

        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "description",
                  label: (
                    <div style={{ maxWidth: 300, whiteSpace: "normal" }}>
                      {record.description}
                    </div>
                  ),
                },
              ],
            }}
            trigger={["click"]}
          >
            <span className="cursor-pointer border-b-2 text-blue-600 border-blue-500">
              See Description
            </span>
          </Dropdown>
        );
      },
    },
    {
      title: "Start/End Date",
      dataIndex: "date",
      key: "date",
      render: (_: any, record: ClientProject) => {
        // Check if date object exists and has the required properties
        if ((!record.startDate || !record.endDate)) {
          return (
            <span style={{ color: "#999", fontStyle: "italic" }}>
              No dates available
            </span>
          );
        }

        const startDate = record.startDate || "N/A";
        const endDate = record.endDate || "N/A";

        return (
          <Space direction="vertical" size={0}>
            <span key="start" style={{ fontSize: "12px" }}>
              {format(new Date(startDate), "MMM d, yyyy")} / {format(new Date(endDate), "MMM d, yyyy")}
            </span>
          </Space>
        );
      },
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
      render: (budget: number) =>
        budget ? (
          <NumericFormat
            value={budget}
            displayType="text"
            prefix="$"
            thousandSeparator
            style={{ fontWeight: 500, color: "#52c41a" }}
          />
        ) : (
          <span style={{ color: "#999", fontStyle: "italic" }}>
            Not specified
          </span>
        ),
    },
    {
      title: "Action",
      key: "actions",
      render: (_: any, record: ClientProject) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => viewDetails(record)}
          type="default"
          size="middle"
          className="mr-2"
          title="View Details"
        ></Button>
      ),
    },
  ];
  if (loading && page === 1) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <p style={{ marginTop: "16px" }}>Loading projects...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert
        message="Error Loading Projects"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: "16px" }}
        action={
          <Button size="small" onClick={handleRefresh}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Space
        className="mb-4"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <p className="text-xl font-semibold">Client Projects</p>
      </Space>

      {/* ✅ Loading / Error States */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert
          message="Error Loading Projects"
          description={error}
          type="error"
          showIcon
        />
      ) : (
        <Table
          columns={columns}
          dataSource={list}
          rowKey={(record) => record.id || Math.random().toString()}
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize,
            total,
            onChange: (p, ps) => {
              setPage(p);
              setPageSize(ps);
            },
            showSizeChanger: false, // ✅ always 10 per page
          }}
          className="text-xs sm:text-sm md:text-base"
        />
      )}

      {/* Project Details Modal */}
      {/* ✅ Project Details Modal */}
      <Modal
        title={
          <span className="text-lg font-semibold">📌 Project Details</span>
        }
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="close" type="primary" onClick={handleModalCancel}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedRow && (
          <div className="p-2">
            <Descriptions
              bordered
              column={1}
              size="middle"
              styles={{
                label: { fontWeight: 600, width: "180px" },
                content: { background: "#fafafa" },
              }}
            >
              <Descriptions.Item label="Title">
                {selectedRow.title || "Untitled"}
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                {getStatus(selectedRow.status)}
              </Descriptions.Item>

              <Descriptions.Item label="Description">
                {selectedRow.description ? (
                  <span style={{ whiteSpace: "pre-line" }}>
                    {selectedRow.description}
                  </span>
                ) : (
                  <span style={{ color: "#999", fontStyle: "italic" }}>
                    No description
                  </span>
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Start Date">
                {format(new Date(selectedRow.startDate), "MMM d, yyyy") || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="End Date">
                {format(new Date(selectedRow.endDate), "MMM d, yyyy") || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Budget">
                {selectedRow.budget ? (
                  <NumericFormat
                    value={selectedRow.budget}
                    displayType="text"
                    prefix="$"
                    thousandSeparator
                    style={{ fontWeight: 500, color: "#52c41a" }}
                  />
                ) : (
                  <span style={{ color: "#999", fontStyle: "italic" }}>
                    Not specified
                  </span>
                )}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProjectList;

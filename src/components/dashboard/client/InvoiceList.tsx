"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Space,
  Dropdown,
  Descriptions,
} from "antd";
import {
  EllipsisOutlined,
  EyeOutlined,
  DownloadOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import { ColumnsType } from "antd/es/table";
import {
  getInvoices,
  makePayment,
  updateInvoiceStatus,
} from "@/app/api/backend/client";
import { PaymentRequestData } from "@/types/api";
import { Invoice } from "@/types/api";

const InvoiceList = () => {
  const [list, setList] = useState<Invoice[]>([]);
  const [selectedRow, setSelectedRow] = useState<Invoice>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getInvoices();

        if (res?.success) {
          let invoices: Invoice[] = [];
          if (Array.isArray(res.data)) {
            invoices = res.data;
          }
          if (res.data?.data && Array.isArray(res.data.data)) {
            invoices = res.data.data;
          }
          setList(invoices);
        } else {
          console.error("Failed to fetch invoices:", res);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, []);

  const getStatusBadge = (status: Invoice["status"]) => {
    const statusMap: Record<
      Invoice["status"],
      "success" | "warning" | "processing"
    > = {
      paid: "success",
      unpaid: "warning",
    };

    return (
      <Space className="capitalize">
        <Badge status={statusMap[status]} />
        {status}
      </Space>
    );
  };

  const viewDetails = (record: Invoice) => {
    setIsModalVisible(true);
    setSelectedRow(record);
  };
  // Utility function
  const formatInvoiceNumber = (index: number) => {
    return `INV-${String(index + 1).padStart(3, "0")}`;
  };

  const handlePayment = async (record: Invoice) => {
    try {
      const payload: PaymentRequestData = {
        amount: record?.amount || 1000,
        projectName: record?.projectId?.title || "Test Project",
        id: record._id,
      };
      const res = await makePayment(payload);

      if (res?.success) {
        window.location.href = res.data?.url || "/";
      } else {
        console.error("Payment initiation failed:", res);
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
    }
  };

  const columns: ColumnsType<Invoice> = [
    {
      title: "Invoice #",
      dataIndex: "invoiceNumber",
      render: (_: Invoice, record: Invoice, index: number) => (
        <span>{`INV-${String(index + 1).padStart(3, "0")}`}</span>
      ),
    },

    {
      title: "Project Title",
      dataIndex: "projectTitle",
      render: (_: Invoice, record: Invoice) => {
        return <span>{record.projectId?.title || "N/A"}</span>;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount: number) => (
        <NumericFormat
          displayType="text"
          value={amount.toFixed(2)}
          prefix="$"
          thousandSeparator
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const baseClass =
          "capitalize min-w-[110px] text-center rounded-full px-4 py-1.5 text-sm font-medium flex items-center justify-center border shadow-sm";

        let badgeProps = {
          text: status ? status.charAt(0).toUpperCase() + status.slice(1) : "-",
          status: "default" as
            | "success"
            | "error"
            | "processing"
            | "default"
            | "warning",
          className: baseClass,
        };

        switch (status?.toLowerCase()) {
          case "paid":
            badgeProps = {
              ...badgeProps,
              status: "success",
              className: `${baseClass} border-green-300 bg-green-50 text-green-700`,
            };
            break;
          case "unpaid":
            badgeProps = {
              ...badgeProps,
              status: "warning",
              className: `${baseClass} border-yellow-300 bg-yellow-50 text-yellow-700`,
            };
            break;
          default:
            badgeProps = {
              ...badgeProps,
              status: "default",
              className: `${baseClass} border-gray-300 bg-gray-50 text-gray-700`,
            };
            break;
        }

        return <Badge {...badgeProps} />;
      },
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: Invoice) => {
        const menuItems = [
          {
            key: "view",
            label: (
              <span onClick={() => viewDetails(record)}>
                <EyeOutlined /> View Details
              </span>
            ),
          },
          {
            key: "download",
            label: (
              <span>
                <DownloadOutlined /> Download
              </span>
            ),
          },
        ];

        // Add Make Payment only if status is not "paid"
        if (record.status !== "paid") {
          menuItems.push({
            key: "payment",
            label: (
              <span onClick={() => handlePayment(record)}>
                <DollarCircleOutlined /> Make Payment
              </span>
            ),
          });
        }

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} title="Actions" />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={list} rowKey="_id" />

      <Modal
        title={
          <span className="text-xl font-semibold">🧾 Invoice Details</span>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => setIsModalVisible(false)}
          >
            Close
          </Button>,
        ]}
        width={800}
      >
        {selectedRow && (
          <div className="p-4">
            <Descriptions
              bordered
              column={2}
              size="middle"
              styles={{
                label: { fontWeight: 600, width: "180px" },
                content: { background: "#fafafa" },
              }}
            >
              <Descriptions.Item label="Invoice Number" span={2}>
                <span className="text-lg font-semibold">
                  {formatInvoiceNumber(
                    list.findIndex((inv) => inv._id === selectedRow._id)
                  )}
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Project Title" span={2}>
                {selectedRow.projectId?.title || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Amount">
                <span className="text-green-600 font-bold text-lg">
                  <NumericFormat
                    value={selectedRow.amount.toFixed(2)}
                    displayType="text"
                    prefix="$"
                    thousandSeparator
                  />
                </span>
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                {getStatusBadge(selectedRow.status)}
              </Descriptions.Item>

              <Descriptions.Item label="Issue Date">
                {new Date(selectedRow.issueDate).toLocaleDateString()}
              </Descriptions.Item>

              <Descriptions.Item label="Due Date">
                {new Date(selectedRow.dueDate).toLocaleDateString()}
              </Descriptions.Item>

              <Descriptions.Item label="Description" span={2}>
                {selectedRow.description || (
                  <span style={{ color: "#999", fontStyle: "italic" }}>
                    No description provided
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

export default InvoiceList;

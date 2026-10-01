"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Badge,
  Space,
  Select,
  Avatar,
  Dropdown,
  Tooltip,
  DatePicker,
  InputNumber,
  Spin,
  Alert,
  Descriptions,
  message,
} from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { EditInvoiceBody, Invoice, InvoiceResponse } from "@/types/api";
import {
  deleteInvoice,
  editInvoice,
  getInvoices,
  getAllProjects,
  sendInvoiceMessage,
} from "@/app/api/backend/admin";
import { createInvoice } from "../../../app/api/backend/admin";
import { motion } from "framer-motion";

type ModalMode = "add" | "view" | "edit";

interface Project {
  _id: string;
  title: string;
  // Add other project properties as needed
}

const InvoiceList = () => {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [deleteInvoiceModalVisible, setDeleteInvoiceModalVisible] = useState<{
    visible: boolean;
    invoice: Invoice | null;
  }>({
    visible: false,
    invoice: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [projects, setProjects] = useState<Project[]>([]); // Add projects state
  const [projectsLoading, setProjectsLoading] = useState(false); // Add loading state for projects

  // Enhanced loading states
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [isUpdatingInvoice, setIsUpdatingInvoice] = useState(false);
  const [isDeletingInvoice, setIsDeletingInvoice] = useState(false);

  const [form] = Form.useForm();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalInvoices, setTotalInvoices] = useState(0);

  // Fetch projects function
  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      let allProjects: Project[] = [];
      let currentPage = 1;
      let hasMore = true;
      const limit = 100; // Fetch 100 projects per page

      // Keep fetching until we get all projects
      while (hasMore) {
        const response = await getAllProjects(currentPage, limit);

        if (response.success && response.data) {
          const projectsData = Array.isArray(response.data)
            ? response.data
            : [];

          // Convert ProjectApiResponse to Project format
          const formattedProjects = projectsData.map((project: any) => ({
            _id: project._id,
            title: project.title || project.name || `Project ${project._id}`,
            // Add other fields you might need
          }));

          allProjects = [...allProjects, ...formattedProjects];

          // Check if we have more pages
          if (projectsData.length < limit) {
            hasMore = false;
          } else {
            currentPage++;
          }

          // Safety check to prevent infinite loop
          if (currentPage > 50) {
            // Max 5000 projects (50 * 100)
            console.warn("Reached maximum page limit while fetching projects");
            hasMore = false;
          }
        } else {
          hasMore = false;
          if (currentPage === 1) {
            // Only throw error if first page fails
            throw new Error(response.message || "Failed to fetch projects");
          }
        }
      }

      setProjects(allProjects);

      if (allProjects.length === 0) {
        toast.error("No projects found. Please create a project first.");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);

      // Fallback: Extract unique projects from invoices as backup
      const uniqueProjects = Array.from(
        new Map(
          invoiceList
            .filter(
              (invoice) =>
                invoice.projectId &&
                typeof invoice.projectId === "object" &&
                invoice.projectId._id
            )
            .map((invoice) => [
              invoice.projectId._id,
              {
                _id: invoice.projectId._id,
                title:
                  invoice.projectId.title || `Project ${invoice.projectId._id}`,
              },
            ])
        ).values()
      );

      setProjects(uniqueProjects);

      if (uniqueProjects.length === 0) {
        toast.error(
          "Could not load projects. Please create a project first or check your connection."
        );
      }
    } finally {
      setProjectsLoading(false);
    }
  };

  // Fetch invoices function - separated for reusability
  const fetchInvoices = async (
    page: number = currentPage,
    pageSize: number = 10
  ) => {
    try {
      setLoading(true);
      setError(null);

      const res = await getInvoices(page, pageSize);

      if (res.success && res.data) {
        let invoices: Invoice[] = [];
        let total = 0;

        if (Array.isArray(res.data)) {
          invoices = res.data;
          // ❌ Don't use length here unless API gives no meta
          total = res.meta?.totalitems || res.data.length;
        } else if (res.data.data && Array.isArray(res.data.data)) {
          invoices = res.data.data;
          // ✅ Correct way
          total = res.meta?.totalitems || invoices.length;
        }

        setInvoiceList(invoices);
        setTotalInvoices(total);
      } else {
        setError(res.message || "Failed to fetch invoices");
        setInvoiceList([]);
        setTotalInvoices(0);
      }
    } catch (error) {
      setError("Network error occurred while fetching invoices");
      setInvoiceList([]);
      setTotalInvoices(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices(currentPage, pageSize);

    // Fetch clients and projects list if needed (only on initial load)
    if (currentPage === 1) {
      // Fetch clients
      fetch("/api/clients")
        .then((res) => res.json())
        .then((data) => setClients(data))
        .catch(() => setClients([]));

      // Fetch projects
      fetchProjects();
    }
  }, [currentPage, pageSize]);

  const deleteRow = (row: Invoice) => {
    setDeleteInvoiceModalVisible({ visible: true, invoice: row });
  };

  const dropdownMenu = (row: Invoice) => ({
    items: [
      {
        key: "edit",
        label: (
          <div onClick={() => openModal("edit", row)}>
            <EditOutlined /> Edit
          </div>
        ),
      },
      {
        key: "delete",
        label: (
          <div onClick={() => deleteRow(row)}>
            <DeleteOutlined /> Delete
          </div>
        ),
      },
      {
        key: "download",
        label: (
          <div>
            <DownloadOutlined /> Download
          </div>
        ),
      },
    ],
  });

  const handleDeleteInvoice = async () => {
    try {
      const invoiceId = deleteInvoiceModalVisible.invoice?._id;

      if (!invoiceId) {
        toast.error("Invalid invoice ID");
        return;
      }

      setIsDeletingInvoice(true);
      const res = await deleteInvoice(invoiceId);

      if (res.success) {
        // Instead of filtering, refetch the current page to maintain pagination
        await fetchInvoices(currentPage, pageSize);
        toast.success("Invoice deleted successfully!");
        setDeleteInvoiceModalVisible({ visible: false, invoice: null });
      } else {
        toast.error(res.message || "Failed to delete invoice");
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
      toast.error("Failed to delete invoice");
    } finally {
      setIsDeletingInvoice(false);
      setDeleteInvoiceModalVisible({ visible: false, invoice: null });
    }
  };

  const openModal = (mode: ModalMode, invoice?: Invoice) => {
    setModalMode(mode);
    setSelectedInvoice(invoice || null);
    setIsModalVisible(true);

    if (invoice) {
      // Handle different projectId structures
      const projectId =
        typeof invoice.projectId === "object"
          ? invoice.projectId._id
          : invoice.projectId;

      form.setFieldsValue({
        projectId: projectId,
        amount: invoice.amount ?? 0,
        status: invoice.status,
        issueDate: dayjs(invoice.issueDate),
        dueDate: dayjs(invoice.dueDate),
        description: invoice.description,
        currency: invoice.currency,
      });
    } else {
      form.resetFields();
      // Set default values for new invoice
      form.setFieldsValue({
        currency: "USD",
        status: "unpaid",
        issueDate: dayjs(),
        dueDate: dayjs().add(30, "days"), // Default due date 30 days from today
      });
    }

    // If projects haven't been loaded yet and we're opening the modal, try to fetch them
    if (projects.length === 0 && !projectsLoading) {
      fetchProjects();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedInvoice(null);
    // Reset loading states when closing modal
    setIsCreatingInvoice(false);
    setIsUpdatingInvoice(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      if (modalMode === "add") {
        setIsCreatingInvoice(true);

        const invoiceData = {
          projectId: values.projectId,
          amount: Number(values.amount),
          status: values.status as Invoice["status"],
          issueDate: dayjs(values.issueDate).format("YYYY-MM-DD"),
          dueDate: dayjs(values.dueDate).format("YYYY-MM-DD"),
          description: values.description,
          currency: values.currency,
        };

        const res = await createInvoice(invoiceData);

        if (res.success) {
          // Show success message first
          message.success("Invoice created successfully!");

          // Send invoice message in background
          try {
            await sendInvoiceMessage(values.projectId, {
              _id: res.data?._id as string,
            });

            toast.success("Invoice notification sent!");
          } catch (msgError) {
            console.error("Failed to send invoice message:", msgError);
            toast.error("Invoice created but notification failed to send");
          }

          // Close modal and refresh data
          closeModal();

          // After creating, go to first page to see the new invoice
          setCurrentPage(1);
          await fetchInvoices(1, pageSize);
        } else {
          toast.error(res.message || "Failed to create invoice");
        }
      } else if (modalMode === "edit" && selectedInvoice) {
        setIsUpdatingInvoice(true);

        const payload: EditInvoiceBody = {
          amount: Number(values.amount),
          status: values.status as "unpaid" | "paid",
          dueDate: dayjs(values.dueDate).format("YYYY-MM-DD"),
          description: values.description,
          currency: values.currency,
        };

        const res = await editInvoice(selectedInvoice._id, payload);

        if (res.success) {
          // Show success message
          message.success("Invoice updated successfully!");

          // Close modal and refresh data
          closeModal();

          // Refetch current page to get updated data
          await fetchInvoices(currentPage, pageSize);
        } else {
          toast.error(res.message || "Failed to update invoice");
        }
      }
    } catch (error: any) {
      console.error("Form validation error:", error);
      if (error.errorFields) {
        error.errorFields.forEach((field: any) => toast.error(field.errors[0]));
      } else {
        toast.error("Please check your inputs and try again");
      }
    } finally {
      setIsCreatingInvoice(false);
      setIsUpdatingInvoice(false);
    }
  };

  // Handle pagination change
  const handleTableChange = (page: number, size: number) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
    }
  };

  // Refresh current page
  const handleRefresh = () => {
    fetchInvoices(currentPage, pageSize);
    fetchProjects(); // Also refresh projects
  };

  // Updated columns to handle different data structures
  const columns: ColumnsType<Invoice> = [
    {
      title: "Invoice ID",
      dataIndex: "_id",
      width: 100,
      ellipsis: true,
    },
    {
      title: "Project",
      dataIndex: ["projectId"],
      render: (projectId: any) => {
        // Handle both object and string projectId
        if (typeof projectId === "object" && projectId?.title) {
          return projectId.title;
        } else if (typeof projectId === "string") {
          return projectId;
        }
        return "N/A";
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount: number) => (
        <NumericFormat
          value={amount ?? 0}
          displayType="text"
          thousandSeparator
          prefix="$"
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
      title: "Issue Date",
      dataIndex: "issueDate",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Preview">
            <Button
              icon={<EyeOutlined />}
              onClick={() => openModal("view", record)}
            />
          </Tooltip>
          <Dropdown menu={dropdownMenu(record)} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Show loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <p style={{ marginTop: "16px" }}>Loading invoices...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <Alert
        message="Error Loading Invoices"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: "16px" }}
        action={
          <Button size="small" onClick={() => window.location.reload()}>
            Retry
          </Button>
        }
      />
    );
  }

  // Determine if form is currently processing
  const isProcessing = isCreatingInvoice || isUpdatingInvoice;

  return (
    <>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Space wrap>
          <p className="text-xl font-semibold">Invoices</p>
        </Space>
        <Space>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => openModal("add")}
            disabled={isProcessing} // Disable while processing
          >
            Add Invoice
          </Button>
        </Space>
      </Space>

      {invoiceList.length === 0 ? (
        <Alert
          message="No Invoices Found"
          description="No invoices are available. Click 'Add Invoice' to create your first invoice."
          type="info"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 50 }}   // start below with 0 opacity
        animate={{ opacity: 1, y: 0 }}    // animate to normal position
        transition={{ duration: 0.6, ease: "easeOut" }} // smooth transition
      >
        <Table<Invoice>
          columns={columns}
          dataSource={invoiceList}
          scroll={{ x: "max-content" }}
          rowKey="_id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: totalInvoices,
            showQuickJumper: true,
            showSizeChanger: false,
            onChange: (page) => setCurrentPage(page),
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} invoices`,
          }}
        />
      </motion.div>

      {/* Delete Invoice Modal */}
      <Modal
        title={<div className="font-bold text-2xl">Delete Invoice</div>}
        open={deleteInvoiceModalVisible.visible}
        onCancel={() =>
          !isDeletingInvoice && setDeleteInvoiceModalVisible({ visible: false, invoice: null })
        }
        footer={null}
        style={{ maxWidth: "90vw" }}
        closable={!isDeletingInvoice} // Disable closing while deleting
      >
        <p>Are you sure you want to delete this invoice?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={() =>
              setDeleteInvoiceModalVisible({ visible: false, invoice: null })
            }
            disabled={isDeletingInvoice}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            onClick={handleDeleteInvoice}
            loading={isDeletingInvoice}
            icon={isDeletingInvoice ? <LoadingOutlined /> : <DeleteOutlined />}
          >
            {isDeletingInvoice ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>

      {/* Add/Edit/View Invoice Modal */}
      <Modal
        title={
          <div className="font-bold text-2xl flex items-center gap-2">
            {isProcessing && <LoadingOutlined className="text-blue-500" />}
            {modalMode === "add"
              ? "Add Invoice"
              : modalMode === "edit"
                ? "Edit Invoice"
                : "Invoice Details"}
          </div>
        }
        open={isModalVisible}
        onCancel={() => !isProcessing && closeModal()} // Prevent closing while processing
        onOk={handleSave}
        okButtonProps={{
          disabled: modalMode === "view",
          loading: isProcessing,
        }}
        cancelButtonProps={{
          disabled: isProcessing, // Disable cancel while processing
        }}
        okText={
          modalMode === "add"
            ? (isCreatingInvoice ? "Creating..." : "Create")
            : modalMode === "edit"
              ? (isUpdatingInvoice ? "Updating..." : "Update")
              : ""
        }
        width={700}
        centered
        closable={!isProcessing} // Disable X button while processing
        footer={
          modalMode === "view"
            ? null // 🚀 Hides the footer completely
            : undefined // keep default footer for add/edit
        }
      >
        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 rounded-lg">
            <div className="flex flex-col items-center gap-3">
              <Spin size="large" />
              <p className="text-gray-600 font-medium">
                {isCreatingInvoice ? "Creating invoice..." : "Updating invoice..."}
              </p>
            </div>
          </div>
        )}

        {/* VIEW MODE */}
        {modalMode === "view" && selectedInvoice ? (
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl">
                  {selectedInvoice.projectId?.title || "Untitled Project"}
                </h3>
                <p className="text-gray-500">
                  Invoice ID: {selectedInvoice._id}
                </p>
              </div>
              <Badge
                color={
                  selectedInvoice.status === "paid"
                    ? "green"
                    : selectedInvoice.status === "unpaid"
                      ? "orange"
                      : "red"
                }
                text={
                  selectedInvoice.status.charAt(0).toUpperCase() +
                  selectedInvoice.status.slice(1)
                }
                className={`capitalize min-w-[110px] text-center rounded-full px-4 py-1.5 text-sm font-medium flex items-center justify-center border shadow-sm
    ${selectedInvoice.status === "paid"
                    ? "border-green-300 bg-green-50 text-green-700"
                    : selectedInvoice.status === "unpaid"
                      ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                      : "border-red-300 bg-red-50 text-red-700"
                  }
  `}
              />
            </div>

            <Descriptions
              bordered
              column={2}
              styles={{
                label: { fontWeight: "bold", width: "140px" },
              }}
            >
              <Descriptions.Item label="Amount">
                <NumericFormat
                  value={selectedInvoice.amount ?? 0}
                  displayType="text"
                  thousandSeparator
                  prefix={
                    selectedInvoice.currency === "USD"
                      ? "$"
                      : selectedInvoice.currency + " "
                  }
                />
              </Descriptions.Item>
              <Descriptions.Item label="Currency">
                {selectedInvoice.currency}
              </Descriptions.Item>
              <Descriptions.Item label="Issue Date">
                {dayjs(selectedInvoice.issueDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Due Date">
                {dayjs(selectedInvoice.dueDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {selectedInvoice.description || "-"}
              </Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          // ADD / EDIT MODE
          <Form
            form={form}
            layout="vertical"
            disabled={modalMode === "view" || isProcessing} // Disable form while processing
            initialValues={{
              currency: "USD",
              status: "unpaid",
            }}
          >
            <Form.Item
              name="projectId"
              label="Project"
              rules={[{ required: true, message: "Please select a project" }]}
            >
              <Select
                placeholder="Select project"
                loading={projectsLoading}
                notFoundContent={
                  projectsLoading ? <Spin size="small" /> : "No projects found"
                }
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    ?.toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {projects.map((project) => (
                  <Select.Option key={project._id} value={project._id}>
                    {project.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, message: "Please enter amount" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter amount"
              />
            </Form.Item>

            <Form.Item
              name="currency"
              label="Currency"
            >
              <Input value={'usd'} />
            </Form.Item>

            <Form.Item
              name="issueDate"
              label="Issue Date"
              rules={[{ required: true, message: "Please select issue date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: "Please select due date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="unpaid">Unpaid</Select.Option>
                <Select.Option value="paid">Paid</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} placeholder="Enter description" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default InvoiceList;
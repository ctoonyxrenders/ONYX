"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Badge,
  Dropdown,
  Space,
  Modal,
  Form,
  Card,
  DatePicker,
  Checkbox,
  Spin,
  InputNumber,
  message,
} from "antd";
import { MoreOutlined, SendOutlined, LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";
import { Invite } from "@/types/api";
import { getInvites, inviteClientApi, deleteInvite } from "@/app/api/backend/admin";
import { motion, AnimatePresence } from "framer-motion";

const InvitePage = () => {
  const [list, setList] = useState<Invite[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inviteClientLoading, setInviteClientLoading] = useState<boolean>(false);
  const [inviteClientModalVisible, setInviteClientModalVisible] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState<{
    visible: boolean;
    invite: Invite | null;
  }>({
    visible: false,
    invite: null,
  });
  const [isDeletingInvite, setIsDeletingInvite] = useState<boolean>(false);
  const [formInvite] = Form.useForm();

  // Fetch invites function - separated for reusability
  const fetchInvites = async () => {
    try {
      setLoading(true);
      const res = await getInvites();

      if (res?.success && Array.isArray(res.data)) {
        setList(res.data as Invite[]);
      } else {
        setList([]);
        toast.error(res?.message || "Failed to load invites.");
      }
    } catch (error) {
      console.error("Failed to load invites:", error);
      setList([]);
      toast.error("Network error occurred while fetching invites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadInvites = async () => {
      if (!mounted) return;
      await fetchInvites();
    };

    loadInvites();

    return () => {
      mounted = false;
    };
  }, []);

  const openResendModal = (row: Invite) => {
    setSelectedInvite(row);
    setInviteClientModalVisible(true);
    formInvite.setFieldsValue({
      clientEmail: row.email,
      days: 30, // Default to 30 days
    });
  };

  const openDeleteModal = (row: Invite) => {
    setDeleteModalVisible({ visible: true, invite: row });
  };

  const closeModal = () => {
    setInviteClientModalVisible(false);
    setSelectedInvite(null);
    formInvite.resetFields();
    // Reset loading state when closing modal
    setInviteClientLoading(false);
  };

  const handleDeleteInvite = async () => {
    try {
      const inviteId = deleteModalVisible.invite?._id;

      if (!inviteId) {
        toast.error("Invalid invite ID");
        return;
      }

      setIsDeletingInvite(true);
      const res = await deleteInvite(inviteId);

      if (res.success) {
        // Show success message
        message.success("Invite deleted successfully!");

        // Close modal and refresh data
        setDeleteModalVisible({ visible: false, invite: null });

        // Refresh invites list to get updated data
        await fetchInvites();

        toast.success("Invite deleted and list refreshed!");
      } else {
        toast.error(res.message || "Failed to delete invite");
      }
    } catch (error) {
      console.error("Error deleting invite:", error);
      toast.error("Failed to delete invite");
    } finally {
      setIsDeletingInvite(false);
      setDeleteModalVisible({ visible: false, invite: null });
    }
  };

  const handleInviteClientSubmit = async () => {
    try {
      const values = await formInvite.validateFields();
      setInviteClientLoading(true);

      const payload = {
        email: values.clientEmail,
        day: values.days,
      };

      console.log("RESEND VALUES", values);

      const res = await inviteClientApi(payload);

      if (res.success) {
        // Show success message
        message.success("Client invite sent successfully!");

        // Close modal and refresh data
        closeModal();

        // Refresh invites list to get updated data
        await fetchInvites();

        toast.success("Invite resent and list refreshed!");
      } else {
        toast.error(res.message || "Failed to resend invite");
      }
    } catch (error: any) {
      console.error("Form validation error:", error);
      if (error.errorFields) {
        error.errorFields.forEach((field: any) => toast.error(field.errors[0]));
      } else {
        toast.error("Please fill all required fields correctly.");
      }
    } finally {
      setInviteClientLoading(false);
    }
  };

  const itemsForRow = (row: Invite): MenuProps["items"] => [
    {
      key: "resend",
      label: (
        <div onClick={() => openResendModal(row)}>
          <SendOutlined /> Resend
        </div>
      ),
    },
    {
      key: "delete",
      label: (
        <div onClick={() => openDeleteModal(row)}>
          <DeleteOutlined /> Delete
        </div>
      ),
    },
  ];

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  const columns: ColumnsType<Invite> = [
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => (
        <span className="text-xs sm:text-sm md:text-base">{record.email}</span>
      ),
    },
    {
      title: "Send Date",
      render: (_, record) => (
        <span className="text-xs sm:text-sm md:text-base">
          {formatDate(record.sendDate)}
        </span>
      ),
    },
    {
      title: "Expired Date",
      render: (_, record) => (
        <span className="text-xs sm:text-sm md:text-base">
          {formatDate(record.expiredAt)}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: Invite["status"]) => {
        if (!status) return <Badge status="default" text="-" />;

        const normalized = status.toLowerCase();
        let badgeProps = {
          status: "default" as
            | "success"
            | "error"
            | "processing"
            | "default"
            | "warning",
          bg: "bg-gray-100 border border-gray-300 text-gray-700",
          text: status.charAt(0).toUpperCase() + status.slice(1),
        };

        switch (normalized) {
          case "pending":
            badgeProps = {
              status: "warning",
              bg: "bg-yellow-50 border border-yellow-300 text-yellow-700",
              text: "Pending",
            };
            break;
          case "active":
            badgeProps = {
              status: "success",
              bg: "bg-blue-50 border border-blue-300 text-blue-700",
              text: "Active",
            };
            break;
          case "expire":
            badgeProps = {
              status: "error",
              bg: "bg-red-50 border border-red-300 text-red-700",
              text: "Expired",
            };
            break;
        }

        return (
          <Badge
            status={badgeProps.status}
            className={`capitalize inline-flex items-center justify-center w-[120px] rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium shadow-sm ${badgeProps.bg}`}
            text={<span className="mb-3">{badgeProps.text}</span>}
          />
        );
      },
    },
    {
      title: "Action",
      key: "actions",
      render: (record: Invite) => (
        <Dropdown
          menu={{ items: itemsForRow(record) }}
          trigger={["click"]}
          disabled={inviteClientLoading || isDeletingInvite} // Disable dropdown while processing
        >
          <Button
            icon={<MoreOutlined />}
            className="text-xs sm:text-sm md:text-base"
            disabled={inviteClientLoading || isDeletingInvite} // Disable button while processing
          />
        </Dropdown>
      ),
    },
  ];

  return (
    <Card>
      <Space
        className="mb-4"
        style={{ display: "flex", justifyContent: "space-between" }}
        wrap
      >
        <Space wrap>
          <p className="text-xl font-semibold">Invites</p>
        </Space>
        <Space>
          <Button
            type="default"
            onClick={fetchInvites}
            loading={loading}
            disabled={inviteClientLoading || isDeletingInvite} // Disable refresh while processing
          >
            Refresh
          </Button>
        </Space>
      </Space>

      {/* Show loading first, then table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" tip="Loading invites..." />
        </div>
      ) : list.length === 0 ? (
        // Custom empty state
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <p className="text-lg font-medium">No invites found</p>
          <p className="text-sm">Once you send invites, they'll appear here.</p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Table<Invite>
              columns={columns}
              dataSource={list}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              pagination={{ responsive: true }}
              className="text-xs sm:text-sm md:text-base"
              loading={loading} // Show loading state in table
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Resend Invite Modal */}
      <Modal
        title={
          <div className="font-bold text-xl flex items-center gap-2">
            {inviteClientLoading && <LoadingOutlined className="text-blue-500" />}
            Resend Invite
          </div>
        }
        open={inviteClientModalVisible}
        onCancel={() => !inviteClientLoading && closeModal()} // Prevent closing while processing
        onOk={handleInviteClientSubmit}
        okText={inviteClientLoading ? "Sending..." : "Re-send Invite"}
        okButtonProps={{
          loading: inviteClientLoading,
          icon: inviteClientLoading ? <LoadingOutlined /> : <SendOutlined />,
        }}
        cancelButtonProps={{
          disabled: inviteClientLoading, // Disable cancel while processing
        }}
        style={{ maxWidth: "90vw" }}
        closable={!inviteClientLoading} // Disable X button while processing
      >
        {/* Processing Overlay */}
        {inviteClientLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50 rounded-lg">
            <div className="flex flex-col items-center gap-3">
              <Spin size="large" />
              <p className="text-gray-600 font-medium">Sending invite...</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {selectedInvite && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Resending invite to:</strong> {selectedInvite.email}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Current Status: {selectedInvite.status}
              </p>
            </div>
          )}

          <Form
            form={formInvite}
            layout="vertical"
            disabled={inviteClientLoading} // Disable form while processing
          >
            <Form.Item
              label="Client Email"
              name="clientEmail"
              rules={[
                { required: true, message: "Please enter client email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Validity Period (Days)"
              name="days"
              rules={[
                { required: true, message: "Please enter validity period" },
                {
                  type: "number",
                  message: "Invalid number format",
                  transform: (value) => (value ? Number(value) : value), // ensures validation
                },
                {
                  validator: (_, value) => {
                    if (value && value < 1) {
                      return Promise.reject(new Error("Validity period must be at least 1 day"));
                    }
                    if (value && value > 365) {
                      return Promise.reject(new Error("Validity period cannot exceed 365 days"));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              tooltip="Set how many days the invite will remain valid"
            >
              <InputNumber
                min={1}
                max={365}
                style={{ width: "100%" }}
                placeholder="Enter number of days (1-365)"
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Delete Invite Modal */}
      <Modal
        title={<div className="font-bold text-xl">Delete Invite</div>}
        open={deleteModalVisible.visible}
        onCancel={() =>
          !isDeletingInvite && setDeleteModalVisible({ visible: false, invite: null })
        }
        footer={null}
        style={{ maxWidth: "90vw" }}
        closable={!isDeletingInvite} // Disable closing while deleting
      >
        <div className="space-y-4">
          {deleteModalVisible.invite && (
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">
                <strong>Delete invite for:</strong> {deleteModalVisible.invite.email}
              </p>
              <p className="text-xs text-red-600 mt-1">
                Current Status: {deleteModalVisible.invite.status}
              </p>
            </div>
          )}

          <p className="text-gray-700">
            Are you sure you want to delete this invite? This action cannot be undone.
          </p>

          <div className="flex justify-end space-x-2 mt-6">
            <Button
              onClick={() =>
                setDeleteModalVisible({ visible: false, invite: null })
              }
              disabled={isDeletingInvite}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleDeleteInvite}
              loading={isDeletingInvite}
              icon={isDeletingInvite ? <LoadingOutlined /> : <DeleteOutlined />}
            >
              {isDeletingInvite ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default InvitePage;
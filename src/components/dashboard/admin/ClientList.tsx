"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Avatar,
  Space,
  Modal,
  Form,
  DatePicker,
  Checkbox,
  InputNumber,
  Spin,
  Descriptions,
  Divider,
} from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import Upload from "antd/es/upload/Upload";
import toast from "react-hot-toast";
import { UserApiResponse, GetAllClientsApiResponse } from "@/types/api";
import {
  createClientApi,
  deleteClient,
  getClientsApi,
  inviteClientApi,
} from "@/app/api/backend/admin";
import { lab } from "d3";
import { getConversationApi } from "@/app/api/backend/chat";
import { useRouter } from "next/navigation";
const ClientList = () => {
  const [list, setList] = useState<GetAllClientsApiResponse>([]);
  const [addClientModalVisible, setAddClientModalVisible] = useState(false);
  const [inviteClientModalVisible, setInviteClientModalVisible] =
    useState(false);
  const [viewClientModalVisible, setViewClientModalVisible] = useState({
    visible: false,
    client: null as UserApiResponse | null,
  });
  const [deleteClientModalVisible, setDeleteClientModalVisible] = useState({
    visible: false,
    client: null as UserApiResponse | null,
  });
  const [formAdd] = Form.useForm();
  const [formInvite] = Form.useForm();
  const [creatingClient, setCreatingClient] = useState(false);

  // 🔹 pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState({
    deleteLoading: false,
    createLoading: false,
    fetchLoading: false,
    inviteLoading: false,
  });

  const fetchClients = async (pageNum: number, limit: number) => {
    setLoading((prev) => ({ ...prev, fetchLoading: true }));
    try {
      const res = await getClientsApi(pageNum, limit);
      if (res.success) {
        setList(res.data as GetAllClientsApiResponse); // assuming API returns { clients, total }
        setTotal(res.meta?.totalitems || 0);
      } else {
        toast.error(res.message || "Failed to fetch clients");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching clients");
    } finally {
      setLoading((prev) => ({ ...prev, fetchLoading: false }));
    }
  };

  useEffect(() => {
    fetchClients(page, pageSize);
  }, [page, pageSize]);

  const viewDetails = (row: any) => {
    setViewClientModalVisible({ visible: true, client: row });
  };

  const deleteRow = (row: UserApiResponse) => {
    setDeleteClientModalVisible({
      visible: true,
      client: row,
    });
  };

  const router = useRouter()

  const sendMessage = async (row: UserApiResponse) => {
    const res = await getConversationApi(row._id);
    if (res.data) {
      router.push(`/dashboard/admin/chat/${res.data._id}`);
    }
  };

  const dropdownMenu = (row: UserApiResponse) => ({
    items: [
      {
        key: "view",
        label: (
          <span onClick={() => viewDetails(row)}>
            <EyeOutlined /> View Details
          </span>
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
        key: "Send Message",
        label: (
          <div onClick={() => sendMessage(row)}>
            <PaperClipOutlined /> Send Message
          </div>
        ),
      }
    ],
  });

  const addressDropDownMenu = (record: UserApiResponse) => ({
    items: [
      {
        key: "address",
        label: (
          <div className="p-4 w-[300px] max-w-full break-words">
            <div className="absolute top-2 right-2">
              <CloseCircleOutlined />
            </div>
            <strong>Address:</strong> {record.address}
          </div>
        ),
      },
    ],
  });

  const columns = [
    {
      title: "Client",
      dataIndex: "name",
      key: "client",
      render: (_: unknown, record: UserApiResponse) => (
        <Space wrap>
          <Avatar shape="square" size={50} src={record.profilePic} />
          <span className="break-words text-xs sm:text-sm md:text-base">
            {record.name}
          </span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => (
        <span className="break-all text-xs sm:text-sm md:text-base">
          {text}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNo",
      key: "phone",
      render: (text: string) => (
        <span className="break-all text-xs sm:text-sm md:text-base">
          {text}
        </span>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "company",
      render: (_: unknown, record: UserApiResponse) => (
        <Space wrap>
          <Avatar shape="square" size={50} src={record.companyLogo} />
          <span className="break-words text-xs sm:text-sm md:text-base">
            {record.companyName}
          </span>
        </Space>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_: unknown, record: UserApiResponse) => (
        <Dropdown menu={addressDropDownMenu(record)} trigger={["click"]}>
          <span className="cursor-pointer border-b-2 text-blue-600 border-blue-500">
            See address
          </span>
        </Dropdown>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Dropdown menu={dropdownMenu(record)} trigger={["click"]}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handleAddClientSubmit = () => {
    formAdd
      .validateFields()
      .then(async (values) => {
        setCreatingClient(true); // start loader
        values.clientPic = "";
        values.companyLogo = "";

        try {
          const res = await createClientApi(values);
          if (res.success) {
            fetchClients(page, pageSize);
            setAddClientModalVisible(false);
            formAdd.resetFields();
          }
        } catch (error) {
          console.error(error);
        } finally {
          setCreatingClient(false); // stop loader
        }
      })
      .catch((info) => {
        toast.error("Please fill all required fields correctly.");
      });
  };

  const handleInviteClientSubmit = () => {
    setLoading((prev) => ({ ...prev, inviteLoading: true }));
    formInvite
      .validateFields()
      .then(async (values) => {

        const payload = {
          email: values.email,
          day: values.days,
        };

        const res = await inviteClientApi(payload);
        if (res.success) {
          setLoading((prev) => ({ ...prev, inviteLoading: false }));
          formInvite.resetFields();
        }
        setInviteClientModalVisible(false);
        setLoading((prev) => ({ ...prev, inviteLoading: false }));
      })
      .catch((info) => {
        setLoading((prev) => ({ ...prev, inviteLoading: false }));
      });
  };

  const handleDeleteClient = async () => {
    setLoading((prev) => ({ ...prev, deleteLoading: true }));
    const clientId = deleteClientModalVisible.client?._id;
    if (!clientId) {
      setDeleteClientModalVisible({
        visible: false,
        client: null,
      });
      toast.error("Client ID not found");
      setLoading((prev) => ({ ...prev, deleteLoading: false }));
      return;
    }

    await deleteClient(clientId);
    fetchClients(page, pageSize);
    setDeleteClientModalVisible({
      visible: false,
      client: null,
    });
    setLoading((prev) => ({ ...prev, deleteLoading: false }));
  };

  return (
    <>
      <Space
        className="mb-4"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {/* Title */}
        <Space wrap>
          <p className="text-xl font-semibold">Clients</p>
        </Space>
        <Space>
          <Button
            type="default"
            icon={<PlusCircleOutlined />}
            onClick={() => setInviteClientModalVisible(true)}
          >
            Invite Client
          </Button>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => setAddClientModalVisible(true)}
          >
            Create Client
          </Button>
        </Space>
      </Space>

      {/* ✅ Loading State */}
      {loading.fetchLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
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
            <Table<UserApiResponse>
              columns={columns}
              dataSource={list}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              pagination={{
                current: page,
                pageSize: pageSize,
                total: total,
                onChange: (pageNum, pageSizeNum) => {
                  setPage(pageNum);
                  setPageSize(pageSizeNum);
                },
              }}
              className="text-xs sm:text-sm md:text-base"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* View Client Details Modal */}
      <Modal
        title={<div className="font-bold text-2xl">Client Details</div>}
        open={viewClientModalVisible.visible}
        onCancel={() =>
          setViewClientModalVisible({ visible: false, client: null })
        }
        footer={null}
        width={700} // better control than maxWidth
        centered
      >
        {viewClientModalVisible.client && (
          <div className="p-4">
            <div className="flex items-center space-x-6 mb-6">
              <Avatar
                shape="square"
                size={120}
                src={viewClientModalVisible.client.profilePic}
                className="shadow-md"
              />
              <div>
                <h3 className="font-bold text-xl">
                  {viewClientModalVisible.client.name}
                </h3>
                <p className="text-gray-500">
                  {viewClientModalVisible.client.companyName}
                </p>
              </div>
            </div>

            <Divider className="my-4" />

            <Descriptions
              bordered
              column={1}
              styles={{
                label: { fontWeight: "bold", width: "120px" },
              }}
            >
              <Descriptions.Item label="Email">
                <span className="break-all">
                  {viewClientModalVisible.client.email}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {viewClientModalVisible.client.phoneNo}
              </Descriptions.Item>
              <Descriptions.Item label="Company Logo">
                <Avatar
                  shape="square"
                  size={80}
                  src={viewClientModalVisible.client.companyLogo}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <span className="break-words">
                  {viewClientModalVisible.client.address}
                </span>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Delete Client Modal */}
      <Modal
        title={<div className="font-bold text-2xl">Delete Client</div>}
        open={deleteClientModalVisible.visible}
        onCancel={() =>
          setDeleteClientModalVisible({ visible: false, client: null })
        }
        footer={null}
        style={{ maxWidth: "90vw" }}
      >
        <p>Are you sure you want to delete this client?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={() =>
              setDeleteClientModalVisible({ visible: false, client: null })
            }
          >
            Cancel
          </Button>
          <Button type="primary" danger onClick={handleDeleteClient}>
            {loading.deleteLoading ? "Deleting..." : "Delete Client"}
          </Button>
        </div>
      </Modal>

      {/* Add Client Modal */}
      <Modal
        title="Add New Client"
        open={addClientModalVisible}
        onCancel={() => setAddClientModalVisible(false)}
        onOk={handleAddClientSubmit}
        okText="Create"
        confirmLoading={creatingClient} // 🔥 loader here
        style={{ maxWidth: "90vw" }}
      >
        <Form form={formAdd} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter client name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter client email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* Client Picture Upload */}
          <Form.Item
            label="Client Profile"
            name="profilePic"
            valuePropName="file"
            getValueFromEvent={(e) => (e.fileList ? [e.fileList[0]] : [])}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false} // prevent auto upload
              maxCount={1}
            >
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
            <Upload
              listType="picture-card"
              beforeUpload={() => false} // prevent auto upload
              maxCount={1}
            >
              <div>Upload</div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ message: "Please enter company name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ message: "Please enter address" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phoneNo"
            rules={[{ message: "Please enter phone number" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Invite Client Modal */}
      <Modal
        title="Invite Client"
        open={inviteClientModalVisible}
        onCancel={() => setInviteClientModalVisible(false)}
        onOk={handleInviteClientSubmit}
        okText="Send Invite"
        confirmLoading={loading.inviteLoading} // ✅ Loader shown on OK button
        style={{ maxWidth: "90vw" }}
      >
        <Form form={formInvite} layout="vertical">
          <Form.Item
            label="Client Email"
            name="email"
            rules={[
              { required: true, message: "Please enter client email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
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
            ]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClientList;

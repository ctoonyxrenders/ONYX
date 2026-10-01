"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Select,
  Button,
  Badge,
  Dropdown,
  Avatar,
  Space,
  Modal,
  Spin,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MoreOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import CreateProjectModal from "./CreateProjectModal";
import ViewEditProjectModal from "./ViewEditProjectModal";
import { CreateProjectBody, ProjectApiResponse } from "@/types/api";
import {
  createProjectApi,
  getAllProjects,
  updateProjectApi,
  deleteProjectApi,
  sendProjectMessage, // ✅ import delete API
} from "@/app/api/backend/admin";

const ProjectList = () => {
  const [list, setList] = useState<ProjectApiResponse[]>([]);
  const [loading, setLoading] = useState({
    createProject: false,
    fetchProjects: false,
    updateProject: false,
    deleteProject: false,
  });
  const [deleteProjectModalVisible, setDeleteProjectModalVisible] =
    useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isViewEditModalVisible, setIsViewEditModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<ProjectApiResponse | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  // ✅ Fetch projects with pagination
  const fetchProjects = async (
    currentPage = page,
    currentPageSize = pageSize
  ) => {
    try {
      setLoading((prev) => ({ ...prev, fetchProjects: true }));
      const res = await getAllProjects(currentPage, currentPageSize);

      if (res.success) {
        setList(res.data as ProjectApiResponse[]);
        setTotal(res.meta?.totalitems || 0);
      } else {
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Error fetching projects");
    } finally {
      setLoading((prev) => ({ ...prev, fetchProjects: false }));
    }
  };

  useEffect(() => {
    fetchProjects(page, pageSize);
  }, [page, pageSize]);

  // ✅ Handle create project
  const handleCreateProject = async (values: CreateProjectBody) => {
    setLoading((prev) => ({ ...prev, createProject: true }));
    try {
      const resCreateProject = await createProjectApi(values);
      //send message to user with project details
      const res = await sendProjectMessage(values.clientId, {
        _id: resCreateProject.data?._id as string,
        name: resCreateProject.data?.title as string,
      });
      if (res.data) {
        toast.success("Project created and message sent to client");
      }
      fetchProjects(); // refresh list
      setIsCreateModalVisible(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, createProject: false }));
    }
  };

  // ✅ Handle update project
  const handleUpdateProject = async (values: CreateProjectBody) => {
    if (!selectedProject) return;

    setLoading((prev) => ({ ...prev, updateProject: true }));
    try {
      await updateProjectApi(selectedProject._id, values);
      fetchProjects(); // refresh list
      setIsViewEditModalVisible(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setLoading((prev) => ({ ...prev, updateProject: false }));
    }
  };

  // ✅ Handle delete project
  const handleDeleteProject = async () => {
    if (!selectedProject) return;

    setLoading((prev) => ({ ...prev, deleteProject: true }));
    try {
      await deleteProjectApi(selectedProject._id);
      fetchProjects(); // refresh list
      setDeleteProjectModalVisible(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setLoading((prev) => ({ ...prev, deleteProject: false }));
    }
  };

  // ✅ Handle view project
  const viewProject = (record: ProjectApiResponse) => {
    setSelectedProject(record);
    setIsEditMode(false);
    setIsViewEditModalVisible(true);
  };

  // ✅ Handle edit project
  const editProject = (record: ProjectApiResponse) => {
    setSelectedProject(record);
    setIsEditMode(true);
    setIsViewEditModalVisible(true);
  };

  // ✅ Open delete modal
  const deleteRow = (row: ProjectApiResponse) => {
    setSelectedProject(row);
    setDeleteProjectModalVisible(true);
  };

  const descriptionDropDown = (record: ProjectApiResponse) => ({
    items: [
      {
        key: "description",
        label: (
          <div
            className="p-4 max-h-[200px] overflow-y-auto"
            style={{ maxWidth: "85vw" }}
          >
            <strong>Description:</strong> {record.description}
          </div>
        ),
      },
    ],
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text: string) => (
        <span className="text-xs sm:text-sm md:text-base">{text}</span>
      ),
    },
    {
      title: "Client",
      dataIndex: "clientId",
      render: (client: { profilePic: string; name: string; email: string }) => (
        <Space className="flex flex-row">
          <Avatar shape="square" size={60} src={client?.profilePic} />
          <div>
            <p className="text-xs sm:text-sm md:text-base">{client?.name}</p>
            <p className="text-xs sm:text-sm md:text-base">{client?.email}</p>
          </div>
        </Space>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (startDate: string) => (
        <p className="text-xs sm:text-sm md:text-base">
          {new Date(startDate).toLocaleDateString()}
        </p>
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: (endDate: string) => (
        <p className="text-xs sm:text-sm md:text-base">
          {endDate ? new Date(endDate).toLocaleDateString() : 'N/A'}
        </p>
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
                "capitalize w-[130px] rounded-full px-2 py-2 text-sm font-medium flex items-center justify-center border border-green-300 bg-green-50 text-green-700",
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
                "capitalize w-[120px] rounded-full px-4 py-1.5 text-sm font-medium flex items-center justify-center border border-gray-300 bg-gray-50 text-gray-700",
            };
            break;
        }

        return <Badge {...badgeProps} />;
      },
    },

    {
      title: "Budget",
      render: (record: { budget: number; currency: string }) => (
        <NumericFormat
          className="text-xs sm:text-sm md:text-base"
          value={record.budget}
          displayType="text"
          thousandSeparator={true}
          prefix={record.currency + " "}
        />
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_: unknown, record: ProjectApiResponse) => (
        <Dropdown
          menu={{
            ...descriptionDropDown(record),
            style: { minWidth: 300 },
          }}
          trigger={["click"]}
          placement="bottomLeft"
          getPopupContainer={(triggerNode) =>
            triggerNode.parentElement as HTMLElement
          }
        >
          <span className="cursor-pointer border-b-2 text-blue-600 border-blue-500">
            See description
          </span>
        </Dropdown>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_: unknown, record: ProjectApiResponse) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <div onClick={() => viewProject(record)}>
                    <EyeOutlined /> View
                  </div>
                ),
              },
              {
                key: "edit",
                label: (
                  <div onClick={() => editProject(record)}>
                    <EditOutlined /> Edit
                  </div>
                ),
              },
              {
                key: "delete",
                label: (
                  <div onClick={() => deleteRow(record)}>
                    <DeleteOutlined /> Delete
                  </div>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Space
        className="mb-4"
        style={{ display: "flex", justifyContent: "space-between" }}
        wrap
      >
        <Space wrap>
          <p className="text-xl font-semibold">Projects</p>
        </Space>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setIsCreateModalVisible(true)}
        >
          Create Project
        </Button>
      </Space>

      {/* ✅ Loading State */}
      {loading.fetchProjects ? (
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
            <Table
              columns={columns}
              dataSource={list}
              rowKey="_id"
              scroll={{ x: "max-content" }}
              pagination={{
                current: page,
                pageSize,
                total,
                onChange: (p, ps) => {
                  setPage(p);
                  setPageSize(ps);
                },
                responsive: true,
              }}
              className="text-xs sm:text-sm md:text-base"
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Delete Project Modal */}
      <Modal
        title={<div className="font-bold text-2xl">Delete Project</div>}
        open={deleteProjectModalVisible}
        onCancel={() => {
          setDeleteProjectModalVisible(false);
          setSelectedProject(null);
        }}
        footer={null}
        style={{ maxWidth: "90vw" }}
      >
        <p>Are you sure you want to delete this project?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={() => {
              setDeleteProjectModalVisible(false);
              setSelectedProject(null);
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            loading={loading.deleteProject}
            onClick={handleDeleteProject}
          >
            Delete
          </Button>
        </div>
      </Modal>

      {/* Create Project Modal */}
      <CreateProjectModal
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        loading={loading.createProject}
        onCreate={handleCreateProject}
      />

      {/* View/Edit Project Modal */}
      <ViewEditProjectModal
        visible={isViewEditModalVisible}
        onCancel={() => {
          setIsViewEditModalVisible(false);
          setSelectedProject(null);
        }}
        onUpdate={handleUpdateProject}
        project={selectedProject}
        loading={loading.updateProject}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
    </>
  );
};

export default ProjectList;

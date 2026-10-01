"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Typography, Skeleton } from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  DollarOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { getAdminInsightsApi } from "@/app/api/backend/admin";
import { AdminInsightsApiResponse } from "@/types/api";

const { Title } = Typography;

const DashboardPage = () => {
  const [insights, setInsights] = useState<AdminInsightsApiResponse | null>(null);
  const [loading, setLoading] = useState(true); // 👈 track loading

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const res = await getAdminInsightsApi();
        if (res?.success) {
          setInsights(res.data);
          console.log("Admin Insights:", res.data);
        } else {
          console.error("Failed to fetch admin insights:", res);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const data = {
    clients: insights?.clients || 0,
    projects: insights?.projects?.total || 0,
    completedProjects: insights?.projects?.completed || 0,
    ongoingProjects: insights?.projects?.ongoing || 0,
    totalInvoices: insights?.invoices?.total || 0,
    completedInvoices: insights?.invoices?.completed || 0,
    pendingInvoices: insights?.invoices?.pending || 0,
    totalPayment: insights?.payments?.total || 0,
    completedPayment: insights?.payments?.completed || 0,
    pendingPayment: insights?.payments?.pending || 0,
    totalInvites: insights?.invites?.total || 0,
    acceptedInvites: insights?.invites?.accepted || 0,
    pendingInvites: insights?.invites?.pending || 0,
    expiredInvites: insights?.invites?.expired || 0,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Title level={3} className="mb-6 text-center">
        📊 Dashboard Overview
      </Title>

      <Row gutter={[16, 16]}>
        {/* Clients & Projects */}
        <Col xs={24} lg={12}>
          <Card className="shadow-lg rounded-xl">
            <Title level={4}>👥 Clients & Projects</Title>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Total Clients" value={data.clients} prefix={<UserOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Total Projects" value={data.projects} prefix={<ProjectOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Completed Projects" value={data.completedProjects} prefix={<FileDoneOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Ongoing Projects" value={data.ongoingProjects} prefix={<FileSyncOutlined />} />
                </Col>
              </Row>
            )}
          </Card>
        </Col>

        {/* Invoices */}
        <Col xs={24} lg={12}>
          <Card className="shadow-lg rounded-xl">
            <Title level={4}>🧾 Invoices</Title>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Total Invoices" value={data.totalInvoices} prefix={<FileDoneOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Completed Invoices" value={data.completedInvoices} prefix={<FileDoneOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Pending Invoices" value={data.pendingInvoices} prefix={<FileSyncOutlined />} />
                </Col>
              </Row>
            )}
          </Card>
        </Col>

        {/* Payments */}
        <Col xs={24} lg={12}>
          <Card className="shadow-lg rounded-xl">
            <Title level={4}>💰 Payments</Title>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Total Payment" value={data.totalPayment} prefix={<DollarOutlined />} suffix="$" />
                </Col>
                <Col span={12}>
                  <Statistic title="Completed Payment" value={data.completedPayment} prefix={<DollarOutlined />} suffix="$" />
                </Col>
                <Col span={12}>
                  <Statistic title="Pending Payment" value={data.pendingPayment} prefix={<DollarOutlined />} suffix="$" />
                </Col>
              </Row>
            )}
          </Card>
        </Col>

        {/* Invites */}
        <Col xs={24} lg={12}>
          <Card className="shadow-lg rounded-xl">
            <Title level={4}>📨 Invites</Title>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Total Invites" value={data.totalInvites} prefix={<MailOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Accepted" value={data.acceptedInvites} prefix={<MailOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Pending" value={data.pendingInvites} prefix={<MailOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Expired" value={data.expiredInvites} prefix={<MailOutlined />} />
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

"use client";

import { useEffect, useState } from "react";
import { Row, Col, Card, Statistic, Typography } from "antd";
import {
  ProjectOutlined,
  FileDoneOutlined,
  FileSyncOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { getInsights } from "@/app/api/backend/client";

const { Title } = Typography;

interface Insights {
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  pendingProjects: number;
}

export const ProjectInsightsCards = () => {
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await getInsights();
        if (response.success) {
          setInsights(response.data);
        } else {
          console.error("Failed to fetch insights:", response);
        }
      } catch (err) {
        console.error("Error fetching insights:", err);
      }
    };

    fetchInsights();
  }, []);

  if (!insights) return <div>Loading...</div>;

  const stats = [
    {
      title: "Total Projects",
      value: insights.totalProjects,
      icon: <ProjectOutlined />,
      color: "#1677ff",
    },
    {
      title: "Completed Projects",
      value: insights.completedProjects,
      icon: <FileDoneOutlined />,
      color: "#52c41a",
    },
    {
      title: "Ongoing Projects",
      value: insights.ongoingProjects,
      icon: <FileSyncOutlined />,
      color: "#faad14",
    },
    {
      title: "Pending Projects",
      value: insights.pendingProjects,
      icon: <ClockCircleOutlined />,
      color: "#ff4d4f",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen ">
      <Title level={3} className="mb-6 text-center">
        📂 Project Insights
      </Title>

      <Row gutter={[16, 16]}>
        {stats.map((item, idx) => (
          <Col xs={24} md={12} lg={12} key={idx}>
            <Card className="shadow-lg rounded-xl">
              <Statistic
                title={
                  <span className="text-base font-medium flex items-center gap-2">
                    {item.icon} {item.title}
                  </span>
                }
                value={item.value}
                valueStyle={{ color: item.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

'use client'; // Remove if you're in the pages directory

import React from "react";
import { Row, Col } from "antd";

import { ProjectInsightsCards } from "@/components/dashboard/AnnualStatsCard";
import DashboardLayout from "@/components/layout/DashboardLayout";

const DashboardPage = () => {
  return (
      <Row gutter={16}>
        <Col xs={24} lg={24}>
          <ProjectInsightsCards />
        </Col>
      </Row>
  );
};

export default DashboardPage;

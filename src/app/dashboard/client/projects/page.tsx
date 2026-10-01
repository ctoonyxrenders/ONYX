'use client';

import React from "react";
import { Card } from "antd";
import ProjectList from "@/components/dashboard/client/ProjectList";

const ProjectsPage = () => {
  return (
    <Card>
      <ProjectList />
    </Card>
  );
};

export default ProjectsPage;
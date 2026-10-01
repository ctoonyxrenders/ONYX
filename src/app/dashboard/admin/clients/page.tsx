'use client';

import React from "react";
import { Card } from "antd";
import ClientList from "@/components/dashboard/admin/ClientList";

const ClientsPage = () => {
  return (
    <Card>
      <ClientList />
    </Card>
  );
};

export default ClientsPage;

'use client';

import React from "react";
import { Card } from "antd";
import InvoiceList from "@/components/dashboard/client/InvoiceList";

const InvoicesPage = () => {
  return (
    <Card>
      <InvoiceList />
    </Card>
  );
};

export default InvoicesPage;
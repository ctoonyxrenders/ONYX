"use client";

import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <Layout className="chat" style={{ height: "100vh" }}>
      <Content style={{ padding: 0, background: "#fff" }}>{children}</Content>
    </Layout>
  );
}

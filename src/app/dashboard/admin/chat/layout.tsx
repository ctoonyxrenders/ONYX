"use client";

import React from "react";
import { Layout } from "antd";
import ChatMenu from "@/components/dashboard/admin/chat/ChatMenu";

const { Sider, Content } = Layout;

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className="chat" style={{ height: "100vh" }}>
      <Sider
        width={300}
        style={{
          background: "#fff",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <ChatMenu />
      </Sider>

      <Content style={{ padding: 0, background: "#fff" }}>{children}</Content>
    </Layout>
  );
}

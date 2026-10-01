"use client";

import React, { ReactNode } from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
const { Header, Content, Sider } = Layout;

function getItem(label: ReactNode, key: string, icon?: ReactNode, children?: any, type?: "group") {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Clients", "sub1"),
  getItem("Projects", "sub2"),
  getItem("Invoices", "sub3"),
  getItem("Chat","sub4"),
];
type DashboardLayoutProps = {
    children: ReactNode;
    role?: string;
  };


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const onClick = (e: any) => {
    console.log("Clicked menu item:", e);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={256} style={{ background: "#fff" }}>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items.map((item) => ({
            ...item,
            label: typeof item.label === "string" ? (
              <span>{item.label}</span>
            ) : (
              item.label
            ),
            children: item.children?.map((child: any) => ({
              ...child,
              label: (
                <Link href={`/dashboard/${child.key}`}>{child.label}</Link>
              ),
            })),
          }))}
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow px-6 py-4 text-xl font-semibold">
          {role} Dashboard
        </Header>
        <Content className="p-6">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;

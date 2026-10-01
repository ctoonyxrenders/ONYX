"use client";

import React from "react";
import { ConfigProvider } from "antd";

const antdTheme = {
  token: {
    fontFamily: '"Poppins", "Century Gothic", sans-serif',
    fontSize: 14,
    colorPrimary: "#114046",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorInfo: "#114046",
    borderRadius: 12,
    colorText: "#374151",
    colorTextSecondary: "#6b7280",
    colorBgContainer: "#ffffff",
    colorBgLayout: "#f9fafb",
    colorBgHover: "#0e3035",
    colorLink: "#114046",
    colorLinkHover: "#0e3035",
    colorLinkActive: "#0e3035",
    colorButtonHover: "#0e3035"

  },
  components: {
    Button: {
      fontSize: 16,
      fontWeight: 400,
      borderRadius: 12,
      controlHeight: 48,
      colorPrimaryHover: "#0e3035"
    },
    Input: {
      fontSize: 16,
      borderRadius: 12,
      controlHeight: 40
    },
    Select: {
      fontSize: 16,
      borderRadius: 12,
    },
    Form: {
      labelFontSize: 16,
      labelFontWeight: 500,
    },
    Table: {
      borderRadius: 12,
      headerBg: "#f9fafb",
      headerColor: "#374151",
      fontWeightStrong: 600,
      fontSize: 16,
      rowHoverBg: "#f3f4f6",
    },
    Modal: { borderRadius: 16 },
    Drawer: { borderRadius: 16 },
    Card: { borderRadius: 16 },
    Alert: { borderRadius: 12 },
    Menu: { borderRadius: 12, itemBorderRadius: 12, fontSize: 16 },
    Tabs: { borderRadius: 12 },
    Pagination: { borderRadius: 12 },
    Steps: { borderRadius: 12 },
    Progress: { borderRadius: 12 },
    Slider: { borderRadius: 12 },
    Switch: { borderRadius: 12 },
    Checkbox: { borderRadius: 6 },
    Radio: { borderRadius: 6 },
  },
};

export function ConfigProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
  );
}

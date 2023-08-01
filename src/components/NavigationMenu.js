import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  EditFilled,
} from "@ant-design/icons";
import { Button, Menu, Layout, Space, Divider } from "antd";
import React, { useState } from "react";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("主页", "1", <PieChartOutlined />),
  getItem("Buy", "2", <DesktopOutlined />),
  getItem("Sell", "3", <ContainerOutlined />),
  getItem("Categories", "sub1", <MailOutlined />, [
    getItem("Option 1", "5"),
    getItem("Option 2", "6"),
    getItem("Option 3", "7"),
    getItem("Option 4", "8"),
  ]),
];

const { Sider } = Layout;

const NavigationMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider width={300} style={{ padding: 10, backgroundColor: "#112a45" }}>
      <div
        className="title"
        style={{
          height: "8vh",
          backgroundColor: "#112a45",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EditFilled />
        <span
          style={{
            marginLeft: 15,
            fontSize: 16,
            fontWeight: 800,
            color: "white",
            height: "calc(100% - 64px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Letgo: second-hand market
        </span>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ marginBottom: 26, backgroundColor: "#1765ad" }}
      />
    </Sider>
  );
};
export default NavigationMenu;

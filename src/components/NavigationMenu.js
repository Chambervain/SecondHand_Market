import {
  ContainerOutlined,
  CrownOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import React from "react";
import MusicPlayer from "./MusicPlayer";

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
  getItem("Home page", "1", <CrownOutlined />),
  getItem("My items", "2", <DesktopOutlined />),
  getItem("Upload item", "3", <ContainerOutlined />),
];

const { Sider } = Layout;

const NavigationMenu = ({ renderPage }) => {
  const onClick = (e) => {
    console.log("MenuItem Key", e.key);
    renderPage(e.key);
  };

  return (
    <Sider width={300} style={{ padding: 10, backgroundColor: "#003153" }}>
      <div
        className="title"
        style={{
          height: "8vh",
          backgroundColor: "#003153",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MusicPlayer />
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
        onClick={onClick}
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

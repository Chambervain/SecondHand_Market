import {
  ContainerOutlined,
  CrownOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import React from "react";
import MusicPlayer from "./MusicPlayer";
import myImage from "../images/log3.png";

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

const NavigationMenu = ({ renderPage, collapsed }) => {
  const onClick = (e) => {
    console.log("MenuItem Key", e.key);
    renderPage(e.key);
  };

  return (
    <Sider
      width={collapsed ? 0 : 400}
      collapsed={collapsed}
      collapsedWidth={collapsed ? 0 : 80}
      style={{
        padding: 10,
        position: "relative",
        overflow: "hidden",
        background: collapsed ? "white" : "ghostwhite",
        backgroundSize: "cover",
      }}
    >
      <div
        className="title"
        style={{
          height: "8vh",
          background: "ghostwhite",
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
        }}
      >
        <MusicPlayer />
        <span
          style={{
            marginLeft: 10,
            fontSize: 18,
            fontWeight: 600,
            color: "dark",
            height: "calc(100% - 64px)",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
          }}
        >
          secondhand market
        </span>
      </div>
      <Menu
        onClick={onClick}
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{
          marginBottom: 26,
          overflow: "hidden",
          background: "ghostwhite",
        }}
      />
    </Sider>
  );
};
export default NavigationMenu;

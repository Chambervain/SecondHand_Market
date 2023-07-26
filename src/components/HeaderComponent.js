import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

function HomeHeaderComponent() {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#FB8C00",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
        Letgo: second-hand market
      </div>
    </Header>
  );
}

export default HomeHeaderComponent;

import { useState } from "react";
import "./App.css";
import { Button, Dropdown, Layout, Space } from "antd";
import { Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Home from "./components/Home";

const { Header, Content } = Layout;

function App() {
  // Here, Set authed state to be true in order to display Tab component, cuz there is no async function so far
  const [authed, setAuthed] = useState(true);

  const renderContent = () => {
    if (authed) {
      return (
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Home Page" key="1">
            <Home />
          </Tabs.TabPane>
          <Tabs.TabPane tab="My Items" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Upload Item" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
        </Tabs>
      );
    }

    return <div>This is Placeholder of homepage for the Letgo Market</div>;
  };

  return (
    <Layout style={{ height: "100vh" }}>
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

        {authed && (
          <div>
            <Space>
              <Button type="primary" shape="round">
                Sign Up
              </Button>

              <Button type="primary" shape="round">
                Sign In
              </Button>
            </Space>
          </div>
        )}
      </Header>
      <Content
        style={{
          height: "calc(100% - 64px)",
          padding: 20,
          overflow: "auto",
          backgroundColor: "#E3F2FD",
        }}
      >
        {renderContent()}
      </Content>
    </Layout>
  );
}

export default App;

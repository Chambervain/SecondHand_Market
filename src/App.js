import { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import { Tabs } from "antd";
import UploadItems from "./components/UploadItems";
import Home from "./components/Home";
import Logout from "./components/Logout";
import LoginPage from "./components/LoginPage";
import { Space } from "antd";
import { Header } from "antd/lib/layout/layout";
import RegisterPage from "./components/RegisterPage";
import MyOwnItems from "./components/MyOwnItem";

const { Content } = Layout;

function App() {
  // Here, Set authed state to be true in order to display Tab component, cuz there is no async function so far
  const [authed, setAuthed] = useState(false);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setAuthed(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthed(false);
  };

  const handleForgot = () => {
    document.getElementsByTagName("button")[1].click();
  };

  const renderContent = () => {
    if (authed) {
      return (
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Home Page" key="1">
            <Home />
          </Tabs.TabPane>
          <Tabs.TabPane tab="My Items" key="2">
            <MyOwnItems />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Upload Item" key="3">
            <UploadItems />
          </Tabs.TabPane>
        </Tabs>
      );
    } else {
      return (
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Home Page" key="1">
            <Home />
          </Tabs.TabPane>
        </Tabs>
      );
    }
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
        {!authed && (
          <div>
            <Space>
              <LoginPage
                handleLoginSuccess={handleLoginSuccess}
                handleForgot={handleForgot}
              />

              <RegisterPage />
            </Space>
          </div>
        )}

        {authed && (
          <div>
            <Space>
              <Logout handleLogout={handleLogOut} />
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

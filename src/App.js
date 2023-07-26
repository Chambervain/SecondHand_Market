import { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import { Tabs } from "antd";
import UploadItems from "./components/UploadItems";
import LoginPage from "./components/LoginPage";
import HomeHeaderComponent from "./components/HeaderComponent";
import MyOwnItems from "./components/MyOwnItem";

const { Content } = Layout;

function App() {
  // Here, Set authed state to be true in order to display Tab component, cuz there is no async function so far
  const [authed, setAuthed] = useState(true);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setAuthed(true);
  };

  const renderContent = () => {
    if (authed) {
      return (
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Home Page" key="1">
            Content of Tab Pane 1
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
        <div>
          <LoginPage handleLoginSuccess={handleLoginSuccess} />
        </div>
      );
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <HomeHeaderComponent />
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

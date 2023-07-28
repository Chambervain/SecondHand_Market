import { useState } from "react";
import "./App.css";
import { Button, Dropdown, Layout, Space } from "antd";
import { Tabs } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Logout from "./components/Logout";

const { Header, Content } = Layout;

class App extends React.Component {
  // Here, Set authed state to be true in order to display Tab component, cuz there is no async function so far
  state = {
    authed: true,
  };

  // componentDidMount = () => {
  //   const authToken = localStorage.getItem("authToken");
  //   this.setState({
  //     authed: authToken !== null,
  //   });
  // };

  handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    this.setState({
      authed: false,
    });
  };

  handleLogOut = () => {
    localStorage.removeItem("authToken");
    this.setState({
      authed: true,
    });
  };

  handleForgot = () => {
    document.getElementsByTagName("button")[1].click();
  };
  renderContent = () => {
    if (this.state.authed) {
      return (
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="Home Page" key="1">
            Content of Tab Pane 1
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

  render() {
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

          {this.state.authed && (
            <div>
              <Space>
                <LoginPage
                  handleLoginSuccess={this.handleLoginSuccess}
                  handleForgot={this.handleForgot}
                />

                <RegisterPage />
              </Space>
            </div>
          )}

          {!this.state.authed && (
            <div>
              <Space>
                <Logout handleLogout={this.handleLogOut} />
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
          {this.renderContent()}
        </Content>
      </Layout>
    );
  }
}

export default App;

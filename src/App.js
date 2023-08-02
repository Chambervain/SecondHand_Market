import { useState } from "react";
import "./App.css";
import { Button, Dropdown, Layout, Space, Menu, Input } from "antd";
import { Tabs } from "antd";
import React from "react";
import {
  UserOutlined,
  ShoppingCartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Logout from "./components/Logout";
import Home from "./components/Home";
import NavigationMenu from "./components/NavigationMenu";
import { HomeOutlined } from "@ant-design/icons";
import MyOwnItems from "./components/MyOwnItem";
import UploadItems from "./components/UploadItems";
import DetailPage from "./components/DetailPage";
import { GoogleApiWrapper } from "./components/GoogleApiWrapper";

const { Header, Content } = Layout;

class App extends React.Component {
  // Here, Set authed state to be true in order to display Tab component, cuz there is no async function so far
  state = {
    authed: true,
    key: 0,
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
    var obj = document.getElementsByClassName(
      "ant-dropdown ant-dropdown-placement-bottomRight "
    );
    var arr = Array.prototype.slice.call(obj);
    arr[0].getElementsByTagName("button")[1].click();
  };

  renderContent = () => {
    if (!this.state.authed && this.state.key === 0) {
      return <Home />;
    } else if (!this.state.authed && this.state.key === 1) {
      return <MyOwnItems />;
    } else if (!this.state.authed && this.state.key === 2) {
      return <UploadItems />;
    }
    return <DetailPage />;
  };

  userMenuLogin = (
    <Menu>
      <Menu.Item>
        <LoginPage
          handleLoginSuccess={this.handleLoginSuccess}
          handleForgot={this.handleForgot}
        />
      </Menu.Item>
      <Menu.Item>
        <RegisterPage />
      </Menu.Item>
    </Menu>
  );

  userMenuLogout = (
    <Menu>
      <Menu.Item>
        <Logout handleLogout={this.handleLogOut} />
      </Menu.Item>
    </Menu>
  );

  changeContent = (value) => {
    this.setState({
      key: value,
    });
  };

  renderHeaderContent = () => {
    if (this.state.authed) {
      return (
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#096dd9",
            height: "8vh",
            backgroundImage:
              "url('https://www.freepik.com/free-vector/flat-design-geometric-real-estate-twitter-header_20814906.htm#query=website%20header&position=17&from_view=keyword&track=ais')",
          }}
        >
          <HomeOutlined
            style={{
              width: 3000,
              fontSize: 16,
              fontWeight: 600,
              color: "white",
              fontSize: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          <div>
            <Dropdown trigger="click" overlay={this.userMenuLogin}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        </Header>
      );
    } else {
      return (
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#096dd9",
          }}
        >
          <div
            style={{
              width: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="text"
              style={{
                color: "white",
              }}
              icon={<HomeOutlined style={{ fontSize: 25 }} />}
              onClickCapture={() => this.changeContent(0)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="text"
              style={{
                color: "white",
              }}
              icon={<ShoppingCartOutlined style={{ fontSize: 23 }} />}
              onClick={() => this.changeContent(1)}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="text"
              style={{
                color: "white",
              }}
              icon={<UploadOutlined style={{ fontSize: 23 }} />}
              onClick={() => this.changeContent(2)}
            />
          </div>
          <div>
            <Dropdown trigger="click" overlay={this.userMenuLogout}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        </Header>
      );
    }
  };

  render() {
    return (
      <Layout>
        <NavigationMenu />
        <Layout className="site-layout" style={{ height: "100vh" }}>
          {this.renderHeaderContent()}
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
      </Layout>
    );
  }
}

export default App;

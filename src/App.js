import { useState, useEffect } from "react";
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

const { Header, Content } = Layout;

function App() {
  // Here, Set authed state to be true in order to display Tab component, cuz there is no async function so far
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthed(authToken !== null);
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setAuthed(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthed(false);
  };

  const handleForgot = () => {
    var obj = document.getElementsByClassName(
      "ant-dropdown ant-dropdown-placement-bottomRight "
    );
    var arr = Array.prototype.slice.call(obj);
    arr[0].getElementsByTagName("button")[1].click();
  };

  const userMenuLogin = () => {
    return (
      <Menu>
        <Menu.Item>
          <LoginPage
            handleLoginSuccess={handleLoginSuccess}
            handleForgot={handleForgot}
          />
        </Menu.Item>
        <Menu.Item>
          <RegisterPage />
        </Menu.Item>
      </Menu>
    );
  };

  const userMenuLogout = () => {
    return (
      <Menu>
        <Menu.Item>
          <Logout handleLogout={handleLogOut} />
        </Menu.Item>
      </Menu>
    );
  };

  const changeContent = (value) => {
    setKey(value);
  };

  const renderHeaderContent = () => {
    if (!authed) {
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
            <Dropdown trigger="click" overlay={userMenuLogin}>
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
              onClick={() => changeContent(0)}
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
              onClick={() => changeContent(1)}
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
              onClick={() => changeContent(2)}
            />
          </div>
          <div>
            <Dropdown trigger="click" overlay={userMenuLogout}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        </Header>
      );
    }
  };

  const renderContent = () => {
    if (authed && key === 0) {
      return <Home />;
    } else if (authed && key === 1) {
      return <MyOwnItems />;
    } else if (authed && key === 2) {
      return <UploadItems />;
    }
    return <Home />;
  };

  return (
    <Layout>
      <NavigationMenu />
      <Layout className="site-layout" style={{ height: "100vh" }}>
        {renderHeaderContent()}
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
    </Layout>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import { Button, Dropdown, Layout, Menu, message } from "antd";
import React from "react";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Logout from "./components/Logout";
import Home from "./components/Home";
import NavigationMenu from "./components/NavigationMenu";
import { HomeOutlined } from "@ant-design/icons";
import MyOwnItems from "./components/MyOwnItem";
import UploadItems from "./components/UploadItems";
import FavCart from "./components/FavCart";
import axios from "axios";

const { Header, Content } = Layout;

function App() {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState(1);
  const [curLocation, setCurLocation] = useState({});
  const [isLocationReady, setIsLocationReady] = useState(false);

  useEffect(() => {
    getLocation();
    const authToken = localStorage.getItem("authToken");
    setAuthed(authToken !== null);
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurLocation(location.data);
    console.log(location.data);
    setIsLocationReady(true);
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setAuthed(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setAuthed(false);
  };

  // transfer to register from login page
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
    console.log("set key: ", value);

    if ((!authed && value == 2) || (!authed && value == 3)) {
      message.warn("Please login before using");
    }
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
          }}
        >
          <HomeOutlined
            style={{
              width: 3000,
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
            <FavCart />
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
              onClick={() => changeContent(3)}
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
    if (authed && key == 1) {
      return (
        <div>
          <Home />
        </div>
      );
    } else if (authed && key == 2) {
      return <MyOwnItems />;
    } else if (authed && key == 3) {
      return (
        <div>
          <UploadItems />
        </div>
      );
    } else {
      return <Home />;
    }
  };

  return (
    <Layout>
      <NavigationMenu renderPage={changeContent} />
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

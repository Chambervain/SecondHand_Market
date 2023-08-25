import { useState, useEffect } from "react";
import "./App.css";
import { Button, Dropdown, Layout, Menu, message, Image } from "antd";
import React from "react";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Logout from "./components/Logout";
import Home from "./components/Home";
import NavigationMenu from "./components/NavigationMenu";
import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import MyOwnItems from "./components/MyOwnItem";
import UploadItems from "./components/UploadItems";
import FavCart from "./components/FavCart";
import MyAccount from "./components/MyAccount";
import axios from "axios";
import { getCurrentUserName } from "./utils";
import ChatBox from "./components/ChatBox";
import PersonMessage from "./components/PersonMessage";
import { Link } from "react-router-dom";
import myImage from "./images/log3.png";
import logoImage from "./images/log4.png";

const { Header, Content } = Layout;

function App() {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState(1);
  const [username, setUsername] = useState("");
  const [curLocation, setCurLocation] = useState({});
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [headerBg, setHeaderBg] = useState(false);

  //collapsed
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  //handScroll

  const handleScroll = () => {
    if (window.pageYOffset >= 300) {
      setHeaderBg(true);
    } else {
      setHeaderBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClassName = headerBg ? "header_new" : "header";
  //////

  useEffect(() => {
    getLocation();
    const authToken = localStorage.getItem("authToken");
    setAuthed(authToken !== null);
  }, []);

  // call api to get current username
  useEffect(() => {
    getCurrentUserName()
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => {
        // message.error(err.message);
      });
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurLocation(location.data);
    setLat(location.data.latitude);
    setLon(location.data.longitude);
    setCity(location.data.city);
    setRegion(location.data.region);
    console.log(location.data);
    setIsLocationReady(true);
  };

  const handleLoginSuccess = (token, username) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    setAuthed(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
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
    const menuStyle = {
      borderRadius: "10px",
      background: "#f2f2f2",
      border: "none",
    };

    const menuItemStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50px",
      background: "#f2f2f2",
    };
    return (
      <Menu style={menuStyle}>
        <Menu.Item style={menuItemStyle}>
          <Logout handleLogout={handleLogOut} />
        </Menu.Item>
        <Menu.Item style={menuItemStyle}>
          <MyAccount />
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
        <Header className={headerClassName}>
          {/* <div
            style={{
              left: 0,
              position: "absolute",
              marginLeft: "5px",
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logoImage} width={30} height={30}></img>
          </div> */}
          <div>
            <Button type="text" onClick={toggleCollapsed}>
              <p style={{ fontFamily: "Roboto,san-serif" }}>Show Menu</p>
            </Button>
          </div>
          <div className="header_title">LETGO</div>

          <div style={{ marginLeft: 1200, fontSize: 5 }}>
            <Dropdown trigger="click" overlay={userMenuLogin}>
              <Button icon={<UserOutlined />} shape="circle" />
            </Dropdown>
          </div>
        </Header>
      );
    } else {
      return (
        <Header className={headerClassName}>
          <div>
            <Button type="text" onClick={toggleCollapsed}>
              <p style={{ fontFamily: "Roboto,san-serif" }}>Show Menu</p>
            </Button>
          </div>
          <div className="header_title">
            <Button
              type="text"
              style={{
                fontSize: 40,
                fontFamily: "Copperplate, fantasy",
                fontWeight: "bolder",
                marginTop: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => changeContent(1)}
            >
              LETGO
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
              marginRight: "5px",
            }}
          >
            <Link to={`/chatbox/${username}`}>
              <div style={{ marginLeft: 1000 }}>
                <Button
                  type="text"
                  style={{
                    color: "black",
                  }}
                  icon={<MailOutlined style={{ fontSize: 20 }} />}
                />
              </div>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FavCart username={username} />
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
                color: "black",
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

  const handleChangeLocation = (city, region, lat, lon) => {
    console.log(city);
    console.log(lat);
    if (city != null) {
      setCity(city);
      setRegion(region);
      setLat(lat);
      setLon(lon);
    }
  };

  const renderContent = () => {
    if (authed && key == 1) {
      return (
        <div>
          {isLocationReady && (
            <Home
              authed={authed}
              lat={lat}
              lon={lon}
              city={city}
              region={region}
              changeLocation={handleChangeLocation}
            />
          )}
        </div>
      );
    } else if (authed && key == 2) {
      return <MyOwnItems />;
    } else if (authed && key == 3) {
      return (
        <div>
          <UploadItems lat={curLocation.latitude} lon={curLocation.longitude} />
        </div>
      );
    } else {
      return (
        <div>
          {isLocationReady && (
            <Home
              authed={authed}
              lat={lat}
              lon={lon}
              city={city}
              region={region}
              changeLocation={handleChangeLocation}
            />
          )}
        </div>
      );
    }
  };

  return (
    <Layout>
      {renderHeaderContent()}
      <div>
        <img src={myImage} width="100%" />
      </div>
      <Layout>
        <NavigationMenu renderPage={changeContent} collapsed={collapsed} />
        <Layout>
          <Content
            style={{
              height: "1000px",
              padding: 20,
              overflow: "auto",
              backgroundColor: "white",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Image,
  Modal,
  List,
} from "antd";
import React from "react";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import NavigationMenu from "./components/NavigationMenu";
import { HomeOutlined, MailOutlined } from "@ant-design/icons";
import MyOwnItems from "./components/MyOwnItem";
import UploadItems from "./components/UploadItems";
import FavCart from "./components/FavCart";
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
  const [isAccountModalVisible, setIsAccountModalVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [isUsernameEditMode, setIsUsernameEditMode] = useState(false);
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  const [isLocationEditMode, setIsLocationEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");

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
        setLocation(data.location);
        setEditedUsername(data.username);
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
    const editButtonStyle = {
      color: "green", // Set the color to green
      border: "none", // Remove the border
      outline: "none", // Remove the outline when focused
      background: "none", // Remove any background color
      cursor: "pointer", // Show cursor as pointer when hovering
    };
    const handleUsernameEditClick = () => {
      setIsUsernameEditMode(true);
    };

    const handlePasswordEditClick = () => {
      setIsPasswordEditMode(true);
    };

    const handleLocationEditClick = () => {
      setIsLocationEditMode(true);
    };
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
          <Button onClick={handleLogOut} type="primary" shape="round">
            Logout
          </Button>
        </Menu.Item>
        <Menu.Item style={menuItemStyle}>
          <Button
            type="primary"
            shape="round"
            onClick={() => setIsAccountModalVisible(true)}
          >
            Profile
          </Button>
          <Modal
            title={<h2 style={{ fontSize: "18px" }}>Account Detail</h2>}
            open={isAccountModalVisible}
            onCancel={() => setIsAccountModalVisible(false)}
            footer={[
              <Button
                key="cancel"
                onClick={() => setIsAccountModalVisible(false)}
              >
                Cancel
              </Button>,
            ]}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                <span>Username:</span>
                {isUsernameEditMode ? (
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                    style={{
                      fontSize: "18px", // Increase font size
                      padding: "5px", // Add padding
                      borderRadius: "5px", // Add rounded corners
                    }}
                  />
                ) : (
                  <span>{username}</span>
                )}
                {!isUsernameEditMode ? (
                  <button
                    onClick={handleUsernameEditClick}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => setIsUsernameEditMode(false)}
                      style={editButtonStyle}
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => setIsUsernameEditMode(false)}
                      style={editButtonStyle}
                    >
                      save
                    </button>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                <span>Password:</span>
                {isPasswordEditMode ? (
                  <input
                    type="password"
                    // value={editedPassword}
                    // onChange={(e) => setEditedPassword(e.target.value)}
                    style={{
                      fontSize: "18px", // Increase font size
                      padding: "5px", // Add padding
                      borderRadius: "5px", // Add rounded corners
                    }}
                  />
                ) : (
                  <span>*****</span>
                )}
                {!isPasswordEditMode ? (
                  <button
                    onClick={handlePasswordEditClick}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => setIsPasswordEditMode(false)}
                      style={editButtonStyle}
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => setIsPasswordEditMode(false)}
                      style={editButtonStyle}
                    >
                      save
                    </button>
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                <span>Location:</span>
                {isLocationEditMode ? (
                  <input
                    type="text"
                    value={location}
                    // onChange={(e) => setEditedLocation(e.target.value)}
                    style={{
                      fontSize: "18px", // Increase font size
                      padding: "5px", // Add padding
                      borderRadius: "5px", // Add rounded corners
                    }}
                  />
                ) : (
                  <span>{location}</span>
                )}
                {!isLocationEditMode ? (
                  <button
                    onClick={handleLocationEditClick}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                ) : (
                  <div>
                    <button
                      onClick={() => setIsLocationEditMode(false)}
                      style={editButtonStyle}
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => setIsLocationEditMode(false)}
                      style={editButtonStyle}
                    >
                      save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Modal>
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

import React from "react";
import { Form, Button, Input, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { register } from "../utils";
import HeaderComponent from "./HeaderComponent";
import { Layout } from "antd";
import { Navigate } from "react-router-dom";

const { Content } = Layout;
class ReigsterPage extends React.Component {
  state = {
    login: false,
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  handleRegister = async (values) => {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("location", values.location);
    this.setState({
      loading: true,
    });

    try {
      await register(formData);
      message.success("Register Successfully");
      this.setState({
        login: true,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    if (this.state.login) {
      return <Navigate to="/" replace />;
    } else {
      return (
        <Layout style={{ height: "100vh" }}>
          <HeaderComponent />
          <Content
            style={{
              height: "calc(100% - 64px)",
              padding: 20,
              overflow: "auto",
              backgroundColor: "#E3F2FD",
            }}
          >
            <div style={{ width: 500, margin: "20px auto" }}>
              <Form onFinish={this.handleRegister}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Username!",
                    },
                  ]}
                >
                  <Input
                    disabled={this.state.loading}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    disabled={this.state.loading}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item name="location">
                  <Input disabled={this.state.loading} placeholder="Location" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={this.state.loading}
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      );
    }
  }
}

export default ReigsterPage;

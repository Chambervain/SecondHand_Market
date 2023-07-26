import React from "react";
import { Form, Button, Input, message, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../utils";
import { Link } from "react-router-dom";

class LoginPage extends React.Component {
  state = {
    loading: false,
  };

  onFinish = () => {
    console.log("finish form");
  };

  handleLogin = async (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    this.setState({
      loading: true,
    });

    try {
      const resp = await login(formData);
      this.props.handleLoginSuccess(resp.token);
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div style={{ width: 500, margin: "20px auto" }}>
        <Form onFinish={this.handleLogin}>
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
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.loading}
              >
                Log in
              </Button>
              Or <Link to={`/register`}>Register now !</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginPage;

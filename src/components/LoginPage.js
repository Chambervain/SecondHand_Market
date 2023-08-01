import { Button, Modal, Form, Input, message, Space } from "antd";
import React, { useState } from "react";
import { login } from "../utils";
import RegisterPage from "./RegisterPage";

class LoginPage extends React.Component {
  state = {
    modalOpen: false,
  };

  openModal = () => {
    this.setState({
      modalOpen: true,
    });
  };

  handleCancel = () => {
    this.setState({
      modalOpen: false,
    });
  };

  handleForgot = () => {
    this.handleCancel();
    this.props.handleForgot();
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <>
        <Button
          onClick={this.openModal}
          type="primary"
          shape="round"
          style={{ width: 88 }}
        >
          Login
        </Button>
        <Modal
          title="Letgo Login"
          open={modalOpen}
          onCancel={this.handleCancel}
          footer={null}
        >
          <LoginForm
            ref={(node) => (this.LoginForm = node)}
            handleLoginSuccess={this.props.handleLoginSuccess}
            handleForgot={this.handleForgot}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </>
    );
  }
}

export default LoginPage;

class LoginForm extends React.Component {
  layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };

  buttonLayout = {
    wrapperCol: {
      span: 32,
      offset: 5,
    },
  };

  state = {
    loading: false,
  };

  handleLogin = async (values, handleLoginSuccess) => {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("location", values.location);
    console.log("register successfully!");

    this.setState({
      loading: true,
    });

    try {
      const resp = await login(formData);
      this.props.handleLoginSuccess(resp.token);
      message.success("Login Successfully");
    } catch (error) {
      message.error("Username or Password Incorrect");
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <Form {...this.layout} ref={this.formData} onFinish={this.handleLogin}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username",
            },
          ]}
        >
          <Input disabled={this.state.loading} placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password",
            },
          ]}
        >
          <Input.Password
            disabled={this.state.loading}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item {...this.buttonLayout}>
          <Space size={10}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loading}
              onClick={this.props.handleCancel}
            >
              Submit
            </Button>
            <Button
              htmltype="button"
              loading={this.state.loading}
              onClick={this.props.handleCancel}
            >
              Cancel
            </Button>
            <a className="login-form-forgot" onClick={this.props.handleForgot}>
              Forgot password
            </a>
          </Space>
        </Form.Item>
      </Form>
    );
  }
}

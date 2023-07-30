import { Button, Modal, Form, Input, message, Space } from "antd";
import React from "react";
import { register } from "../utils";

class RegisterPage extends React.Component {
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

  render() {
    const { modalOpen } = this.state;
    return (
      <>
        <Button onClick={this.openModal} type="primary" shape="round">
          Register
        </Button>
        <Modal
          title="Letgo Register"
          open={modalOpen}
          onCancel={this.handleCancel}
          footer={null}
        >
          <RegisterForm
            ref={(node) => (this.RegisterForm = node)}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </>
    );
  }
}

export default RegisterPage;

class RegisterForm extends React.Component {
  layout = {
    labelCol: {
      xs: {
        span: 18,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  buttonLayout = {
    wrapperCol: {
      span: 32,
      offset: 9,
    },
  };
  state = {
    loading: false,
  };

  handleRegister = async (values) => {
    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("location", values.location);
    console.log("register successfully!");

    this.setState({
      loading: true,
    });

    try {
      await register(formData);
      message.success("Register Successfully");
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
      <Form {...this.layout} ref={this.formData} onFinish={this.handleRegister}>
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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input your Location",
            },
          ]}
        >
          <Input disabled={this.state.loading} placeholder="Location" />
        </Form.Item>
        <Form.Item {...this.buttonLayout}>
          <Space size={20}>
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
          </Space>
        </Form.Item>
      </Form>
    );
  }
}

import React from "react";
import { Form, Input, InputNumber, Button, message, Select } from "antd";
import { uploadItem } from "../utils";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
const { Dragger } = Upload;

const layout = {
  // 表单左边是label，右边是wrapper
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class UploadItems extends React.Component {
  state = {
    loading: false,
    fileList: [],
  };

  handleFileChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  // values没有文件信息
  handleSubmit = async (values) => {
    // formdata 可以处理文件信息，不能用json
    const formData = new FormData();
    // 从接水的桶fileInputRef中拿到文件信息
    const { fileList } = this.state;

    // files是一个数组
    if (fileList.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("condition", values.condition);
    formData.append("category", values.category);
    formData.append("lat", this.props.lat);
    formData.append("lon", this.props.lon);

    this.setState({
      loading: true,
    });
    try {
      await uploadItem(formData);
      message.success("upload successfully");
    } catch (error) {
      message.error(error.message);
    } finally {
      // 如果不执行，我们屏幕永远会有一个小圈圈在转
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { fileList, onFileChange } = this.props;
    return (
      <Form
        // spread operator
        {...layout}
        name="nest-messages"
        onFinish={this.handleSubmit}
        // margin: auto 直接这么写是为了让表单水平居中
        style={{ maxWidth: 1000, margin: "auto" }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, type: "number", min: 0 }]}
        >
          <InputNumber addonAfter="$" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Form.Item name="condition" label="Condition">
          <Select>
            <Select.Option value="New With Tags (NWT)">
              New With Tags (NWT)
            </Select.Option>
            <Select.Option value="Excellent Used Condition (EUC)">
              Excellent Used Condition (EUC)
            </Select.Option>
            <Select.Option value="Good Used Condition (GUC)">
              Good Used Condition (GUC)
            </Select.Option>
            <Select.Option value="Fair Used Condition (FUC)">
              Fair Used Condition (FUC)
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="Clothing">Clothing</Select.Option>
            <Select.Option value="Electronics">Electronics</Select.Option>
            <Select.Option value="Jewelry & Watches">
              Jewelry & Watches
            </Select.Option>
            <Select.Option value="Household goods">
              Household goods
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="picture" label="Picture" rules={[{ required: true }]}>
          <Dragger fileList={fileList} onChange={this.handleFileChange}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or other band files
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
          <Button type="primary" htmlType="submit" loading={this.state.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default UploadItems;

import React from "react";
import { Form, Input, InputNumber, Button, message, Select } from "antd";
import { uploadItem } from "../utils";

const layout = {
  // 表单左边是label，右边是wrapper
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class UploadItems extends React.Component {
  state = {
    loading: false,
  };

  fileInputRef = React.createRef();

  // values没有文件信息
  handleSubmit = async (values) => {
    // formdata 可以处理文件信息，不能用json
    const formData = new FormData();
    // 从接水的桶fileInputRef中拿到文件信息
    const { files } = this.fileInputRef.current;
    // files是一个数组
    if (files.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      // 这个时候存的是文件reference，不是文件本身
      formData.append("images", files[i]);
    }

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
          {/* 收集用户的文件信息 */}
          <input
            type="file"
            accept="image/png, image/jpeg"
            // 文件的信息handleSubmit不能帮你自动收集信息，所以需要用ref
            // ref 是一个桶，里面装的是文件的信息
            ref={this.fileInputRef}
            multiple={true}
          />
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

import React from "react";
import { Form, Button, Input, InputNumber, Select, message } from "antd";
import { useState } from "react";
import { modifyItem } from "../utils";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const ModificationForm = ({ itemId, handleModifySuccess }) => {
  const [loading, setLoading] = useState(false);

  const fileInputRef = React.createRef();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    const { files } = fileInputRef.current;

    if (files.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("condition", values.condition);
    formData.append("category", values.category);

    setLoading(true);

    try {
      await modifyItem(formData, itemId);
      message.success("Modification success");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
    console.log("Item modified successfully!");
    handleModifySuccess();
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={handleSubmit}
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item name="name" label="name" rules={[{ required: true }]}>
        <Input name="name" />
      </Form.Item>
      <Form.Item name="price" label="price" rules={[{ required: true }]}>
        <InputNumber addonAfter="$" />
      </Form.Item>
      <Form.Item
        name="description"
        label="description"
        rules={[{ required: true }]}
      >
        <Input.TextArea name="description" />
      </Form.Item>
      <Form.Item name="condition" label="condition">
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
      <Form.Item name="category" label="category" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="Clothing">Clothing</Select.Option>
          <Select.Option value="Electronics">Electronics</Select.Option>
          <Select.Option value="Jewelry & Watches">
            Jewelry & Watches
          </Select.Option>
          <Select.Option value="Household goods">Household goods</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="image" label="image" rules={[{ required: true }]}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          multiple={true}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form>
  );
};

export default ModificationForm;

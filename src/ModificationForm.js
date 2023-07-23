import { Form, Button, Input } from "antd";
import { useState } from "react";

const ModificationForm = () => {
  const [loading, setLoading] = useState(false);

  /**
   * @todo Finish all input field
   * @todo Figure out if we need to design customized submission
   */
  return (
    <Form>
      <Form.Item name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="" rules={[{ required: true }]}>
        <Input.TextArea name="description" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form>
  );
};

export default ModificationForm;

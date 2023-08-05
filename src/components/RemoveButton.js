import { Button, message } from "antd";
import { useState } from "react";
import { deleteItem } from "../utils";

const RemoveButton = (props) => {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    const { itemId, handleRemoveSuccess } = props;

    setLoading(true);

    try {
      await deleteItem(itemId);
      handleRemoveSuccess();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      loading={loading}
      danger={true}
      shape="round"
      type="primary"
      style={{ backgroundColor: "#9B0625" }}
      onClick={handleRemove}
    >
      Remove
    </Button>
  );
};

export default RemoveButton;

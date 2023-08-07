import { Button, Tooltip, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
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
    <Tooltip title="Delete item">
      <CloseOutlined loading={loading} onClick={handleRemove}>
        Remove
      </CloseOutlined>
    </Tooltip>
  );
};

// export default RemoveButton;

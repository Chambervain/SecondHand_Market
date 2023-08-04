import { useState } from "react";
import { getItemById, modifyItem } from "../utils";
import { CheckSquareOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const MarkAsSoldButton = ({ handleMarkAsSold }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <Tooltip title="Mark as sold">
      <CheckSquareOutlined onClick={handleMarkAsSold}></CheckSquareOutlined>
    </Tooltip>
  );
};

export default MarkAsSoldButton;

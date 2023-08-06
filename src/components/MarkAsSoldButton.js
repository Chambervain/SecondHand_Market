import { useEffect, useState } from "react";
import { getItemById, modifyItem } from "../utils";
import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Tooltip, message } from "antd";

const MarkAsSoldButton = ({ item }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSold, setIsSold] = useState(false);

  useEffect(async () => {
    setLoading(true);

    try {
      const resp = await getItemById(item.item_id);
      setIsSold(resp.item_is_sold);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleMarkAsSold = () => {
    setLoading(true);
    item.item_is_sold = !item.item_is_sold;
    try {
      modifyItem(item, item.item_id);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isSold ? (
        <Tooltip title="Mark as sold">
          <CheckSquareOutlined onClick={handleMarkAsSold}></CheckSquareOutlined>
        </Tooltip>
      ) : (
        <CloseSquareOutlined onClick={handleMarkAsSold}></CloseSquareOutlined>
      )}
    </>
  );
};

export default MarkAsSoldButton;

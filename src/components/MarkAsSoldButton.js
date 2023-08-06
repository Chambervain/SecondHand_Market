import { useEffect, useState, createContext } from "react";
import { getItemById, modifyItem } from "../utils";
import { CheckSquareOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { Tooltip, message } from "antd";

const soldContext = createContext();

const MarkAsSoldButton = ({ item, handleMarkAsSold }) => {
  const [loading, setLoading] = useState(false);
  const [isSold, setIsSold] = useState(false);

  // useEffect(async () => {
  //   setLoading(true);

  //   try {
  //     const resp = await getItemById(item.item_id);
  //     setIsSold(resp.item_is_sold);
  //   } catch (error) {
  //     message.error(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    setIsSold(item.item_is_sold);
  }, []);

  const handleClick = () => {
    setLoading(true);

    try {
      handleMarkAsSold(item.item_id);
      setIsSold(!isSold);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isSold ? (
        <Tooltip title="Mark as sold">
          <CheckSquareOutlined onClick={handleClick}></CheckSquareOutlined>
        </Tooltip>
      ) : (
        <Tooltip title="Cancel mark as sold">
          <CloseSquareOutlined onClick={handleClick}></CloseSquareOutlined>
        </Tooltip>
      )}
    </>
  );
};

export default MarkAsSoldButton;

import { useState, useEffect } from "react";
import { List, Card, Carousel, Image, message, Button, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import {
  DeleteTwoTone,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import ModifyButton from "./ModifyButton";
import { getMyItems, deleteItem } from "../utils";
// import RemoveButton from "./RemoveButton";
import { async } from "q";

const MyOwnItems = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const resp = await getMyItems();
      setData(resp);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItemSuccess = async (itemId) => {
    try {
      await deleteItem(itemId);
      setData((prevData) => prevData.filter((item) => item.item_id !== itemId));
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <List
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 3,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.item_id}
            title={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text ellipsis={true} style={{ maxWidth: 150 }}>
                  {item.item_name}
                </Text>
                <Text ellipsis={true} style={{ maxWidth: 150 }}>
                  ${item.item_price}
                </Text>
              </div>
            }
            actions={[
              // <ModifyButton itemId={item.item_id} />,
              <ModifyButton item={item} />,
              <RemoveButton
                itemId={item.item_id}
                handleRemove={deleteItemSuccess}
              />,
            ]}
          >
            <Carousel
              autoplay
              dots={true}
              arrows={true}
              prevArrow={<LeftCircleOutlined />}
              nextArrow={<RightCircleOutlined />}
            >
              {item.item_image_urls.map((url, index) => (
                <div key={index}>
                  <Image
                    src={url}
                    width="100%"
                    height="250px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </Carousel>
          </Card>
        </List.Item>
      )}
    />
  );
};

const RemoveButton = (props) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRemoveItem = async () => {
    // const { itemId, handleRemoveSuccess } = props;

    // setLoading(true);
    // props.handleRemove(props.itemId);
    setIsModalVisible(true);

    // try {
    //   await deleteItem(itemId);
    //   handleRemoveSuccess();
    // } catch (error) {
    //   message.error(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleConfirmRemove = async () => {
    setIsModalVisible(false);
    setLoading(true);
    props.handleRemove(props.itemId);
  };

  const handleCancelRemove = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button
        // loading={loading}
        danger={true}
        shape="round"
        type="primary"
        style={{ backgroundColor: "#9B0625" }}
        onClick={handleRemoveItem}
      >
        Remove
      </Button>
      <Modal
        title="Confirm Remove"
        open={isModalVisible}
        onOk={handleConfirmRemove}
        onCancel={handleCancelRemove}
        okText="Remove"
        cancelText="Cancel"
      >
        <p>Are you sure you want to remove this item?</p>
      </Modal>
    </div>
  );
};

export default MyOwnItems;

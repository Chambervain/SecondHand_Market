import { useState, useEffect } from "react";
import { List, Card, Carousel, Image, message } from "antd";
import Text from "antd/lib/typography/Text";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import ModifyButton from "./ModifyButton";
import { getMyItems } from "../utils";
import RemoveButton from "./RemoveButton";

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

  // This callback function will be passed to the ModifyButton component
  const handleModifySuccess = () => {
    loadData(); // Call loadData to fetch updated data after successful modification
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
              <ModifyButton
                itemId={item.item_id}
                handleModifySuccess={handleModifySuccess}
              />,
              <RemoveButton
                itemId={item.item_id}
                handleRemoveSuccess={loadData}
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

export default MyOwnItems;

import { useState, useEffect } from "react";
import { List, Card, Carousel, Image, message } from "antd";
import Text from "antd/lib/typography/Text";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ModifyButton from "./ModifyButton";
import { getMyItems, modifyItem } from "../utils";
import MarkAsSoldButton from "./MarkAsSoldButton";
import CardTitle from "./CardTitle";

let mockData = [
  {
    item_id: 1,
    item_name: "Phone",
    item_price: 30,
    description: "This is my item1.",
    condition: "Like new",
    category: "electonics",
    is_sold: true,
    item_image_urls: [
      "https://images.pexels.com/photos/14528190/pexels-photo-14528190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      "https://images.pexels.com/photos/13911606/pexels-photo-13911606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
  {
    item_id: 2,
    item_name: "T-shirt",
    item_price: 10,
    description: "This is my item2.",
    condition: "Like new",
    category: "clothes",
    is_sold: false,
    item_image_urls: [
      "https://images.pexels.com/photos/14528190/pexels-photo-14528190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

      "https://images.pexels.com/photos/13911606/pexels-photo-13911606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
  },
];

const MyOwnItems = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   getMyItems()
  //     .then((resp) => {
  //       setData(resp);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  const handleMarkAsSold = (item) => {
    setLoading(true);
    item.item_is_sold = !item.item_is_sold;
    try {
      modifyItem(item, item.itemId);
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
      dataSource={mockData}
      renderItem={(item) => (
        <List.Item>
          <Card
            key={item.item_id}
            title={
              <CardTitle
                itemName={item.item_name}
                itemPrice={item.item_price}
                isSold={item.is_sold}
              />
            }
            actions={[
              <MarkAsSoldButton
                handleMarkAsSold={() => {
                  handleMarkAsSold(item);
                }}
              />,
              <ModifyButton itemId={item.item_id} />,
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
                    style={{
                      objectFit: "contain",
                    }}
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

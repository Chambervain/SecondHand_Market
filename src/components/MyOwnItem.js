import { useState, useEffect } from "react";
import { List, Card, Carousel, Image } from "antd";
import Text from "antd/lib/typography/Text";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import ModifyButton from "./ModifyButton";

let mockData = [
  {
    id: 1,
    name: "Phone",
    price: 30,
    description: "This is my item1.",
    condition: "Like new",
    category: "electonics",
    is_sold: false,
    images: [
      {
        url: "https://images.pexels.com/photos/14528190/pexels-photo-14528190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        url: "https://images.pexels.com/photos/13911606/pexels-photo-13911606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
  {
    id: 2,
    name: "T-shirt",
    price: 10,
    description: "This is my item2.",
    condition: "Like new",
    category: "clothes",
    is_sold: false,
    images: [
      {
        url: "https://images.pexels.com/photos/14528190/pexels-photo-14528190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        url: "https://images.pexels.com/photos/13911606/pexels-photo-13911606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
  },
];

const MyOwnItems = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    //setLoading(true);
    /**
     * @todo Change the API call to the correct one after utils finished
     * @todo Change the response to the correct one after determine the format of the response data
     */
    // getMyOwnItems()
    //   .then((resp) => {
    //     setData(resp);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

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
            key={item.id}
            title={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Text ellipsis={true} style={{ maxWidth: 150 }}>
                  {item.name}
                </Text>
              </div>
            }
            actions={[<ModifyButton itemId={item.id} />]}
            extra={"$" + item.price}
          >
            <Carousel
              dots={false}
              arrows={true}
              prevArrow={<LeftCircleFilled />}
              nextArrow={<RightCircleFilled />}
            >
              {item.images.map((image, index) => (
                <div key={index}>
                  <Image src={image.url} width="100%" />
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

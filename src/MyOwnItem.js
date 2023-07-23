import { useState, useEffect } from "react";
import { List, Card, Carousel } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import ModifyButton from "./ModifyButton";

const MyOwnItems = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    /**
     * @todo Change the API call to the correct one after utils finished
     * @todo Change the response to the correct one after determine the format of the response data
     */
    getMyOwnItems()
      .then((resp) => {
        setData(resp);
      })
      .finally(() => {
        setLoading(false);
      });
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
      dataSource={data}
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
            actions={[<ModifyButton />]}
            extra
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

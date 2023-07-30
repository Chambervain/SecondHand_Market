import { useEffect, useState } from "react";
import {
  getAllItems,
  getItemsByCategory,
  searchItemsByKeyword,
} from "../utils";
import {
  Card,
  Carousel,
  List,
  message,
  Image,
  Input,
  Space,
  Button,
  Dropdown,
} from "antd";
import Text from "antd/lib/typography/Text";
import {
  DownOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
  SkinOutlined,
  LaptopOutlined,
  SketchOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const items = [
  {
    label: "Clothing",
    key: "Clothing",
    icon: <SkinOutlined />,
  },
  {
    label: "Electronics",
    key: "Electronics",
    icon: <LaptopOutlined />,
  },
  {
    label: "Jewelry & Watches",
    key: "Jewelry & Watches",
    icon: <SketchOutlined />,
  },
  {
    label: "Household goods",
    key: "Household goods",
    icon: <HomeOutlined />,
  },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllItems()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onSearch = async (value) => {
    setKeyword(value);

    if (keyword === "") {
      return;
    }

    setLoading(true);

    try {
      const data = await searchItemsByKeyword(keyword);
      setData(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = async (e) => {
    // message.info("Click on menu item.");
    // console.log("parameter", e.key);

    setLoading(true);

    try {
      const data = await getItemsByCategory(e.key);
      setData(data);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <>
      <div
        style={{
          // display: "flex",
          alignItems: "center",
          textAlign: "center",
          // justifyContent: "space-between",
        }}
      >
        <br />
        <Dropdown menu={menuProps}>
          <Button shape="circle-outline">
            <Space>
              Choose your product category
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Search
          style={{ position: "relative", width: "37%" }}
          loading={loading}
          placeholder="Input your search keyword"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <br />

      <List
        style={{ marginTop: 20 }}
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
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
            >
              {
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
              }
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;

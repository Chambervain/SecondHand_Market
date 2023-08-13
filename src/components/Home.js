import { useEffect, useState } from "react";
import {
  getAllItems,
  getItemsByCategory,
  searchItemsByKeyword,
  getCurrentUserName,
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
  BankOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Meta } = Card;

const items = [
  {
    label: "All Products",
    key: "All",
    icon: <ShoppingOutlined />,
  },

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
    icon: <BankOutlined />,
  },
];

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [username, setUsername] = useState("");
  const { authed, lat, lon } = props;

  //The home component would render after gaining lat or lon
  useEffect(() => {
    setLoading(true);
    getAllItems(lat, lon)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        // avoid annoying error message
        // message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lat, lon]);

  // get current username by calling backend api
  useEffect(() => {
    getCurrentUserName()
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => {
        // message.error(err.message);
      });
  }, []);

  const onSearch = async (value) => {
    setKeyword(value);

    if (keyword === "") {
      return;
    }

    setLoading(true);

    try {
      const data = await searchItemsByKeyword(keyword, lat, lon);
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
    console.log(e.key);

    // Return back for presenting all the items again
    if (e.key === "All") {
      try {
        const data = await getAllItems(lat, lon);
        setData(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }

      return;
    }

    try {
      const data = await getItemsByCategory(e.key, lat, lon);
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
          //display: "flex",

          alignItems: "center",
          textAlign: "center",

          // justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              marginLeft: "50px",
              position: "relative",
              fontSize: 38,
              fontFamily: "Times New Roman,serif",
            }}
          >
            Winter Season begins
          </h1>
        </div>
        <br />
        <Dropdown
          menu={menuProps}
          style={{ position: "relative", width: "20%" }}
        >
          <Button shape="circle-outline">
            <Space>
              Choose your product category
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Search
          style={{ position: "relative", width: "30%" }}
          loading={loading}
          placeholder="Input your search keyword"
          onSearch={onSearch}
          enterButton
        />
      </div>
      <br />

      <List
        style={{
          marginTop: 20,
          maxWidth: 1000,
        }}
        loading={loading}
        grid={{
          gutter: 400,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Link
              to={
                authed
                  ? `/items/${item.item_id}/${username}`
                  : `/items/${item.item_id}`
              }
            >
              <Card
                hoverable
                key={item.item_id}
                style={{ width: 330, border: "none" }}
                cover={
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
                          height="400px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </Carousel>
                }
              >
                <Meta
                  title={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        ellipsis={true}
                        style={{
                          maxWidth: 150,
                          fontSize: 15,
                          fontFamily: "Georgia,serif",
                        }}
                      >
                        {item.item_name}
                      </Text>
                      <Text
                        ellipsis={true}
                        style={{
                          maxWidth: 150,
                          fontSize: 15,
                          fontFamily: "Georgia,serif",
                        }}
                      >
                        ${item.item_price}
                      </Text>
                    </div>
                  }
                ></Meta>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;

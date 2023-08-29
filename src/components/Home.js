import { useEffect, useState, useRef } from "react";
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
  Row,
  Modal,
  Slider,
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
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SearchLocation from "./SearchLocation";

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
  const { authed, lat, lon, city, region } = props;
  const [radius, setRadius] = useState(30);
  const [sliderValue, setSliderValue] = useState(30);
  const [localCity, setLocalCity] = useState("");
  const [localState, setLocalState] = useState("");
  const [localLat, setLocalLat] = useState();
  const [localLon, setLocalLon] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formatter = (value) => `${value}`;

  useEffect(() => {
    getAllItems(lat, lon, radius)
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
  }, [lat, lon, radius]);

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
      const data = await searchItemsByKeyword(keyword, lat, lon, radius);
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
        const data = await getAllItems(lat, lon, radius);
        setData(data);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }

      return;
    }

    try {
      const data = await getItemsByCategory(e.key, lat, lon, radius);
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

  const handleRadiusAndLocationApply = () => {
    setRadius(sliderValue);
    props.changeLocation(localCity, localState, localLat, localLon);
    getAllItems(localLat, localLon, radius)
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
    setIsModalVisible(false);
  };

  const handleCityChange = (city, state, lat, lon) => {
    setLocalCity(city);
    setLocalState(state);
    setLocalLat(lat);
    setLocalLon(lon);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
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
              fontSize: 30,
              fontFamily: "Times New Roman,serif",
            }}
          >
            Winter Season begins
          </h1>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dropdown
            menu={menuProps}
            style={{ marginRight: "20px", width: "20%" }}
          >
            <Button shape="circle-outline">
              <Space>
                Choose your product category
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <div style={{ width: "10px" }}></div>
          <Search
            style={{ marginRight: "20px", width: "30%" }}
            loading={loading}
            placeholder="Input your search keyword"
            onSearch={onSearch}
            enterButton
          />

          <span
            class="city"
            onClick={() => setIsModalVisible(true)}
            style={{
              cursor: "pointer",
              color: "green",
              fontWeight: "normal",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f2f2f2";
              e.currentTarget.style.boxShadow =
                "0px 4px 8px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0)";
            }}
          >
            <EnvironmentOutlined
              twoToneColor="#52c41a"
              style={{
                fontSize: "18px",
                marginRight: "8px",
              }}
            />
            <p
              style={{
                margin: 0,
                borderRadius: "2px",
              }}
            >{`${city} : within ${radius} miles`}</p>
          </span>
          <Modal
            title="Location"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>,
              <Button
                key="apply"
                type="primary"
                onClick={handleRadiusAndLocationApply}
              >
                Apply
              </Button>,
            ]}
          >
            <SearchLocation
              city={city}
              region={region}
              onCityChange={handleCityChange}
            />
            <br />
            <p>Distance (miles):</p>
            <Slider
              defaultValue={radius}
              tooltip={{
                formatter,
              }}
              onChange={handleSliderChange}
            />
          </Modal>
        </div>
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

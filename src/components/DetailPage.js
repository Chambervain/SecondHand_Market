import { ProCard } from "@ant-design/pro-components";
import React from "react";
import {
  Space,
  message,
  Divider,
  Tag,
  Descriptions,
  Button,
  Menu,
  Layout,
  Dropdown,
  Breadcrumb,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import {
  TaobaoCircleFilled,
  UserOutlined,
  HomeOutlined,
  CommentOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { HeartFilled } from "@ant-design/icons";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import GoogleApiWrapper from "./GoogleApiWrapper";
import { getItemById } from "../utils";
import { TagOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { addToFavorites, removeFromFavorites } from "../utils";

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427,
};

function getRandomIndexesFromArray(arr, count) {
  if (
    !Array.isArray(arr) ||
    arr.length === 0 ||
    count <= 0 ||
    count > arr.length
  ) {
    return []; // Return an empty array if the input is invalid
  }

  const shuffledArray = arr.slice(); // Create a copy of the original array to avoid mutation
  const randomIndexes = [];

  // Fisher-Yates (Knuth) shuffle algorithm
  for (
    let i = shuffledArray.length - 1;
    i >= 0 && randomIndexes.length < count;
    i--
  ) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
    randomIndexes.push(randomIndex);
  }

  return randomIndexes;
}

const items = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];
const { Header } = Layout;
class DetailPage extends React.Component {
  state = {
    loading: false,
    data: [],
    favorite: false,
  };

  linktoHome = () => {
    window.location.href = "http://localhost:3000/";
  };

  backtoHome = () => {
    return (
      <Menu>
        <Menu.Item>
          <Button
            onClick={this.linktoHome}
            type="primary"
            shape="round"
            style={{ width: 100 }}
          >
            BackHome
          </Button>
        </Menu.Item>
      </Menu>
    );
  };

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const currURL = window.location.href;
      const id = currURL.split("/")[4];
      const resp = await getItemById(id);
      this.setState({
        data: resp,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  ////////////////////////////////////////////////////RENDER HEAD CONTENT//////////////////////////////////////////////////////
  renderHeaderContent = () => {
    return (
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#096dd9",
        }}
      >
        <Link to={`/`}>
          <div
            style={{
              width: 1100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 60,
            }}
          >
            <Button
              type="text"
              style={{
                color: "white",
              }}
              icon={<HomeOutlined style={{ fontSize: 25 }} />}
            />
          </div>
        </Link>

        <div>
          <Dropdown trigger="click" overlay={this.backtoHome}>
            <Button icon={<UserOutlined />} shape="circle" />
          </Dropdown>
        </div>
      </Header>
    );
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  componentDidMount = () => {
    this.loadData();
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const item = { ...this.state.data };
    const isFavorite = storedFavorites.some(
      (favItem) => favItem.id === item.item_id
    );
    this.setState({ favorite: isFavorite });
  };

  addToFavorites = async () => {
    // Add the item to favorites and update the state and local storage
    const item = { ...this.state.data };
    try {
      // Call the backend API to add the item to favorites
      await addToFavorites(item.item_id);
      this.setState({ favorite: true });

      // Update local storage
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      storedFavorites.push(item);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  removeFromFavorites = async () => {
    // Remove the item from favorites and update the state and local storage
    const item = { ...this.state.data };
    try {
      // Call the backend API to remove the item from favorites
      await removeFromFavorites(item.item_id);
      this.setState({ favorite: false });

      // Update local storage
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = storedFavorites.filter(
        (favItem) => favItem.id !== item.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  toggleFavoriteStatus = () => {
    // Toggle the favorite status of the item
    if (this.state.favorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  };

  render() {
    const dataSour = { ...this.state.data };
    const {
      item_name,
      item_category,
      item_condition,
      item_description,
      item_price,
      item_image_urls,
      user_name,
      item_posted_day,
    } = dataSour;

    const colorSelected = getRandomIndexesFromArray(items, 2);
    const { favorite } = this.state;

    let newArray = item_image_urls ? item_image_urls : [];
    return (
      <Layout>
        {this.renderHeaderContent()}
        <Content>
          <ProCard split="vertical">
            <ProCard headerBordered colSpan="70%">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Item</Breadcrumb.Item>
                <Breadcrumb.Item>{item_name}</Breadcrumb.Item>
              </Breadcrumb>
              <Divider />
              <div style={{ width: 900 }}>
                <div
                  style={{
                    border: "1px solid",
                    borderColor: "rgb(211, 211, 211)",
                  }}
                >
                  <AliceCarousel
                    dotsDisabled={true}
                    buttonsDisabled={true}
                    items={newArray.map((url, index) => (
                      <span>
                        <img
                          style={{
                            width: 800,
                            height: 500,
                            marginLeft: "50px",
                            display: "flex",
                            objectFit: "contain",
                          }}
                          key={index}
                          src={url}
                          alt={`Image${index + 1}`}
                          loading={"lazy"}
                        />
                      </span>
                    ))}
                    ref={(el) => (this.Carousel = el)}
                  />
                </div>
                <span></span>
                <nav>
                  {newArray.map((url, index) => (
                    <span
                      key={index}
                      onClick={() => this.Carousel.slideTo(index)}
                    >
                      <img
                        style={{
                          width: 100,
                          height: 50,
                          marginRight: "15px",
                          marginTop: "15px",
                        }}
                        src={url}
                      ></img>
                    </span>
                  ))}
                </nav>
              </div>
            </ProCard>
            <ProCard>
              <div style={{ height: 22 }}></div>
              <Divider />
              <Space direction="vertical">
                <div>
                  <h2 style={{ fontSize: 35, fontWeight: "bold" }}>
                    {item_name}
                  </h2>
                  <div>
                    <p style={{ fontSize: 30, fontWeight: "bold" }}>
                      ${item_price}
                    </p>
                  </div>
                  <p style={{ fontSize: 20 }}>
                    Lasted Posted on {item_posted_day}
                  </p>
                  <p style={{ fontSize: 20 }}>Condition: {item_condition}</p>
                  <p style={{ fontSize: 20 }}>Category: {item_category}</p>
                </div>
                <div>
                  <div
                    style={{
                      width: 80,
                      height: 300,
                    }}
                  >
                    <GoogleApiWrapper centerLoc={location} />
                  </div>
                  <div
                    style={{
                      height: 60,
                    }}
                  >
                    <Button
                      type="primary"
                      shape="round"
                      block
                      icon={<CommentOutlined />}
                      style={{
                        height: 40,
                        fontSize: 20,
                      }}
                    >
                      Ask
                    </Button>
                  </div>
                  <div
                    style={{
                      height: 60,
                      fontSize: 20,
                    }}
                  >
                    {favorite ? (
                      <Button
                        shape="round"
                        block
                        icon={<HeartFilled />}
                        style={{
                          height: 40,
                        }}
                        onClick={this.toggleFavoriteStatus}
                      >
                        Unfavorite
                      </Button>
                    ) : (
                      <Button
                        shape="round"
                        block
                        icon={<HeartOutlined />}
                        style={{
                          height: 40,
                        }}
                        onClick={this.toggleFavoriteStatus}
                      >
                        Favorite
                      </Button>
                    )}
                  </div>
                </div>
              </Space>
            </ProCard>
          </ProCard>
          <ProCard split="vertical">
            <ProCard
              headerBordered
              colSpan="70%"
              size="large"
              style={{ fontSize: 30 }}
            >
              <Divider />
              <div style={{ fontSize: 25, fontWeight: "bolder" }}>
                Descriptions
              </div>
              <div>
                <Descriptions bordered>
                  <Descriptions.Item
                    span={5}
                    style={{
                      height: 150,
                      fontSize: 20,
                      alignContent: "initial",
                    }}
                  >
                    {item_description}
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <div style={{ fontSize: 25, fontWeight: "bold" }}>Tags</div>
              <Divider style={{ fontSize: 30 }} />
              <Tag
                style={{ fontSize: 15 }}
                color={items[colorSelected[0]]}
                icon={<TagOutlined />}
              >
                {item_category}
              </Tag>
              <Tag
                style={{ fontSize: 15 }}
                color={items[colorSelected[1]]}
                icon={<TagOutlined />}
              >
                {item_condition}
              </Tag>
            </ProCard>
            <ProCard headerBordered>
              <Divider />
              <div>
                <div style={{ fontSize: 25, fontWeight: 20, height: 60 }}>
                  Seller
                </div>
                <div style={{ height: 80 }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ fontSize: 50, width: 80 }}>
                      <TaobaoCircleFilled />
                    </div>
                    <div>
                      <div style={{ fontSize: 30, width: 80 }}>{user_name}</div>
                      <div>five stars</div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              <Space direction="vertical"></Space>
            </ProCard>
          </ProCard>
        </Content>
      </Layout>
    );
  }
}
export default DetailPage;

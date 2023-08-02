import { ProCard } from "@ant-design/pro-components";
import React from "react";
import { Space, message, Button } from "antd";
import { Content } from "antd/lib/layout/layout";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import GoogleApiWrapper from "./GoogleApiWrapper";
import { getItemById } from "../utils";
import { addToFavorites, removeFromFavorites } from "../utils";

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427,
};

class DetailPage extends React.Component {
  state = {
    loading: false,
    data: [],
    favorite: false,
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

  thumbItem = (item, i) => (
    <span key={item} onClick={() => this.Carousel.slideTo(i)}>
      <img
        style={{ width: 100, marginRight: "15px" }}
        src="https://picsum.photos/id/1018/1000/600/"
      ></img>
    </span>
  );

  render() {
    const dataSour = { ...this.state.data };
    const {
      item_id,
      item_name,
      item_category,
      item_condition,
      item_description,
      item_price,
      item_is_sold,
      item_image_urls,
    } = dataSour;

    const { favorite } = this.state;

    let newArray = item_image_urls ? item_image_urls : [];
    return (
      <Content>
        <ProCard split="vertical">
          <ProCard title={item_name} headerBordered colSpan="70%">
            <div>
              <AliceCarousel
                dotsDisabled={true}
                buttonsDisabled={true}
                items={newArray.map((url, index) => (
                  <img
                    style={{ width: 750 }}
                    key={index}
                    src={url}
                    alt={`Image${index + 1}`}
                  />
                ))}
                ref={(el) => (this.Carousel = el)}
              />

              <nav>
                {newArray.map((url, index) => (
                  <span
                    key={index}
                    onClick={() => this.Carousel.slideTo(index)}
                  >
                    <img
                      style={{ width: 100, marginRight: "15px" }}
                      src={url}
                    ></img>
                  </span>
                ))}
              </nav>
            </div>
          </ProCard>

          <ProCard title={item_name}>
            <Space direction="vertical">
              <div style={{ height: 40, fontSize: 20, fontWeight: 15 }}>
                类型:{item_category}
              </div>
              <div style={{ height: 40, fontSize: 20, fontWeight: 15 }}>
                价格:{item_price}
              </div>
              <div style={{ height: 40, fontSize: 20, fontWeight: 15 }}>
                联系方式:{item_condition}
              </div>
              <div style={{ height: 40, fontSize: 20, fontWeight: 15 }}>
                地址:{item_description}
              </div>
              <span onClick={this.toggleFavoriteStatus}>
                {favorite ? (
                  <HeartFilled className="heart-icon" />
                ) : (
                  <HeartOutlined className="heart-icon" />
                )}
              </span>
              <div
                style={{
                  height: 100,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyItems: "flex-end",
                }}
              >
                <GoogleApiWrapper centerLoc={location} />
                {/* <StarOutlined style={{ fontSize: 28, fontWeight: 600 }} /> */}
              </div>
            </Space>
          </ProCard>
        </ProCard>
        <ProCard split="vertical">
          <ProCard
            title="Description"
            headerBordered
            colSpan="70%"
            size="large"
          >
            <div style={{ height: 360, fontSize: 30 }}>{item_description}</div>
          </ProCard>
          <ProCard title="Seller" headerBordered>
            <Space direction="vertical"></Space>
          </ProCard>
        </ProCard>
      </Content>
    );
  }
}
export default DetailPage;

import { ProCard } from "@ant-design/pro-components";
import React from "react";
import { Space, message } from "antd";
import { Content } from "antd/lib/layout/layout";
import { StarOutlined } from "@ant-design/icons";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import GoogleApiWrapper from "./GoogleApiWrapper";
import { getItemById } from "../utils";

const handleDragStart = (e) => e.preventDefault();
const items = [
  "https://picsum.photos/id/1018/1000/600/",
  "https://picsum.photos/id/1018/1000/600/",
  "https://picsum.photos/id/1018/1000/600/",
];

const location = {
  address: "1600 Amphitheatre Parkway, Mountain View, california.",
  lat: 37.42216,
  lng: -122.08427,
};

class DetailPage extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getItemById(3);
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
      item_name,
      item_category,
      item_condition,
      item_description,
      item_price,
      item_is_sold,
      item_image_urls,
    } = dataSour;
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
              <div
                style={{
                  height: 100,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyItems: "flex-end",
                }}
              >
                <GoogleApiWrapper centerLoc={location} />
                <StarOutlined style={{ fontSize: 28, fontWeight: 600 }} />
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

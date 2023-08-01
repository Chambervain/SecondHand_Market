import { ProCard } from "@ant-design/pro-components";
import React from "react";
import { Space } from "antd";
import { Content } from "antd/lib/layout/layout";
import { StarOutlined } from "@ant-design/icons";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import GoogleApiWrapper from "./GoogleApiWrapper";

const handleDragStart = (e) => e.preventDefault();
const items = [
  <img
    src="https://picsum.photos/id/1018/1000/600/"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="https://picsum.photos/id/1018/1000/600/"
    onDragStart={handleDragStart}
    role="presentation"
  />,
  <img
    src="https://picsum.photos/id/1018/1000/600/"
    onDragStart={handleDragStart}
    role="presentation"
  />,
];

class DetailPage extends React.Component {
  items = [
    <img
      src="https://picsum.photos/id/1018/1000/600/"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://picsum.photos/id/1018/1000/600/"
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src="https://picsum.photos/id/1018/1000/600/"
      onDragStart={handleDragStart}
      role="presentation"
    />,
  ];

  state = {
    galleryItems: this.items.map((i) => <h2 key={i}>{i}</h2>),
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
    return (
      <Content>
        <ProCard split="vertical">
          <ProCard title="商品名称" headerBordered colSpan="70%">
            <div>
              <AliceCarousel
                dotsDisabled={true}
                buttonsDisabled={true}
                items={this.state.galleryItems}
                ref={(el) => (this.Carousel = el)}
              />

              <nav>{this.items.map(this.thumbItem)}</nav>
            </div>
          </ProCard>
          <ProCard title="商品名称">
            <Space direction="vertical">
              <div style={{ height: 50 }}>类型:</div>
              <div style={{ height: 50 }}>联系方式:</div>
              <div style={{ height: 50 }}>地址:</div>
              <div
                style={{
                  height: 200,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyItems: "flex-end",
                }}
              >
                <GoogleApiWrapper zoom={10} />
                <StarOutlined style={{ fontSize: 28, fontWeight: 600 }} />
              </div>
            </Space>
          </ProCard>
        </ProCard>
        <ProCard split="vertical">
          <ProCard title="Description" headerBordered colSpan="70%">
            <div style={{ height: 360 }}>右侧内容</div>
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

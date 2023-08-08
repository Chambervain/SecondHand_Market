import React from "react";
import {
  Menu,
  Button,
  Dropdown,
  message,
  List,
  Layout,
  Breadcrumb,
  Avatar,
  Divider,
} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import { ProCard } from "@ant-design/pro-components";
import { getAllChats, getAllMessages } from "../utils";
import InfiniteScroll from "react-infinite-scroll-component";

const { Header, Footer } = Layout;
class ChatBox extends React.Component {
  state = {
    key: "tab1",
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

  renderHeaderContent = (user_name) => {
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
  render() {
    return (
      <Layout>
        {this.renderHeaderContent()}
        <Content>
          <ProCard>
            <div className="cumbercamb">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Item</Breadcrumb.Item>
                <Breadcrumb.Item>ChatBox</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="Main-Content & footer">
              <div className="Main-Content">
                <div className="Main-Content Head">
                  <h3
                    className="Main-Content Head"
                    style={{
                      fontSize: 40,
                      marginLeft: "180px",
                      marginTop: "30px",
                    }}
                  >
                    Inbox
                  </h3>
                </div>
                <div className="Main-Content Content">
                  <div
                    className="Main-Content Box"
                    style={{
                      marginLeft: "160px",
                      height: "450px",
                    }}
                  >
                    <ProCard>
                      <ProCard
                        layout="center"
                        style={{ width: "1000px" }}
                        bordered
                        tabs={{
                          size: "large",
                          activeKey: this.state.key,
                          items: [
                            {
                              label: `Message`,
                              key: "tab1",
                              children: <AllMessage />,
                            },
                            {
                              label: `Notifications`,
                              key: "tab2",
                              children: `You have no notifications so far`,
                            },
                          ],
                          onChange: (key) => {
                            this.setState({ key: key });
                          },
                        }}
                      />
                    </ProCard>
                  </div>
                </div>
              </div>
              <div className="footer">
                <Footer style={{ textAlign: "center" }}>
                  Letgo Design ©2023 Created by Letgo CodeStranger
                </Footer>
              </div>
            </div>
          </ProCard>
        </Content>
      </Layout>
    );
  }
}

class AllMessage extends React.Component {
  state = { loading: false, messageData: [], itemMessage: [], newArr: [] };
  componentDidMount() {
    //load data
    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getAllChats();
      this.setState({
        messageData: resp,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }

    this.concatChatListData();
  };

  loadChatListData = async (value) => {
    this.setState({
      loading: true,
    });

    try {
      const resp = await getAllMessages(value);
      const obj = resp[resp.length - 1];
      this.setState((prevState) => ({
        newArr: [
          ...prevState.newArr,
          {
            chat_id: obj.chat_id,
            content: obj.content,
            sender_name: obj.sender_name,
            receiver_name: obj.receiver_name,
            send_ime: obj.send_time,
          },
        ],
      }));
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  concatChatListData = () => {
    const messageLoadedData = this.state.messageData
      ? this.state.messageData
      : [];
    messageLoadedData.forEach((item) => {
      this.loadChatListData(item.id);
    });
  };
  handleContent = (value) => {
    const s = value;
    return s.replace(" ", "/s");
  };

  handleReceiverName = (item) => {
    const host_name = localStorage.getItem("username");
    return host_name === item.receiver_name
      ? item.sender_name
      : item.receiver_name;
  };

  render() {
    return (
      <div
        id="scrollableDiv"
        style={{
          height: "300px",
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={this.state.newArr.length + 1}
          endMessage={<Divider plain>It is all, dont load more</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            itemLayout="horizontal"
            loading={this.state.loading}
            dataSource={this.state.newArr}
            renderItem={
              (item) => (
                <List.Item style={{ marginBottom: "10px", width: "100%" }}>
                  <Link to={`/chats/${item.chat_id}`}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          size="large"
                          style={{
                            backgroundColor: "#005EFF",
                            verticalAlign: "middle",
                          }}
                        >
                          {this.handleReceiverName(item)}
                        </Avatar>
                      }
                      title={
                        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                          {this.handleReceiverName(item)}
                        </div>
                      }
                      description={
                        <div
                          style={{
                            whiteSpace: "pre",
                            fontSize: "15px",
                            fontWeight: "20px",
                          }}
                        >
                          {item.content}
                        </div>
                      }
                      size="large"
                    />
                  </Link>
                </List.Item>
              )

              // avatar={<Avatar
              //   size="large"
              //   style={{
              //     backgroundColor: "#005EFF",
              //     verticalAlign: "middle",
              //   }}
              // >

              // </Avatar>}
            }
          ></List>
        </InfiniteScroll>
      </div>
    );
  }
}

//   return item.receiver_name !== userId ? (
//     <div className={"chat-item"} key={item.chat_id}>
//       <div className={"chat-receiver"}>
//         {/* receiver */}
//         <div className={"avatar-wrap"}>
//           <div>
//             <Avatar
//               size="large"
//               style={{
//                 backgroundColor: "#005EFF",
//                 verticalAlign: "middle",
//               }}
//             >
//               {item.sender_name}
//             </Avatar>
//           </div>
//         </div>
//         <div className={"content"}>{item.Content}</div>
//       </div>
//     </div>
//   ) : (
//     <div className={"chat-item"} key={item.chat_id}>
//       <div className={"chat-sender"}>
//         {/* sender */}
//         <div className={"content"}>{item.Content}</div>
//         <div className={"avatar-wrap"}>
//           <div>
//             <Avatar
//               size="large"
//               style={{
//                 backgroundColor: "#005EFF",
//                 verticalAlign: "middle",
//               }}
//             >
//               {item.sender_name}
//             </Avatar>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// })}
//   <div>
//     <div>
//       <div className={"chat-user-avatar"}>
//         <Avatar />
//       </div>
//       <div className={"chat-user-info"}>
//         <div>
//           <p className={"chat-user-name"}>{"sijun" || ""}</p>
//           <span className={"time"}>{"2022-09-02"}</span>
//         </div>
//         <div className={"chat-message-detail-item"}>
//           <p className={"chat-message-detail"}> {"hi,im sijun"}</p>
//         </div>
//       </div>
//     </div>
//     <Divider style={{ margin: 0 }} />
//   </div>

export default ChatBox;

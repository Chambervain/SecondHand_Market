import React, { Component } from "react";
import {
  Divider,
  Button,
  message,
  Layout,
  List,
  Avatar,
  Dropdown,
  Menu,
} from "antd";
import ReactQuill, { Quill } from "react-quill";
import ChatDialogue from "./ChatDialogue";
import "react-quill/dist/quill.snow.css";
import { getAllMessages, reply, getAllChats } from "../utils";
import { HomeOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const userId = localStorage.getItem("username");
const { Header, Content } = Layout;

class PersonMessage extends Component {
  state = {
    loading: false,
    myMessage: [],
    lastEditIndex: "",
    value: "",
    sendMessage: "",
    chat_list: [],
    last_chat_id: "",
  };
  modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          handler: (range, context) => {
            // console.log('enter');
            let ops = this.reactQuillRef.getEditor().getContents().ops;
            // console.log(ops)
            this.setState({ sendMessage: ops }, () => {
              this.addMessage();
            });
          },
        },
      },
    },
  };

  formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  loadData = async () => {
    this.setState({
      loading: true,
    });

    try {
      const currURL = window.location.href;
      const chat_id = currURL.split("/")[4];
      const resp = await getAllMessages(chat_id);
      const respList = await getAllChats();
      this.setState({
        myMessage: resp,
        chat_list: respList,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  // loadChatListData = async () => {
  //   this.setState({
  //     loading: true,
  //   });

  //   try {
  //     const resp = await getAllChats();
  //     this.setState({
  //       chat_list: resp,
  //     });
  //   } catch (error) {
  //     message.error(error.message);
  //   } finally {
  //     this.setState({
  //       loading: false,
  //     });
  //   }
  // };

  // componenWillUpdate() {
  //   console.log("Component,will update");
  //   this.loadData();
  //   this.loadChatListData();
  // }
  // componentDidUpdate() {
  //   console.log("Component,Did Update");
  // }

  // static getDerivedStateFromProps(nextProps, nextState) {
  //   //preState
  //   //TODO 此处有个根据id查询消息的请求

  //   // console.log('nextProps',nextProps.location.state)//id,messageIcon
  //   //TODO 此处有个从sessionStorage中查出个人图标的请求 getToken('icon') 暂时定为名字
  //   let myState = nextState.myMessage;
  //   const currURL = window.location.href;
  //   const chat_id = currURL.split("/")[4];
  //   const resp = getAllMessages(chat_id)
  //     .then(() => message.success(`Successfully add item`))
  //     .catch((err) => message.error(err.message));
  //   console.log(resp);

  //   if (myState.length === 0) {
  //     return {
  //       myMessage: resp,
  //     };
  //   } else {
  //     return {
  //       myMessage: myState,
  //     };
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("In shouldComponent Update");
    // console.log("NextState:", nextState.myMessage.length);
    // console.log("This state:", this.state.myMessage.length);
    if (nextState.myMessage.length === this.state.myMessage.length) {
      return false;
    } else {
      console.log("This State Submit", this.state.myMessage);
      console.log("Next State Submit", nextState.myMessage);
      this.setState({ value: "" });
      console.log("Component,True");
      return true;
    }
  }

  // pickEmoji = (emoji, event) => {
  //     const { lastEditIndex } = this.state
  //     var range = lastEditIndex;
  //     let position = range ? range.index : 0;
  //     this.reactQuillRef.getEditor().insertText(position, emoji.native);
  //     this.reactQuillRef.focus()
  //     this.reactQuillRef.getEditor().setSelection(position + 2);
  // }

  handleChange = (value) => {
    let parsedvalue = new DOMParser().parseFromString(value, "text/html").body
      .textContent;
    this.setState({ sendMessage: parsedvalue });
  };

  //将图片的base
  addMessage = () => {
    const { myMessage, sendMessage } = this.state;
    console.log(sendMessage);
    let value = sendMessage;
    let length = value.length;
    if (value.length !== 0) {
      if (value.length === 0) {
        message.info("发送内容不能为空，请输入");
      } else {
        //将base64转换成file，并进行压缩，上传服务器
        const formData = new FormData();
        //upload data
        formData.append("content", sendMessage);
        this.setState({
          loading: true,
        });
        try {
          const currURL = window.location.href;
          const chat_id = currURL.split("/")[4];
          reply(formData, chat_id);
          message.success("upload successfully");
        } catch (error) {
          message.error(error.message);
        } finally {
          // 如果不执行，我们屏幕永远会有一个小圈圈在转
          this.setState({
            loading: false,
          });
        }
        let ArrConcat = {
          id: myMessage.length + 1,
          Content: value,
          sender_name: "sijun",
          receiver_name: "bowen",
          send_time: "2023-08-09",
        };
        this.setState({
          myMessage: [...this.state.myMessage, ArrConcat],
          value: "",
          sendMessage: "",
        });
      }
    } else {
      message.info("发送内容不能为空，请输入");
    }
    this.reactQuillRef.focus();
  };
  onKeyup = (e) => {
    if (e.keyCode === 13) {
      if (window.event.ctrlKey) {
        var range = this.reactQuillRef.getEditor().getSelection();
        let position = range ? range.index : 0;
        this.reactQuillRef.getEditor().insertText(position, "\n");
        this.reactQuillRef.focus();
        this.reactQuillRef.getEditor().setSelection(position + 1);
      }
    }
  };
  blur = () => {
    var range = this.reactQuillRef.getEditor().getSelection();
    this.setState({ lastEditIndex: range });
    console.log(range);
  };

  handleReceiverName = (item) => {
    const host_name = localStorage.getItem("username");
    return host_name === item.username1 ? item.username2 : item.username1;
  };

  handleHeadReceiverName = () => {
    const currURL = window.location.href;
    const chat_id = currURL.split("/")[4];
    const strin = this.state.chat_list.filter((item) => item.id == chat_id);
    const strin_receiver_name = strin[0] ? strin[0].username1 : "none";
    const strin_sender_name = strin[0] ? strin[0].username2 : "none";
    const host_name = localStorage.getItem("username");
    return host_name === strin_receiver_name
      ? strin_sender_name
      : strin_receiver_name;
  };
  //////////////////////////////////////////////Render Content/////////////////////////////////////////////////

  renderChatContent = (value) => {
    console.log("Render: this state", this.state.myMessage);
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="person_line_padd"
          style={{ margin: "10px 10px 10px 10px" }}
        >
          <h1>{this.handleHeadReceiverName()}</h1>
          <Divider />
        </div>
        <div
          className="personMessageMain"
          style={{
            height: "50vh",
            marginTop: "5px",
            maxHeight: "58%",
            minHeight: "58%",
            marginLeft: "10px",
            width: "99%",
            minWidth: "99%",
            maxWidth: "99%",
          }}
        >
          <ChatDialogue messageList={this.state.myMessage} userId={userId} />
        </div>
        <div
          className="person_line_padd"
          style={{ margin: "10px 10px 10px 10px" }}
        >
          <Divider />
        </div>
        <div style={{ marginTop: "10px" }}></div>
        <div style={{ marginRight: "5px" }}>
          <ReactQuill
            className="personMessage_textArea"
            style={{ height: "120px" }}
            modules={this.modules}
            formats={this.formats}
            onChange={this.handleChange}
            value={value}
            onKeyUp={this.onKeyup}
            ref={(c) => {
              this.reactQuillRef = c;
            }}
          />
        </div>
        <div style={{ padding: "0px 10px 10px 10px", float: "right" }}>
          <span
            style={{
              marginRight: "15px",
              fontSize: "13px",
              color: "#BDBDBD",
              fontWeight: "300",
            }}
          >
            Enter键发送，Enter+Ctrl 键换行
          </span>
          <Button
            type="primary"
            size="middle"
            style={{ borderRadius: "5px" }}
            onClick={this.addMessage}
          >
            发送
          </Button>
        </div>
      </div>
    );
  };

  renderInsideBar = () => {
    // console.log(this.state.chat_list);
    return (
      <ProCard>
        <div
          id="scrollableDiv"
          style={{
            height: "90vh",
            overflow: "auto",
            width: "100%",
            //border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={this.state.chat_list.length + 1}
            endMessage={<Divider plain>It is all, dont load more</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              itemLayout="vertical"
              loading={this.state.loading}
              dataSource={this.state.chat_list}
              renderItem={
                (item) => (
                  <List.Item style={{ marginBottom: "10px", width: "100%" }}>
                    <Link to={`/chats/${item.id}`}>
                      <ProCard size="small" style={{ height: "50px" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div className="Avatar">
                            <Avatar
                              size="large"
                              style={{
                                backgroundColor: "#005EFF",
                                verticalAlign: "middle",
                              }}
                            >
                              {this.handleReceiverName(item)}
                            </Avatar>
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              marginLeft: "10px",
                            }}
                          >
                            {this.handleReceiverName(item)}
                          </div>
                        </div>
                      </ProCard>
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
            <Divider />
          </InfiniteScroll>
        </div>
      </ProCard>
    );
  };
  ////////////////////////////////////////////////////////Head Content///////////////////////////////////////////////////
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
  renderHeaderContent = () => {
    return (
      <Header className="header_new">
        <div>
          <p
            style={{
              marginLeft: 15,
              fontSize: 19,
              fontWeight: "bold",
              fontFamily: "Georgia, serif",
            }}
          >
            Contacts
          </p>
        </div>
        <Link to={`/`}>
          <div className="header_title">LETGO</div>
        </Link>
        <Link to={`/chatbox/${userId}`}>
          <div
            style={{
              marginLeft: 1100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 60,
            }}
          >
            <Button
              type="text"
              style={{
                color: "black",
              }}
              icon={<MailOutlined style={{ fontSize: 20 }} />}
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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    this.loadData();
    // this.loadChatListData();
    const { value } = this.state;
    console.log("Value", value);
    return (
      <Layout>
        {this.renderHeaderContent()}
        <Content>
          <ProCard
            style={{ marginTop: 50, height: "90vh" }}
            split="vertical"
            bordered
          >
            <ProCard colSpan="20%">{this.renderInsideBar()}</ProCard>
            <ProCard style={{ backgroundColor: "#f0f0f0", height: "99vh" }}>
              {this.renderChatContent(value)}
            </ProCard>
          </ProCard>
        </Content>
      </Layout>
    );
  }
}
export default PersonMessage;

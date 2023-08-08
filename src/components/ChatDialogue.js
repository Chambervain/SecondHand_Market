import React from "react";
import { Row, Col, Divider, Avatar } from "antd";
import { Content } from "antd/lib/layout/layout";

class ChatDialogue extends React.Component {
  componentDidMount() {
    if (this.messageEnd.lastElementChild) {
      const scrollHeight = this.messageEnd.scrollHeight;
      const height = this.messageEnd.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messageEnd.lastElementChild.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }
  componentDidUpdate() {
    if (this.messageEnd.lastElementChild) {
      const scrollHeight = this.messageEnd.scrollHeight;
      const height = this.messageEnd.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messageEnd.lastElementChild.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }
  render() {
    const messageList = this.props.messageList;
    const userId = this.props.userId;
    return (
      <div
        className="dialogue_all"
        style={{
          maxheight: "100%",
          height: "100%",
          width: "100%",
          overflowY: "scroll",
          whiteSpace: "pre",
        }}
        ref={(el) => {
          this.messageEnd = el;
        }}
      >
        {messageList.map((item) => {
          if (item.receiver_name === this.props.userId) {
            return (
              <div
                className="dialv"
                style={{ width: "100%", padding: "20px 0px 20px 0px" }}
              >
                <Row>
                  <Col
                    span={12}
                    style={{ visibility: "visible", width: "100%" }}
                  >
                    <div
                      className="dialv&image"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <div className="Image">
                        <div
                          className="Avatar"
                          style={{
                            fontSize: "25px",
                            borderRadius: "10px",
                            position: "relative",
                            top: "0.1rem",
                            margin: "0 4px 4px 0",
                          }}
                        >
                          <Avatar
                            size="large"
                            style={{
                              backgroundColor: "#005EFF",
                              verticalAlign: "middle",
                            }}
                          >
                            {item.sender_name}
                          </Avatar>
                        </div>
                      </div>
                      <div className="dialv">
                        <div
                          className="time&name"
                          style={{ display: "flex", flexDirection: "row" }}
                        >
                          <div className="name" style={{ fontSize: "5px" }}>
                            {item.sender_name}
                          </div>
                          {/* <div className="time" style={{ fontSize: "5px" }}>
                        {item.send_time}
                      </div> */}
                        </div>
                        <div
                          className="message-others"
                          style={{
                            display: "inline-block",
                            backgroundColor: "rgb(255, 255, 255)",
                            verticalAlign: "top",
                            borderRadius: "5px",
                            marginRight: "10px",
                            maxWidth: "100%",
                          }}
                        >
                          <span
                            style={{
                              margin: "9px 10px 9px 10px",
                              display: "block",
                              textAlign: "left",
                            }}
                          >
                            {item.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          } else {
            return (
              <div
                className="dialv"
                style={{ width: "100%", padding: "20px 0px 20px 0px" }}
              >
                <Row justify="end">
                  <Col
                    span={12}
                    style={{
                      textAlign: "right",
                      visibility: "visible",
                      width: "100%",
                    }}
                  >
                    <div
                      className="dialv&image"
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        width: "100%",
                      }}
                    >
                      <div className="image">
                        <div
                          className="Avatar"
                          style={{
                            fontSize: "25px",
                            borderRadius: "10px",
                            position: "relative",
                            top: "-0.1rem",
                            margin: "0 4px 4px 0",
                          }}
                        >
                          <Avatar
                            size="large"
                            style={{
                              backgroundColor: "#005EFF",
                              verticalAlign: "middle",
                            }}
                          >
                            {item.sender_name}
                          </Avatar>
                        </div>
                      </div>
                      <div className="dialv">
                        <div
                          className="time&name"
                          style={{
                            display: "flex",
                            flexDirection: "row-reverse",
                          }}
                        >
                          <div
                            className="name"
                            style={{
                              fontSize: "5px",
                              width: "80px",
                              textAlign: "center",
                            }}
                          >
                            {item.sender_name}
                          </div>
                          {/* <div
                        className="time"
                        style={{
                          fontSize: "5px",
                          width: "80px",
                          textAlign: "left",
                        }}
                      >
                        {item.send_time}
                      </div> */}
                        </div>
                        <div
                          className="message-mine"
                          style={{
                            display: "inline-block",
                            backgroundColor: "rgb(201, 231, 255)",
                            verticalAlign: "top",
                            borderRadius: "5px",
                            marginRight: "10px",
                            maxWidth: "100%",
                          }}
                        >
                          <span
                            style={{
                              margin: "9px 10px 9px 10px",
                              display: "block",
                              textAlign: "left",
                            }}
                          >
                            {item.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
export default ChatDialogue;

import { Button } from "antd";
import React from "react";

class Logout extends React.Component {
  render() {
    return (
      <Button onClick={this.props.handleLogout} type="primary" shape="round">
        Logout
      </Button>
    );
  }
}

export default Logout;

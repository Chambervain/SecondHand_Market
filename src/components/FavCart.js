import { ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, List, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { getMyFavoriteItems } from "../utils";
import { Link } from "react-router-dom";

const FavCart = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(() => {
    if (!cartVisible) {
      return;
    }

    setLoading(true);
    getMyFavoriteItems()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartVisible]);

  const openDrawer = () => {
    setCartVisible(true);
  };

  const closeDrawer = () => {
    setCartVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        style={{
          color: "white",
        }}
        icon={<ShoppingCartOutlined style={{ fontSize: 23 }} />}
        onClick={openDrawer}
      />
      <Drawer
        title="My Favorite Cart"
        placement="right"
        onClose={closeDrawer}
        open={cartVisible}
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Tooltip title="Click to see details" color="geekblue">
                <List.Item.Meta
                  avatar={
                    <Link to={`/items/${item.item_id}`}>
                      <Avatar size={60} src={item.item_image_urls[0]} />
                    </Link>
                  }
                  title={
                    <Link to={`/items/${item.item_id}`}>
                      <div>{item.item_name}</div>
                    </Link>
                  }
                  description={item.item_description}
                />
              </Tooltip>
              <div>{`$ ${item.item_price}`}</div>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default FavCart;

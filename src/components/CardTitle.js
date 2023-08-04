import Icon from "@ant-design/icons";
import { Space } from "antd";
import Text from "antd/lib/typography/Text";

const SoldSvg = () => (
  <svg
    t="1691055969065"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="10378"
    width="32"
    height="20"
  >
    <path
      d="M906.667 765.867h-793.6c-46.934 0-85.334-38.4-85.334-85.334V358.4c0-46.933 38.4-85.333 85.334-85.333h793.6c46.933 0 85.333 38.4 85.333 85.333v324.267c0 44.8-38.4 83.2-85.333 83.2z"
      fill="#ffffff"
      p-id="3290"
      data-spm-anchor-id="a313x.search_index.0.i15.1a2b3a81RWzHpQ"
      class="selected"
    ></path>
    <path
      d="M906.667 776.533h-793.6c-53.334 0-96-42.666-96-96V358.4c0-53.333 42.666-96 96-96h793.6c53.333 0 96 42.667 96 96v324.267c0 51.2-42.667 93.866-96 93.866z m-793.6-492.8c-40.534 0-74.667 34.134-74.667 74.667v324.267c0 40.533 34.133 74.666 74.667 74.666h793.6c40.533 0 74.666-34.133 74.666-74.666V358.4c0-40.533-34.133-74.667-74.666-74.667h-793.6z"
      fill="#E95B5A"
      p-id="3291"
    ></path>
    <path
      d="M140.8 610.133l25.6-29.866c14.933 14.933 36.267 23.466 53.333 23.466 21.334 0 34.134-8.533 34.134-25.6 0-14.933-12.8-21.333-32-29.866L192 537.6c-21.333-8.533-42.667-25.6-42.667-57.6 0-34.133 29.867-61.867 74.667-61.867 25.6 0 49.067 10.667 66.133 27.734L268.8 473.6c-12.8-10.667-27.733-17.067-44.8-17.067-19.2 0-32 8.534-32 23.467 0 14.933 14.933 21.333 34.133 27.733l27.734 12.8c25.6 10.667 42.666 27.734 42.666 57.6 0 34.134-29.866 64-78.933 64-27.733-2.133-57.6-12.8-76.8-32z m183.467-81.066c0-70.4 38.4-110.934 96-110.934s96 40.534 96 110.934S475.733 640 420.267 640s-96-42.667-96-110.933z m147.2 0c0-46.934-19.2-72.534-51.2-72.534s-51.2 27.734-51.2 72.534c0 44.8 21.333 74.666 51.2 74.666s51.2-29.866 51.2-74.666zM558.933 422.4H601.6v179.2h87.467v36.267H558.933V422.4z m166.4 0h59.734c66.133 0 106.666 34.133 106.666 106.667s-40.533 108.8-104.533 108.8h-61.867V422.4zM780.8 601.6c40.533 0 64-21.333 64-72.533 0-53.334-25.6-72.534-64-72.534H768V601.6h12.8z"
      fill="#E95B5A"
      p-id="3292"
    ></path>
  </svg>
);

const SoldIcon = (props) => <Icon component={SoldSvg} {...props} />;

const CardTitle = ({ itemName, isSold, itemPrice }) => {
  if (isSold) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text ellipsis={true} style={{ maxWidth: 150, alignContent: "center" }}>
          <Space align="center">
            <SoldIcon />
            {itemName}
          </Space>
        </Text>
        <Text ellipsis={true} style={{ maxWidth: 150 }}>
          ${itemPrice}
        </Text>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text ellipsis={true} style={{ maxWidth: 150 }}>
          {itemName}
        </Text>
        <Text ellipsis={true} style={{ maxWidth: 150 }}>
          ${itemPrice}
        </Text>
      </div>
    );
  }
};

export default CardTitle;

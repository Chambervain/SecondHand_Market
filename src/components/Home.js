import { useEffect, useState } from "react";
import { getAllItems } from "../utils";
import { Card, Carousel, List, message, Image } from "antd";
import Text from "antd/lib/typography/Text";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

// const Home = () => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     getAllItems()
//       .then((data) => {
//         setData(data);
//       })
//       .catch((err) => {
//         message.error(err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <>
//       <List
//         style={{ marginTop: 20 }}
//         loading={loading}
//         grid={{
//           gutter: 16,
//           xs: 1,
//           sm: 2,
//           md: 3,
//           lg: 3,
//           xl: 4,
//           xxl: 4,
//         }}
//         dataSource={data}
//         renderItem={(item) => (
//           <List.Item>
//             <Card
//               key={item.item_id}
//               title={
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <Text ellipsis={true} style={{ maxWidth: 150 }}>
//                     {item.item_name}
//                   </Text>
//                 </div>
//               }
//             >
//               {
//                 <Carousel
//                   dots={false}
//                   arrows={true}
//                   prevArrow={<LeftCircleFilled />}
//                   nextArrow={<RightCircleFilled />}
//                 >
//                   {item.item_image_urls.map((url, index) => (
//                     <div key={index}>
//                       <Image
//                         src={url}
//                         width="100%"
//                         height="250px"
//                         style={{ objectFit: "cover" }}
//                       />
//                     </div>
//                   ))}
//                 </Carousel>
//               }
//             </Card>
//           </List.Item>
//         )}
//       />
//     </>
//   );
// };

// export default Home;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllItems()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <List
        style={{ marginTop: 20 }}
        loading={loading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              key={item.item_id}
              title={
                <div
                  style={{
                    // Here, comment out the line of flex display to ensure the product title is in center of card
                    // display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Text ellipsis={true} style={{ maxWidth: 150 }}>
                    {item.item_name}
                  </Text>
                </div>
              }
            >
              {
                <Carousel
                  autoplay
                  dots={true}
                  arrows={true}
                  prevArrow={<LeftCircleOutlined />}
                  nextArrow={<RightCircleOutlined />}
                >
                  {item.item_image_urls.map((url, index) => (
                    <div key={index}>
                      <Image
                        src={url}
                        width="100%"
                        height="250px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </Carousel>
              }
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Home;

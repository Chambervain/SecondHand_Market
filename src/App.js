import "./App.css";
import { Layout } from "antd";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space_between",
          backgroundColor: "#FB8C00",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          Letgo: second-hand market
        </div>
      </Header>
      <Content
        style={{
          height: "calc(100% - 64px)",
          padding: 20,
          overflow: "auto",
          backgroundColor: "#E3F2FD",
        }}
      >
        <div>This is Placeholder for the Letgo Market</div>
      </Content>
    </Layout>
  );
}

export default App;

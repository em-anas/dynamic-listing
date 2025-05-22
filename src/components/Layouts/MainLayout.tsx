import React from "react";
import { Layout } from "antd";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout className="main-layout">
      <Header />
      <Content className="main-content">
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Mobile Dashboard © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

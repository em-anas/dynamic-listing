import React from "react";
import { Layout, Menu, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import { MobileOutlined, AppstoreOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1] || "/";

  return (
    <AntHeader className="app-header">
      <div className="logo-container">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title level={3} style={{ margin: 0, color: "white" }}>
            Mobile Dashboard
          </Title>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[currentPath === "/" ? "/" : `/${currentPath}`]}
        items={[
          {
            key: "/",
            icon: <AppstoreOutlined />,
            label: <Link to="/">Brands</Link>,
          },
          {
            key: "/mobiles",
            icon: <MobileOutlined />,
            label: <Link to="/mobiles">Devices</Link>,
          },
        ]}
      />
    </AntHeader>
  );
};

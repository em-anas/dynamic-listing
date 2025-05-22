import React from "react";
import { Typography } from "antd";
import { BrandsList } from "../components";

const { Title } = Typography;

export const BrandsPage: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <Title level={2} className="page-title" style={{ margin: "0 0 8px 0" }}>
          Mobile Brands
        </Title>
        <Typography.Text type="secondary" style={{ fontSize: "16px" }}>
          Manage and explore mobile device brands
        </Typography.Text>
      </div>
      <BrandsList />
    </div>
  );
};

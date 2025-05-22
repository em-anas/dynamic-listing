import React from "react";
import { Typography } from "antd";
import { MobilesList } from "./components";
import { useParams } from "react-router-dom";

const { Title } = Typography;

export const MobilesPage: React.FC = () => {
  const { brandId } = useParams<{ brandId?: string }>();

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
          Mobile Devices
        </Title>
        <Typography.Text type="secondary" style={{ fontSize: "16px" }}>
          {brandId
            ? "Manage devices for the selected brand"
            : "Explore and manage all mobile devices"}
        </Typography.Text>
      </div>
      <MobilesList initialBrandId={brandId} />
    </div>
  );
};

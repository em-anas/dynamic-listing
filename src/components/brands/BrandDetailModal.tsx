import React from "react";
import { Modal, Typography, Descriptions, Tag, List, Divider } from "antd";
import type { BrandDetailModalProps } from "../../types";

const { Title, Paragraph } = Typography;

export const BrandDetailModal: React.FC<BrandDetailModalProps> = ({
  visible,
  brand,
  onClose,
}) => {
  return (
    <Modal
      title={
        <div className="brand-detail-header">
          <img
            src={brand.logo}
            alt={brand.name}
            className="brand-detail-logo"
          />
          <Title level={3}>{brand.name}</Title>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="brand-detail-content">
        <Descriptions
          title="Company Information"
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Founded">
            {brand.foundedYear}
          </Descriptions.Item>
          <Descriptions.Item label="Headquarters">
            {brand.headquarters}
          </Descriptions.Item>
          <Descriptions.Item label="Device Count">
            {brand.deviceCount}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Software Support</Divider>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Support Duration">
            {brand.softwareSupport.years} years
          </Descriptions.Item>
          <Descriptions.Item label="Last Update">
            {brand.softwareSupport.lastUpdate}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">What's New</Divider>
        <List
          bordered
          dataSource={brand.newFeatures}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />

        <Divider orientation="left">Variants</Divider>
        <div className="brand-variants">
          {brand.variants.map((variant) => (
            <Tag key={variant} color="blue" style={{ margin: "4px" }}>
              {variant}
            </Tag>
          ))}
        </div>

        <Divider />
        <Paragraph>{brand.description}</Paragraph>
      </div>
    </Modal>
  );
};

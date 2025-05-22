import React from "react";
import { Modal, Typography, Descriptions, Tag, List, Divider } from "antd";
import type { BrandDetailModalProps } from "../../../types";
import {
  BrandDetailHeader,
  BrandDetailLogo,
  BrandDetailContent,
  BrandVariants,
} from "./styles";

const { Title, Paragraph } = Typography;

export const BrandDetailModal: React.FC<BrandDetailModalProps> = ({
  visible,
  brand,
  onClose,
}) => {
  return (
    <Modal
      title={
        <BrandDetailHeader>
          <BrandDetailLogo src={brand.logo} alt={brand.name} />
          <Title level={3}>{brand.name}</Title>
        </BrandDetailHeader>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <BrandDetailContent>
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
        <BrandVariants>
          {brand.variants.map((variant) => (
            <Tag key={variant} color="blue">
              {variant}
            </Tag>
          ))}
        </BrandVariants>

        <Divider />
        <Paragraph>{brand.description}</Paragraph>
      </BrandDetailContent>
    </Modal>
  );
};

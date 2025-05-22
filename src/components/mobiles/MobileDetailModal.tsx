import React from "react";
import {
  Modal,
  Typography,
  Descriptions,
  Progress,
  Card,
  Rate,
  Divider,
} from "antd";
import type { MobileDetailModalProps } from "../../types";

const { Title, Paragraph, Text } = Typography;

export const MobileDetailModal: React.FC<MobileDetailModalProps> = ({
  visible,
  mobile,
  brandName,
  onClose,
  //   onUpdate,
}) => {
  return (
    <Modal
      title={
        <div className="mobile-detail-header">
          <img
            src={mobile.image}
            alt={mobile.name}
            className="mobile-detail-image"
          />
          <div>
            <Title level={3}>{mobile.name}</Title>
            <Text type="secondary">{brandName}</Text>
          </div>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="mobile-detail-content">
        <Descriptions
          title="Device Information"
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Release Date">
            {mobile.releaseDate}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${mobile.price.toFixed(2)}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Specifications</Divider>
        <Descriptions bordered column={2} size="small">
          <Descriptions.Item label="Display">
            {mobile.specifications.display}
          </Descriptions.Item>
          <Descriptions.Item label="Processor">
            {mobile.specifications.processor}
          </Descriptions.Item>
          <Descriptions.Item label="RAM">
            {mobile.specifications.ram}
          </Descriptions.Item>
          <Descriptions.Item label="Storage">
            {mobile.specifications.storage}
          </Descriptions.Item>
          <Descriptions.Item label="Camera">
            {mobile.specifications.camera}
          </Descriptions.Item>
          <Descriptions.Item label="Battery">
            {mobile.specifications.battery}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left">Performance Benchmark</Divider>
        <Card bordered={false} className="benchmark-card">
          <div className="benchmark-item">
            <Text>AnTuTu</Text>
            <Progress
              percent={Math.min(
                100,
                (mobile.performanceBenchmark.antutu / 1500000) * 100
              )}
              showInfo={false}
              status="active"
            />
            <Text strong>
              {mobile.performanceBenchmark.antutu.toLocaleString()}
            </Text>
          </div>
          <div className="benchmark-item">
            <Text>Geekbench (Single)</Text>
            <Progress
              percent={Math.min(
                100,
                (mobile.performanceBenchmark.geekbench.single / 2000) * 100
              )}
              showInfo={false}
              status="active"
            />
            <Text strong>{mobile.performanceBenchmark.geekbench.single}</Text>
          </div>
          <div className="benchmark-item">
            <Text>Geekbench (Multi)</Text>
            <Progress
              percent={Math.min(
                100,
                (mobile.performanceBenchmark.geekbench.multi / 6000) * 100
              )}
              showInfo={false}
              status="active"
            />
            <Text strong>{mobile.performanceBenchmark.geekbench.multi}</Text>
          </div>
        </Card>

        <Divider orientation="left">Reviews</Divider>
        <div className="reviews-container">
          <div className="review-rating">
            <Text strong style={{ fontSize: "24px" }}>
              {mobile.reviews.rating.toFixed(1)}
            </Text>
            <Rate disabled value={mobile.reviews.rating} allowHalf />
            <Text type="secondary">
              Based on {mobile.reviews.count} reviews
            </Text>
          </div>
          <Paragraph>{mobile.reviews.summary}</Paragraph>
        </div>
      </div>
    </Modal>
  );
};

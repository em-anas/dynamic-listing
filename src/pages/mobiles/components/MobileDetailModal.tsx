import React from "react";
import { Modal, Descriptions, Progress, Rate, Divider } from "antd";
import type { MobileDetailModalProps } from "../../../types";
import {
  MobileDetailHeader,
  MobileDetailImage,
  MobileDetailContent,
  MobileSpecs,
  SpecItem,
  SpecLabel,
  SpecValue,
  PerformanceSection,
  ReviewSection,
  ReviewStats,
  ReviewSummary,
} from "./styles";
import { Text, Title } from "../../../components";

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
        <MobileDetailHeader>
          <MobileDetailImage src={mobile.image} alt={mobile.name} />
          <div>
            <Title variant="h3">{mobile.name}</Title>
            <Text variant="caption">{brandName}</Text>
          </div>
        </MobileDetailHeader>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <MobileDetailContent>
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
        <MobileSpecs>
          <SpecItem>
            <SpecLabel>Display</SpecLabel>
            <SpecValue>{mobile.specifications.display}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Processor</SpecLabel>
            <SpecValue>{mobile.specifications.processor}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>RAM</SpecLabel>
            <SpecValue>{mobile.specifications.ram}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Storage</SpecLabel>
            <SpecValue>{mobile.specifications.storage}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Camera</SpecLabel>
            <SpecValue>{mobile.specifications.camera}</SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Battery</SpecLabel>
            <SpecValue>{mobile.specifications.battery}</SpecValue>
          </SpecItem>
        </MobileSpecs>

        <Divider orientation="left">Performance Benchmark</Divider>
        <PerformanceSection>
          <SpecItem>
            <SpecLabel>AnTuTu</SpecLabel>
            <Progress
              percent={Math.min(
                100,
                (mobile.performanceBenchmark.antutu / 1500000) * 100
              )}
              showInfo={false}
              status="active"
            />
            <SpecValue>
              {mobile.performanceBenchmark.antutu.toLocaleString()}
            </SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Geekbench (Single)</SpecLabel>
            <Progress
              percent={Math.min(
                100,
                (mobile.performanceBenchmark.geekbench.single / 2000) * 100
              )}
              showInfo={false}
              status="active"
            />
            <SpecValue>
              {mobile.performanceBenchmark.geekbench.single}
            </SpecValue>
          </SpecItem>
          <SpecItem>
            <SpecLabel>Geekbench (Multi)</SpecLabel>
            <Progress
              percent={Math.min(
                100,
                (mobile.performanceBenchmark.geekbench.multi / 6000) * 100
              )}
              showInfo={false}
              status="active"
            />
            <SpecValue>{mobile.performanceBenchmark.geekbench.multi}</SpecValue>
          </SpecItem>
        </PerformanceSection>

        <Divider orientation="left">Reviews</Divider>
        <ReviewSection>
          <ReviewStats>
            <Text>{mobile.reviews.rating.toFixed(1)}</Text>
            <Rate disabled value={mobile.reviews.rating} allowHalf />
            <Text variant="caption">
              Based on {mobile.reviews.count} reviews
            </Text>
          </ReviewStats>
          <ReviewSummary>{mobile.reviews.summary}</ReviewSummary>
        </ReviewSection>
      </MobileDetailContent>
    </Modal>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Form, Popconfirm, Rate, Tooltip, InputNumber } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  DollarOutlined,
  FormOutlined,
} from "@ant-design/icons";
import {
  MobileItemContainer,
  MobileItemCard,
  MobileItemForm,
  MobileItemContent,
  MobileHeader,
  MobileImage,
  MobileTitleContainer,
  MobileTitle,
  MobileDescription,
  MobileStats,
  StatItem,
} from "./styles";
import { Button, Text } from "../../../components";

interface MobileItemProps {
  mobile: {
    id: string;
    brandId: string;
    name: string;
    image: string;
    releaseDate: string;
    price: number;
    specifications: {
      display: string;
      processor: string;
      ram: string;
      storage: string;
      camera: string;
      battery: string;
    };
    performanceBenchmark: {
      antutu: number;
      geekbench: {
        single: number;
        multi: number;
      };
    };
    reviews: {
      rating: number;
      count: number;
      summary: string;
    };
  };
  brandName: string;
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
  onShowDetails: (mobile: any) => void;
  onShowEditModal: (mobile: any) => void;
  style?: React.CSSProperties;
}

export const MobileItem: React.FC<MobileItemProps> = ({
  mobile,
  brandName,
  onUpdate,
  onRemove,
  onShowDetails,
  onShowEditModal,
  style,
}) => {
  const [isInlineEditing, setIsInlineEditing] = useState(false);
  const [form] = Form.useForm();

  const handleInlineEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    form.setFieldsValue({
      name: mobile.name,
      price: mobile.price,
    });
    setIsInlineEditing(true);
  };

  const handleModalEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowEditModal(mobile);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      onUpdate(mobile.id, values);
      setIsInlineEditing(false);
    });
  };

  const handleCancel = () => {
    setIsInlineEditing(false);
  };

  const formatSpecifications = () => {
    const { processor, ram, camera } = mobile.specifications;
    return `${processor} • ${ram} • ${camera}`;
  };

  const actionButtons = isInlineEditing
    ? [
        <Tooltip key="save" title="Save Changes">
          <Button
            variant="outline"
            icon={<SaveOutlined />}
            onClick={handleSave}
            size="small"
          />
        </Tooltip>,
        <Tooltip key="cancel" title="Cancel">
          <Button
            variant="outline"
            icon={<CloseOutlined />}
            onClick={handleCancel}
            size="small"
          />
        </Tooltip>,
      ]
    : [
        <Tooltip key="inline-edit" title="Quick Edit">
          <Button
            variant="outline"
            icon={<EditOutlined />}
            onClick={handleInlineEditClick}
            size="small"
          />
        </Tooltip>,
        <Tooltip key="modal-edit" title="Full Edit">
          <Button
            variant="outline"
            icon={<FormOutlined />}
            onClick={handleModalEditClick}
            size="small"
          />
        </Tooltip>,
        <Popconfirm
          key="delete"
          title="Delete this device?"
          onConfirm={(e) => {
            e?.stopPropagation();
            onRemove(mobile.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete Device">
            <Button
              variant="outline"
              icon={<DeleteOutlined />}
              danger
              onClick={(e) => e.stopPropagation()}
              size="small"
            />
          </Tooltip>
        </Popconfirm>,
      ];

  return (
    <MobileItemContainer style={style}>
      <MobileItemCard
        hoverable={!isInlineEditing}
        onClick={isInlineEditing ? undefined : () => onShowDetails(mobile)}
        actions={actionButtons}
        bodyStyle={{ padding: "16px" }}
      >
        {isInlineEditing ? (
          <MobileItemForm
            form={form}
            layout="vertical"
            onClick={(e) => e.stopPropagation()}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter device name" }]}
              style={{ marginBottom: 12 }}
            >
              <Input placeholder="Device Name" />
            </Form.Item>
            <Form.Item
              name="price"
              rules={[
                { required: true, message: "Please enter price" },
                { type: "number", min: 0, message: "Price must be positive" },
              ]}
              style={{ marginBottom: 0 }}
            >
              <InputNumber
                min={0}
                precision={2}
                style={{ width: "100%" }}
                prefix={<DollarOutlined />}
                parser={(value) =>
                  value ? parseFloat(value.replace(/[^\d.]/g, "")) : 0
                }
              />
            </Form.Item>
          </MobileItemForm>
        ) : (
          <MobileItemContent>
            <MobileHeader>
              <MobileImage src={mobile.image} alt={mobile.name} />
              <MobileTitleContainer>
                <MobileTitle level={4}>{mobile.name}</MobileTitle>
                <Text variant="body">{brandName}</Text>
              </MobileTitleContainer>
            </MobileHeader>

            <MobileDescription>{formatSpecifications()}</MobileDescription>

            <MobileStats>
              <StatItem>
                <DollarOutlined /> ${mobile.price}
              </StatItem>
              <StatItem>
                <Rate disabled defaultValue={mobile.reviews.rating} />
                <Text variant="body">({mobile.reviews.count})</Text>
              </StatItem>
            </MobileStats>
          </MobileItemContent>
        )}
      </MobileItemCard>
    </MobileItemContainer>
  );
};

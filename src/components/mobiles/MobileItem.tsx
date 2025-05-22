/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Input,
  Form,
  Popconfirm,
  Rate,
  Tag,
  Tooltip,
  InputNumber,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  DollarOutlined,
  FormOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

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
          <Button icon={<SaveOutlined />} onClick={handleSave} size="small" />
        </Tooltip>,
        <Tooltip key="cancel" title="Cancel">
          <Button
            icon={<CloseOutlined />}
            onClick={handleCancel}
            size="small"
          />
        </Tooltip>,
      ]
    : [
        <Tooltip key="inline-edit" title="Quick Edit">
          <Button
            icon={<EditOutlined />}
            onClick={handleInlineEditClick}
            size="small"
          />
        </Tooltip>,
        <Tooltip key="modal-edit" title="Full Edit">
          <Button
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
              icon={<DeleteOutlined />}
              danger
              onClick={(e) => e.stopPropagation()}
              size="small"
            />
          </Tooltip>
        </Popconfirm>,
      ];

  return (
    <div
      style={{
        ...style,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
      className="mobile-item-container"
    >
      <Card
        hoverable={!isInlineEditing}
        className="mobile-item-card"
        onClick={isInlineEditing ? undefined : () => onShowDetails(mobile)}
        actions={actionButtons}
        bodyStyle={{ padding: "16px", width: "100%", boxSizing: "border-box" }}
        style={{ width: "100%", maxWidth: "100%", margin: 0 }}
      >
        {isInlineEditing ? (
          <Form
            form={form}
            layout="vertical"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%" }}
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
          </Form>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="mobile-header"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                width: "100%",
                minHeight: "60px",
              }}
            >
              <img
                src={mobile.image}
                alt={mobile.name}
                className="mobile-image"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "12px",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                <Title
                  level={4}
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "16px",
                    lineHeight: "1.4",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {mobile.name}
                </Title>
                <Tag
                  color="blue"
                  style={{ fontSize: "12px", marginTop: "4px" }}
                >
                  {brandName}
                </Tag>
              </div>
            </div>

            <div style={{ flex: 1, marginBottom: "12px" }}>
              <Paragraph
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: "1.4",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  height: "36px",
                }}
              >
                {formatSpecifications()}
              </Paragraph>
            </div>

            <div
              className="mobile-footer"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                paddingTop: "12px",
                borderTop: "1px solid #f0f0f0",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  className="mobile-price"
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1890ff",
                  }}
                >
                  ${mobile.price.toFixed(2)}
                </Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {mobile.releaseDate}
                </Text>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  className="mobile-rating"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Rate
                    disabled
                    defaultValue={mobile.reviews.rating}
                    allowHalf
                    style={{ fontSize: "14px" }}
                  />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    ({mobile.reviews.count})
                  </Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

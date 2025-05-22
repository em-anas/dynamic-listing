/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Card,
  Button,
  Typography,
  Input,
  Form,
  Popconfirm,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  MobileOutlined,
  FormOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface BrandItemProps {
  brand: {
    id: string;
    name: string;
    logo: string;
    description: string;
    foundedYear: number;
    headquarters: string;
    deviceCount: number;
    newFeatures: string[];
    softwareSupport: {
      years: number;
      lastUpdate: string;
    };
    variants: string[];
  };
  onUpdate: (id: string, updates: any) => void;
  onRemove: (id: string) => void;
  onShowDetails: (brand: any) => void;
  onShowEditModal: (brand: any) => void;
  style?: React.CSSProperties;
}

export const BrandItem: React.FC<BrandItemProps> = ({
  brand,
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
      name: brand.name,
      description: brand.description,
    });
    setIsInlineEditing(true);
  };

  const handleModalEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowEditModal(brand);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      onUpdate(brand.id, values);
      setIsInlineEditing(false);
    });
  };

  const handleCancel = () => {
    setIsInlineEditing(false);
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
          title="Delete this brand?"
          description="All associated devices will also be deleted."
          onConfirm={(e) => {
            e?.stopPropagation();
            onRemove(brand.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip title="Delete Brand">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={(e) => e.stopPropagation()}
              size="small"
            />
          </Tooltip>
        </Popconfirm>,
        <Link
          key="devices"
          to={`/mobiles/${brand.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title="View Devices">
            <Button icon={<MobileOutlined />} size="small">
              <span className="button-text">Devices</span>
            </Button>
          </Tooltip>
        </Link>,
      ];

  return (
    <div
      style={{
        ...style,
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
      className="brand-item-container"
    >
      <Card
        hoverable={!isInlineEditing}
        onClick={isInlineEditing ? undefined : () => onShowDetails(brand)}
        actions={actionButtons}
        className="brand-item-card"
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
              rules={[{ required: true, message: "Please enter brand name" }]}
              style={{ marginBottom: 12 }}
            >
              <Input placeholder="Brand Name" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
              style={{ marginBottom: 0 }}
            >
              <Input.TextArea
                placeholder="Description"
                rows={3}
                showCount
                maxLength={200}
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
              className="brand-header"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                width: "100%",
                minHeight: "48px",
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
                style={{
                  width: "48px",
                  height: "48px",
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
                    margin: 0,
                    fontSize: "16px",
                    lineHeight: "1.4",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {brand.name}
                </Title>
              </div>
            </div>

            <div style={{ flex: 1, marginBottom: "12px" }}>
              <Paragraph
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: "1.4",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                  height: "63px",
                }}
              >
                {brand.description}
              </Paragraph>
            </div>

            <div
              className="brand-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "12px",
                borderTop: "1px solid #f0f0f0",
                width: "100%",
                minHeight: "32px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>
                  Devices:{" "}
                  <span className="device-count">{brand.deviceCount}</span>
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="founded-year">
                  Founded: {brand.foundedYear}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

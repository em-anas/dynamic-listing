/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Form, Popconfirm, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
  MobileOutlined,
  FormOutlined,
} from "@ant-design/icons";
import {
  BrandItemContainer,
  BrandItemCard,
  BrandItemForm,
  BrandItemContent,
  BrandHeader,
  BrandLogo,
  BrandTitleContainer,
  BrandTitle,
  BrandDescription,
  BrandStats,
  StatItem,
  ButtonText,
} from "./styles";
import { Button } from "../../../components";

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
              variant="outline"
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
            <Button variant="outline" icon={<MobileOutlined />} size="small">
              <ButtonText>Devices</ButtonText>
            </Button>
          </Tooltip>
        </Link>,
      ];

  return (
    <BrandItemContainer style={style}>
      <BrandItemCard
        hoverable={!isInlineEditing}
        onClick={isInlineEditing ? undefined : () => onShowDetails(brand)}
        actions={actionButtons}
        bodyStyle={{ padding: "16px" }}
      >
        {isInlineEditing ? (
          <BrandItemForm
            form={form}
            layout="vertical"
            onClick={(e) => e.stopPropagation()}
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
          </BrandItemForm>
        ) : (
          <BrandItemContent>
            <BrandHeader>
              <BrandLogo src={brand.logo} alt={brand.name} />
              <BrandTitleContainer>
                <BrandTitle level={4}>{brand.name}</BrandTitle>
              </BrandTitleContainer>
            </BrandHeader>

            <BrandDescription>{brand.description}</BrandDescription>

            <BrandStats>
              <StatItem>
                <MobileOutlined /> {brand.deviceCount} Devices
              </StatItem>
              <StatItem>{brand.softwareSupport.years} Years Support</StatItem>
            </BrandStats>
          </BrandItemContent>
        )}
      </BrandItemCard>
    </BrandItemContainer>
  );
};

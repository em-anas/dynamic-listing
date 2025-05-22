import React, { useMemo } from "react";
import { Modal, Form, InputNumber, Row, Col, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { BrandFormProps } from "../../../types";
import { useBrands } from "../../../hooks";
import { brandLogos } from "../../../utils";
import { Button, FormSelect } from "../../../components";

export const BrandForm: React.FC<BrandFormProps> = ({
  visible,
  brand,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { allBrands } = useBrands();
  const isEdit = !!brand?.id;

  const availableBrandNames = useMemo(() => {
    const existingBrandNames = new Set(
      allBrands.map((b) => b.name.toLowerCase())
    );

    return Object.keys(brandLogos).filter((brandName) => {
      if (isEdit && brand?.name?.toLowerCase() === brandName.toLowerCase()) {
        return true;
      }
      return !existingBrandNames.has(brandName.toLowerCase());
    });
  }, [allBrands, isEdit, brand?.name]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const newBrand = {
        ...values,
        logo:
          brandLogos[values.name as keyof typeof brandLogos] ||
          brandLogos.Apple,
        deviceCount: values.deviceCount || 0,
        softwareSupport: {
          years: values.supportYears,
          lastUpdate: values.lastUpdate,
        },
      };

      delete newBrand.supportYears;
      delete newBrand.lastUpdate;

      onSubmit(newBrand);
      form.resetFields();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message && error.message.includes("already exists")) {
        message.error(error.message);
      }
    }
  };

  const descriptionOptions = [
    "A leading mobile brand known for innovation and quality. They produce smartphones with cutting-edge technology and exceptional user experience.",
    "A premium smartphone manufacturer focused on premium design and high-end specifications. Their devices are known for exceptional build quality.",
    "An innovative technology company that creates smartphones with industry-leading AI capabilities and impressive camera systems.",
    "A value-focused brand that offers feature-rich smartphones at competitive prices. Known for excellent price-to-performance ratios.",
    "A pioneering mobile company with a strong focus on display technology and performance. Their devices set trends in the industry.",
  ];

  const headquartersOptions = [
    "Cupertino, USA",
    "Seoul, South Korea",
    "Mountain View, USA",
    "Shenzhen, China",
    "Beijing, China",
    "Tokyo, Japan",
    "London, UK",
    "Berlin, Germany",
    "Paris, France",
    "Singapore",
  ];

  const lastUpdateOptions = [
    "January 2025",
    "February 2025",
    "March 2025",
    "April 2025",
    "May 2025",
  ];

  const featuresOptions = [
    "Advanced AI capabilities",
    "Enhanced camera system",
    "Faster charging technology",
    "Improved performance",
    "Extended battery life",
    "Neural processing engine",
    "Adaptive display technology",
    "Upgraded audio system",
    "Enhanced privacy features",
    "Satellite connectivity",
  ];

  const variantOptions = [
    "Standard",
    "Pro",
    "Max",
    "Ultra",
    "Lite",
    "Plus",
    "Mini",
    "Fold",
    "Flip",
    "SE",
  ];

  return (
    <Modal
      title={isEdit ? "Edit Brand" : "Add New Brand"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          name: brand?.name || "",
          description: brand?.description || descriptionOptions[0],
          foundedYear: brand?.foundedYear || 2000,
          headquarters: brand?.headquarters || headquartersOptions[0],
          deviceCount: brand?.deviceCount || 0,
          supportYears: brand?.softwareSupport?.years || 2,
          lastUpdate:
            brand?.softwareSupport?.lastUpdate || lastUpdateOptions[0],
          newFeatures: brand?.newFeatures || [featuresOptions[0]],
          variants: brand?.variants || [variantOptions[0]],
        }}
      >
        <FormSelect
          name="name"
          label="Brand Name"
          options={availableBrandNames.map(name => ({ label: name, value: name }))}
          rules={[{ required: true, message: "Please select brand name" }]}
          showSearch
          disabled={availableBrandNames.length === 0 && !isEdit}
          notFoundContent={
            availableBrandNames.length === 0
              ? "All brands already exist"
              : "No brands found"
          }
        />

        <FormSelect
          name="description"
          label="Description"
          options={descriptionOptions.map(desc => ({ 
            label: `${desc.substring(0, 80)}...`,
            value: desc 
          }))}
          rules={[{ required: true, message: "Please select a description" }]}
        />

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="foundedYear"
              label="Founded Year"
              rules={[
                { required: true, message: "Please enter founding year" },
                {
                  type: "number",
                  min: 1800,
                  max: 2025,
                  message: "Year must be between 1800 and 2025",
                },
              ]}
            >
              <InputNumber
                min={1800}
                max={2025}
                style={{ width: "100%" }}
                placeholder="e.g., 2007"
                parser={(value) =>
                  value ? parseInt(value.replace(/\D/g, "")) : 0
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <FormSelect
              name="headquarters"
              label="Headquarters"
              options={headquartersOptions.map(location => ({ label: location, value: location }))}
              rules={[{ required: true, message: "Please select headquarters location" }]}
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="supportYears"
              label="Software Support (years)"
              rules={[
                { required: true, message: "Please enter support duration" },
                {
                  type: "number",
                  min: 1,
                  max: 10,
                  message: "Support years must be between 1 and 10",
                },
              ]}
            >
              <InputNumber
                min={1}
                max={10}
                style={{ width: "100%" }}
                placeholder="e.g., 5"
                parser={(value) =>
                  value ? parseInt(value.replace(/\D/g, "")) : 0
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <FormSelect
              name="lastUpdate"
              label="Last Update Date"
              options={lastUpdateOptions.map(date => ({ label: date, value: date }))}
              rules={[{ required: true, message: "Please select last update date" }]}
            />
          </Col>
        </Row>

        <Form.List name="newFeatures">
          {(fields, { add, remove }) => (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontWeight: 500 }}>What's New Features</span>
                <Button
                  variant="outline"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  size="small"
                >
                  Add Feature
                </Button>
              </div>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={8} align="middle">
                  <Col flex="1">
                    <FormSelect
                      {...restField}
                      name={name}
                      options={featuresOptions.map(feature => ({ label: feature, value: feature }))}
                      rules={[{ required: true, message: "Please select a feature" }]}
                      style={{ marginBottom: 8 }}
                    />
                  </Col>
                  <Col>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{ color: "#ff4d4f", fontSize: "16px" }}
                    />
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>

        <Form.List name="variants">
          {(fields, { add, remove }) => (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontWeight: 500 }}>Variants</span>
                <Button
                  variant="outline"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  size="small"
                >
                  Add Variant
                </Button>
              </div>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={8} align="middle">
                  <Col flex="1">
                    <FormSelect
                      {...restField}
                      name={name}
                      options={variantOptions.map(variant => ({ label: variant, value: variant }))}
                      rules={[{ required: true, message: "Please select a variant" }]}
                      style={{ marginBottom: 8 }}
                    />
                  </Col>
                  <Col>
                    <MinusCircleOutlined
                      onClick={() => remove(name)}
                      style={{ color: "#ff4d4f", fontSize: "16px" }}
                    />
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

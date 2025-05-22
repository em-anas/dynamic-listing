/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import {
  Modal,
  Form,
  Select,
  InputNumber,
  Slider,
  message,
  Row,
  Col,
} from "antd";
import type { MobileFormProps } from "../../../types";
import { getRandomItem } from "../../../utils";
import {
  mobileImages,
  mobileMockData,
  deviceNames,
} from "../../../utils/mockData";

const { Option } = Select;

export const MobileForm: React.FC<MobileFormProps> = ({
  visible,
  mobile,
  brands,
  onSubmit,
  onCancel,
  initialBrandId,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!mobile?.id;

  const defaultBrandId =
    initialBrandId ||
    mobile?.brandId ||
    (brands.length > 0 ? brands[0].id : "");

  const selectedBrandId = Form.useWatch("brandId", form) || defaultBrandId;

  const brandSpecificDeviceNames = useMemo(() => {
    if (!selectedBrandId) return [];

    const selectedBrand = brands.find((b) => b.id === selectedBrandId);
    if (!selectedBrand) return [];

    return deviceNames.map((suffix) => `${selectedBrand.name} ${suffix}`);
  }, [selectedBrandId, brands]);

  // Clear device name when brand changes
  const handleBrandChange = (newBrandId: string) => {
    const currentBrandId = form.getFieldValue("brandId");
    if (currentBrandId !== newBrandId) {
      // Clear the device name when brand changes
      form.setFieldValue("name", "");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const image = getRandomItem([...mobileImages]);

      const newMobile = {
        ...values,
        image,
        specifications: {
          display: values.display,
          processor: values.processor,
          ram: values.ram,
          storage: values.storage,
          camera: values.camera,
          battery: values.battery,
        },
        performanceBenchmark: {
          antutu: values.antutu,
          geekbench: {
            single: values.geekbenchSingle,
            multi: values.geekbenchMulti,
          },
        },
        reviews: {
          rating: values.rating,
          count: values.reviewCount,
          summary: values.reviewSummary,
        },
      };

      delete newMobile.display;
      delete newMobile.processor;
      delete newMobile.ram;
      delete newMobile.storage;
      delete newMobile.camera;
      delete newMobile.battery;
      delete newMobile.antutu;
      delete newMobile.geekbenchSingle;
      delete newMobile.geekbenchMulti;
      delete newMobile.rating;
      delete newMobile.reviewCount;
      delete newMobile.reviewSummary;

      onSubmit(newMobile);
      form.resetFields();
    } catch (error: any) {
      if (error.message && error.message.includes("already exists")) {
        message.error(error.message);
      }
    }
  };

  const {
    displayOptions,
    processorOptions,
    ramOptions,
    storageOptions,
    cameraOptions,
    batteryOptions,
    releaseDateOptions,
    reviewSummaryOptions,
  } = mobileMockData;

  return (
    <Modal
      title={isEdit ? "Edit Mobile Device" : "Add New Mobile Device"}
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
          brandId: defaultBrandId,
          name: mobile?.name || "",
          releaseDate: mobile?.releaseDate || releaseDateOptions[0],
          price: mobile?.price || 999,
          display: mobile?.specifications?.display || displayOptions[0],
          processor: mobile?.specifications?.processor || processorOptions[0],
          ram: mobile?.specifications?.ram || ramOptions[0],
          storage: mobile?.specifications?.storage || storageOptions[0],
          camera: mobile?.specifications?.camera || cameraOptions[0],
          battery: mobile?.specifications?.battery || batteryOptions[0],
          antutu: mobile?.performanceBenchmark?.antutu || 800000,
          geekbenchSingle:
            mobile?.performanceBenchmark?.geekbench?.single || 1200,
          geekbenchMulti:
            mobile?.performanceBenchmark?.geekbench?.multi || 3500,
          rating: mobile?.reviews?.rating || 4.0,
          reviewCount: mobile?.reviews?.count || 100,
          reviewSummary: mobile?.reviews?.summary || reviewSummaryOptions[0],
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="brandId"
              label="Brand"
              rules={[{ required: true, message: "Please select a brand" }]}
            >
              <Select placeholder="Select brand" onChange={handleBrandChange}>
                {brands.map((brand) => (
                  <Option key={brand.id} value={brand.id}>
                    {brand.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Device Name"
              rules={[{ required: true, message: "Please enter device name" }]}
            >
              <Select
                placeholder="Select or enter device name"
                showSearch
                allowClear
                disabled={!selectedBrandId}
                notFoundContent={
                  !selectedBrandId
                    ? "Please select a brand first"
                    : "No device names found"
                }
              >
                {brandSpecificDeviceNames.map((name) => (
                  <Option key={name} value={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="releaseDate"
              label="Release Date"
              rules={[
                { required: true, message: "Please select release date" },
              ]}
            >
              <Select placeholder="Select release date">
                {releaseDateOptions.map((date) => (
                  <Option key={date} value={date}>
                    {date}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="price"
              label="Price ($)"
              rules={[
                { required: true, message: "Please enter price" },
                { type: "number", min: 0, message: "Price must be positive" },
              ]}
            >
              <InputNumber
                min={0}
                precision={2}
                style={{ width: "100%" }}
                parser={(value) =>
                  value ? parseFloat(value.replace(/[^\d.]/g, "")) : 0
                }
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            marginTop: 24,
            padding: 16,
            backgroundColor: "#fafafa",
            borderRadius: 8,
          }}
        >
          <h3 style={{ marginBottom: 16 }}>Specifications</h3>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="display"
                label="Display"
                rules={[
                  { required: true, message: "Please select display specs" },
                ]}
              >
                <Select placeholder="Select display specs">
                  {displayOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="processor"
                label="Processor"
                rules={[{ required: true, message: "Please select processor" }]}
              >
                <Select placeholder="Select processor">
                  {processorOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="ram"
                label="RAM"
                rules={[{ required: true, message: "Please select RAM specs" }]}
              >
                <Select placeholder="Select RAM specs">
                  {ramOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="storage"
                label="Storage"
                rules={[
                  { required: true, message: "Please select storage specs" },
                ]}
              >
                <Select placeholder="Select storage specs">
                  {storageOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="camera"
                label="Camera"
                rules={[
                  { required: true, message: "Please select camera specs" },
                ]}
              >
                <Select placeholder="Select camera specs">
                  {cameraOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="battery"
                label="Battery"
                rules={[
                  { required: true, message: "Please select battery specs" },
                ]}
              >
                <Select placeholder="Select battery specs">
                  {batteryOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div
          style={{
            marginTop: 24,
            padding: 16,
            backgroundColor: "#f0f9ff",
            borderRadius: 8,
          }}
        >
          <h3 style={{ marginBottom: 16 }}>Performance Benchmark</h3>
          <Form.Item
            name="antutu"
            label={`AnTuTu Score: ${form.getFieldValue("antutu") || 800000}`}
            rules={[{ required: true, message: "Please set AnTuTu score" }]}
          >
            <Slider min={100000} max={1500000} step={10000} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="geekbenchSingle"
                label={`Geekbench Single: ${
                  form.getFieldValue("geekbenchSingle") || 1200
                }`}
                rules={[
                  {
                    required: true,
                    message: "Please set Geekbench single-core score",
                  },
                ]}
              >
                <Slider min={500} max={2000} step={10} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="geekbenchMulti"
                label={`Geekbench Multi: ${
                  form.getFieldValue("geekbenchMulti") || 3500
                }`}
                rules={[
                  {
                    required: true,
                    message: "Please set Geekbench multi-core score",
                  },
                ]}
              >
                <Slider min={1000} max={6000} step={100} />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <div
          style={{
            marginTop: 24,
            padding: 16,
            backgroundColor: "#f6ffed",
            borderRadius: 8,
          }}
        >
          <h3 style={{ marginBottom: 16 }}>Reviews</h3>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="rating"
                label={`Rating: ${form.getFieldValue("rating") || 4.0}/5`}
                rules={[{ required: true, message: "Please set rating" }]}
              >
                <Slider min={0} max={5} step={0.1} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                name="reviewCount"
                label="Review Count"
                rules={[
                  { required: true, message: "Please enter review count" },
                  {
                    type: "number",
                    min: 0,
                    message: "Review count must be positive",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  parser={(value) =>
                    value ? parseInt(value.replace(/\D/g, "")) : 0
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="reviewSummary"
            label="Review Summary"
            rules={[
              { required: true, message: "Please select review summary" },
            ]}
          >
            <Select placeholder="Select review summary">
              {reviewSummaryOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

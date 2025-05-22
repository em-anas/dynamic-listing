/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import { Modal, Form, InputNumber, Slider, message, Row, Col } from "antd";
import type { MobileFormProps } from "../../../types";
import { getRandomItem } from "../../../utils";
import {
  mobileImages,
  mobileMockData,
  deviceNames,
} from "../../../utils/mockData";
import { FormSelect } from "../../../components";

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
            <FormSelect
              name="brandId"
              label="Brand"
              options={brands.map((brand) => ({
                label: brand.name,
                value: brand.id,
              }))}
              rules={[{ required: true, message: "Please select a brand" }]}
            />
          </Col>

          <Col xs={24} sm={12}>
            <FormSelect
              name="name"
              label="Device Name"
              options={brandSpecificDeviceNames.map((name) => ({
                label: name,
                value: name,
              }))}
              rules={[{ required: true, message: "Please enter device name" }]}
              showSearch
              allowClear
              disabled={!selectedBrandId}
              notFoundContent={
                !selectedBrandId
                  ? "Please select a brand first"
                  : "No device names found"
              }
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <FormSelect
              name="releaseDate"
              label="Release Date"
              options={releaseDateOptions.map((date) => ({
                label: date,
                value: date,
              }))}
              rules={[
                { required: true, message: "Please select release date" },
              ]}
            />
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
              <FormSelect
                name="display"
                label="Display"
                options={displayOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                rules={[
                  { required: true, message: "Please select display specs" },
                ]}
              />
            </Col>

            <Col xs={24} sm={12}>
              <FormSelect
                name="processor"
                label="Processor"
                options={processorOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                rules={[{ required: true, message: "Please select processor" }]}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <FormSelect
                name="ram"
                label="RAM"
                options={ramOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                rules={[{ required: true, message: "Please select RAM specs" }]}
              />
            </Col>

            <Col xs={24} sm={12}>
              <FormSelect
                name="storage"
                label="Storage"
                options={storageOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                rules={[
                  { required: true, message: "Please select storage specs" },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <FormSelect
                name="camera"
                label="Camera"
                options={cameraOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                rules={[
                  { required: true, message: "Please select camera specs" },
                ]}
              />
            </Col>

            <Col xs={24} sm={12}>
              <FormSelect
                name="battery"
                label="Battery"
                options={batteryOptions.map((option) => ({
                  label: option,
                  value: option,
                }))}
                rules={[
                  { required: true, message: "Please select battery specs" },
                ]}
              />
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

          <FormSelect
            name="reviewSummary"
            label="Review Summary"
            options={reviewSummaryOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            rules={[
              { required: true, message: "Please select review summary" },
            ]}
          />
        </div>
      </Form>
    </Modal>
  );
};

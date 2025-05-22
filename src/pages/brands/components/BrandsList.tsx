/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from "react";
import { Empty, Input, Select, Button, Row, Col, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BrandItem } from "./BrandItem";
import { BrandDetailModal } from "./BrandDetailModal";
import { BrandForm } from "./BrandForm";
import { useBrands } from "../../../hooks/useBrands";
import { useDebounce } from "../../../hooks/useDebounce";
import VirtualizedList from "../../../components/VirtualizedList";
import type { Brand } from "../../../types";
import {
  updateBrandDeviceCounts,
  removeBrand as removeBrandService,
} from "../../../services/brandService";

const { Search } = Input;
const { Option } = Select;

const ITEM_HEIGHT = 300;

export const BrandsList: React.FC = () => {
  const {
    brands,
    searchTerm,
    setSearchTerm,
    sortDirection,
    setSortDirection,
    addBrand,
    updateBrand,
    removeBrand,
    refreshBrands,
    totalCount,
  } = useBrands();

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    updateBrandDeviceCounts();
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  const handleSortChange = useCallback(
    (value: "asc" | "desc") => {
      setSortDirection(value);
    },
    [setSortDirection]
  );

  const handleShowDetails = useCallback((brand: Brand) => {
    setSelectedBrand(brand);
    setIsDetailModalVisible(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalVisible(false);
    setSelectedBrand(null);
  }, []);

  const handleShowEditModal = useCallback((brand: Brand) => {
    setEditingBrand(brand);
    setIsEditModalVisible(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalVisible(false);
    setEditingBrand(null);
  }, []);

  const handleAddBrand = useCallback(() => {
    setIsAddModalVisible(true);
  }, []);

  const handleCreateBrand = useCallback(
    async (brand: Omit<Brand, "id">) => {
      try {
        await addBrand(brand);
        setIsAddModalVisible(false);
        message.success(`Brand "${brand.name}" created successfully`);
        refreshBrands();
      } catch (error: any) {
        message.error(error.message || "Failed to create brand");
      }
    },
    [addBrand, refreshBrands]
  );

  const handleUpdateBrand = useCallback(
    async (id: string, updates: Partial<Brand>) => {
      try {
        await updateBrand(id, updates);
        message.success("Brand updated successfully");
        refreshBrands();
        if (selectedBrand && selectedBrand.id === id) {
          setSelectedBrand({ ...selectedBrand, ...updates });
        }
      } catch (error: any) {
        message.error(error.message || "Failed to update brand");
      }
    },
    [updateBrand, refreshBrands, selectedBrand]
  );

  const handleEditBrandModal = useCallback(
    async (brand: Omit<Brand, "id">) => {
      if (editingBrand) {
        try {
          await updateBrand(editingBrand.id, brand);
          setIsEditModalVisible(false);
          setEditingBrand(null);
          message.success("Brand updated successfully");
          refreshBrands();
        } catch (error: any) {
          message.error(error.message || "Failed to update brand");
        }
      }
    },
    [updateBrand, refreshBrands, editingBrand]
  );

  const handleRemoveBrand = useCallback(
    async (id: string) => {
      try {
        const success = await removeBrandService(id);
        if (success) {
          removeBrand(id);
          message.success(
            "Brand and all associated devices removed successfully"
          );
          refreshBrands();
        } else {
          message.error("Failed to remove brand");
        }
      } catch (error: any) {
        message.error(error.message || "Failed to remove brand");
      }
    },
    [removeBrand, refreshBrands]
  );

  const handleCancelCreate = useCallback(() => {
    setIsAddModalVisible(false);
  }, []);

  const loadMoreItems = useCallback(
    async (startIndex: number, stopIndex: number) => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
      setHasNextPage(stopIndex < totalCount - 1);
    },
    [totalCount]
  );

  const keyExtractor = useCallback((item: Brand) => item.id, []);

  const renderBrandItem = useCallback(
    (brand: Brand, index: number, style: React.CSSProperties) => (
      <BrandItem
        key={brand.id}
        brand={brand}
        style={style}
        onUpdate={handleUpdateBrand}
        onRemove={handleRemoveBrand}
        onShowDetails={handleShowDetails}
        onShowEditModal={handleShowEditModal}
      />
    ),
    [
      handleUpdateBrand,
      handleRemoveBrand,
      handleShowDetails,
      handleShowEditModal,
    ]
  );

  return (
    <div className="brands-list-container">
      <div className="list-content-wrapper">
        <Row
          gutter={[16, 16]}
          justify="space-between"
          align="middle"
          className="brands-list-header"
          style={{ marginBottom: 24 }}
        >
          <Col xs={24} sm={24} md={16} lg={18} xl={18}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Search
                    placeholder="Search brands"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    allowClear
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={24} sm={12} md={6} lg={4}>
                  <Select
                    value={sortDirection}
                    onChange={handleSortChange}
                    style={{ width: "100%" }}
                  >
                    <Option value="asc">Name (A-Z)</Option>
                    <Option value="desc">Name (Z-A)</Option>
                  </Select>
                </Col>
              </Row>
            </Space>
          </Col>
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddBrand}
              style={{ width: "100%" }}
              size="large"
            >
              Add Brand
            </Button>
          </Col>
        </Row>

        {brands.length > 0 ? (
          <div
            className="brands-list"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <VirtualizedList
              items={brands}
              totalCount={totalCount}
              itemHeight={ITEM_HEIGHT}
              renderItem={renderBrandItem}
              loadMoreItems={loadMoreItems}
              hasNextPage={hasNextPage}
              isNextPageLoading={isLoading}
              keyExtractor={keyExtractor}
              height={Math.max(400, window.innerHeight - 280)}
            />
          </div>
        ) : (
          <Empty
            description={
              <span>
                {debouncedSearchTerm
                  ? `No brands matching "${debouncedSearchTerm}"`
                  : "No brands available"}
              </span>
            }
            style={{ marginTop: 48 }}
          />
        )}
      </div>

      {selectedBrand && (
        <BrandDetailModal
          visible={isDetailModalVisible}
          brand={selectedBrand}
          onClose={handleCloseDetailModal}
          onUpdate={(updates) => {
            handleUpdateBrand(selectedBrand.id, updates);
          }}
        />
      )}

      <BrandForm
        visible={isAddModalVisible}
        onCancel={handleCancelCreate}
        onSubmit={handleCreateBrand}
      />

      {editingBrand && (
        <BrandForm
          visible={isEditModalVisible}
          brand={editingBrand}
          onCancel={handleCloseEditModal}
          onSubmit={handleEditBrandModal}
        />
      )}
    </div>
  );
};

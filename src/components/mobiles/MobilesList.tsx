/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Empty,
  Input,
  Select,
  Button,
  Row,
  Col,
  Space,
  message,
  Tag,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import VirtualizedList from "../VirtualizedList";
import { MobileItem } from "./MobileItem";
import { MobileDetailModal } from "./MobileDetailModal";
import { MobileForm } from "./MobileForm";
import { useMobiles } from "../../hooks/useMobiles";
import { useBrands } from "../../hooks/useBrands";
import { useDebounce } from "../../hooks/useDebounce";
import { useFocus } from "../../hooks/useFocus";
import { updateBrandDeviceCounts } from "../../services/brandService";
import type { Mobile } from "../../types";

const { Search } = Input;
const { Option } = Select;

const ITEM_HEIGHT = 300;

interface MobilesListProps {
  initialBrandId?: string;
}

export const MobilesList: React.FC<MobilesListProps> = ({ initialBrandId }) => {
  const {
    mobiles,
    searchTerm,
    setSearchTerm,
    sortDirection,
    setSortDirection,
    selectedBrandId,
    setSelectedBrandId,
    addMobile,
    updateMobile,
    removeMobile,
    refreshMobiles,
    totalCount,
  } = useMobiles();

  const { brands, getBrand, refreshBrands } = useBrands();

  const [selectedMobile, setSelectedMobile] = useState<Mobile | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingMobile, setEditingMobile] = useState<Mobile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    if (initialBrandId) {
      setSelectedBrandId(initialBrandId);
    }
  }, [initialBrandId, setSelectedBrandId]);

  const handlePageFocus = useCallback(() => {
    refreshMobiles();
    refreshBrands();
    updateBrandDeviceCounts();
  }, [refreshMobiles, refreshBrands]);

  useFocus(handlePageFocus);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const selectedBrandName = useMemo(() => {
    if (selectedBrandId) {
      const brand = getBrand(selectedBrandId);
      return brand ? brand.name : null;
    }
    return null;
  }, [selectedBrandId, getBrand]);

  const availableBrands = useMemo(() => {
    return brands.filter(
      (brand) => brand.deviceCount > 0 || brand.id === selectedBrandId
    );
  }, [brands, selectedBrandId]);

  const getBrandName = useCallback(
    (brandId: string) => {
      const brand = getBrand(brandId);
      return brand ? brand.name : brandId;
    },
    [getBrand]
  );

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

  const handleBrandFilterChange = useCallback(
    (value: string) => {
      setSelectedBrandId(value || null);
    },
    [setSelectedBrandId]
  );

  const handleShowDetails = useCallback((mobile: Mobile) => {
    setSelectedMobile(mobile);
    setIsDetailModalVisible(true);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setIsDetailModalVisible(false);
    setSelectedMobile(null);
  }, []);

  const handleShowEditModal = useCallback((mobile: Mobile) => {
    setEditingMobile(mobile);
    setIsEditModalVisible(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setIsEditModalVisible(false);
    setEditingMobile(null);
  }, []);

  const handleAddMobile = useCallback(() => {
    setIsAddModalVisible(true);
  }, []);

  const handleCreateMobile = useCallback(
    async (mobile: Omit<Mobile, "id">) => {
      try {
        await addMobile(mobile);
        setIsAddModalVisible(false);
        message.success(`Device "${mobile.name}" created successfully`);
        refreshMobiles();
      } catch (error: any) {
        message.error(error.message || "Failed to create device");
      }
    },
    [addMobile, refreshMobiles]
  );

  const handleUpdateMobile = useCallback(
    async (id: string, updates: Partial<Mobile>) => {
      try {
        await updateMobile(id, updates);
        message.success("Device updated successfully");
        refreshMobiles();
        if (selectedMobile && selectedMobile.id === id) {
          setSelectedMobile({ ...selectedMobile, ...updates });
        }
      } catch (error: any) {
        message.error(error.message || "Failed to update device");
      }
    },
    [updateMobile, refreshMobiles, selectedMobile]
  );

  const handleEditMobileModal = useCallback(
    async (mobile: Omit<Mobile, "id">) => {
      if (editingMobile) {
        try {
          await updateMobile(editingMobile.id, mobile);
          setIsEditModalVisible(false);
          setEditingMobile(null);
          message.success("Device updated successfully");
          refreshMobiles();
        } catch (error: any) {
          message.error(error.message || "Failed to update device");
        }
      }
    },
    [updateMobile, refreshMobiles, editingMobile]
  );

  const handleRemoveMobile = useCallback(
    async (id: string) => {
      try {
        await removeMobile(id);
        message.success("Device removed successfully");
        refreshMobiles();
      } catch (error: any) {
        message.error(error.message || "Failed to remove device");
      }
    },
    [removeMobile, refreshMobiles]
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

  const keyExtractor = useCallback((item: Mobile) => item.id, []);

  const renderMobileItem = useCallback(
    (mobile: Mobile, index: number, style: React.CSSProperties) => (
      <MobileItem
        key={mobile.id}
        mobile={mobile}
        brandName={getBrandName(mobile.brandId)}
        style={style}
        onUpdate={handleUpdateMobile}
        onRemove={handleRemoveMobile}
        onShowDetails={handleShowDetails}
        onShowEditModal={handleShowEditModal}
      />
    ),
    [
      handleUpdateMobile,
      handleRemoveMobile,
      getBrandName,
      handleShowDetails,
      handleShowEditModal,
    ]
  );

  return (
    <div className="mobiles-list-container">
      <div className="list-content-wrapper">
        <Row
          gutter={[16, 16]}
          justify="space-between"
          align="middle"
          className="mobiles-list-header"
          style={{ marginBottom: 24 }}
        >
          <Col xs={24} sm={24} md={16} lg={18} xl={18}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {selectedBrandName && (
                <div style={{ marginBottom: 8 }}>
                  <Tag
                    color="blue"
                    style={{ fontSize: "14px", padding: "4px 8px" }}
                  >
                    Showing devices for: {selectedBrandName}
                  </Tag>
                </div>
              )}
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Search
                    placeholder="Search devices"
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
                <Col xs={24} sm={12} md={8} lg={6}>
                  <Select
                    placeholder="Filter by brand"
                    value={selectedBrandId || undefined}
                    onChange={handleBrandFilterChange}
                    style={{ width: "100%" }}
                    allowClear
                  >
                    {availableBrands.map((brand) => (
                      <Option key={brand.id} value={brand.id}>
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "8px",
                          }}
                        />
                        {brand.name} ({brand.deviceCount})
                      </Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </Space>
          </Col>
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddMobile}
              style={{ width: "100%" }}
              size="large"
            >
              Add Device
            </Button>
          </Col>
        </Row>

        {mobiles.length > 0 ? (
          <div
            className="mobiles-list"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <VirtualizedList
              items={mobiles}
              totalCount={totalCount}
              itemHeight={ITEM_HEIGHT}
              renderItem={renderMobileItem}
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
                  ? `No devices matching "${debouncedSearchTerm}"`
                  : selectedBrandId
                  ? `No devices for ${selectedBrandName}`
                  : "No devices available"}
              </span>
            }
            style={{ marginTop: 48 }}
          />
        )}
      </div>

      {selectedMobile && (
        <MobileDetailModal
          visible={isDetailModalVisible}
          mobile={selectedMobile}
          brandName={getBrandName(selectedMobile.brandId)}
          onClose={handleCloseDetailModal}
          onUpdate={(updates) => {
            handleUpdateMobile(selectedMobile.id, updates);
          }}
        />
      )}

      <MobileForm
        visible={isAddModalVisible}
        brands={brands}
        onCancel={handleCancelCreate}
        onSubmit={handleCreateMobile}
        initialBrandId={selectedBrandId || undefined}
      />

      {editingMobile && (
        <MobileForm
          visible={isEditModalVisible}
          mobile={editingMobile}
          brands={brands}
          onCancel={handleCloseEditModal}
          onSubmit={handleEditMobileModal}
          initialBrandId={editingMobile.brandId}
        />
      )}
    </div>
  );
};

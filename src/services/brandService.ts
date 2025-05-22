/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Brand } from "../types";
import { generateMockBrands } from "../utils";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const BRANDS_STORAGE_KEY = "brands";

export const getAllBrands = (): Brand[] => {
  return getFromLocalStorage<Brand[]>(BRANDS_STORAGE_KEY, generateMockBrands());
};

export const getBrandById = (id: string): Brand | undefined => {
  const brands = getAllBrands();
  return brands.find((brand) => brand.id === id);
};

export const addBrand = (brand: Omit<Brand, "id">): Brand => {
  const brands = getAllBrands();

  const existingBrand = brands.find(
    (b) => b.name.toLowerCase() === brand.name.toLowerCase()
  );
  if (existingBrand) {
    throw new Error(`Brand "${brand.name}" already exists`);
  }

  const newBrand: Brand = {
    ...brand,
    id: brand.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    deviceCount: 0,
  };

  const updatedBrands = [...brands, newBrand];
  saveToLocalStorage(BRANDS_STORAGE_KEY, updatedBrands);

  return newBrand;
};

export const updateBrand = (
  id: string,
  updates: Partial<Brand>
): Brand | undefined => {
  const brands = getAllBrands();
  const brandIndex = brands.findIndex((brand) => brand.id === id);

  if (brandIndex === -1) {
    console.warn(`Brand with ID "${id}" not found for update`);
    return undefined;
  }

  if (updates.name) {
    const existingBrand = brands.find(
      (b) => b.name.toLowerCase() === updates.name!.toLowerCase() && b.id !== id
    );
    if (existingBrand) {
      throw new Error(`Brand "${updates.name}" already exists`);
    }
  }

  const updatedBrand = { ...brands[brandIndex], ...updates };
  brands[brandIndex] = updatedBrand;

  saveToLocalStorage(BRANDS_STORAGE_KEY, brands);
  return updatedBrand;
};

export const removeBrand = (id: string): boolean => {
  const brands = getAllBrands();
  const brandToRemove = brands.find((brand) => brand.id === id);

  if (!brandToRemove) {
    console.warn(`Brand with ID "${id}" not found for removal`);
    return false;
  }

  const removedDevicesCount = removeMobilesByBrandId(id);
  console.log(
    `Removed ${removedDevicesCount} devices associated with brand "${brandToRemove.name}"`
  );

  const filteredBrands = brands.filter((brand) => brand.id !== id);
  saveToLocalStorage(BRANDS_STORAGE_KEY, filteredBrands);

  console.log(
    `Successfully removed brand "${brandToRemove.name}" and ${removedDevicesCount} associated devices`
  );
  return true;
};

const removeMobilesByBrandId = (brandId: string): number => {
  const mobiles = getFromLocalStorage("mobiles", []);
  const mobilesToKeep = mobiles.filter(
    (mobile: any) => mobile.brandId !== brandId
  );
  const removedCount = mobiles.length - mobilesToKeep.length;

  if (removedCount > 0) {
    saveToLocalStorage("mobiles", mobilesToKeep);
    console.log(`Removed ${removedCount} mobile devices for brand: ${brandId}`);
  }

  return removedCount;
};

export const updateBrandDeviceCounts = (): void => {
  const brands = getAllBrands();
  const mobiles = getFromLocalStorage("mobiles", []);

  const deviceCountMap: Record<string, number> = {};

  mobiles.forEach((mobile: any) => {
    const brandId = mobile.brandId;
    deviceCountMap[brandId] = (deviceCountMap[brandId] || 0) + 1;
  });

  let hasChanges = false;
  const updatedBrands = brands.map((brand) => {
    const currentCount = deviceCountMap[brand.id] || 0;

    if (brand.deviceCount !== currentCount) {
      hasChanges = true;
      return { ...brand, deviceCount: currentCount };
    }

    return brand;
  });

  if (hasChanges) {
    saveToLocalStorage(BRANDS_STORAGE_KEY, updatedBrands);
    console.log("Brand device counts updated successfully");
  }
};

export const validateBrand = (
  brand: Partial<Brand>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!brand.name?.trim()) {
    errors.push("Brand name is required");
  }

  if (
    brand.foundedYear &&
    (brand.foundedYear < 1800 || brand.foundedYear > new Date().getFullYear())
  ) {
    errors.push("Founded year must be between 1800 and current year");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

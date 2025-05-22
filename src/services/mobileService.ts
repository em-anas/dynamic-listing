/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Mobile } from "../types";
import { generateMockMobiles } from "../utils";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const MOBILES_STORAGE_KEY = "mobiles";

export const getAllMobiles = (): Mobile[] => {
  const mobiles = getFromLocalStorage<Mobile[]>(
    MOBILES_STORAGE_KEY,
    generateMockMobiles()
  );
  return mobiles;
};

const saveMobilesToStorage = (mobiles: Mobile[]): void => {
  try {
    saveToLocalStorage(MOBILES_STORAGE_KEY, mobiles);
    // Update brand device counts after saving mobiles
    updateBrandDeviceCounts();
  } catch (error) {
    console.error("Failed to save mobiles to localStorage:", error);
    throw new Error("Failed to save mobile devices");
  }
};

const updateBrandDeviceCounts = (): void => {
  const brands = getFromLocalStorage("brands", []);
  const mobiles = getFromLocalStorage(MOBILES_STORAGE_KEY, []);

  const deviceCountMap: Record<string, number> = {};

  // Count devices for each brand
  mobiles.forEach((mobile: any) => {
    const brandId = mobile.brandId;
    if (brandId) {
      deviceCountMap[brandId] = (deviceCountMap[brandId] || 0) + 1;
    }
  });

  let hasChanges = false;
  const updatedBrands = brands.map((brand: any) => {
    const currentCount = deviceCountMap[brand.id] || 0;

    if (brand.deviceCount !== currentCount) {
      hasChanges = true;
      return { ...brand, deviceCount: currentCount };
    }

    return brand;
  });

  if (hasChanges) {
    saveToLocalStorage("brands", updatedBrands);
    console.log("Brand device counts updated after mobile operation");
  }
};

export const getMobileById = (id: string): Mobile | undefined => {
  const mobiles = getAllMobiles();
  return mobiles.find((mobile) => mobile.id === id);
};

export const getMobilesByBrandId = (brandId: string): Mobile[] => {
  const mobiles = getAllMobiles();
  return mobiles.filter((mobile) => mobile.brandId === brandId);
};

export const addMobile = (mobile: Omit<Mobile, "id">): Mobile => {
  const mobiles = getAllMobiles();

  const existingMobile = mobiles.find(
    (m) =>
      m.name.toLowerCase() === mobile.name.toLowerCase() &&
      m.brandId === mobile.brandId
  );

  if (existingMobile) {
    throw new Error(`Mobile "${mobile.name}" already exists for this brand`);
  }

  // Generate a sequential ID for the brand
  const brandMobiles = mobiles.filter((m) => m.brandId === mobile.brandId);
  const deviceNumber = brandMobiles.length + 1;

  const newMobile: Mobile = {
    ...mobile,
    id: `${mobile.brandId}-device-${deviceNumber}`,
  };

  const validation = validateMobile(newMobile);
  if (!validation.isValid) {
    throw new Error(`Invalid mobile data: ${validation.errors.join(", ")}`);
  }

  const updatedMobiles = [...mobiles, newMobile];
  saveMobilesToStorage(updatedMobiles);

  console.log(
    `Successfully added mobile device: ${newMobile.name} to brand ${mobile.brandId}`
  );
  return newMobile;
};

export const updateMobile = (
  id: string,
  updates: Partial<Mobile>
): Mobile | undefined => {
  const mobiles = getAllMobiles();
  const mobileIndex = mobiles.findIndex((mobile) => mobile.id === id);

  if (mobileIndex === -1) {
    console.warn(`Mobile device with ID "${id}" not found for update`);
    return undefined;
  }

  const originalMobile = mobiles[mobileIndex];
  const updatedMobile = { ...originalMobile, ...updates };

  if (updates.name && updates.name !== originalMobile.name) {
    const existingMobile = mobiles.find(
      (m) =>
        m.name.toLowerCase() === updates.name!.toLowerCase() &&
        m.brandId === updatedMobile.brandId &&
        m.id !== id
    );

    if (existingMobile) {
      throw new Error(`Mobile "${updates.name}" already exists for this brand`);
    }
  }

  const validation = validateMobile(updatedMobile);
  if (!validation.isValid) {
    throw new Error(`Invalid mobile update: ${validation.errors.join(", ")}`);
  }

  mobiles[mobileIndex] = updatedMobile;
  saveMobilesToStorage(mobiles);

  if (originalMobile.brandId !== updatedMobile.brandId) {
    console.log(
      `Mobile device moved from brand ${originalMobile.brandId} to ${updatedMobile.brandId}`
    );
  }

  return updatedMobile;
};

export const removeMobile = (id: string): boolean => {
  const mobiles = getAllMobiles();
  const mobileToRemove = mobiles.find((mobile) => mobile.id === id);

  if (!mobileToRemove) {
    console.warn(`Mobile device with ID "${id}" not found for removal`);
    return false;
  }

  const filteredMobiles = mobiles.filter((mobile) => mobile.id !== id);
  saveMobilesToStorage(filteredMobiles);

  console.log(
    `Successfully removed mobile device: ${mobileToRemove.name} from brand ${mobileToRemove.brandId}`
  );
  return true;
};

export const removeMobilesByBrandId = (brandId: string): number => {
  const mobiles = getAllMobiles();
  const mobilesToKeep = mobiles.filter((mobile) => mobile.brandId !== brandId);
  const removedCount = mobiles.length - mobilesToKeep.length;

  if (removedCount > 0) {
    saveToLocalStorage(MOBILES_STORAGE_KEY, mobilesToKeep);
    console.log(`Removed ${removedCount} mobile devices for brand: ${brandId}`);
  }

  return removedCount;
};

export const validateMobile = (
  mobile: Partial<Mobile>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!mobile.name?.trim()) {
    errors.push("Mobile name is required");
  }

  if (!mobile.brandId?.trim()) {
    errors.push("Brand ID is required");
  }

  if (mobile.price !== undefined && (mobile.price < 0 || isNaN(mobile.price))) {
    errors.push("Price must be a valid positive number");
  }

  if (
    mobile.reviews?.rating !== undefined &&
    (mobile.reviews.rating < 0 || mobile.reviews.rating > 5)
  ) {
    errors.push("Rating must be between 0 and 5");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

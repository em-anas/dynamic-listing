import type { Brand, Mobile } from "../types";
import {
  BRAND_LOGOS,
  BRAND_DESCRIPTIONS,
  BRAND_HEADQUARTERS,
  BRAND_FOUNDED_YEARS,
  DEVICE_NAMES,
  MOBILE_IMAGES,
  DISPLAY_OPTIONS,
  PROCESSOR_OPTIONS,
  RAM_OPTIONS,
  STORAGE_OPTIONS,
  CAMERA_OPTIONS,
  BATTERY_OPTIONS,
  RELEASE_DATE_OPTIONS,
  REVIEW_SUMMARY_OPTIONS,
  FEATURE_OPTIONS,
  VARIANT_OPTIONS,
  LAST_UPDATE_OPTIONS,
  DEVICES_PER_BRAND,
  PRICE_RANGE,
  ANTUTU_RANGE,
  GEEKBENCH_SINGLE_RANGE,
  GEEKBENCH_MULTI_RANGE,
  RATING_RANGE,
  REVIEW_COUNT_RANGE,
  MODEL_NUMBER_RANGE,
  brandNames,
} from "./mockData";

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomItem = <T>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const generateMockBrands = (): Brand[] => {
  return brandNames.map((name) => {
    return {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      logo: BRAND_LOGOS[name as keyof typeof BRAND_LOGOS] || BRAND_LOGOS.Apple,
      description:
        BRAND_DESCRIPTIONS[name as keyof typeof BRAND_DESCRIPTIONS] ||
        `${name} is a leading mobile brand known for innovation and quality.`,
      foundedYear:
        BRAND_FOUNDED_YEARS[name as keyof typeof BRAND_FOUNDED_YEARS] ||
        getRandomNumber(1980, 2020),
      headquarters:
        BRAND_HEADQUARTERS[name as keyof typeof BRAND_HEADQUARTERS] ||
        "San Francisco, USA",
      deviceCount: 0, // Start with 0 devices, will be updated as devices are added
      newFeatures: FEATURE_OPTIONS.slice(0, getRandomNumber(2, 5)),
      softwareSupport: {
        years: getRandomNumber(3, 7),
        lastUpdate: getRandomItem(LAST_UPDATE_OPTIONS),
      },
      variants: VARIANT_OPTIONS.slice(0, getRandomNumber(3, 8)),
    };
  });
};

export const generateMockMobiles = (): Mobile[] => {
  const mockBrands = generateMockBrands();
  const allDevices: Mobile[] = [];

  // Create devices for each brand
  mockBrands.forEach((brand) => {
    const usedNames = new Set<string>(); // Track used device names to avoid duplicates

    for (let deviceIndex = 0; deviceIndex < DEVICES_PER_BRAND; deviceIndex++) {
      let deviceName: string;
      let attempts = 0;

      // Ensure unique device names for each brand
      do {
        const deviceSuffix = getRandomItem(DEVICE_NAMES);
        const modelNumber = getRandomNumber(
          MODEL_NUMBER_RANGE.min,
          MODEL_NUMBER_RANGE.max
        );
        deviceName = `${brand.name} ${deviceSuffix} ${modelNumber}`;
        attempts++;
      } while (usedNames.has(deviceName) && attempts < 50);

      usedNames.add(deviceName);

      const device: Mobile = {
        id: `${brand.id}-device-${deviceIndex + 1}`, // Predictable, sequential IDs
        brandId: brand.id, // Properly link to the brand
        name: deviceName,
        image: getRandomItem(MOBILE_IMAGES),
        releaseDate: getRandomItem(RELEASE_DATE_OPTIONS),
        price:
          Math.round(
            (getRandomNumber(PRICE_RANGE.min, PRICE_RANGE.max) + 0.99) * 100
          ) / 100,
        specifications: {
          display: getRandomItem(DISPLAY_OPTIONS),
          processor: getRandomItem(PROCESSOR_OPTIONS),
          ram: getRandomItem(RAM_OPTIONS),
          storage: getRandomItem(STORAGE_OPTIONS),
          camera: getRandomItem(CAMERA_OPTIONS),
          battery: getRandomItem(BATTERY_OPTIONS),
        },
        performanceBenchmark: {
          antutu: getRandomNumber(ANTUTU_RANGE.min, ANTUTU_RANGE.max),
          geekbench: {
            single: getRandomNumber(
              GEEKBENCH_SINGLE_RANGE.min,
              GEEKBENCH_SINGLE_RANGE.max
            ),
            multi: getRandomNumber(
              GEEKBENCH_MULTI_RANGE.min,
              GEEKBENCH_MULTI_RANGE.max
            ),
          },
        },
        reviews: {
          rating:
            Math.round(
              getRandomNumber(RATING_RANGE.min * 10, RATING_RANGE.max * 10) / 10
            ) / 10,
          count: getRandomNumber(
            REVIEW_COUNT_RANGE.min,
            REVIEW_COUNT_RANGE.max
          ),
          summary: getRandomItem(REVIEW_SUMMARY_OPTIONS).replace(
            /the device/g,
            `the ${deviceName}`
          ),
        },
      };

      allDevices.push(device);
    }
  });

  return allDevices;
};

export const searchInArray = <T>(
  array: T[],
  searchTerm: string,
  keys: (keyof T)[]
): T[] => {
  if (!searchTerm.trim()) {
    return array;
  }

  const term = searchTerm.toLowerCase();

  return array.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      return typeof value === "string" && value.toLowerCase().includes(term);
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

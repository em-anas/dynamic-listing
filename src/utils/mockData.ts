export const BRAND_LOGOS = {
  Apple: "https://img.icons8.com/?size=100&id=30659&format=png&color=000000",
  Samsung:
    "https://img.icons8.com/?size=100&id=wGYgIlqPWdC2&format=png&color=000000",
  Google: "https://img.icons8.com/?size=100&id=17904&format=png&color=000000",
  Xiaomi:
    "https://img.icons8.com/?size=100&id=uS9Qwglqw25s&format=png&color=000000",
  OnePlus:
    "https://img.icons8.com/?size=100&id=kLVEVCQNW1fT&format=png&color=000000",
  Nokia: "https://img.icons8.com/?size=100&id=13917&format=png&color=000000",
  Oppo: "https://img.icons8.com/?size=100&id=kOKOkzxJb5MX&format=png&color=000000",
  Sony: "https://img.icons8.com/?size=100&id=13922&format=png&color=000000",
} as const;

export const BRAND_DESCRIPTIONS = {
  Apple:
    "Apple is a leading mobile brand known for innovation and quality. They produce smartphones with cutting-edge technology and exceptional user experience.",
  Samsung:
    "Samsung is a premium smartphone manufacturer focused on premium design and high-end specifications. Their devices are known for exceptional build quality.",
  Google:
    "Google is an innovative technology company that creates smartphones with industry-leading AI capabilities and impressive camera systems.",
  Xiaomi:
    "Xiaomi is a value-focused brand that offers feature-rich smartphones at competitive prices. Known for excellent price-to-performance ratios.",
  OnePlus:
    "OnePlus is a rising brand focused on pushing performance boundaries while maintaining competitive pricing and clean software.",
  Nokia:
    "Nokia is a heritage brand that combines classic design principles with modern smartphone technology and legendary durability.",
  Oppo: "Oppo is a brand that prioritizes camera innovation, creating devices with exceptional photography capabilities and selfie technology.",
  Sony: "Sony is a premium brand that combines multimedia expertise with smartphone technology, especially in camera and audio.",
} as const;

export const BRAND_HEADQUARTERS = {
  Apple: "Cupertino, USA",
  Samsung: "Seoul, South Korea",
  Google: "Mountain View, USA",
  Xiaomi: "Beijing, China",
  OnePlus: "Shenzhen, China",
  Nokia: "Espoo, Finland",
  Oppo: "Dongguan, China",
  Sony: "Tokyo, Japan",
} as const;

export const BRAND_FOUNDED_YEARS = {
  Apple: 1976,
  Samsung: 1938,
  Google: 1998,
  Xiaomi: 2010,
  OnePlus: 2013,
  Nokia: 1865,
  Oppo: 2004,
  Sony: 1946,
} as const;

// Device Configuration Constants
export const DEVICE_NAMES = [
  "Lite",
  "Pro",
  "Pro Max",
  "Ultra",
  "Max",
  "Standard",
  "Mini",
  "Base",
  "Plus",
  "Fold",
  "Flip",
  "SE",
  "Edge",
  "Note",
  "Neo",
  "Prime",
  "Elite",
  "Ace",
  "Vision",
  "Power",
  "Gaming",
  "Compact",
  "Zoom",
  "Studio",
  "Air",
] as const;

export const MOBILE_IMAGES = [
  "https://picsum.photos/id/100/200",
  "https://picsum.photos/id/110/200",
  "https://picsum.photos/id/120/200",
  "https://picsum.photos/id/130/200",
  "https://picsum.photos/id/140/200",
  "https://picsum.photos/id/150/200",
  "https://picsum.photos/id/160/200",
  "https://picsum.photos/id/170/200",
  "https://picsum.photos/id/180/200",
  "https://picsum.photos/id/190/200",
  "https://picsum.photos/id/200/200",
  "https://picsum.photos/id/210/200",
  "https://picsum.photos/id/220/200",
  "https://picsum.photos/id/230/200",
  "https://picsum.photos/id/240/200",
  "https://picsum.photos/id/250/200",
  "https://picsum.photos/id/260/200",
  "https://picsum.photos/id/270/200",
] as const;

// Technical Specifications Constants
export const DISPLAY_OPTIONS = [
  "6.1-inch AMOLED FHD+",
  "6.5-inch OLED QHD+",
  "6.7-inch Super AMOLED 2K",
  "6.9-inch IPS LCD FHD+",
  "6.3-inch Retina 4K",
  "7.0-inch Dynamic AMOLED 2X",
  "6.4-inch P-OLED HDR10+",
  "6.2-inch Super Retina XDR",
  "5.8-inch AMOLED FHD",
  "6.8-inch E4 AMOLED 120Hz",
  "6.6-inch IPS LCD 90Hz",
  "7.2-inch Foldable OLED",
  "5.4-inch Super Retina",
  "6.0-inch LCD Plus",
] as const;

export const PROCESSOR_OPTIONS = [
  "Snapdragon 8 Gen 1",
  "Snapdragon 8 Gen 2",
  "Snapdragon 8 Gen 3",
  "Snapdragon 7 Gen 1",
  "Snapdragon 6 Gen 1",
  "Exynos 2200",
  "Exynos 2300",
  "Exynos 2400",
  "Bionic A16",
  "Bionic A17",
  "Bionic A18",
  "Dimensity 9000",
  "Dimensity 9200",
  "Dimensity 8100",
  "Dimensity 7200",
  "Tensor G3",
  "Tensor G4",
  "Kirin 9000",
  "Kirin 990",
  "Helio G99",
  "Unisoc Tiger T820",
] as const;

export const RAM_OPTIONS = [
  "3GB LPDDR3",
  "4GB LPDDR4",
  "6GB LPDDR4X",
  "8GB LPDDR5",
  "10GB LPDDR5",
  "12GB LPDDR5",
  "16GB LPDDR5X",
  "18GB LPDDR5X",
  "24GB LPDDR5X",
] as const;

export const STORAGE_OPTIONS = [
  "32GB eMMC",
  "64GB UFS 3.0",
  "128GB UFS 3.1",
  "128GB NVMe",
  "256GB UFS 3.1",
  "256GB UFS 4.0",
  "512GB UFS 4.0",
  "512GB NVMe",
  "1TB UFS 3.1",
  "1TB NVMe",
  "2TB UFS 4.0",
] as const;

export const CAMERA_OPTIONS = [
  "13MP main, 5MP ultrawide",
  "32MP main, 8MP ultrawide",
  "48MP main, 12MP ultrawide, 8MP telephoto",
  "50MP main, 8MP ultrawide, 2MP macro",
  "50MP main, 12MP ultrawide, 10MP telephoto",
  "50MP main, 13MP ultrawide, 8MP telephoto",
  "64MP main, 8MP ultrawide, 2MP depth",
  "64MP main, 16MP ultrawide, 12MP telephoto",
  "108MP main, 8MP ultrawide, 2MP macro, 2MP depth",
  "108MP main, 12MP ultrawide, 10MP telephoto",
  "200MP main, 50MP ultrawide, 10MP telephoto, 10MP macro",
  "12MP main, 12MP ultrawide, 12MP telephoto",
  "60MP main, 50MP ultrawide, 48MP telephoto",
] as const;

export const BATTERY_OPTIONS = [
  "3000mAh, 18W charging",
  "3200mAh, 15W charging",
  "3500mAh, 25W charging",
  "3800mAh, 20W charging",
  "4000mAh, 33W charging",
  "4200mAh, 30W charging",
  "4500mAh, 45W charging",
  "4800mAh, 120W charging",
  "5000mAh, 65W charging",
  "5500mAh, 65W charging",
  "6000mAh, 80W charging",
  "7000mAh, 33W charging",
] as const;

// Date and Time Constants
export const RELEASE_DATE_OPTIONS = [
  "January 2024",
  "February 2024",
  "March 2024",
  "April 2024",
  "May 2024",
  "June 2024",
  "July 2024",
  "August 2024",
  "September 2024",
  "October 2024",
  "November 2024",
  "December 2024",
  "January 2025",
  "February 2025",
  "March 2025",
  "April 2025",
  "May 2025",
] as const;

export const LAST_UPDATE_OPTIONS = [
  "January 2025",
  "February 2025",
  "March 2025",
  "April 2025",
  "May 2025",
  "June 2025",
  "July 2025",
  "August 2025",
  "September 2025",
  "October 2025",
  "November 2025",
  "December 2025",
] as const;

// Feature and Variant Constants
export const FEATURE_OPTIONS = [
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
  "Improved water resistance",
  "Upgraded cooling system",
  "Enhanced gaming capabilities",
  "Advanced voice assistant",
  "Improved haptic feedback",
  "Multi-day battery life",
  "Quantum dot camera sensors",
  "Foldable display technology",
  "Ambient computing features",
  "Environmental sensors integration",
  "Advanced biometric security",
  "5G millimeter wave support",
  "Wireless power sharing",
  "Professional video recording",
  "AI-powered photography",
] as const;

export const VARIANT_OPTIONS = [
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
  "FE (Fan Edition)",
  "Neo",
  "Note",
  "S",
  "A",
  "Edge",
  "Slim",
  "Gaming",
  "Prime",
  "Essential",
  "Rugged",
  "Business",
  "Creator",
  "Explorer",
] as const;

export const REVIEW_SUMMARY_OPTIONS = [
  "Users praise the device for its excellent performance, but some criticize its price.",
  "Users love the battery life and camera quality, but heating issues are a concern.",
  "Premium build quality and display are highlights, but software bugs are frequently reported.",
  "Great value for money with impressive specs, though average battery life has disappointed some users.",
  "Camera performance exceeds expectations, however some users report connectivity issues.",
  "Exceptional display and performance, though some users find the design controversial.",
  "Fantastic performance and cameras, but battery life could be better according to most reviews.",
  "Impressive camera system and software, though some users find it slightly overpriced.",
  "Outstanding battery life and build quality, though the camera system could be improved.",
  "Excellent gaming performance and display, though some users report occasional software glitches.",
  "Solid mid-range option with good overall performance, but lacks premium features.",
  "Innovative design and features make it stand out, though durability concerns have been raised.",
  "Fast charging and excellent display quality, but some users report software optimization issues.",
  "Great budget option with surprising performance, though build quality feels cheap to some.",
  "Professional-grade camera system impresses, but the learning curve is steep for casual users.",
] as const;

// Configuration Constants
export const SUPPORT_YEARS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export const FOUNDED_YEAR_RANGE = { min: 1950, max: 2025 } as const;
export const DEVICES_PER_BRAND = 10 as const;
export const BULK_DEVICE_LIMITS = { min: 1, max: 50 } as const;
export const PRICE_RANGE = { min: 199, max: 1999 } as const;
export const ANTUTU_RANGE = { min: 300000, max: 1500000 } as const;
export const GEEKBENCH_SINGLE_RANGE = { min: 600, max: 2000 } as const;
export const GEEKBENCH_MULTI_RANGE = { min: 1500, max: 6000 } as const;
export const RATING_RANGE = { min: 3.0, max: 5.0 } as const;
export const REVIEW_COUNT_RANGE = { min: 25, max: 3000 } as const;
export const BATTERY_RANGE = { min: 3000, max: 7000 } as const;
export const CHARGING_RANGE = { min: 15, max: 120 } as const;
export const DISPLAY_SIZE_RANGE = { min: 5.4, max: 7.8 } as const;
export const MODEL_NUMBER_RANGE = { min: 10, max: 39 } as const;

// Legacy exports for backward compatibility
export const brandLogos = BRAND_LOGOS;
export const brandNames = Object.keys(BRAND_LOGOS);
export const mobileImages = MOBILE_IMAGES;
export const deviceNames = DEVICE_NAMES;

// Structured mock data object
export const mobileMockData = {
  displayOptions: DISPLAY_OPTIONS,
  processorOptions: PROCESSOR_OPTIONS,
  ramOptions: RAM_OPTIONS,
  storageOptions: STORAGE_OPTIONS,
  cameraOptions: CAMERA_OPTIONS,
  batteryOptions: BATTERY_OPTIONS,
  releaseDateOptions: RELEASE_DATE_OPTIONS,
  reviewSummaryOptions: REVIEW_SUMMARY_OPTIONS,
} as const;

export const brandMockData = {
  descriptionOptions: Object.values(BRAND_DESCRIPTIONS),
  headquartersOptions: Array.from(new Set(Object.values(BRAND_HEADQUARTERS))),
  lastUpdateOptions: LAST_UPDATE_OPTIONS,
  featuresOptions: FEATURE_OPTIONS,
  variantOptions: VARIANT_OPTIONS,
  foundedYearOptions: Array.from(
    { length: FOUNDED_YEAR_RANGE.max - FOUNDED_YEAR_RANGE.min + 1 },
    (_, i) => FOUNDED_YEAR_RANGE.min + i
  ),
  supportYearsOptions: SUPPORT_YEARS_OPTIONS,
} as const;

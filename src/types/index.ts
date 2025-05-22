export interface VirtualizationOptions {
  totalItems: number;
  itemHeight: number;
  overscan?: number;
  viewportHeight?: number;
  initialScrollIndex?: number;
  batchSize?: number;
  loadDelay?: number;
}

export interface VirtualizationState {
  startIndex: number;
  endIndex: number;
  visibleItems: number[];
  scrollTo: (index: number) => void;
  containerProps: {
    ref: React.RefObject<HTMLDivElement>;
    style: React.CSSProperties;
    onScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  };
  isLoading: boolean;
  loadMoreItems: () => Promise<void>;
  hasNextBatch: boolean;
}

export interface VirtualizedListProps<T> {
  items: T[];
  totalCount: number;
  itemHeight: number;
  renderItem: (
    item: T,
    index: number,
    style: React.CSSProperties
  ) => React.ReactNode;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void>;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  keyExtractor: (item: T, index: number) => string;
  overscan?: number;
  className?: string;
  height?: number;
  width?: number;
}

export interface Brand {
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
}

export interface Mobile {
  id: string;
  brandId: string;
  name: string;
  image: string;
  releaseDate: string;
  price: number;
  specifications: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    camera: string;
    battery: string;
  };
  performanceBenchmark: {
    antutu: number;
    geekbench: {
      single: number;
      multi: number;
    };
  };
  reviews: {
    rating: number;
    count: number;
    summary: string;
  };
}

export interface BrandItemProps {
  brand: Brand;
  onUpdate: (id: string, updates: Partial<Brand>) => void;
  onRemove: (id: string) => void;
  onShowDetails: (brand: Brand) => void;
  onShowEditModal: (brand: Brand) => void;
  style?: React.CSSProperties;
}

export interface BrandDetailModalProps {
  visible: boolean;
  brand: Brand;
  onClose: () => void;
  onUpdate: (updates: Partial<Brand>) => void;
}

export interface BrandFormProps {
  visible: boolean;
  brand?: Partial<Brand>;
  onSubmit: (brand: Omit<Brand, "id">) => void;
  onCancel: () => void;
}

export interface MobileItemProps {
  mobile: Mobile;
  brandName: string;
  onUpdate: (id: string, updates: Partial<Mobile>) => void;
  onRemove: (id: string) => void;
  onShowDetails: (mobile: Mobile) => void;
  onShowEditModal: (mobile: Mobile) => void;
  style?: React.CSSProperties;
}

export interface MobileDetailModalProps {
  visible: boolean;
  mobile: Mobile;
  brandName: string;
  onClose: () => void;
  onUpdate: (updates: Partial<Mobile>) => void;
}

export interface MobileFormProps {
  visible: boolean;
  mobile?: Partial<Mobile>;
  brands: Brand[];
  onSubmit: (mobile: Omit<Mobile, "id">) => void;
  onCancel: () => void;
  initialBrandId?: string;
}

export interface StoreContextType {
  brands: Brand[];
  brandSearchTerm: string;
  setBrandSearchTerm: (term: string) => void;
  brandSortDirection: "asc" | "desc";
  setBrandSortDirection: (direction: "asc" | "desc") => void;
  addBrand: (brand: Omit<Brand, "id">) => Brand;
  updateBrand: (id: string, updates: Partial<Brand>) => void;
  removeBrand: (id: string) => void;
  getBrand: (id: string) => Brand | undefined;
  brandsCount: number;

  mobiles: Mobile[];
  mobileSearchTerm: string;
  setMobileSearchTerm: (term: string) => void;
  mobileSortDirection: "asc" | "desc";
  setMobileSortDirection: (direction: "asc" | "desc") => void;
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
  addMobile: (mobile: Omit<Mobile, "id">) => Mobile;
  updateMobile: (id: string, updates: Partial<Mobile>) => void;
  removeMobile: (id: string) => void;
  getMobile: (id: string) => Mobile | undefined;
  getMobilesByBrandId: (brandId: string) => Mobile[];
  mobilesCount: number;
}

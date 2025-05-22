import { useState, useCallback, useMemo, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Brand } from "../types";
import { generateMockBrands } from "../utils";
import { updateBrandDeviceCounts } from "../services/brandService";

export const useBrands = () => {
  const [brands, setBrands] = useLocalStorage<Brand[]>(
    "brands",
    generateMockBrands()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    updateBrandDeviceCounts();
  }, []);

  const filteredBrands = useMemo(() => {
    if (!searchTerm.trim()) return brands;

    const term = searchTerm.toLowerCase();
    return brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(term) ||
        brand.description.toLowerCase().includes(term) ||
        brand.headquarters.toLowerCase().includes(term)
    );
  }, [brands, searchTerm]);

  const sortedBrands = useMemo(() => {
    return [...filteredBrands].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredBrands, sortDirection]);

  const addBrand = useCallback(
    (brand: Omit<Brand, "id">) => {
      const sanitizedId = brand.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      const newBrand: Brand = {
        ...brand,
        id: sanitizedId,
        deviceCount: 0,
      };

      setBrands((prev) => {
        const exists = prev.some((b) => b.id === newBrand.id);
        if (exists) {
          throw new Error(`Brand with name "${brand.name}" already exists`);
        }
        return [...prev, newBrand];
      });

      return newBrand;
    },
    [setBrands]
  );

  const updateBrand = useCallback(
    (id: string, updates: Partial<Brand>) => {
      setBrands((prev) =>
        prev.map((brand) =>
          brand.id === id ? { ...brand, ...updates } : brand
        )
      );
    },
    [setBrands]
  );

  const removeBrand = useCallback(
    (id: string) => {
      setBrands((prev) => {
        const brandExists = prev.some((brand) => brand.id === id);
        if (!brandExists) {
          console.warn(`Brand with ID "${id}" not found`);
          return prev;
        }
        return prev.filter((brand) => brand.id !== id);
      });
    },
    [setBrands]
  );

  const getBrand = useCallback(
    (id: string) => {
      return brands.find((brand) => brand.id === id);
    },
    [brands]
  );

  const refreshBrands = useCallback(() => {
    const storedBrands = localStorage.getItem("brands");
    if (storedBrands) {
      try {
        const parsedBrands = JSON.parse(storedBrands);
        setBrands(parsedBrands);
      } catch (error) {
        console.error("Failed to parse brands from localStorage:", error);
      }
    }
  }, [setBrands]);

  const searchBrands = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const sortBrands = useCallback((direction: "asc" | "desc") => {
    setSortDirection(direction);
  }, []);

  return {
    brands: sortedBrands,
    allBrands: brands,
    searchTerm,
    setSearchTerm: searchBrands,
    sortDirection,
    setSortDirection: sortBrands,
    addBrand,
    updateBrand,
    removeBrand,
    getBrand,
    refreshBrands,
    totalCount: brands.length,
    filteredCount: filteredBrands.length,
  };
};

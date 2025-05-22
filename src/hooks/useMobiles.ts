import { useState, useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Mobile } from "../types";

export const useMobiles = () => {
  const [mobiles, setMobiles] = useLocalStorage<Mobile[]>("mobiles", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const filteredMobiles = useMemo(() => {
    let filtered = mobiles;

    if (selectedBrandId) {
      filtered = filtered.filter(
        (mobile) => mobile.brandId === selectedBrandId
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (mobile) =>
          mobile.name.toLowerCase().includes(term) ||
          mobile.specifications.processor.toLowerCase().includes(term) ||
          mobile.specifications.ram.toLowerCase().includes(term) ||
          mobile.specifications.camera.toLowerCase().includes(term) ||
          mobile.specifications.display.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [mobiles, searchTerm, selectedBrandId]);

  const sortedMobiles = useMemo(() => {
    return [...filteredMobiles].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredMobiles, sortDirection]);

  const refreshMobiles = useCallback(() => {
    const storedMobiles = localStorage.getItem("mobiles");
    if (storedMobiles) {
      try {
        const parsedMobiles = JSON.parse(storedMobiles);
        setMobiles(parsedMobiles);
      } catch (error) {
        console.error("Failed to parse mobiles from localStorage:", error);
      }
    }
  }, [setMobiles]);

  const addMobile = useCallback(
    (mobile: Omit<Mobile, "id">) => {
      const sanitizedName = mobile.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
      const timestamp = Date.now();

      const newMobile: Mobile = {
        ...mobile,
        id: `${sanitizedName}-${timestamp}`,
      };

      setMobiles((prev) => {
        const exists = prev.some(
          (m) =>
            m.name.toLowerCase() === mobile.name.toLowerCase() &&
            m.brandId === mobile.brandId
        );
        if (exists) {
          throw new Error(
            `Mobile "${mobile.name}" already exists for this brand`
          );
        }
        return [...prev, newMobile];
      });

      return newMobile;
    },
    [setMobiles]
  );

  const updateMobile = useCallback(
    (id: string, updates: Partial<Mobile>) => {
      setMobiles((prev) =>
        prev.map((mobile) =>
          mobile.id === id ? { ...mobile, ...updates } : mobile
        )
      );
    },
    [setMobiles]
  );

  const removeMobile = useCallback(
    (id: string) => {
      setMobiles((prev) => {
        const mobileExists = prev.some((mobile) => mobile.id === id);
        if (!mobileExists) {
          console.warn(`Mobile with ID "${id}" not found`);
          return prev;
        }
        return prev.filter((mobile) => mobile.id !== id);
      });
    },
    [setMobiles]
  );

  const getMobile = useCallback(
    (id: string) => {
      return mobiles.find((mobile) => mobile.id === id);
    },
    [mobiles]
  );

  const getMobilesByBrandId = useCallback(
    (brandId: string) => {
      return mobiles.filter((mobile) => mobile.brandId === brandId);
    },
    [mobiles]
  );

  const searchMobiles = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const sortMobiles = useCallback((direction: "asc" | "desc") => {
    setSortDirection(direction);
  }, []);

  const filterByBrand = useCallback((brandId: string | null) => {
    setSelectedBrandId(brandId);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedBrandId(null);
    setSortDirection("asc");
  }, []);

  return {
    mobiles: sortedMobiles,
    allMobiles: mobiles,
    searchTerm,
    setSearchTerm: searchMobiles,
    sortDirection,
    setSortDirection: sortMobiles,
    selectedBrandId,
    setSelectedBrandId: filterByBrand,
    addMobile,
    updateMobile,
    removeMobile,
    getMobile,
    getMobilesByBrandId,
    refreshMobiles,
    clearFilters,
    totalCount: filteredMobiles.length,
    allCount: mobiles.length,
  };
};

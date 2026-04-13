import { useMemo, useState } from "react";
import type { FixedAssetsDataAttributes } from "../interface";

export const useFixedAssetsTable = (data: FixedAssetsDataAttributes[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (!searchQuery.trim()) return data;

    const q = searchQuery.toLowerCase();

    return data.filter(
      (item) => item.assetName?.toLowerCase().includes(q)||
        item.assetCode?.toLowerCase().includes(q)||
        item.purchaseCost?.toString().toLowerCase().includes(q)||
        item.purchaseDate?.toLowerCase().includes(q)||
        item.gst?.toString().toLowerCase().includes(q)
      // item.quantity?.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};

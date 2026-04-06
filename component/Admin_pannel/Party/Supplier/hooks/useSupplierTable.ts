import { useMemo, useState } from "react";
import { SupplierData } from "../interface";

export const useSupplierTable = (data: SupplierData[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (!searchQuery.trim()) return data;

    const q = searchQuery.toLowerCase();

    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(q) ||
        item.cidNo?.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};
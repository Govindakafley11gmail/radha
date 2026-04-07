import { useMemo, useState } from "react";
import type { WIPInventoryData } from "../interface";

export const useWIPInventoryTable = (data: WIPInventoryData[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (!searchQuery.trim()) return data;

    const q = searchQuery.toLowerCase();

    return data.filter(
      (item) => item.cost?.toLowerCase().includes(q),
      // item.quantity?.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};

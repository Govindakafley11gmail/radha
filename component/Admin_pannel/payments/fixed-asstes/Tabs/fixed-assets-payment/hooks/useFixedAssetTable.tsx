import { useMemo, useState } from "react";
import type { FixedAssetsPaymentDataAttributes } from "../interface";

export const useFixedAssetsPaymentTable = (data: FixedAssetsPaymentDataAttributes[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (!searchQuery.trim()) return data;

    const q = searchQuery.toLowerCase();

    return data.filter(
      (item) => item.amount?.toLowerCase().includes(q)||
        item.paymentMode?.toLowerCase().includes(q)||
        item.asset?.assetName.toString().toLowerCase().includes(q)
      // item.quantity?.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
};

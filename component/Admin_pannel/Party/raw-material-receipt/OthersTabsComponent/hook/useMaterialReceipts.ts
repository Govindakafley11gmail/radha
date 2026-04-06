// hooks/useRawMaterialReceiptData.ts

import { useMemo, useState } from "react";
import { useGetRawMaterialReceipt } from "../../tanstack-function";
import type { RawMaterialReceipt } from "../../interface";


export const useRawMaterialReceiptData = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetRawMaterialReceipt();
  const rawData = data?.data || [];

  const filteredData: RawMaterialReceipt[] = useMemo(() => {
    if (!searchQuery.trim()) return rawData;

    const query = searchQuery.toLowerCase();

    return rawData.filter(
      (item) =>
        item.purchaseInvoice.invoiceNo.toLowerCase().includes(query) ||
        item.supplier.name.toLowerCase().includes(query) ||
        item.purchaseInvoice.materialTypes.toLowerCase().includes(query)
    );
  }, [rawData, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    isLoading,
  };
};
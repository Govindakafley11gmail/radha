// hooks/usePurchaseInvoices.ts

import { useMemo, useState } from "react";
import type { PurchaseInvoice } from "../../../invoice/interface";

export const usePurchaseInvoices = (data: PurchaseInvoice[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<PurchaseInvoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();

    return data.filter(
      (item) =>
        item.invoiceNo.toLowerCase().includes(query) ||
        item.supplier.cidNo.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    selectedRow,
    setSelectedRow,
    isModalOpen,
    setIsModalOpen,
  };
};
import { useMemo, useState } from "react";
import type { SupplierandInvoiceDataAttributes } from "../../interface";

export const usePurchaseInvoicePayements = (
  data: SupplierandInvoiceDataAttributes[]
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] =
    useState<SupplierandInvoiceDataAttributes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();

    return data.filter((PurchaseInvoiceData) =>
      PurchaseInvoiceData?.invoice?.invoiceNo
        ?.toLowerCase()
        ?.includes(query) ||
      PurchaseInvoiceData?.supplier?.name
        ?.toLowerCase()
        ?.includes(query) ||
      PurchaseInvoiceData?.supplier?.cidNo
        ?.toLowerCase()
        ?.includes(query)
    );
  }, [data, searchQuery]); // ✅ correct placement

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
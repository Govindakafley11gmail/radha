/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useRawMaterialReceiptColumns.ts

import { Column } from "@/component/table";
import type { RawMaterialReceipt } from "../../interface";


type Props = {
  data: RawMaterialReceipt[];
  
};

export const useRawMaterialReceiptColumns = ({
  data,

}: Props): Column<RawMaterialReceipt>[] => {
  return [
    {
      header: "S.No",
      render: (_, row) => data.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Invoice No",
      render: (_, row) => row.purchaseInvoice?.invoiceNo || "-",
    },
    {
      header: "Supplier Name",
      render: (_, row) => row.supplier?.name || "-",
    },
    {
      header: "Material Types",
      render: (_, row) => row.purchaseInvoice?.materialTypes || "-",
    },
    {
      header: "Total Amount",
      render: (_, row) => row.purchaseInvoice?.finalCost || "-",
    },
    
  ];
};
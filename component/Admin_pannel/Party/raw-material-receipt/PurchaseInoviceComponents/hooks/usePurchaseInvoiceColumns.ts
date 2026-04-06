// hooks/usePurchaseInvoiceColumns.ts

import { Column } from "@/component/table";
import type { PurchaseInvoice } from "../../../invoice/interface";

export const usePurchaseInvoiceColumns = (
  data: PurchaseInvoice[]
): Column<PurchaseInvoice>[] => [
  {
    header: "S.No",
    render: (_, row) => data.findIndex((r) => r.id === row.id) + 1,
  },
  {
    header: "Name",
    render: (_, row) => row.supplier?.name || "-",
  },
  {
    header: "Invoice No#",
    render: (_, row) => row.invoiceNo || "-",
  },
  {
    header: "Total Cost",
    render: (_, row) => row.finalCost || "-",
  },
  {
    header: "CID No#",
    render: (_, row) => row.supplier.cidNo || "-",
  },
  {
    header: "Status",
    render: (_, row) => row.status || "-",
  },
];
import type { Column } from "@/component/table";
import type { SupplierandInvoiceDataAttributes } from "../../interface";


export const usePurchaseInvoicePaymentsColumn = (
  data: SupplierandInvoiceDataAttributes[],

): Column<SupplierandInvoiceDataAttributes>[] => [
  {
    header: "S.No",
    render: (_, row) => data.findIndex((r) => r.id === row.id) + 1,
  },
  {
    header: "Name",
    render: (_, row) => row.supplier?.name || "-",
  },
  {
    header: "Invoice N0#",
    render: (_, row) => row.invoice?.invoiceNo || "-",
  },

  {
    header: "CID No#",
    render: (_, row) => row.supplier?.cidNo || "-",
  },
  {
    header: "Amount",
    render: (_, row) => row.amount || "-",
  },
  {
    header: "Status",
    render: (_, row) => row.status || "-",
  },
];


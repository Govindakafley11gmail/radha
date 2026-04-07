import type { Column } from "@/component/table";
import type { WIPInventoryData } from "../interface";


export const usePurchaseInvoicePaymentsColumn = (
  data: WIPInventoryData[],

): Column<WIPInventoryData>[] => [
  {
    header: "S.No",
    render: (_, row) => data.findIndex((r) => r.id === row.id) + 1,
  },
   {
    header: "Batch No#",
    render: (_, row) => row.batch.batchNumber || "-",
  },
  {
    header: "Cost",
    render: (_, row) => row.cost || "-",
  },
  {
    header: "Quantity",
    render: (_, row) => row.quantity || "-",
  },

 
  
];


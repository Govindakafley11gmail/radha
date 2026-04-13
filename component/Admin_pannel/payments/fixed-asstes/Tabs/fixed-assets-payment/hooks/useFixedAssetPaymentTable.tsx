import type { Column } from "@/component/table";
import type { FixedAssetsPaymentDataAttributes } from "../interface";

export const useFixedAssetsPaymentsColumn = (
  data: FixedAssetsPaymentDataAttributes[],
): Column<FixedAssetsPaymentDataAttributes>[] => [
  {
    header: "S.No",
    render: (_, row) => data.findIndex((r) => r.id === row.id) + 1,
  },
  {
    header: "Asset Name",
    render: (_, row) => row.asset?.assetName || "-",
  },
 
  {
    header: "Purchase Cost",
    render: (_, row) => row.asset?.purchaseCost?.toString() || "-",
  },
  {
    header: "Purchase Date",
    render: (_, row) => row.asset?.purchaseDate || "-",
  },
  {
    header: "Amount",
    render: (_, row) => row.amount?.toString() || "-",
  },
   {
    header: "Description",
    render: (_, row) => row.description || "-",
  },
   {
    header: "Status",
    render: (_, row) => row.status || "-",
  },
];

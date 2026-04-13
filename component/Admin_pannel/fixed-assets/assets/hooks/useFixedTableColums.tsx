import type { Column } from "@/component/table";
import type { FixedAssetsDataAttributes } from "../interface";

export const usePurchaseInvoicePaymentsColumn = (
  data: FixedAssetsDataAttributes[],
): Column<FixedAssetsDataAttributes>[] => [
  {
    header: "S.No",
    render: (_, row) => data.findIndex((r) => r.id === row.id) + 1,
  },
  {
    header: "Asset Name",
    render: (_, row) => row.assetName || "-",
  },
  {
    header: "Asset Code",
    render: (_, row) => row.assetCode || "-",
  },
  {
    header: "Purchase Cost",
    render: (_, row) => row.purchaseCost || "-",
  },
  {
    header: "Purchase Date",
    render: (_, row) => row.purchaseDate || "-",
  },
  {
    header: "GST",
    render: (_, row) => row.gst || "-",
  },
];

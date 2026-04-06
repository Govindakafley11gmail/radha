/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useRawMaterialReceiptColumns.ts

import { Column } from "@/component/table";
import { getFileName } from "../../../Supplier/helperfunction";
import type { RawMaterialReceipt } from "../../interface";


type Props = {
  data: RawMaterialReceipt[];
  downloadMou: any;
  downloadInvoiceFile: any;
  isDownloading: boolean;
  generateReceipt: any;
  generateMaterialReceipt: any;
  isGenerating: boolean;
};

export const useRawMaterialReceiptColumns = ({
  data,
  downloadMou,
  downloadInvoiceFile,
  isDownloading,
  generateReceipt,
  generateMaterialReceipt,
  isGenerating,
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
    {
      header: "Receipt No",
      render: (_, row) => row.receipt_no || "-",
    },
    {
      header: "Purchase Invoice Doc",
      render: (_, row) => (
        row.documentPath ? (
          <button
            onClick={() => downloadMou(downloadInvoiceFile(row.id))}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {isDownloading
              ? "Downloading..."
              : getFileName(row.documentPath)}
          </button>
        ) : (
          "-"
        )
      ),
    },
    {
      header: "Received Date",
      render: (_, row) => row.received_date || "-",
    },
    {
      header: "Actions",
      render: (_, row) => (
        <button
          onClick={() => generateReceipt(generateMaterialReceipt(row.id))}
          disabled={isGenerating}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate Receipt"}
        </button>
      ),
    },
  ];
};
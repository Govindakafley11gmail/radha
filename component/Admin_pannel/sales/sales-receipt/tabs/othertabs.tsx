/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/common-component/duplicateCustomdialog";
import { Delete, Edit, File, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { useDownloadFile } from "@/component/download-tanstack/download-tanstack";
import { generateSaleReceipt, useGetSaleReceipt } from "../tanstack";
import { Receipt } from "../interface/interface";
import { Column, DataTable } from "@/component/table";

export default function OtherComponentTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [editingAccountType, setEditingAccountType] =
  //   useState<SupplierData | null>(null);
  // const [selected, setSelected] = useState<SupplierData[]>([]);
  // const [rowValues, setRowValues] = useState<Partial<SupplierData>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: SaleReceiptData,
    isLoading: isSaleReceiptLoading,
  } = useGetSaleReceipt();
  const SaleReceiptGetData = SaleReceiptData?.data || [];

  const filteredData: Receipt[] = useMemo(() => {
    if (!SaleReceiptGetData) return [];

    if (!searchQuery.trim()) return SaleReceiptGetData;

    const query = searchQuery.toLowerCase();
    return SaleReceiptGetData.filter(
      (ReceiptGetData) =>
        ReceiptGetData.amount_received.toLowerCase().includes(query) ||
        ReceiptGetData.receipt_number.toLowerCase().includes(query) 
    );
  }, [SaleReceiptGetData, searchQuery]);

//   const { mutate: downloadMou, isPending: isDownloading } = useDownloadFile();
    const { mutate: generateReceipt, isPending: isGenerating } = useDownloadFile();


  const columns: Column<Receipt>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Receipt Number",
      render: (_, row) => row.receipt_number || "-",
    },
    {
      header: "Received Date",
      render: (_, row) => row.receipt_date || "-",
    },
    {
      header: "Amount Received",
      render: (_, row) => row.amount_received|| "-",
    },
    {
      header: "Payment Method",
      render: (_, row) => row.payment_method || "-",
    },
    {
      header: "Status",
      render: (_, row) => row?.status || "-",
    },

     {
      header: "Actions",
      render: (_, row) => (
        <button
          onClick={() => generateReceipt(generateSaleReceipt(row.id))}
          disabled={isGenerating}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate Receipt"}
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen w-full p-4">
      {/* Header with Search + Create Button */}
      <div className="flex justify-between items-center gap-4 pb-3">
        {/* Search input */}
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        pageSize={10}
      />

      {Array.isArray(filteredData) &&
        filteredData.length === 0 &&
        searchQuery && (
          <div className="text-center py-8 text-gray-500">
            No Account Type found matching &ldquo;{searchQuery}&ldquo;
          </div>
        )}
    </div>
  );
}

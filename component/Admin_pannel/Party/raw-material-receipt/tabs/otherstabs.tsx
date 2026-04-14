/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Input } from "@/common-component/duplicateCustomdialog";
import { Search } from "lucide-react";
import { useDownloadFile } from "@/component/download-tanstack/download-tanstack";
import {
  downloadInvoiceFile,
  generateMaterialReceipt,
} from "../tanstack-function";
import { useRawMaterialReceiptData } from "../OthersTabsComponent/hook/useMaterialReceipts";
import { useRawMaterialReceiptColumns } from "../OthersTabsComponent/hook/useRawMaterialReceipts";
import RawMaterialReceiptTable from "../OthersTabsComponent/component/raw-materials-receipt-table";
import useRawMaterialReceiptActions from "../OthersTabsComponent/hook/useRawMaterialsReceipt";
import type { RawMaterialReceipt } from "../interface";

export default function OtherComponentTab() {
  const { searchQuery, setSearchQuery, filteredData } =
    useRawMaterialReceiptData();

  const { mutate: downloadMou} = useDownloadFile();
  const { mutate: generateReceipt } =
    useDownloadFile();

  const columns = useRawMaterialReceiptColumns({
    data: filteredData,
    
  });
   const { getActions } = useRawMaterialReceiptActions({
    downloadMou: (row: RawMaterialReceipt) => {
      downloadMou(downloadInvoiceFile(row.id));
    },
    generateReceipt: (row: RawMaterialReceipt) => {
      generateReceipt(generateMaterialReceipt(row.id));
    },
  });


  return (
    <div className="min-h-screen w-full p-6">
      {/* Search */}
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
        </div>{" "}
      </div>

      <RawMaterialReceiptTable data={filteredData} columns={columns}  actions={getActions()} />
 

      {/* Empty State */}
      {filteredData.length === 0 && searchQuery && (
        <div className="text-center py-8 text-gray-500">
          No results found for “{searchQuery}”
        </div>
      )}
    </div>
  );
}

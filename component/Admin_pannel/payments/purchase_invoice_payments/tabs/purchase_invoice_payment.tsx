/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DataTable } from "@/component/table";
import { VerticalModalForm } from "@/component/ModalForm";
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { useGetPurchaseInvoicePayment } from "../tanstack-function";
import { SupplierandInvoiceDataAttributes } from "../interface";
import { useDownloadFile } from "@/component/download-tanstack/download-tanstack";
import { downloadInvoiceFile, generateMaterialReceipt } from "@/component/Admin_pannel/Party/raw-material-receipt/tanstack-function";
import { TopPuchaseInvoicePaymentFieldsForms } from "../dataform";
import { usePurchaseInvoicePayements } from "../PurchaseInvoicePaymentsComponent/hooks/usePurchaseInvoicePayements";
import { usePurchaseInvoicePaymentsColumn } from "../PurchaseInvoicePaymentsComponent/hooks/usePurchaseInvoicePaymentsColumn";
import { usePurchaseInvoicePaymentsActions } from "../PurchaseInvoicePaymentsComponent/hooks/useTableAction";
import PurchaseInovicePaymentsDetails from "../PurchaseInvoicePaymentsComponent/PurchaseInovicePaymentsDetails";
import { usePurchaseInvoicePaymentSubmit } from "../PurchaseInvoicePaymentsComponent/hooks/usePurchaseInvoicePaymentSubmit";

// Separate component for Purchase Invoices Tab
export default function PurchaseInvoicesPaymentTab() {
  const [selected, setSelected] = useState<SupplierandInvoiceDataAttributes[]>(
    [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<SupplierandInvoiceDataAttributes | null>(null);
  //   //getData
  const { data: PurchaseInvoicePaymentData } = useGetPurchaseInvoicePayment();
  const PurchaseInvoicePaymentGetData =
    PurchaseInvoicePaymentData?.data.data || [];
  const { searchQuery, setSearchQuery, filteredData } =
    usePurchaseInvoicePayements(PurchaseInvoicePaymentGetData);
  const { mutate: downloadMou, isPending: isDownloading } = useDownloadFile();


    const { mutate: generateReceipt, isPending: isGenerating } =
    useDownloadFile();

  const { handleSubmit: handleCreateSubmit } = usePurchaseInvoicePaymentSubmit(
    selectedRow as any,
    () => setIsModalOpen(false),
  );

  const columns = usePurchaseInvoicePaymentsColumn(filteredData);
  const { getActions } = usePurchaseInvoicePaymentsActions({
    handleDownload: (row) => {
      downloadMou(downloadInvoiceFile(row.rawMaterialReceipt.id));
    },
    generateReceipt: (row) => {
      generateReceipt(generateMaterialReceipt(row.id));
    },
  });

  return (
    <>
      {/* Header with Search */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
          <Input
            type="text"
            placeholder="Search by Invoice No or CID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={columns.filter((col) => col.header !== "Download File")} // Remove download column
        actions={getActions()} // Add actions dropdown
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsModalOpen(true);
        }}
        selectable
        onSelectionChange={setSelected}
        // pageSize={100}
      />

      {Array.isArray(filteredData) &&
        filteredData.length === 0 &&
        searchQuery && (
          <div className="text-center py-8 text-gray-500">
            No invoices found matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}

      <VerticalModalForm
        title="Purchase Invoice Payment"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedRow && (
          <PurchaseInovicePaymentsDetails data={selectedRow.supplier as any} />
        )}

        <DynamicArrayForm
          title="Invoice Form"
          topFields={TopPuchaseInvoicePaymentFieldsForms}
          initialValues={{
            amount: selectedRow?.amount || 0,
            paymentMode: selectedRow?.rawMaterialReceipt.paymentMode || "",
          }}
          buttonTitle="Submit"
          onSubmit={handleCreateSubmit}
        />
      </VerticalModalForm>
    </>
  );
}

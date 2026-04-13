/* eslint-disable @typescript-eslint/no-explicit-any */
// components/PurchaseInvoicesTab.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { DataTable } from "@/component/table";
import { VerticalModalForm } from "@/component/ModalForm";
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { showToast } from "nextjs-toast-notify";

import { useGetPuchaseInvoice } from "../../invoice/tanstack-form";
import { useRawMaterialReceiptMutations } from "../tanstack-function";

import { TopMaterialsFieldsForms } from "../dataform";
import SupplierDetails from "../PurchaseInoviceComponents/Components/SupplierDetails";
import { usePurchaseInvoices } from "../PurchaseInoviceComponents/hooks/usePurchaseInvoice";
import { usePurchaseInvoiceColumns } from "../PurchaseInoviceComponents/hooks/usePurchaseInvoiceColumns";
import { buildReceiptFormData } from "../PurchaseInoviceComponents/services/handleCreateReciept";

export default function PurchaseInvoicesTab() {
  const { data } = useGetPuchaseInvoice();
  const invoiceData = data?.data || [];

  const {
    searchQuery,
    setSearchQuery,
    filteredData,
    selectedRow,
    setSelectedRow,
    isModalOpen,
    setIsModalOpen,
  } = usePurchaseInvoices(invoiceData);

  const columns = usePurchaseInvoiceColumns(filteredData);

  const { createRawMaterialReceipt } = useRawMaterialReceiptMutations({
    onSuccess: (res) => {
      showToast.success(res.message);
      setIsModalOpen(false);
    },
    onError: (err) => {
      showToast.error(err?.data?.message || "Error");
    },
  });

  const handleSubmit = (values: Record<string, any>) => {
    if (!selectedRow) return;

    const formData = buildReceiptFormData(values, selectedRow);
    createRawMaterialReceipt(formData);
  };

  return (
    <>
      {/* Search */}
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

      {/* Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsModalOpen(true);
        }}
      />

      {/* Modal */}
      <VerticalModalForm
        title="Raw Material Receipt"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedRow && <SupplierDetails data={selectedRow.supplier as any} />}

        <DynamicArrayForm
                    topContainerClassName="grid grid-cols-2 md:grid-cols-7 gap-x-4 gap-y-4 p-4 rounded-xl border border-gray-200 bg-gray-50/50"

          title="Invoice Form"
          topFields={TopMaterialsFieldsForms}
          initialValues={{
            total_cost: selectedRow?.finalCost || 0,
            received_date: selectedRow?.invoiceDate || "",
          }}
          onSubmit={handleSubmit}
          buttonTitle="Submit"
        />
      </VerticalModalForm>
    </>
  );
}

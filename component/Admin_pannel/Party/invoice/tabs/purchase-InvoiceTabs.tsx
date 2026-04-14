/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useDownloadMou, useSuppliersMutations } from "../../Supplier/tanstack";
import { useSupplierData } from "../hooks/useSupplierData";
import { showToast } from "nextjs-toast-notify";
import SupplierDialog from "../../Supplier/components/supplierDialog";
import SupplierHeader from "../../Supplier/components/SupplierHeader";
import { buildSupplierFormData } from "../../Supplier/utils/supplierFormData";
import InvoiceModal from "../components/InvoiceModal";
import SupplierTable from "../components/SupplierTable";
import type { SupplierData } from "../../Supplier/interface";



export default function PurchaseInvoiceTabs() {
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState<SupplierData | null>(null);
  const [editingAccountType, setEditingAccountType] =
    useState<SupplierData | null>(null);

  const {
    suppliers,
    filteredSuppliers,
    searchQuery,
    setSearchQuery,
    productTypeOptions,
    dynamicBottomInvoiceForm,
  } = useSupplierData();

  const { mutate: downloadMou } = useDownloadMou();

  const {
    createSuppliers,
    updateSuppliers,
    deleteSuppliers,
  } = useSuppliersMutations({
    onSuccess: (data) => {
      showToast.success(data.message);
      setIsSupplierFormOpen(false);
    },
    onError: (error) => {
      showToast.error(error?.data?.message || "Error");
    },
  });

  // ================================
  // HANDLERS
  // ================================


  const handleDeleteSupplier = (row: SupplierData) => {
    if (!row?.supplier_id) return;
    deleteSuppliers(row.supplier_id);
  };

  const handleDownloadSupplier = (row: SupplierData) => {
    if (!row?.supplier_id) return;
    downloadMou(row.supplier_id);
  };

  const handleAddPurchase = (row: SupplierData) => {
    setSelectedRow(row);
    setIsInvoiceOpen(true);
  };

  // ================================
  // UI
  // ================================

  return (
    <div className="min-h-screen w-full p-6">

      {/* HEADER */}
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreate={() => {
          setEditingAccountType(null);
          setIsSupplierFormOpen(true);
        }}
        // buttonTitle="Create Supplier"
      />


      {/* TABLE */}
      <SupplierTable
        data={filteredSuppliers}
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsInvoiceOpen(true);
        }}
        onDownload={handleDownloadSupplier}
        onAddPurchase={handleAddPurchase}
        onDeleteSupplier={handleDeleteSupplier}
      />

      {/* INVOICE MODAL */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        selectedRow={selectedRow}
        productTypeOptions={productTypeOptions}
        dynamicBottomInvoiceForm={dynamicBottomInvoiceForm}
      />
    </div>
  );
}
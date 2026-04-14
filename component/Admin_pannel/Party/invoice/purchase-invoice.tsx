/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import SupplierTable from "./components/SupplierTable";
import InvoiceModal from "./components/InvoiceModal";

import { useSupplierData } from "./hooks/useSupplierData";

import { SupplierData } from "../Supplier/interface";
import SupplierHeader from "../Supplier/components/SupplierHeader";
import SupplierDialog from "../Supplier/components/supplierDialog";
import { buildSupplierFormData } from "../Supplier/utils/supplierFormData";
import { useSuppliersMutations } from "../Supplier/tanstack";
import { showToast } from "nextjs-toast-notify";

// ⚠️ make sure this exists in your project
import { useDownloadMou } from "../Supplier/tanstack";

export default function PurchaseInvoicePage() {
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

  const handleSubmit = (values: any) => {
    const formData = buildSupplierFormData(values);

    if (editingAccountType?.supplier_id) {
      updateSuppliers({
        id: editingAccountType.supplier_id,
        data: formData,
      });
    } else {
      createSuppliers(formData);
    }
  };

  const handleEditSupplier = (row: SupplierData) => {
    setEditingAccountType(row);
    setIsSupplierFormOpen(true);
  };

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
        buttonTitle="Create Supplier"
      />

      {/* SUPPLIER FORM MODAL */}
      <SupplierDialog
        isOpen={isSupplierFormOpen}
        onClose={() => {
          setIsSupplierFormOpen(false);
          setEditingAccountType(null);
        }}
        onSubmit={handleSubmit}
        editingData={editingAccountType}
        onCreate={() => {
          setEditingAccountType(null);
          setIsSupplierFormOpen(true);
        }}
      />

      {/* TABLE */}
      <SupplierTable
        data={filteredSuppliers}
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsInvoiceOpen(true);
        }}
        onEdit={handleEditSupplier}
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
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { showToast } from "nextjs-toast-notify";

import SupplierHeader from "./components/SupplierHeader";

import {
  useGetsuppliers,
  useSuppliersMutations,
  useDownloadMou,
} from "./tanstack";
import { SupplierData } from "./interface";
import { useSupplierTable } from "./hooks/useSupplierTable";
import { buildSupplierFormData } from "./utils/supplierFormData";
import type { Column } from "@/component/table";
import { useSupplierActions } from "./hooks/useSupplierAction";
import SupplierTable from "./components/supplierTable";
import SupplierDialog from "./components/supplierDialog";
export default function SupplierComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccountType, setEditingAccountType] =
    useState<SupplierData | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [rowValues, setRowValues] = useState<any>({});
  const [selected, setSelected] = useState<SupplierData[]>([]);
  // API
  const { data } = useGetsuppliers();
  const suppliers = data?.data || [];

  const { searchQuery, setSearchQuery, filteredData } =
    useSupplierTable(suppliers);

  const { mutate: downloadMou } = useDownloadMou();

  const { createSuppliers, updateSuppliers, deleteSuppliers } =
    useSuppliersMutations({
      onSuccess: (data) => {
        showToast.success(data.message);
        setIsDialogOpen(false);
      },
      onError: (error) => {
        showToast.error(error?.data?.message || "Error");
      },
    });

  // actions
  const { getActions } = useSupplierActions({
    editingRowId,
    handleEdit: (row) => {
      setEditingAccountType(row);
      setIsDialogOpen(true);
    },
    handleDelete: (row) => deleteSuppliers(row.supplier_id),
    handleSave: () => {
      if (!rowValues.supplier_id) return;
      updateSuppliers({
        id: rowValues.supplier_id,
        data: buildSupplierFormData(rowValues),
      });
      setEditingRowId(null);
    },
    handleCancel: () => {
      setEditingRowId(null);
      setRowValues({});
    },
  });

  const handleSubmit = (values: any) => {
    const formData = buildSupplierFormData(values);

    if (editingAccountType?.supplier_id) {
      updateSuppliers({ id: editingAccountType.supplier_id, data: formData });
    } else {
      createSuppliers(formData);
    }
  };

  const columns = useMemo<Column<SupplierData>[]>(
    () => [
      { header: "Name", accessor: "name" as keyof SupplierData },
      { header: "Phone No", accessor: "phone_no" as keyof SupplierData },
      { header: "Email", accessor: "email" as keyof SupplierData },
      { header: "CID", accessor: "cidNo" as keyof SupplierData },
    ],
    [],
  );

  return (
    <div className="p-6">
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreate={() => setIsDialogOpen(true)}
        buttonTitle="Create Supplier"
      />
      <SupplierDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingAccountType(null); // reset on close
        }}
        onSubmit={handleSubmit}
        editingData={editingAccountType}
        onCreate={() => {
          setEditingAccountType(null); // ✅ empty form
          setIsDialogOpen(true); // open dialog
        }}
      />

      <SupplierTable
        data={filteredData}
        columns={columns}
        actions={getActions()}
        onSelectionChange={setSelected}
        downloadMou={downloadMou}
        onRowClick={(row) => {
          setEditingAccountType(row);
          setIsDialogOpen(true);
        }}
      />

      {filteredData.length === 0 && searchQuery && (
        <div className="text-center text-gray-500">
          No results for &ldquo;{searchQuery}&rdquo;
        </div>
      )}
    </div>
  );
}

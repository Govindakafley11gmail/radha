/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useGetWIPInventory, useWIPInventoryMutations } from "./tanstack";
import { useWIPInventoryTable } from "./services/useWIPInventoryTable";
import SupplierHeader from "@/component/Admin_pannel/Party/Supplier/components/SupplierHeader";
import WIPInventoryDialog from "./component/wip-inventory-dialogbox";
import {
  WIPInventoryData,
} from "./interface";
import { useWIPInventoryActions } from "./hooks/wip-inventory-actions";
import { showToast } from "nextjs-toast-notify";
import WIPInventoryTable from "./component/wip-inventory-table";
import { usePurchaseInvoicePaymentsColumn } from "./services/useWIPInventoryColumn";
import { buildPayload } from "./data/buildPayloadFormData";

export default function WIPInventoryComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWIPInventory, setEditingWIPInventory] =
    useState<WIPInventoryData | null>(null);
  const [selected, setSelected] = useState<WIPInventoryData[]>([]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  // ✅ Fetch
  const { data, isLoading } = useGetWIPInventory();
  // ✅ Correct API structure
  const wipInventoryList = data?.data || [];
  // ✅ Search/filter
  const { searchQuery, setSearchQuery, filteredData } =
    useWIPInventoryTable(wipInventoryList);
  // ✅ Mutations
  const { createWIPInventory, updateWIPInventory, deleteWIPInventory } =
    useWIPInventoryMutations({
      onSuccess: (data) => {
        showToast.success(data.message);
        setIsDialogOpen(false);
      },
      onError: (error) => {
        showToast.error(error?.data?.message || "Error");
      },
    });
  // ✅ Actions
  const { getActions } = useWIPInventoryActions({
    editingRowId,
    handleEdit: (row) => {
      setEditingWIPInventory(row);
      setEditingRowId(row.id);
      setIsDialogOpen(true);
    },

    handleDelete: (row) => {
      deleteWIPInventory(row.id);
    },

    handleSave: (row) => {
      updateWIPInventory({
        id: row.id,
        data: buildPayload(row), // ✅ FIXED
      });
      setEditingRowId(null);
    },

    handleCancel: () => {
      setEditingRowId(null);
    },
  });
  // ✅ Columns outside JSX
  const columns = usePurchaseInvoicePaymentsColumn(filteredData);
  return (
    <div className="min-h-screen w-full p-6">
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreate={() => {
          setEditingWIPInventory(null);
          setIsDialogOpen(true);
        }}
        buttonTitle="Create WIP Inventory"
      />
      <WIPInventoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={() => {}}
        onCreate={() => {
          setEditingWIPInventory(null);
          setIsDialogOpen(true);
        }}
      />
      <WIPInventoryTable
        data={filteredData}
        columns={columns}
        actions={getActions()}
        onSelectionChange={setSelected}
        onRowClick={(row) => {
          setEditingWIPInventory(row);
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
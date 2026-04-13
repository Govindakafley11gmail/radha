/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useGetWIPInventory, useWIPInventoryMutations } from "./tanstack";
import { useWIPInventoryTable } from "./services/useWIPInventoryTable";
import SupplierHeader from "@/component/Admin_pannel/Party/Supplier/components/SupplierHeader";
import WIPInventoryDialog from "./component/wip-inventory-dialogbox";
import {
  WIPInventoryData,
  type WIPInventoryPostDataAttributes,
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
  const [editingRowId, setEditingRowId] = useState<string | null>(null);

  const { data } = useGetWIPInventory();
  const wipInventoryList = data?.data || [];

  const { searchQuery, setSearchQuery, filteredData } =
    useWIPInventoryTable(wipInventoryList);

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

  // ✅ MAIN EDIT LOGIC (THIS IS KEY)
  const handleEdit = (row: WIPInventoryData) => {
    setEditingWIPInventory(row); // store selected row
    setEditingRowId(row.id);
    setIsDialogOpen(true); // open dialog
  };

  const { getActions } = useWIPInventoryActions({
    editingRowId,
    handleEdit,
    handleDelete: (row) =>{
       const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the role "${row.batch.batchNumber}"? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteWIPInventory(row.id);
    },
  });

  const onSubmit = (values: any) => {
    const cleanedValues = {
      ...values,
      batchId:
        values.batchId && values.batchId !== "undefined"
          ? values.batchId
          : null, // ✅ IMPORTANT
      quantity: Number(values.quantity),
      cost: Number(values.cost),
    };
    if (editingWIPInventory) {
      updateWIPInventory({
        id: editingWIPInventory.id,
        data: buildPayload(cleanedValues),
      });
    } else {
      createWIPInventory(cleanedValues as WIPInventoryPostDataAttributes);
    }
  };

  const columns = usePurchaseInvoicePaymentsColumn(filteredData);

  return (
    <div className="min-h-screen w-full p-6">
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreate={() => {
          setEditingWIPInventory(null); // reset
          setIsDialogOpen(true);
        }}
        buttonTitle="Create WIP Inventory"
      />

      {/* ✅ PASS editingData */}
      <WIPInventoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSubmit}
        editingData={
          editingWIPInventory
            ? {
                batchId: editingWIPInventory.batch?.id ?? "", // ✅ FIX 1
                quantity: editingWIPInventory.quantity ?? 0, // ✅ SAFE
                cost: Number(editingWIPInventory.cost ?? 0), // ✅ FIX 2
              }
            : null
        }
        onCreate={() => {
          setEditingWIPInventory(null);
          setIsDialogOpen(true);
        }}
      />

      <WIPInventoryTable
        data={filteredData}
        columns={columns}
        actions={getActions()}
      />
    </div>
  );
}

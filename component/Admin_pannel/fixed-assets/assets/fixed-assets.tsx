/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

import SupplierHeader from "@/component/Admin_pannel/Party/Supplier/components/SupplierHeader";

import { showToast } from "nextjs-toast-notify";
import {
  useFixedAssetsDataAttributes,
  useFixedAssetsMutations,
} from "./tanstack";
import type {
  FixedAssetFormAttributes,
  FixedAssetsDataAttributes,
} from "./interface";
import { useFixedAssetsTable } from "./hooks/useFixedAssetsTable";
import { useFixedAssetsActions } from "./hooks/fixed-assets-actions";
import { buildPayloadFixedAssets } from "./dataform/buildPayloadFixedAssets";
import { usePurchaseInvoicePaymentsColumn } from "./hooks/useFixedTableColums";
import FixedAssetsDialog from "./components/fixed-assets-dialogbox";
import FixedAssetsTable from "./components/fixed-assets-table";

export default function FixedAssetsComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFixedAssets, setEditingFixedAsset] =
    useState<FixedAssetsDataAttributes | null>(null);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);

  const { data } = useFixedAssetsDataAttributes();
  const fixedAssetsList = data?.data || [];

  const { searchQuery, setSearchQuery, filteredData } =
    useFixedAssetsTable(fixedAssetsList);

  const { createFixedAssets, updateFixedAssets, deleteFixedAssets } =
    useFixedAssetsMutations({
      onSuccess: (data) => {
        showToast.success(data.message);
        setIsDialogOpen(false);
      },
      onError: (error) => {
        showToast.error(error?.data?.message || "Error");
      },
    });

  // ✅ MAIN EDIT LOGIC (THIS IS KEY)
  const handleEdit = (row: FixedAssetsDataAttributes) => {
    setEditingFixedAsset(row); // store selected row
    setEditingRowId(row.id);
    setIsDialogOpen(true); // open dialog
  };

  const { getActions } = useFixedAssetsActions({
    editingRowId,
    handleEdit,
    handleDelete: (row) => {
      const confirmed = window.confirm(
        `⚠️ Are you sure you want to delete the role "${row.assetName}"? This action cannot be undone.`,
      );

      if (!confirmed) return;
      deleteFixedAssets(row.id);
    },
  });

  const onSubmit = (values: any) => {
    
    if (editingFixedAssets) {
      updateFixedAssets({
        id: editingFixedAssets.id,
        data: buildPayloadFixedAssets(values),
      });
    } else {
      createFixedAssets(values as FixedAssetFormAttributes);
    }
  };

  const columns = usePurchaseInvoicePaymentsColumn(filteredData);

  return (
    <div className="min-h-screen w-full p-6">
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreate={() => {
          setEditingFixedAsset(null); // reset
          setIsDialogOpen(true);
        }}
        buttonTitle="Create Fixed Assets"
      />

      {/* ✅ PASS editingData */}
      <FixedAssetsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSubmit}
        editingData={
          editingFixedAssets
            ? {
                assetName: editingFixedAssets.assetName ?? "", // ✅ FIX 1
                assetCode: editingFixedAssets.assetCode ?? "", // ✅ FIX 3
                purchaseCost: Number(editingFixedAssets.purchaseCost ?? 0),
                gst: Number(editingFixedAssets.gst ?? 0),
                purchaseDate: editingFixedAssets.purchaseDate ?? "",
              }
            : null
        }
        onCreate={() => {
          setEditingFixedAsset(null);
          setIsDialogOpen(true);
        }}
      />

      <FixedAssetsTable
        data={filteredData}
        columns={columns}
        actions={getActions()}
      />
    </div>
  );
}

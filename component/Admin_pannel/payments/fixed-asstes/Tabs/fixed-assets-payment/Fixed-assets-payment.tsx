/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

import SupplierHeader from "@/component/Admin_pannel/Party/Supplier/components/SupplierHeader";

import { showToast } from "nextjs-toast-notify";
import type { FixedAssetsPaymentDataAttributes } from "./interface";
import {
  useFixedAssetPaymentMutations,
  useGetFixedAssetPayment,
} from "./tanstack";
import { useFixedAssetsPaymentTable } from "./hooks/useFixedAssetTable";
import FixedAssetsPaymentDialog from "./components/FixedAssetsDialog";
import FixedAssetsPaymentTable from "./components/fixed-assets-payment";
import { useFixedAssetsPaymentsColumn } from "./hooks/useFixedAssetPaymentTable";

export default function FixedAssetsPaymentComponentTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFixedAssetsPayment, setEditingFixedAssetPayment] =
    useState<FixedAssetsPaymentDataAttributes | null>(null);

  const { data } = useGetFixedAssetPayment();
  const fixedAssetsList = data?.data || [];

  const { searchQuery, setSearchQuery, filteredData } =
    useFixedAssetsPaymentTable(fixedAssetsList);

  const { createFixedAssetPayment } = useFixedAssetPaymentMutations({
    onSuccess: (data) => {
      showToast.success(data.message);
      setIsDialogOpen(false);
    },
    onError: (error) => {
      showToast.error(error?.data?.message || "Error");
    },
  });

  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      paymentId: editingFixedAssetsPayment?.id,
      assertId: editingFixedAssetsPayment?.asset.id,
      // include ID for updates
    };
    createFixedAssetPayment(payload);
  };

  const columns = useFixedAssetsPaymentsColumn(filteredData);

  return (
    <div className="min-h-screen w-full p-6">
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* ✅ PASS editingData */}
      <FixedAssetsPaymentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSubmit}
        onCreate={() => {
          setEditingFixedAssetPayment(null);
          setIsDialogOpen(true);
        }}
      />

      <FixedAssetsPaymentTable
        data={filteredData}
        columns={columns}
        onRowClick={(row) => {
          setIsDialogOpen(true);
          setEditingFixedAssetPayment(row);
        }}
      />
    </div>
  );
}

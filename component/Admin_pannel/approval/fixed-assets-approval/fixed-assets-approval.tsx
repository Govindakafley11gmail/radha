/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

import SupplierHeader from "@/component/Admin_pannel/Party/Supplier/components/SupplierHeader";
import type { FixedAssetsDataAttributes } from "../../fixed-assets/assets/interface";
import { useFixedAssetsDataAttributes } from "../../fixed-assets/assets/tanstack";
import { useFixedAssetsTable } from "../../fixed-assets/assets/hooks/useFixedAssetsTable";
import { usePurchaseInvoicePaymentsColumn } from "../../fixed-assets/assets/hooks/useFixedTableColums";
import FixedAssetsTable from "../../fixed-assets/assets/components/fixed-assets-table";
import { VerticalModalForm } from "@/component/ModalForm";
import { ActionButton } from "@/component/Button";
import { CheckCircle, XCircle } from "lucide-react";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import { FixedAssetsApprovalItemData } from "./data";
import { useFixedAssetsApprovalMutations } from "./tanstack";
import { showToast } from "nextjs-toast-notify";

export default function FixedAssetsApprovalComponent() {
  const [editingFixedAssets, setEditingFixedAsset] =
    useState<FixedAssetsDataAttributes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useFixedAssetsDataAttributes();
  const fixedAssetsList = data?.data || [];

  const { searchQuery, setSearchQuery, filteredData } =
    useFixedAssetsTable(fixedAssetsList);
  const { updateFixedAssetsApproval, isLoading } =
    useFixedAssetsApprovalMutations({
      onSuccess: (data: any) => {
        showToast.success(data.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
        setIsModalOpen(false);
      },
      onError: (error: any) => {
        showToast.error(error?.data?.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
      },
    });
  const handleApproved = () => {
    if (!editingFixedAssets) {
      console.error("No row selected");
      return;
    }

    const FixedAssetsID = editingFixedAssets.id; // ✅ keep as string

    const confirmed = window.confirm(
      `⚠️ Are you sure you want to approve this invoice? This action cannot be undone.`,
    );
    if (!confirmed) return;

    updateFixedAssetsApproval({ id: FixedAssetsID }); // pass string
  };

  // Delete function
  const handleReject = () => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the role "? This action cannot be undone.`,
    );
  };
  const columns = usePurchaseInvoicePaymentsColumn(filteredData);

  return (
    <div className="min-h-screen w-full p-6">
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* ✅ PASS editingData */}

      <FixedAssetsTable
        data={filteredData}
        columns={columns}
        onRowClick={(row) => {
          setEditingFixedAsset(row);
          setIsModalOpen(true);
        }}
      />
      <VerticalModalForm
        title="Fixed Asset Approval"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {editingFixedAssets && (
          <>
            <DisplayForm
              title="Payment / Receipt Details"
              data={editingFixedAssets}
              fields={FixedAssetsApprovalItemData}
            />
          </>
        )}

        <div className="flex gap-4 mt-4">
          <ActionButton
            label="Verified"
            type="submit"
            variant="verified"
            onClick={handleApproved}
            icon={<CheckCircle size={18} />}
          />

          <ActionButton
            onClick={handleReject}
            label="Rejected"
            type="submit"
            variant="rejected"
            icon={<XCircle size={18} />}
          />
        </div>
      </VerticalModalForm>
    </div>
  );
}

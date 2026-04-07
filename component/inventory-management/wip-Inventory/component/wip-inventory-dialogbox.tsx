/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomDialog } from "@/common-component/customDialogbox";
import type { WIPInventoryPostDataAttributes } from "../interface";
import { WIPInventoryFields } from "../data";
import { useGetProductionBatch } from "@/component/Admin_pannel/production/production-batch/tanstck-function";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  editingData?: WIPInventoryPostDataAttributes | null;
  onCreate: () => void;
};

export default function WIPInventoryDialog({
  isOpen,
  onClose,
  onSubmit,
  editingData,
}: Props) {
  const { data: ProductionBatch, isLoading: isProductionBatchLoading } =
    useGetProductionBatch();

  const batchOptions = useMemo(
    () =>
      (ProductionBatch?.data || []).map((batch: any) => ({
        label: batch.batchNumber,
        value: batch.id,
      })),
    [ProductionBatch],
  );

  // Update the batchId field options in WIPInventoryFields
  const fieldsWithAccountGroup = useMemo(() => {
    return WIPInventoryFields.map((field) =>
      field.name === "batchId" ? { ...field, options: batchOptions } : field,
    );
  }, [batchOptions]);

  const defaultValues = editingData
    ? {
        batchId: editingData.batchId,
        quantity: editingData.quantity,
        cost: editingData.cost,
      }
    : {
        batchId: "",
        quantity: "",
        cost: "",
      };

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title={editingData ? "Edit WIP Inventory" : "Create WIP Inventory"}
      fields={fieldsWithAccountGroup}
      onSubmit={onSubmit}
      OnSubmitTitle={editingData ? "Update" : "Create"}
      defaultValues={defaultValues}
    />
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomDialog } from "@/common-component/customDialogbox";
import { FixedAssetsFields } from "../dataform";
import type { FixedAssetFormAttributes } from "../interface";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  editingData?: FixedAssetFormAttributes | null;
  onCreate: () => void;
};

export default function FixedAssetsDialog({
  isOpen,
  onClose,
  onSubmit,
  editingData,
}: Props) {
 

  const defaultValues = editingData
    ? {
        assetName: editingData.assetName,
        assetCode: editingData.assetCode,
        purchaseCost: editingData.purchaseCost,
        purchaseDate: editingData.purchaseDate,
        gst: editingData.gst,
      }
    : {
        assetName: "",
        assetCode: "",
        purchaseCost: "",
        purchaseDate: "",
        gst: "",
      };

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title={editingData ? "Edit Fixed Asset" : "Create Fixed Asset"}
      fields={FixedAssetsFields}
      onSubmit={onSubmit}
      OnSubmitTitle={editingData ? "Update" : "Create"}
      defaultValues={defaultValues}
      CustomDialogBoxStyle="px-8 py-6 grid grid-cols-2 md:grid-cols-3 gap-5 overflow-y-auto flex-1"
    />
  );
}

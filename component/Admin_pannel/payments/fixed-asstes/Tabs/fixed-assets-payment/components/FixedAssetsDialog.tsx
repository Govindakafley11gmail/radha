/* eslint-disable @typescript-eslint/no-explicit-any */

import { CustomDialog } from "@/common-component/customDialogbox";
import { FixedAssetsPaymentFields } from "../data";
import type { FixedAssetsPaymentDataAttributes } from "../interface";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  editingData?: FixedAssetsPaymentDataAttributes | null;
  onCreate: () => void;
};

export default function FixedAssetsPaymentDialog({
  isOpen,
  onClose,
  onSubmit,
  editingData,
}: Props) {
 

  const defaultValues = editingData
    ? {
        paymentId: editingData.id,
        assertId: editingData.asset.id,
        amount: Number(editingData.amount ?? 0),
        paymentDate: editingData.paymentDate,
        paymentMode: editingData.paymentMode,
        description: editingData.description,
      }
    : {
        paymentId: "",
        assertId: "",
        amount: "",
        paymentDate: "",
        paymentMode: "",
        description: "",
      };

  return (
    <CustomDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Fixed Asset Payment"
      fields={FixedAssetsPaymentFields}
      onSubmit={onSubmit}
      OnSubmitTitle="Create Fixed Asset Payment"
      defaultValues={defaultValues}
      CustomDialogBoxStyle="px-8 py-6 grid grid-cols-2 md:grid-cols-3 gap-5 overflow-y-auto flex-1"
    />
  );
}

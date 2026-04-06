/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomBroadDialogBox } from "../../../../../common-component/duplicateCustomdialog";

import { SupplierData } from "../interface";
import { Suplierfields } from "../dataform";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  editingData?: SupplierData | null;
  onCreate: () => void;
};

export default function SupplierDialog({
  isOpen,
  onClose,
  onSubmit,
  editingData,
}: Props) {
  
  const defaultValues = editingData
    ? {
        name: editingData.name,
        phone_no: editingData.phone_no,
        email: editingData.email,
        gender: editingData.gender ?? "",
        nationality: editingData.nationality ?? "",
        cidNo: editingData.cidNo ?? "",
        status: editingData.status ?? "",
        paymentTerms: editingData.paymentTerms ?? "",
        mouDate: editingData.mouDate ?? "",
        expireDate: editingData.expireDate ?? "",
        mouFile: editingData.mouFile,
      }
    : {
        name: "",
        phone_no: "",
        email: "",
        gender: "",
        nationality: "",
        cidNo: "",
        status: "",
        paymentTerms: "",
        mouDate: "",
        expireDate: "",
        mouFile: null,
      };

  return (
    <CustomBroadDialogBox
      isOpen={isOpen}
      onClose={onClose}
      title={editingData ? "Edit Supplier" : "Create Supplier"}
      fields={Suplierfields}
      onSubmit={onSubmit}
      OnSubmitTitle={editingData ? "Update" : "Create"}
      defaultValues={defaultValues}
    />
  );
}

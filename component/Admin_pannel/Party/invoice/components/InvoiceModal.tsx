/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerticalModalForm } from "@/component/ModalForm";




import { SupplierData } from "../../Supplier/interface";
import SupplierDetails from "./SupplierDetails";
import InvoiceForm from "./InvoiceForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedRow: SupplierData | null;
  supplierOptions: any[];
  productTypeOptions: any[];
  dynamicBottomInvoiceForm: any[];
};

export default function InvoiceModal({
  isOpen,
  onClose,
  selectedRow,
  supplierOptions,
  productTypeOptions,
  dynamicBottomInvoiceForm,
}: Props) {
  return (
    <VerticalModalForm isOpen={isOpen} onClose={onClose}>

      {/* Supplier info */}
      {selectedRow && (
        <SupplierDetails data={selectedRow} />
      )}

      {/* Invoice Form */}
      <InvoiceForm
        selectedRow={selectedRow}
        supplierOptions={supplierOptions}
        productTypeOptions={productTypeOptions}
        dynamicBottomInvoiceForm={dynamicBottomInvoiceForm}
        onClose={onClose}
      />

    </VerticalModalForm>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { TopInvoiceForms } from "../dataform";

import { useInvoiceSubmit } from "../hooks/useInvoiceForm";
type Props = {
  selectedRow: any;
  supplierOptions: any[];
  productTypeOptions: any[];
  dynamicBottomInvoiceForm: any[];
    onClose?: () => void;

};

export default function InvoiceForm({
  selectedRow,
  supplierOptions,
  productTypeOptions,
  dynamicBottomInvoiceForm,
  onClose
}: Props) {
  const { handleSubmit } = useInvoiceSubmit(selectedRow, onClose);

  return (
    <DynamicArrayForm
      title="Invoice Form"
      topFields={TopInvoiceForms}
      arrayFieldName="details"
      arrayFields={dynamicBottomInvoiceForm}
      initialValues={{
        invoiceNo: "",
        invoiceDate: "",
        details: [
          {
            productCode: "",
            productType: "",
            size: "",
            quantity: 0,
            price: 0,
            total: 0,
            taxAmount: 0,
          },
        ],
      }}
      onSubmit={handleSubmit}
      buttonTitle="Submit"
      
    />
  );
}
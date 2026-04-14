/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { TopInvoiceForms } from "../dataform";

import { useInvoiceSubmit } from "../hooks/useInvoiceForm";
type Props = {
  selectedRow: any;
  productTypeOptions: any[];
  dynamicBottomInvoiceForm: any[];
    onClose?: () => void;

};

export default function InvoiceForm({
  selectedRow,
 productTypeOptions,
  dynamicBottomInvoiceForm,
  onClose
}: Props) {
  const { handleSubmit } = useInvoiceSubmit(selectedRow, onClose);
const updatedFields = dynamicBottomInvoiceForm.map((field) => {
  if (field.name === "productType") {
    return {
      ...field,
      options: productTypeOptions, // ✅ inject here
    };
  }
  return field;
});
  return (
    <DynamicArrayForm
      title="Invoice Form"
      topFields={TopInvoiceForms}
      arrayFieldName="details"
      arrayFields={updatedFields}
      topContainerClassName="grid grid-cols-2 md:grid-cols-8 gap-x-4 gap-y-4 p-4 rounded-xl border border-gray-200 bg-gray-50/50"
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
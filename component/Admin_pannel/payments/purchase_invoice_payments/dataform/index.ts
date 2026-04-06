import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";

export const TopPuchaseInvoicePaymentFieldsForms: FieldConfig[] = [
  {
    name: "amount",
    label: "Amount",
    type: "number",
    disabled: true,
  },
 
  {
    name: "paymentMode",
    label: "Payment Mode",
    type: "text", // ← new field
    disabled: true,
  },
   {
    name: "paymentDate",
    label: "Payment Date",
    type: "date",
    validation: Yup.date().required("Payment Date is required"),
  },


  {
    name: "referenceNumber",
    label: "Reference Number",
    type: "text",
    validation: Yup.string().required("Reference Number is required"),
  },
    {
    name: "description",
    label: "Description",
    type: "textarea", // ← new field
    validation: Yup.string().required("Description is required"),
  },
];

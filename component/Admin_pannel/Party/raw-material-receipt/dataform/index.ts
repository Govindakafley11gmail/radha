import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";
const paymentModeOptions = [
  { label: "Bank", value: "Bank" },
  { label: "Other", value: "Other" },
  { label: "United Kingdom", value: "UK" },
  { label: "Australia", value: "AU" },
];

export const TopMaterialsFieldsForms: FieldConfig[] = [
  {
    name: "total_cost",
    label: "Total Cost",
    type: "text",
    disabled: true,
  },
  {
    name: "received_date",
    label: "Received Date",
    type: "date",
    disabled: true,
  },
  {
    name: "accountNo",
    label: "Account No",
    type: "number", // ← new field
    validation: Yup.number().required("Account No is required"),
  },

  {
    name: "paymentMode",
    label: "Payment Mode",
    type: "select", // ← new field
    validation: Yup.string().required("Payment Mode is required"),
    options: paymentModeOptions,
  },
  {
    name: "payment_remarks",
    label: "Payment Remarks",
    type: "text",
    validation: Yup.string().required("Payment Remarks is required"),
  },

  {
    name: "documentPath",
    label: "Document",
    type: "image", // ← new field
  },
];

import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";
const paymentModeOptions = [
  { label: "Bank", value: "BANK" },
  { label: "Cash", value: "CASH" },
  { label: "Cheque", value: "CHEQUE" },
  { label: "Online", value: "ONLINE" },
];
const StatusOption = [
  { label: "Draft", value: "DRAFT" },
  { label: "posted", value: "Other" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const TopSalesInvoiceFieldsForms: FieldConfig[] = [
  {
    name: "receipt_date",
    label: "Receipt Date",
    type: "date",
    validation: Yup.date().required("Account No is required"),
  },

  {
    name: "payment_method",
    label: "Payment Mode",
    type: "select", // ← new field
    validation: Yup.string().required("Payment Mode is required"),
    options: paymentModeOptions,
  },
  {
    name: "status",
    label: "Status",
    type: "select", // ← new field
    validation: Yup.string().required("status is required"),
    options: StatusOption,
  },
];

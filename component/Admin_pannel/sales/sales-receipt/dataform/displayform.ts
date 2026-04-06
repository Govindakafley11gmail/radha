import { FieldConfig } from "@/common-component/DisplayFormForm";



export const invoiceFields:FieldConfig[] = [
  { name: "invoiceNumber", label: "Invoice Number", type: "text" },
  { name: "invoiceDate", label: "Invoice Date", type: "text" },
  { name: "dueDate", label: "Due Date", type: "text" },
  { name: "totalAmount", label: "Total Amount", type: "text" },
  { name: "taxAmount", label: "Tax Amount", type: "text" },
  { name: "status", label: "Status", type: "text" },
];


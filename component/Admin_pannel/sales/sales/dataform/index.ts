import { FieldConfig } from "@/common-component/Dynamic_Array_Form";

export const TopSaleInvoiceFieldsForms: FieldConfig[] = [
  {
    name: "invoiceNumber",
    label: "Invoice Number",
    type: "text",
  },
  {
    name: "productionDate",
    label: "Invoice Date",
    type: "date",
  },
  {
    name: "dueDate",
    label: "Due Date",
    type: "date",
  },
  {
    name: "totalAmount",
    label: "Total Amount",
    type: "number", // ← new field
    calc: { sum: ["total"] },
  },
  {
    name: "taxAmount",
    label: "Tax Amount",
    type: "number", // ← new field
    calc: { sum: ["taxAmount"] },
  },
];

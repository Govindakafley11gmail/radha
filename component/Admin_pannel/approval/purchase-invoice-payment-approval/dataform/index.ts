import { FieldConfig } from "@/common-component/DisplayFormForm";

export const SupplierDetailsData: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "phone_no", label: "Phone No", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "cidNo", label: "CID Number", type: "text" },
  { name: "gender", label: "Gender", type: "text" },
  { name: "nationality", label: "Nationality", type: "text" },
  { name: "status", label: "Status", type: "text" },
  { name: "paymentTerms", label: "Payment Terms", type: "text" },
];

export const PurchaseInvoiceDetailsData: FieldConfig[] = [
  { name: "invoiceNo", label: "Invoice No", type: "text" },
  { name: "materialTypes", label: "Material Type", type: "text" },
  { name: "invoiceDate", label: "Invoice Date", type: "text" },
  { name: "freightCost", label: "Freight Cost", type: "text" },
  { name: "importDuty", label: "Import Duty", type: "text" },
  { name: "scrapCost", label: "Scrap Cost", type: "text" },
  { name: "materialCost", label: "Material Cost", type: "text" },
  { name: "otherCharges", label: "Other Charges", type: "text" },
  { name: "taxAmount", label: "Tax Amount", type: "text" },
  { name: "finalCost", label: "Final Cost", type: "text" },
  { name: "status", label: "Status", type: "text" },
  { name: "description", label: "Description", type: "text" },
];

export const PurchaseInvoiceItemData: FieldConfig[] = [
  {
    name: "productCode",
    label: "Product Code",
    type: "text",
  },
  {
    name: "productType",
    label: "Product Type",
    type: "text",
  },
  { name: "size", label: "Size", type: "text" },
  { name: "quantity", label: "Quantity", type: "text" },
  { name: "price", label: "Price", type: "text" },
  { name: "taxAmount", label: "Tax Amount", type: "text" },
  { name: "total", label: "Total", type: "text" },
];
export const PaymentAndReceiptDetailsData: FieldConfig[] = [
  { name: "receipt_no", label: "Receipt No", type: "text" },
  {
    name: "payment_remarks",
    label: "Payment Remarks",
    type: "text",
  },
  { name: "received_date", label: "Received Date", type: "text" },
];

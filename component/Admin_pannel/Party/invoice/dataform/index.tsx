/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";

const countryOptions = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];
 const MaterTypesOption = [
  { label: "New", value: "NEW" },
  { label: "old", value: "OLD" },
  { label: "Other", value: "OTHER" },
  // { label: "Australia", value: "AU" },
];
export const TopInvoiceForms: FieldConfig[] = [

  {
    name: "invoiceNo",
    label: "Invoice #",
    type: "text",
    validation: Yup.string().required("Invoice number is required"),
  },
  

  {
    name: "invoiceDate",
    label: "Invoice Date",
    type: "date",
    validation: Yup.date().required("Date is required"),
  },
  {
    name: "freightCost",
    label: "Freight Cost",
    type: "number",
    calc: { sum: ["freightCost"] }, // <-- sum of all bottom row freightCost

    validation: Yup.number().required("Freight Cost is required"),
  },
  {
    name: "GStTaxAmount",
    label: "GST Tax Amount",
    type: "number",
    calc: { sum: ["taxAmount"] },
    validation: Yup.number().required("GST Tax Amount is required"),
  },
  {
    name: "importDuty",
    label: "Import Duty",
    type: "number",
    validation: Yup.number().required("Import Duty is required"),
  },
  {
    name: "totalAmount",
    label: "Total Amount",
    type: "number",
    calc: { sum: ["total"] }, // sum of all row-level `total` fields
    validation: Yup.number().required("Total Amount is required"),
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    validation: Yup.string().required("Description is required"),
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: countryOptions,
  },
   {
      name: "materialTypes",
      label: "material Types",
      type: "select",
      options: MaterTypesOption,
    },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { FieldConfig } from "@/common-component/Dynamic_Array_Form";

export const getInvoiceFields = (
  productTypeOptions: any[]
): FieldConfig[] => [
  {
    name: "productCode",
    label: "Product Code",
    type: "text",
    validation: Yup.string().required("Product Code is required"),
  },
  {
    name: "productType",
    label: "Product Type",
    type: "select",
    storeLabel: true,
    options: productTypeOptions,
  },
  {
    name: "size",
    label: "Size",
    type: "text",
    validation: Yup.string().required("Size is Required"),
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    validation: Yup.number().min(0).required("Required"),
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "number",
    validation: Yup.number().min(0).required("Required"),
  },
  {
    name: "total",
    label: "Total",
    type: "number",
    calc: { multiply: ["price", "quantity"] },
    validation: Yup.number().min(0).required("Total is Required"),
  },
  {
    name: "taxAmount",
    label: "Tax Amount",
    type: "number",
    calc: { percentageOf: "total" },
    validation: Yup.number().min(0).required("Tax Amount is Required"),
  },
  {
    name: "freightCost",
    label: "Freight Cost",
    type: "number",
    validation: Yup.number().required("Freight Cost is required"),
  },
];
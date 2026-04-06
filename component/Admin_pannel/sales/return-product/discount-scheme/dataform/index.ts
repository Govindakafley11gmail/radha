import * as Yup from "yup";
import { RollerCoaster } from "lucide-react";
import { PermssionForm } from "@/component/Admin_pannel/permission/interface";
const ProductTypeOption = [
  { label: "PLYWOOD", value: "PLYWOOD" },
  { label: "posted", value: "Other" },
  { label: "Cancelled", value: "CANCELLED" },
];
export const DiscountSchemeFields: PermssionForm[] = [
  {
    name: "product_type",
    label: "Product Type",
    type: "select",
    options: ProductTypeOption,
  },
  {
    name: "discount_type",
    label: "Discount Type",
    type: "select",
    options: [
      { label: "percentage", value: "PERCENTAGE" },
      { label: "Fixed", value: "FIXED" },
    ],
  },
  {
    name: "value",
    label: "Value",
    type: "number",
    placeholder: "Enter your Value",
    validation: Yup.number().required("Value is required"),
    Icon: RollerCoaster,
  },
  {
    name: "valid_from",
    label: "Valid From",
    type: "date",
    validation: Yup.date().required("Valid From is required"),
  },
  {
    name: "valid_to",
    label: "Valid To",
    type: "date",
    validation: Yup.date().required("Valid To is required"),
  },
];

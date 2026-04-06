import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";

const ProductTypeOption = [
  { label: "PLYWOOD", value: "PLYWOOD" },
  { label: "posted", value: "Other" },
  { label: "Cancelled", value: "CANCELLED" },
];

export const TopPriceListFieldsForms: FieldConfig[] = [
  {
    name: "product_type",
    label: "Product Type",
    type: "select", // ← new field
    validation: Yup.string().required("status is required"),
    options: ProductTypeOption,
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
    validation: Yup.number().min(0, "Min 0").required("Required"),
  },
 

];

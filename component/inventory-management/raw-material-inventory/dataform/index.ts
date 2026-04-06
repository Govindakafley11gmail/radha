// machine-cost-fields.ts
import { FieldConfig } from "@/common-component/customDialogbox";
import * as Yup from "yup";
const   ValuationMethodOptions = [
  { label: "FIFO", value: "FIFO" },
  { label: "LIFO", value: "LIFO" },
  { label: "Weighted Average", value: "Weighted Average" },
];

export const RawMaterialInventoryFields = (
  RawMaterialOptions: { label: string; value: string }[],
): FieldConfig[] => [
  {
    name: "raw_material_id",
    label: "Raw Material",
    type: "select",
    options: RawMaterialOptions,
    validation: Yup.string().required("Raw Material is required"),
  },

  {
    name: "quantity_on_hand",
    label: "Quantity On Hand",
    type: "number",
    validation: Yup.number().min(1, "Quantity on hand must be at least 1"),
  },
   {
    name: "value",
    label: "value",
    type: "number",
    validation: Yup.number().min(1, "value must be at least 1"),
  },
    {
    name: "value",
    label: "value",
    type: "number",
    validation: Yup.number().min(1, "value must be at least 1"),
  },
   {
    name: "valuation_method",
    label: "Valuation Method",
    type: "select",
    options: ValuationMethodOptions,
    validation: Yup.string().required("Valuation Method is required"),
  },
  
    {
    name: "reorder_level",
    label: "Reorder Level",
    type: "number",
    validation: Yup.number().min(1, "Reorder level must be at least 1"),
  },
];

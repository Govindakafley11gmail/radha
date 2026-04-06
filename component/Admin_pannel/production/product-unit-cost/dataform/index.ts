// machine-cost-fields.ts
import * as Yup from "yup";
import {
  IceCream2,
  IceCreamBowlIcon,
  RollerCoaster,
  Settings2,
} from "lucide-react";
import { FieldConfig } from "@/common-component/customDialogbox";


export const ProductionPerUnitCostFields = (
  batchOptions: { label: string; value: string }[]
): FieldConfig[] => [
  {
    name: "batchId",
    label: "Batch",
    type: "select",
    options: batchOptions,
  },
  
  {
    name: "costPerKg",
    label: "Cost Per Kg",
    type: "number",
    placeholder: "Enter your Cost Per Kg",
    validation: Yup.number().required("Cost Per Kg is required"),
   
  },
  {
    name: "costPerBox",
    label: "Cost Per Box",
    type: "number",
    placeholder: "Enter your Cost Per Box",
    validation: Yup.number().required("Cost Per Box is required"),
   
  },
  {
    name: "costPerNail",
    label: "Cost Per Nail",
    type: "number",
    placeholder: "Enter your Cost Per Nail",
    validation: Yup.number().required("Cost Per Nail is required"),
   
  },
  {
    name: "processCuttingCost",
    label: "Process Cutting Cost",
    type: "number",
    placeholder: "Enter your Process Cutting Cost",
    validation: Yup.number().required("Process Cutting Cost is required"),
   
  },
  {
    name: "processHeadingCost",
    label: "Process Heading Cost",
    type: "number",
    placeholder: "Enter your Process Heading Cost",
    validation: Yup.number().required("Process Heading Cost is required"),
   
  },
  {
    name: "processPolishingCost",
    label: "Process Polishing Cost",
    type: "number",
    placeholder: "Enter your Process Polishing Cost",
    validation: Yup.number().required("Process Polishing Cost is required"),
   
  },
  {
    name: "processPackingCost",
    label: "Process Packing Cost",
    type: "number",
    placeholder: "Enter your Process Packing Cost",
    validation: Yup.number().required("Process Packing Cost is required"),
   
  },
  
];

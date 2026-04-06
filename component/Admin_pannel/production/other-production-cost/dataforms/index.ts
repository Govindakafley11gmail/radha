// machine-cost-fields.ts
import * as Yup from "yup";
import {
  IceCream2,
  IceCreamBowlIcon,
  RollerCoaster,
  Settings2,
} from "lucide-react";
import { FieldConfig } from "@/common-component/customDialogbox";
const costTypeOptions = [
  { label: "Rent", value: "RENT" },
  { label: "Utilites", value: "UTILITIES" },
  { label: "Transport", value: "TRANSPORT" },
   { label: "Other", value: "OTHER" },
];

export const OtherProductionCostFields = (
  batchOptions: { label: string; value: string }[]
): FieldConfig[] => [
  {
    name: "batchId",
    label: "Batch",
    type: "select",
    options: batchOptions,
  },
  {
    name: "costType",
    label: "CostType",
    type: "select",
    options: costTypeOptions,
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter your Amount",
    validation: Yup.number().required("Amount is required"),
    Icon: RollerCoaster,
  },
  {
    name: "transactionDate",
    label: "Transaction Date",
    type: "date",
    validation: Yup.date().required("Transaction Date is required"),
  },
];

// machine-cost-fields.ts
import * as Yup from "yup";
import {
  IceCream2,
  IceCreamBowlIcon,
  RollerCoaster,
  Settings2,
} from "lucide-react";
import { FieldConfig } from "@/common-component/customDialogbox";



export const MachineCostFields = (
  machineOptions: { label: string; value: string }[],
  batchOptions: { label: string; value: string }[]
):FieldConfig[]  => [
  {
    name: "machineId",
    label: "Machine",
    type: "select",
    options: machineOptions,
  },
  {
    name: "batchId",
    label: "Batch",
    type: "select",
    options: batchOptions,
  },
    {
    name: "hoursUsed",
    label: "Hours Used",
    type: "number",
    placeholder: "Enter your Hours Used",
    validation: Yup.number().required("Hours Used is required"),
    Icon: RollerCoaster,
  },
  {
    name: "operatingCost",
    label: "Operating Cost",
    type: "number",
    placeholder: "Enter your Operating Cost",
    validation: Yup.number().required("Operating Cost is required"),
    Icon: RollerCoaster,
  },
  {
    name: "maintenanceCost",
    label: "Maintenance Cost",
    type: "number",
    placeholder: "Enter your Maintenance Cost",
    validation: Yup.number().required("Maintenance Cost is required"),
    Icon: Settings2,
  },
  {
    name: "depreciation",
    label: "Depreciation",
    type: "number",
    placeholder: "Enter your Depreciation",
    validation: Yup.number().required("Depreciation is required"),
    Icon: IceCream2,
  },
  {
    name: "powerCost",
    label: "Power Cost",
    type: "number",
    placeholder: "Enter your Power Cost",
    validation: Yup.number().required("Power Cost is required"),
    Icon: IceCreamBowlIcon,
  },
];
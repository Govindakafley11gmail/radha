// machine-cost-fields.ts
import * as Yup from "yup";
import {
  IceCream2,
  IceCreamBowlIcon,
  RollerCoaster,
  Settings2,
} from "lucide-react";
import { FieldConfig } from "@/common-component/customDialogbox";



export const LabourCostFields = (
  LabourOptions: { label: string; value: string }[],
  batchOptions: { label: string; value: string }[]
):FieldConfig[]  => [
  {
    name: "laborId",
    label: "Labour",
    type: "select",
    options: LabourOptions,
  },
  {
    name: "batchId",
    label: "Batch",
    type: "select",
    options: batchOptions,
  },
    {
    name: "hoursWorked",
    label: "Hours Worked",
    type: "number",
    placeholder: "Enter your Hours Worked",
    validation: Yup.number().required("Hours Worked is required"),
    Icon: RollerCoaster,
  },
  {
    name: "hourlyRateSnapshot",
    label: "Hourly Rate Snapshot",
    type: "number",
    placeholder: "Enter your Hourly Rate Snapshot",
    validation: Yup.number().required("Hourly Rate Snapshot is required"),
    Icon: RollerCoaster,
  },
  
];
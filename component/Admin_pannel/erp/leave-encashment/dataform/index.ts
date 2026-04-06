// machine-cost-fields.ts
import { FieldConfig } from "@/common-component/customDialogbox";
import * as Yup from "yup";

export const LeaveEncashmetFields = (
  LeaveEncashmetOptions: { label: string; value: string }[],
): FieldConfig[] => [
  {
    name: "leaveTypeId",
    label: "Leave Type",
    type: "select",
    options: LeaveEncashmetOptions,
    validation: Yup.string().required("Leave Type is required"),
  },

  {
    name: "days",
    label: "Total Days",
    type: "number",
    validation: Yup.number().min(1, "Total days must be at least 1"),
  },
   {
    name: "amount",
    label: "Amount",
    type: "number",
    validation: Yup.number().min(1, "Amount must be at least 1"),
  }
];

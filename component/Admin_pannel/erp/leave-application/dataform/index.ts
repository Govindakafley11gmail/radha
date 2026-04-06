// machine-cost-fields.ts
import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";

export const LeaveApplicationFields = (
  LeaveApplicationOptions: { label: string; value: string }[],
): FieldConfig[] => [
  {
    name: "leaveTypeId",
    label: "Leave Type",
    type: "select",
    options: LeaveApplicationOptions,
    validation: Yup.string().required("Leave Type is required"),
  },

  {
    name: "start_date",
    label: "Start Date",
    type: "date",
    // placeholder: "Enter your Start Date",
    validation: Yup.date().required("Start Date is required"),
  },
  {
    name: "end_date",
    label: "End Date",
    type: "date",
    // placeholder: "Enter your End Date",
    validation: Yup.date().required("End Date is required"),
  },
  {
    name: "total_days",
    label: "Total Days",
    type: "number",
    disabled: true,
    validation: Yup.number().min(1, "Total days must be at least 1"),
  },
  {
    name: "reason",
    label: "Reason",
    type: "text",
    validation: Yup.string().required("Reason is required"),
  },
];

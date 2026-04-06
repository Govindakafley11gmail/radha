import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";
export const TopPayrollForms: FieldConfig[] = [
  {
    name: "payrollDate",
    label: "Payroll Date",
    type: "date",
    validation: Yup.date().required("Date is required"),
  },
  {
    name: "month",
    label: "Month",
    type: "text",
    validation: Yup.string().required("Month is required"),
  },
  {
    name: "year",
    label: "Year",
    type: "number",
    validation: Yup.string().required("Year is required"),
  },
  {
    name: "totalAmount",
    label: "Total Amount",
    type: "number",
    calc: {
      sum: [
        "basicSalary",
        "tds",
        "otherAllowance",
        "providentInterest",
        "housingAllowance",
      ],
    }, // <-- sum of all bottom row freightCost

    validation: Yup.number().required("Freight Cost is required"),
  },
  {
    name: "totalDeduction",
    label: "Total Deduction",
    type: "number",
    calc: {
      sum: ["medical", "tds", "providentInterest"],
    }, // <-- sum of all bottom row freightCost

    validation: Yup.number().required("Freight Cost is required"),
  },
  {
    name: "totalAllowance",
    label: "Total Allowance",
    type: "number",
    calc: {
      sum: ["otherAllowance", "providentInterest", "housingAllowance"],
    }, // <-- sum of all bottom row freightCost

    validation: Yup.number().required("Freight Cost is required"),
  },
];


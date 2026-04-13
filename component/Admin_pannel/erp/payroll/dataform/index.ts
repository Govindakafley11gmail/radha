import { FieldConfig } from "@/common-component/Dynamic_Array_Form";
import * as Yup from "yup";
const months = [
  { label: "January", value: "january" },
  { label: "February", value: "february" },
  { label: "March", value: "march" },
  { label: "April", value: "april" },
  { label: "May", value: "may" },
  { label: "June", value: "june" },
  { label: "July", value: "july" },
  { label: "August", value: "august" },
  { label: "September", value: "september" },
  { label: "October", value: "october" },
  { label: "November", value: "november" },
  { label: "December", value: "december" },
];
const currentYear = new Date().getFullYear();

const years = Array.from({ length: 10 }, (_, i) => {
  const year = currentYear - i;

  return {
    label: year.toString(),
    value: year.toString(),
  };
});
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
    type: "select",
    options: months,
    validation: Yup.string().required("Month is required"),
  },
 {
  name: "year",
  label: "Year",
  type: "select",
  options: years,
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


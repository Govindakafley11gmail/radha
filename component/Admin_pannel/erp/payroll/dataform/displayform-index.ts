import { FieldConfig } from "@/common-component/DisplayFormForm";

// Payroll Summary
export const PayrollSummaryFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "payrollDate", label: "Payroll Date", type: "date" },
  { name: "totalAmount", label: "Total Amount", type: "number" },
  { name: "totalDeduction", label: "Total Deduction", type: "number" },
  { name: "totalAllowance", label: "Total Allowance", type: "number" },
  { name: "month", label: "Month", type: "text" },
  { name: "year", label: "Year", type: "text" },
  { name: "status", label: "Status", type: "text" },
  { name: "remarks", label: "Remarks", type: "text" },
];

// Employee Payroll Details
export const EmployeeDetailsFields: FieldConfig[] = [
  { name: "basicSalary", label: "Basic Salary", type: "number" },
  { name: "allowances", label: "Allowances", type: "number" },
  { name: "deductions", label: "Deductions", type: "number" },
  { name: "netSalary", label: "Net Salary", type: "number" },
  { name: "tds", label: "TDS", type: "number" },
  { name: "medical", label: "Medical", type: "number" },
  { name: "housingAllowance", label: "Housing Allowance", type: "number" },
  { name: "providentFund", label: "Provident Fund", type: "number" },
  { name: "providentInterest", label: "Provident Interest", type: "number" },
];

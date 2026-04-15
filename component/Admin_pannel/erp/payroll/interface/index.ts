/* eslint-disable @typescript-eslint/no-explicit-any */
interface EmployeeDetails {
  employeeId: number;
  basicSalary: number;
  tds: number;
  medical: number;
  otherAllowance: number;
  providentInterest: number;
  housingAllowance: number;
}

export interface PayrollInputFormValues {
  payrollDate: string;
  month: string;
  year: number;
  totalAmount: number;
  totalDeduction: number;
  totalAllowance: number;
  employees: EmployeeDetails[];
}

export interface PayrollCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}
//GET INTERFACE
/* ============================
   Role & Permission Interfaces
============================ */

export interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/* ============================
   Employee Interface
============================ */

export interface Employee {
  id: number;
  name: string;
  email: string;
  password: string;

  roles: Role[];
  permissions: Permission[];

  createdAt: string;
  updatedAt: string;
}

/* ============================
   Payroll Detail (Employee-wise)
============================ */

export interface PayrollDetail {
  id: string; // unique record ID (UUID)
  payrollId: string; // ID of the payroll this record belongs to
  employeeId: number; // employee ID
  basicSalary: string; // base salary as string (e.g., "50000.00")
  housingAllowance: string;
  providentFund: string;
  otherAllowance: string;
  allowances: string;
  deductions: string;
  netSalary: string;
  tds: string;
  medical: string;
  providentInterest: string;
  employee: Employee;
}

/* ============================
   Payroll (Top-Level Object)
============================ */

export interface PayRollData {
  id: string;
  payrollDate: string; // ISO date string
  status: string; // can extend based on possible statuses
  approvedBy: string | null;
  approvedAt: string | null; // ISO date string or null
  remarks: string | null;
  totalAmount: string; // keeping as string to match "-3999000.00" format
  month: string | null;
  year: string | null;
  totalDeduction: string;
  totalAllowance: string;

  details: PayrollDetail[];

  createdAt: string;
  updatedAt: string;
}

/* ============================
   Payroll GET API Response
============================ */

export interface PayrollGetResponse {
  success: boolean;
  message: string;
  data: PayRollData[];
  statusCode: number;
}

export interface PayRollTableRow {
  id: string;           // detail id
  payrollId: string;    // top-level payroll id
  payrollDate: string;
  status: string;
  employeeId: number;
  employeeName: string;
  basicSalary: string;
  tds: string;
  medical: string;
  otherAllowance: string;
  providentInterest: string;
  housingAllowance: string;
  netSalary: string;
  totalAmount: string;
  totalDeduction: string;
  totalAllowance: string;

  month: string | null; // ✅ add this
  year: string | null;  // ✅ add this

  details?: PayrollDetail[]; // optional, in case you need all payroll details
}

export type PayrollEmployeeInput = {
  employeeId: number;
  basicSalary: number;
  tds: number;
  medical: number;
  otherAllowance: number;
  providentInterest: number;
  housingAllowance: number;
};

export type PayrollCreatePayload = {
  payrollDate: string;
  month: string;
  year: number;
  employees: {
    employeeId: number | string;
    basicSalary: number;
    tds: number;
    medical: number;
    otherAllowance: number;
    providentInterest: number;
    housingAllowance: number;
  }[];
};

export type PayrollUpdatePayload = {
  payrollDate: string;
  month: string;
  year: number;
  totalAmount: number;
  totalDeduction: number;
  totalAllowance: number;
  employees: PayrollEmployeeInput[];
};
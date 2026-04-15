/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

export function usePayrollActions({
  createPayRoll,
  updatePayRoll,
}: any) {
  const buildUpdatePayload = (row: any) => ({
    payrollDate: row.payrollDate,
    month: row.month ?? "",
    year: Number(row.year),
    totalAmount: Number(row.totalAmount),
    totalDeduction: Number(row.totalDeduction),
    totalAllowance: Number(row.totalAllowance),
    employees: row.details?.map((d: any) => ({
      employeeId: Number(d.employeeId),
      basicSalary: Number(d.basicSalary),
      tds: Number(d.tds),
      medical: Number(d.medical),
      otherAllowance: Number(d.otherAllowance),
      providentInterest: Number(d.providentInterest),
      housingAllowance: Number(d.housingAllowance),
    })),
  });

  const handleCreateSubmit = (values: any) => {
    const payload = {
      ...values,
      employees: values.employees.map((e: any) => ({
        ...e,
        employeeId: Number(e.employeeId?.value ?? e.employeeId),
      })),
    };

    createPayRoll(payload);
  };

  return {
    buildUpdatePayload,
    handleCreateSubmit,
  };
}
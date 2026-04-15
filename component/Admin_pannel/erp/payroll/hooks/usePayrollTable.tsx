/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
;
import { useAuth } from "@/app/context/AuthContext";
import { useGetPayRoll } from "../tanstack-function";
import type { PayRollTableRow } from "../interface";

export function usePayrollTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: PayRoll } = useGetPayRoll();
  const { user } = useAuth();

  const canVerifyPayroll = useMemo(() => {
    const permissions = user?.permission || [];
    return permissions.some((p: any) => p.name === "verify-payroll");
  }, [user]);

  const tableData: PayRollTableRow[] = useMemo(() => {
    if (!PayRoll?.data) return [];

    return PayRoll.data.flatMap((payroll) =>
      payroll.details.map((detail) => ({
        id: detail.id,
        payrollId: payroll.id,
        payrollDate: payroll.payrollDate,
        status: payroll.status,
        employeeId: detail.employeeId,
        employeeName: detail.employee.name,
        basicSalary: detail.basicSalary,
        tds: detail.tds,
        medical: detail.medical,
        otherAllowance: detail.otherAllowance,
        providentInterest: detail.providentInterest,
        housingAllowance: detail.housingAllowance,
        netSalary: detail.netSalary,
        totalAmount: payroll.totalAmount,
        totalDeduction: payroll.totalDeduction,
        totalAllowance: payroll.totalAllowance,
        month: payroll.month,
        year: payroll.year,
        details: payroll.details,
      })),
    );
  }, [PayRoll]);

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return tableData;

    const q = searchQuery.toLowerCase();

    return tableData.filter(
      (r) =>
        r.payrollDate.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q) ||
        r.employeeName.toLowerCase().includes(q),
    );
  }, [tableData, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    tableData,
    filteredData,
    canVerifyPayroll,
  };
}
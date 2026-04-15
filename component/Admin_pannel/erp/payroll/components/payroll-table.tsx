/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable, Column, ActionConfig } from "@/component/table";
import { Check, X } from "lucide-react";
import type { PayRollTableRow } from "../interface";

type Props = {
  data: PayRollTableRow[];
  filteredData: PayRollTableRow[];
  canVerifyPayroll: boolean;
  onSelect: (rows: PayRollTableRow[]) => void;
  onApprove: (row: PayRollTableRow) => void;
//   onReject: (row: PayRollTableRow) => void;
};

export function PayrollTable({
  data,
  filteredData,
  canVerifyPayroll,
  onSelect,
  onApprove,
//   onReject,
}: Props) {
  // =========================
  // TABLE COLUMNS
  // =========================
  const columns: Column<PayRollTableRow>[] = [
    {
      header: "S.No",
      render: (_, row) =>
        filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Employee Name",
      render: (_, row) => row.employeeName,
    },
    {
      header: "Basic Salary",
      render: (_, row) => row.basicSalary,
    },
    {
      header: "Payroll Date",
      render: (_, row) => row.payrollDate,
    },
    {
      header: "Status",
      render: (_, row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "APPROVED"
              ? "bg-green-100 text-green-800"
              : row.status === "REJECTED"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  // =========================
  // ACTIONS
  // =========================
  const actions: ActionConfig<PayRollTableRow>[] = canVerifyPayroll
    ? [
        {
          label: "Approve",
          icon: <Check className="h-4 w-4 text-green-600" />,
          onClick: onApprove,
        },
        {
          label: "Reject",
          icon: <X className="h-4 w-4 text-red-600" />,
          onClick: ()=>{},
        },
      ]
    : [];

  // =========================
  // RENDER TABLE
  // =========================
  return (
    <DataTable<PayRollTableRow>
      data={data}
      columns={columns}
      actions={actions}
      selectable
      onSelectionChange={onSelect}
      pageSize={10}
    />
  );
}
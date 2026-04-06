/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { VerticalModalForm } from "@/component/ModalForm";
import { showToast } from "nextjs-toast-notify";
import DynamicArrayForm, {
  FieldConfig,
} from "@/common-component/Dynamic_Array_Form";

import * as Yup from "yup";
import { PayRollTableRow, PayrollInputFormValues } from "./interface";
import { useGetPayRoll, usePayRollMutations } from "./tanstack-function";
import { useGetUser } from "../../User/tanstack_function";

import { useAuth } from "@/app/context/AuthContext";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import { TopPayrollForms } from "./dataform";
import {
  EmployeeDetailsFields,
  PayrollSummaryFields,
} from "./dataform/displayform-index";

export default function PayRollComponent() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<PayRollTableRow[]>([]);
  const [selectedRow, setSelectedRow] = useState<PayRollTableRow | null>(null);

  const { data: PayRoll } = useGetPayRoll();
  const { user, isLoading: authLoading } = useAuth();

  const canVerifyPayroll = useMemo(() => {
    if (!user) return false;
    const permissions = user?.permission || [];
    return permissions.some((p: any) => p.name === "verify-payroll") || false;
  }, [user]);

  // Flatten payroll for table rows (one row per employee)
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
        details: payroll.details, // keep all details for editing
      })),
    );
  }, [PayRoll]);

  const filteredData: PayRollTableRow[] = useMemo(() => {
    if (!tableData) return [];
    if (!searchQuery.trim()) return tableData;

    const query = searchQuery.toLowerCase();
    return tableData.filter(
      (row) =>
        row.payrollDate.toLowerCase().includes(query) ||
        row.status.toLowerCase().includes(query) ||
        row.employeeName.toLowerCase().includes(query),
    );
  }, [tableData, searchQuery]);

  const { data: GetUserData } = useGetUser();
  const UserOptions = useMemo(() => {
    const users = GetUserData?.data || [];
    return users.map((item: any) => ({ label: item.name, value: item.id }));
  }, [GetUserData]);

  const dynamicBottomPayRollForm: FieldConfig[] = useMemo(
    () => [
      {
        name: "employeeId",
        label: "Employee Name",
        type: "select",
        storeLabel: true,
        options: UserOptions,
        validation: Yup.object({
          label: Yup.string(),
          value: Yup.string().required("Employee is required"),
        }).required("Employee is required"),
      },
      {
        name: "basicSalary",
        label: "Basic Salary",
        type: "number",
        validation: Yup.number().min(0).required(),
      },
      {
        name: "tds",
        label: "TDS",
        type: "number",
        validation: Yup.number().min(0).required(),
      },
      {
        name: "medical",
        label: "Medical",
        type: "number",
        validation: Yup.number().min(0).required(),
      },
      {
        name: "otherAllowance",
        label: "Other Allowance",
        type: "number",
        validation: Yup.number().min(0).required(),
      },
      {
        name: "providentInterest",
        label: "Provident Interest",
        type: "number",
        validation: Yup.number().min(0).max(100).required(),
      },
      {
        name: "housingAllowance",
        label: "Housing Allowance",
        type: "number",
        validation: Yup.number().min(0).required(),
      },
    ],
    [UserOptions],
  );

  const { createPayRoll, updatePayRoll } = usePayRollMutations({
    onSuccess: (data) => {
      showToast.success(data.message, {
        duration: 5000,
        position: "top-right",
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      showToast.error(error?.data?.message || "Something went wrong", {
        duration: 5000,
        position: "top-right",
      });
    },
  });

  const handleCreateSubmit = (values: PayrollInputFormValues) => {
    const payload = {
      ...values,
      employees: values.employees.map((e: any) => ({
        ...e,
        employeeId: Number(e.employeeId?.value ?? e.employeeId),
      })),
    };
    createPayRoll(payload);
  };

  // Table columns
  const columns: Column<PayRollTableRow>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    { header: "Employee Name", render: (_, row) => row.employeeName },
    { header: "Basic Salary", render: (_, row) => row.basicSalary },
    { header: "Payroll Date", render: (_, row) => row.payrollDate },
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

  // Actions
  const actions: ActionConfig<PayRollTableRow>[] = canVerifyPayroll
    ? [
        {
          label: "Approve",
          icon: (
            <Check className="h-4 w-4 text-green-600 hover:text-green-700" />
          ),
          onClick: (row) => {
            setSelectedRow(row); // ✅ set selected row for modal prefill
            setIsModalOpen(true);
          },
        },
        {
          label: "Reject",
          icon: <X className="h-4 w-4 text-red-600 hover:text-red-700" />,
          onClick: (row) => {
            const confirmed = window.confirm(
              `❌ Reject payroll for "${row.employeeName}"?`,
            );
            if (!confirmed) return;
            // updatePayRoll({ id: row.payrollId, data: { status: "REJECTED" } });
          },
        },
      ]
    : [];

  const buildUpdatePayload = (row: PayRollTableRow) => {
    return {
      payrollDate: row.payrollDate,
    month: row.month ?? "",     
      year:  Number(row.year) ,
      totalAmount: Number(row.totalAmount),
      totalDeduction: Number(row.totalDeduction),
      totalAllowance: Number(row.totalAllowance),

      employees:
        row.details?.map((d) => ({
          employeeId: Number(d.employeeId),
          basicSalary: Number(d.basicSalary),
          tds: Number(d.tds),
          medical: Number(d.medical),
          otherAllowance: Number(d.otherAllowance),
          providentInterest: Number(d.providentInterest),
          housingAllowance: Number(d.housingAllowance),
        })) || [],
    };
  };

  if (authLoading) {
    return (
      <div className="min-h-screen w-full p-6 flex items-center justify-center">
        <div className="text-lg">Loading permissions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6">
      {/* Search + Create Button */}
      <div className="flex justify-between items-center gap-4 pb-3">
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg"
          />
        </div>

        <Button
          onClick={() => {
            setSelectedRow(null); // create mode
            setIsModalOpen(true);
          }}
          className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md"
        >
          Create Payroll
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredData}
        columns={columns}
        actions={actions}
        selectable
        onSelectionChange={(rows) => setSelected(rows)}
        pageSize={10}
      />

      {/* Modal Form */}
      {/* Modal Form */}
      <VerticalModalForm
        title="Payroll"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedRow ? (
          // ✅ View/Edit mode for selected row
          <div className="space-y-2 p-2">
            {/* Payroll Summary */}
            <DisplayForm
              title="Payroll Summary"
              data={{
                ...selectedRow,
                name: selectedRow.details?.[0]?.employee?.name || "",
                email: selectedRow.details?.[0]?.employee?.email || "",
              }}
              fields={PayrollSummaryFields}
            />

            {/* Employee Details */}
            {selectedRow.details?.map((item) => (
              <div
                key={item.id}
                // className="p-4  "
              >
                <DisplayForm
                  title={`Payroll Details - ${item.employee?.name}`}
                  data={{
                    ...item,
                    name: item.employee?.name,
                    email: item.employee?.email,
                  }}
                  fields={EmployeeDetailsFields}
                />
              </div>
            ))}

            {/* Update Button */}
            <div className="flex justify-start mt-6">
              <Button
                className="px-6 py-2.5 h-11 bg-gradient-to-r from-orange-600 to-orange-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-200"
                onClick={() => {
                  if (!selectedRow) return;

                  const payload = buildUpdatePayload(selectedRow);

                  updatePayRoll({
                    id: selectedRow.payrollId,
                    data: payload,
                  });
                }}
              >
                aprrove Payroll
              </Button>
            </div>
          </div>
        ) : (
          // ✅ Create mode (DynamicArrayForm)
          <DynamicArrayForm
            key="create"
            title="Payroll Form"
            arrayFieldName="employees"
            topFields={TopPayrollForms}
            arrayFields={dynamicBottomPayRollForm}
            onSubmit={(values) =>
              handleCreateSubmit(values as PayrollInputFormValues)
            }
            buttonTitle="Create Payroll"
          />
        )}
      </VerticalModalForm>
    </div>
  );
}

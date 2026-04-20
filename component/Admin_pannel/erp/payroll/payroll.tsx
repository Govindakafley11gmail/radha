/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";

import { TopPayrollForms } from "./dataform";
import {
  EmployeeDetailsFields,
  PayrollSummaryFields,
} from "./dataform/displayform-index";
import { PayrollModal } from "./components/payroll-modal";
import { PayrollTable } from "./components/payroll-table";
import { usePayrollActions } from "./hooks/usePayrollActions";
import { usePayrollTable } from "./hooks/usePayrollTable";
import { usePayRollMutations } from "./tanstack-function";
import SupplierHeader from "../../Party/Supplier/components/SupplierHeader";
import type { FieldConfig } from "formik";
import { useGetUser } from "../../User/tanstack_function";
import * as Yup from "yup";

export default function PayRollComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const { searchQuery, setSearchQuery, filteredData, canVerifyPayroll } =
    usePayrollTable();

  const { createPayRoll, updatePayRoll } = usePayRollMutations({});

  const { buildUpdatePayload, handleCreateSubmit } = usePayrollActions({
    createPayRoll,
    updatePayRoll,
  });
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
        validation: Yup.string().required("Employee is required"),
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
  return (
    <div className="min-h-screen w-full p-6">
      {/* Search + Button */}

      {/* HEADER */}
      <SupplierHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreate={() => {
          setIsModalOpen(true);
          // setIsSupplierFormOpen(true);
        }}
        buttonTitle=" Create Payroll"
      />

      {/* Table */}
      <PayrollTable
        data={filteredData}
        filteredData={filteredData}
        canVerifyPayroll={canVerifyPayroll}
        onSelect={() => {}}
        onApprove={(row: any) => {
          setSelectedRow(row);
          setIsModalOpen(true);
        }}
        // onReject={(row: any) => {
        //   updatePayRoll({
        //     id: row.payrollId,

        //   });
        // }}
      />

      {/* Modal */}
      <PayrollModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRow(null);
        }}
        selectedRow={selectedRow}
        onCreate={handleCreateSubmit}
        onUpdate={() => {
          if (!selectedRow) return;
          updatePayRoll({
            id: selectedRow.payrollId,
            data: buildUpdatePayload(selectedRow),
          });
        }}
        PayrollSummaryFields={PayrollSummaryFields}
        EmployeeDetailsFields={EmployeeDetailsFields}
        TopPayrollForms={TopPayrollForms}
        dynamicBottomPayRollForm={dynamicBottomPayRollForm}
      />
    </div>
  );
}

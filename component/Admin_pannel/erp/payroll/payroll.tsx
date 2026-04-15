/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

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
        dynamicBottomPayRollForm={[]}
      />
    </div>
  );
}

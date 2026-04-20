/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerticalModalForm } from "@/component/ModalForm";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { Button } from "@/components/ui/button";
import { ActionButton } from "@/component/Button";
import { CheckCircle, XCircle } from "lucide-react";

export function PayrollModal({
  isOpen,
  onClose,
  selectedRow,
  PayrollSummaryFields,
  EmployeeDetailsFields,
  TopPayrollForms,
  dynamicBottomPayRollForm,
  onCreate,
  onUpdate,
}: any) {
  return (
    <VerticalModalForm title="Payroll" isOpen={isOpen} onClose={onClose}>
      {selectedRow ? (
        <div className="space-y-2 p-2">
          <DisplayForm
            title="Payroll Summary"
            data={selectedRow}
            fields={PayrollSummaryFields}
          />

          {selectedRow.details?.map((item: any) => (
            <DisplayForm
              key={item.id}
              title={`Details - ${item.employee?.name}`}
              data={item}
              fields={EmployeeDetailsFields}
            />
          ))}

          <div className="flex gap-4 mt-4">
            <ActionButton
              label="Verified"
              type="submit"
              variant="verified"
              onClick={onUpdate}
              icon={<CheckCircle size={18} />}
            />

            <ActionButton
              onClick={() => {}}
              label="Rejected"
              type="submit"
              variant="rejected"
              icon={<XCircle size={18} />}
            />
          </div>
        </div>
      ) : (
        <DynamicArrayForm
          topContainerClassName="grid grid-cols-2 md:grid-cols-7 gap-x-4 gap-y-4 p-4 rounded-xl border border-gray-200 bg-gray-50/50"
          title="Payroll Form"
          arrayFieldName="employees"
          topFields={TopPayrollForms}
          arrayFields={dynamicBottomPayRollForm}
          onSubmit={onCreate}
          buttonTitle="Create Payroll"
          // initialValues={{
          //   basicSalary: "",
          //   allowances: "",
          // }}
          ItemTitle="Payroll For Employee"
        />
      )}
    </VerticalModalForm>
  );
}

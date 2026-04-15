/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerticalModalForm } from "@/component/ModalForm";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { Button } from "@/components/ui/button";

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

          <Button onClick={onUpdate}>Approve Payroll</Button>
        </div>
      ) : (
        <DynamicArrayForm
          title="Payroll Form"
          arrayFieldName="employees"
          topFields={TopPayrollForms}
          arrayFields={dynamicBottomPayRollForm}
          onSubmit={onCreate}
          buttonTitle="Create Payroll"
        />
      )}
    </VerticalModalForm>
  );
}
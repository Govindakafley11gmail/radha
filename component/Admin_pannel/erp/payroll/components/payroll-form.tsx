/* eslint-disable @typescript-eslint/no-explicit-any */
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
// import { TopInvoiceForms } from "../dataform";

// import { useInvoiceSubmit } from "../hooks/useInvoiceForm";
type Props = {
  selectedRow: any;
  TopPayrollForms: any[];
  dynamicBottomPayRollForm: any[];
  onClose?: () => void;
};

export default function PayrollForm({
  selectedRow,
  TopPayrollForms,
  dynamicBottomPayRollForm,
  onClose,
}: Props) {
//   const { handleSubmit } = useInvoiceSubmit(selectedRow, onClose);

  return (
    <DynamicArrayForm
      topContainerClassName="grid grid-cols-2 md:grid-cols-7 gap-x-4 gap-y-4 p-4 rounded-xl border border-gray-200 bg-gray-50/50"
      key="create"
      title="Payroll Form"
      arrayFieldName="employees"
      topFields={TopPayrollForms}
      arrayFields={dynamicBottomPayRollForm}
      onSubmit={(values) =>
        console.log(values)
      }
      buttonTitle="Create Payroll"
    />
  );
}

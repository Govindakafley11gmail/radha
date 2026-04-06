/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import * as Yup from "yup";

import { DisplayForm } from "@/common-component/DisplayFormForm";
import DynamicArrayForm, {
} from "@/common-component/Dynamic_Array_Form";
import { VerticalModalForm } from "@/component/ModalForm";
import { TopInvoiceForms } from "../../invoice/dataform";
import { useGetRawMaterialss } from "@/component/Admin_pannel/master/raw-materials/tanstack-function";
import { useGetsuppliers } from "../tanstack";
import { getInvoiceFields } from "../dataform/invoiceFields";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedRow: any;
//   supplierOptions: any;
  handleCreateSubmit: (values: any) => void;
};

export default function SupplierDetailsModal({
  isOpen,
  onClose,
  selectedRow,
//   supplierOptions,
  handleCreateSubmit,
}: Props) {
  // ✅ Hooks FIRST
  const { data: SupplierData } = useGetsuppliers();
  const SupplierGetData = SupplierData?.data || [];

  const { data: RawMeterialData } = useGetRawMaterialss();
  const RawMeterial = RawMeterialData?.data || [];

  // ✅ Product Type Options
  const productTypeOptions = useMemo(() => {
    return RawMeterial.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));
  }, [RawMeterial]);


  const dynamicBottomInvoiceForm = getInvoiceFields(productTypeOptions);

  // ✅ AFTER hooks
  if (!selectedRow) return null;

  return (
    <VerticalModalForm isOpen={isOpen} onClose={onClose} >
      <DisplayForm
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "phone_no", label: "Phone No", type: "text" },
          { name: "email", label: "Email", type: "text" },
          { name: "cidNo", label: "CID Number", type: "text" },
          { name: "status", label: "Status", type: "text" },
          { name: "paymentTerms", label: "Payment Terms", type: "text" },
        ]}
        data={selectedRow}
        title="Supplier Details"
      />

      <DynamicArrayForm
        title="Invoice Form"
        topFields={TopInvoiceForms}
        arrayFieldName="details"
        arrayFields={dynamicBottomInvoiceForm}
        initialValues={{
          invoiceNo: "",
          invoiceDate: "",
          details: [
            {
              productCode: "",
              productType: "",
              size: "",
              quantity: 0,
              price: 0,
              total: 0,
              taxAmount: 0,
            },
          ],
        }}
        onSubmit={handleCreateSubmit}
        buttonTitle="Submit"
      />
    </VerticalModalForm>
  );
}

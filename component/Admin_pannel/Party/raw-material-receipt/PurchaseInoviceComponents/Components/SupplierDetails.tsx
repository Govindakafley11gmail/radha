import { DisplayForm } from "@/common-component/DisplayFormForm";
import type { SupplierData } from "../../../Supplier/interface";

export default function SupplierDetails({ data }: { data: SupplierData }) {
  return (
    <DisplayForm
      fields={[
        { name: "name", label: "Name", type: "text" },
        { name: "phone_no", label: "Phone No", type: "text" },
        { name: "email", label: "Email", type: "text" },
        { name: "cidNo", label: "CID Number", type: "text" },
        { name: "status", label: "Status", type: "text" },
        { name: "paymentTerms", label: "Payment Terms", type: "text" },
      ]}
      data={data}
      title="Supplier Details"
    />
  );
}

import { DisplayForm } from "@/common-component/DisplayFormForm";
import type { SupplierandInvoiceDataAttributes } from "../interface";

export default function PurchaseInovicePaymentsDetails({
  data,
}: {
  data: SupplierandInvoiceDataAttributes;
}) {
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

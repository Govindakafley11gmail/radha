// // configs/supplierFields.ts
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useMemo, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Search, FileText, Package } from "lucide-react";


// import { Column, DataTable } from "@/component/table";
// import { DisplayForm } from "@/common-component/DisplayFormForm";
// import { VerticalModalForm } from "@/component/ModalForm";
// import { showToast } from "nextjs-toast-notify";
// import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
// import { PurchaseInvoice } from "../../invoice/interface";
// import { useGetPuchaseInvoice } from "../../invoice/tanstack-form";
// import { TopMaterialsFieldsForms } from "../dataform";
// import { useRawMaterialReceiptMutations } from "../tanstack-function";

// // Import your other component here
// // import YourOtherComponent from "./YourOtherComponent";

// // Separate component for Purchase Invoices Tab
// export default function PurchaseInvoicesTab() {
//   const [selected, setSelected] = useState<PurchaseInvoice[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRow, setSelectedRow] = useState<PurchaseInvoice | null>(null);
//   //getData
//   const { data: PurchaseInvoiceData, isLoading: isPurchaseInvoiceLoading } =
//     useGetPuchaseInvoice();
//   const SupplierGetData = PurchaseInvoiceData?.data || [];
//   const { createRawMaterialReceipt } = useRawMaterialReceiptMutations({
//     onSuccess: (data) => {
//       showToast.success(data.message, {
//         duration: 5000,
//         position: "top-right",
//         transition: "topBounce",
//         icon: "",
//         sound: true,
//       });
//       setIsModalOpen(false);
//     },
//     onError: (error) => {
//       showToast.error(error?.data?.message || "Something went wrong", {
//         duration: 5000,
//         position: "top-right",
//         transition: "topBounce",
//         icon: "",
//         sound: true,
//       });
//     },
//   });
//   //filtered Data
//   const filteredData: PurchaseInvoice[] = useMemo(() => {
//     if (!SupplierGetData) return [];
//     if (!searchQuery.trim()) return SupplierGetData;

//     const query = searchQuery.toLowerCase();
//     return SupplierGetData.filter(
//       (PurchaseInvoiceData) =>
//         PurchaseInvoiceData.invoiceNo.toLowerCase().includes(query) ||
//         PurchaseInvoiceData.supplier.cidNo.toLowerCase().includes(query)
//     );
//   }, [SupplierGetData, searchQuery]);

//   const columns: Column<PurchaseInvoice>[] = [
//     {
//       header: "S.No",
//       render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
//     },
//     {
//       header: "Name",
//       render: (_, row) => row.supplier?.name || "-",
//     },
//     {
//       header: "Invoice N0#",
//       render: (_, row) => row.invoiceNo || "-",
//     },
//     {
//       header: "Total Cost",
//       render: (_, row) => row.finalCost || "-",
//     },
//     {
//       header: "CID No#",
//       render: (_, row) => row.supplier.cidNo || "-",
//     },
//     {
//       header: "Status",
//       render: (_, row) => row.status || "-",
//     },
//   ];

//   const handleCreateSubmit = (values: Record<string, any>) => {
//     const { items, ...dataWithoutItems } = values;
//     if (!selectedRow) {
//       console.error("No invoice selected");
//       return;
//     }
//           console.log("form data from purchase invoice", dataWithoutItems.documentPath);

//     const formData = new FormData();
//     formData.append("supplier_id", selectedRow?.supplier.supplier_id);
//     formData.append("purchase_invoice_id", selectedRow?.id);
//     formData.append("accountNo", dataWithoutItems.accountNo);
//     formData.append("paymentMode", dataWithoutItems.paymentMode);
//     formData.append("payment_remarks", dataWithoutItems.payment_remarks);
//     formData.append("received_date", dataWithoutItems.received_date);
//     formData.append("total_cost", dataWithoutItems.total_cost);
//      if (Array.isArray(dataWithoutItems.documentPath) && dataWithoutItems.documentPath.length > 0) {
//     // If your backend expects a single file
//     const file = dataWithoutItems.documentPath[0];
//     if (file instanceof File) {
//       formData.append("documentPath", file);
//     }
//   }

    

//     createRawMaterialReceipt(formData);
//   };

//   return (
//     <>
//       {/* Header with Search */}
//       <div className="flex justify-between items-center gap-4">
//         <div className="relative w-1/3">
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//             <Search className="h-5 w-5" />
//           </span>
//           <Input
//             type="text"
//             placeholder="Search by Invoice No or CID..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
//           />
//         </div>
//       </div>

//       <DataTable
//         data={filteredData}
//         columns={columns}
//         onRowClick={(row) => {
//           setSelectedRow(row);
//           setIsModalOpen(true);
//         }}
//         selectable
//         onSelectionChange={setSelected}
//         pageSize={10}
//       />

//       {Array.isArray(filteredData) &&
//         filteredData.length === 0 &&
//         searchQuery && (
//           <div className="text-center py-8 text-gray-500">
//             No invoices found matching &ldquo;{searchQuery}&rdquo;
//           </div>
//         )}

//       <VerticalModalForm
//         title="Raw Material Receipt"
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       >
//         {selectedRow && (
//           <DisplayForm
//             fields={[
//               { name: "name", label: "Name", type: "text" },
//               { name: "phone_no", label: "Phone No", type: "text" },
//               { name: "email", label: "Email", type: "text" },
//               { name: "cidNo", label: "CID Number", type: "text" },
//               { name: "status", label: "Status", type: "text" },
//               { name: "paymentTerms", label: "Payment Terms", type: "text" },
//             ]}
//             data={selectedRow.supplier}
//             title="Supplier Details"
//           />
//         )}

//         <DynamicArrayForm
//           title="Invoice Form"
//           topFields={TopMaterialsFieldsForms}
//           initialValues={{
//             total_cost: selectedRow?.finalCost || 0,
//             received_date: selectedRow?.invoiceDate || "",
//           }}
//           buttonTitle="Submit"
//           onSubmit={handleCreateSubmit}
//         />
//       </VerticalModalForm>
//     </>
//   );
// }

import { DataTable, Column } from "@/component/table";
import { SupplierData } from "../../Supplier/interface";
import { Edit, Download, ShoppingCart, Delete } from "lucide-react";

type Props = {
  data: SupplierData[];
  onRowClick: (row: SupplierData) => void;
  onDownload: (row: SupplierData) => void;
  onAddPurchase: (row: SupplierData) => void;
  onDeleteSupplier: (row: SupplierData) => void;
};

export default function SupplierTable({
  data,

  onDownload,
  onAddPurchase,
}: Props) {
  const columns: Column<SupplierData>[] = [
    {
      header: "S.No",
      render: (_, row) => data.indexOf(row) + 1,
    },
    { header: "Name", accessor: "name" },
    { header: "Phone No", accessor: "phone_no" },
    { header: "Email", accessor: "email" },
    { header: "CID Number", accessor: "cidNo" },
    { header: "Status", render: (_, row) => row.status || "-" },
    { header: "Payment Terms", render: (_, row) => row.paymentTerms || "-" },
  ];

  // =================== Dynamic Actions ===================
  const getActions = () => [

    {
      label: "Add Purchase",
      icon: <ShoppingCart className="h-4 w-4" />,
      onClick: onAddPurchase,
      title: "Add Purchase for Supplier",
    },
    {
      label: "Download",
      icon: <Download className="h-4 w-4" />,
      onClick: onDownload,
      title: "Download MOU for Supplier",
    },
   
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      pageSize={5}
      // onRowClick={onRowClick}
      actions={getActions()} // 👈 IMPORTANT
    />
  );
}

import { DataTable, Column } from "@/component/table";
import { SupplierData } from "../../Supplier/interface";
import { Edit, Download, ShoppingCart, Delete } from "lucide-react";

type Props = {
  data: SupplierData[];
  onRowClick: (row: SupplierData) => void;
  onEdit: (row: SupplierData) => void;
  onDownload: (row: SupplierData) => void;
  onAddPurchase: (row: SupplierData) => void;
  onDeleteSupplier: (row: SupplierData) => void;
};

export default function SupplierTable({
  data,
  onRowClick,
  onEdit,
  onDownload,
  onAddPurchase,
  onDeleteSupplier,
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
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: onEdit,
      title: "Edit Supplier",
    },
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
    {
      label: "Delete",
      icon: <Delete className="h-4 w-4" />,
      onClick: onDeleteSupplier,
      title: "Delete Supplier",
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

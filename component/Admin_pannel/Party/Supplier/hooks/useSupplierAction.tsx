import { ActionConfig } from "@/component/table";
import { SupplierData } from "../interface";
import { Edit, Delete, Save, X, Download } from "lucide-react";

type Props = {
  editingRowId: string | null;
  handleEdit: (row: SupplierData) => void;
  handleDelete: (row: SupplierData) => void;
  onDownload: (row: SupplierData) => void;
  handleSave: () => void;
  handleCancel: () => void;
};

export const useSupplierActions = ({
  editingRowId,
  handleEdit,
  handleDelete,
  handleSave,
  handleCancel,
  onDownload,
}: Props) => {
  const getActions = (): ActionConfig<SupplierData>[] => {
    if (!editingRowId) {
      return [
        {
          label: "Edit",
          icon: <Edit className="h-4 w-4" />,
          onClick: handleEdit,
        },
        {
          label: "Delete",
          icon: <Delete className="h-4 w-4" />,
          onClick: handleDelete,
        },
        {
          label: "Download",
          icon: <Download className="h-4 w-4" />,
          onClick: onDownload,
          title: "Download MOU for Supplier",
        },
      ];
    }

    return [
      {
        label: "Save",
        icon: <Save className="h-4 w-4" />,
        onClick: handleSave,
        show: (row) => row.supplier_id === editingRowId,
      },
      {
        label: "Cancel",
        icon: <X className="h-4 w-4" />,
        onClick: handleCancel,
        show: (row) => row.supplier_id === editingRowId,
      },
    ];
  };

  return { getActions };
};

import { ActionConfig } from "@/component/table";
import { SupplierData } from "../interface";
import { Edit, Delete, Save, X } from "lucide-react";

type Props = {
  editingRowId: string | null;
  handleEdit: (row: SupplierData) => void;
  handleDelete: (row: SupplierData) => void;
  handleSave: () => void;
  handleCancel: () => void;
};

export const useSupplierActions = ({
  editingRowId,
  handleEdit,
  handleDelete,
  handleSave,
  handleCancel,
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
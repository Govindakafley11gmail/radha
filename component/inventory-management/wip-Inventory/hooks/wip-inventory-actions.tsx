import { ActionConfig } from "@/component/table";
import { WIPInventoryData } from "../interface";
import { Edit, Delete, Save, X } from "lucide-react";

type Props = {
  editingRowId: string | null;
  handleEdit: (row: WIPInventoryData) => void;
  handleDelete: (row: WIPInventoryData) => void;
  handleSave: (row: WIPInventoryData) => void;   // ✅ fix
  handleCancel: (row: WIPInventoryData) => void; // ✅ fix
};

export const useWIPInventoryActions = ({
  editingRowId,
  handleEdit,
  handleDelete,
  handleSave,
  handleCancel,
}: Props) => {
  const getActions = (): ActionConfig<WIPInventoryData>[] => {
    if (!editingRowId) {
      return [
        {
          label: "Edit",
          icon: <Edit className="h-4 w-4" />,
          onClick: (row) => handleEdit(row),   // ✅ explicit
        },
        {
          label: "Delete",
          icon: <Delete className="h-4 w-4" />,
          onClick: (row) => handleDelete(row), // ✅ explicit
        },
      ];
    }

    return [
      {
        label: "Save",
        icon: <Save className="h-4 w-4" />,
        onClick: (row) => handleSave(row),     // ✅ fix
        show: (row) => row.id === editingRowId,
      },
      {
        label: "Cancel",
        icon: <X className="h-4 w-4" />,
        onClick: (row) => handleCancel(row),   // ✅ fix
        show: (row) => row.id === editingRowId,
      },
    ];
  };

  return { getActions };
};
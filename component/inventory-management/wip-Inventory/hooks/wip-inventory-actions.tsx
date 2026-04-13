import { ActionConfig } from "@/component/table";
import { WIPInventoryData } from "../interface";
import { Edit, Delete, Save, X } from "lucide-react";

type Props = {
  editingRowId: string | null;
  handleEdit: (row: WIPInventoryData) => void;
  handleDelete: (row: WIPInventoryData) => void;

};

export const useWIPInventoryActions = ({
  handleEdit,
  handleDelete,
}: Props) => {
  const getActions = (): ActionConfig<WIPInventoryData>[] => {
    return [
      {
        label: "Edit",
        icon: <Edit className="h-4 w-4" />,
        onClick: (row) => handleEdit(row),
      },
      {
        label: "Delete",
        icon: <Delete className="h-4 w-4" />,
        onClick: (row) => handleDelete(row),
      },
    ];
  };

  return { getActions };
};
import { ActionConfig } from "@/component/table";
import { Edit, Delete, Save, X } from "lucide-react";
import type { FixedAssetsDataAttributes } from "../interface";

type Props = {
  editingRowId: string | null;
  handleEdit: (row: FixedAssetsDataAttributes) => void;
  handleDelete: (row: FixedAssetsDataAttributes) => void;

};

export const useFixedAssetsActions = ({
  handleEdit,
  handleDelete,
}: Props) => {
  const getActions = (): ActionConfig<FixedAssetsDataAttributes>[] => {
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
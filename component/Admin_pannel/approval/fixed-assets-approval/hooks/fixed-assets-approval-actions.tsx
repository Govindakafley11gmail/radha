import type { FixedAssetsDataAttributes } from "@/component/Admin_pannel/fixed-assets/assets/interface";
import { ActionConfig } from "@/component/table";
import { Edit, Delete, Save, X, TicketPlus } from "lucide-react";

type Props = {
  editingRowId: string | null;
  handleApproved: (row: FixedAssetsDataAttributes) => void;
  handleReject: (row: FixedAssetsDataAttributes) => void;

};

export const useFixedAssetsApprovalActions = ({
  handleApproved,
  handleReject,
}: Props) => {
  const getActions = (): ActionConfig<FixedAssetsDataAttributes>[] => {
    return [
      {
        label: "Approve",
        icon: <TicketPlus className="h-4 w-4" />,
        onClick: (row) => handleApproved(row),
      },
      {
        label: "Reject",
        icon: <X className="h-4 w-4" />,
        onClick: (row) => handleReject(row),
      },
    ];
  };

  return { getActions };
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Download, BookDown } from "lucide-react";
import type { RawMaterialReceipt } from "../../interface";
import type { ActionConfig } from "@/component/table";

type Props = {
  downloadMou: (row: RawMaterialReceipt) => void;
  generateReceipt: (row: RawMaterialReceipt) => void;
};
export default function useRawMaterialReceiptActions({
  downloadMou,
  generateReceipt,
}: Props) {
  const getActions = (): ActionConfig<RawMaterialReceipt>[] => {
    return [
      {
        label: "Download",
        icon: <Download className="h-4 w-4" />,
        onClick: downloadMou,
        title: "Download Mou Document",
      },
      {
        label: "Generate Receipt",
        icon: <BookDown className="h-4 w-4" />,
        onClick: generateReceipt,
        title: "Generate Receipt",
      },
    ];
  };

  return { getActions };
}

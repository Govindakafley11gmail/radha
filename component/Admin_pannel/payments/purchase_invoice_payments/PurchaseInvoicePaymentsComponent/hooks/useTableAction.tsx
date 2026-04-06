import type { ActionConfig } from "@/component/table";
import { Download } from "lucide-react";
import type { SupplierandInvoiceDataAttributes } from "../../interface";

type Props = {
  handleDownload: (row: SupplierandInvoiceDataAttributes) => void;
};

export const usePurchaseInvoicePaymentsActions = ({ handleDownload }: Props) => {
  const getActions = (): ActionConfig<SupplierandInvoiceDataAttributes>[] => {
    return [
      {
        label: "Download",
        icon: <Download className="h-4 w-4" />,
        onClick: handleDownload,
      },
    ];
  };

  return { getActions };
};

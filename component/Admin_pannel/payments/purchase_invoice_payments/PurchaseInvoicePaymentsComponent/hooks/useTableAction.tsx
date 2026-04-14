import type { ActionConfig } from "@/component/table";
import { BookDown, Download } from "lucide-react";
import type { SupplierandInvoiceDataAttributes } from "../../interface";

type Props = {
  handleDownload: (row: SupplierandInvoiceDataAttributes) => void;
  generateReceipt: (row: SupplierandInvoiceDataAttributes) => void;
};

export const usePurchaseInvoicePaymentsActions = ({ handleDownload, generateReceipt }: Props) => {
  const getActions = (): ActionConfig<SupplierandInvoiceDataAttributes>[] => {
    return [
      {
        label: "Download",
        icon: <Download className="h-4 w-4" />,
        onClick: handleDownload,
        title: "Download Invoice Document",
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
};

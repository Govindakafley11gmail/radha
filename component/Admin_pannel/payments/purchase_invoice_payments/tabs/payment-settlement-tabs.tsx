/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/common-component/duplicateCustomdialog";
import { Delete, Edit, File, Search, View } from "lucide-react";
import { useMemo, useState } from "react";

import { ActionConfig, Column, DataTable } from "@/component/table";

import { useDownloadFile } from "@/component/download-tanstack/download-tanstack";
import { useGetPurchaseInvoicePaymentSettlement } from "../tanstack-function";
import { PaymentSettlementInvoiceDataAttributes } from "../interface";

export default function OtherComponentTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: PurchaseInvoiceData, isLoading: isPurchaseInvoiceLoading } =
    useGetPurchaseInvoicePaymentSettlement();
  const PurchaseInvoiceGetData = PurchaseInvoiceData?.data?.data || [];
  console.log("Puchase invoice settlement", PurchaseInvoiceGetData);
  const filteredData: PaymentSettlementInvoiceDataAttributes[] = useMemo(() => {
    if (!PurchaseInvoiceGetData) return [];

    if (!searchQuery.trim()) return PurchaseInvoiceGetData;

    const query = searchQuery.toLowerCase();
    return PurchaseInvoiceGetData.filter(
      (settlement) =>
        settlement.invoice.invoiceNo.toLowerCase().includes(query) ||
        settlement.supplier.name.toLowerCase().includes(query),
    );
  }, [PurchaseInvoiceGetData, searchQuery]);

  const { mutate: downloadMou, isPending: isDownloading } = useDownloadFile();
//   const { mutate: generateReceipt, isPending: isGenerating } =
    useDownloadFile();

  const columns: Column<PaymentSettlementInvoiceDataAttributes>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },

    {
      header: "Supplier Name",
      render: (_, row) => row.supplier?.name || "-",
    },
    {
      header: "Phone Number",
      render: (_, row) => row.supplier?.phone_no || "-",
    },
    {
      header: "Invoice Number",
      render: (_, row) => row.invoice?.invoiceNo || "-",
    },
    {
      header: "Total Amount",
      render: (_, row) => row.amount || "-",
    },
    {
      header: "Total Amount",
      render: (_, row) => row.amount || "-",
    },

 
  ];
  const generateReceipt = (row: PaymentSettlementInvoiceDataAttributes) => {
    setIsDialogOpen(true);
  };

  //Dynamic Button
  const getActions = (): ActionConfig<PaymentSettlementInvoiceDataAttributes>[] => {
    return [
      {
        label: "View",
        icon: <View className="h-4 w-4" />,
        onClick: generateReceipt,
        title: "View Details",
      },
    ];
  };
  return (
    <div className="min-h-screen w-full p-6">
      {/* Header with Search + Create Button */}
      <div className="flex justify-between items-center gap-4 pb-3">
        {/* Search input */}
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>
        {/* <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md"
        >
          Create
        </Button> */}
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        pageSize={10}
        actions={getActions()}
      />

      {Array.isArray(filteredData) &&
        filteredData.length === 0 &&
        searchQuery && (
          <div className="text-center py-8 text-gray-500">
            No Account Type found matching &ldquo;{searchQuery}&ldquo;
          </div>
        )}
    </div>
  );
}

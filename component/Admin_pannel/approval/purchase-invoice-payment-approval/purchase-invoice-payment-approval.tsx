/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataTable, Column, ActionConfig } from "@/component/table";
import { CheckCircle, Download, Search, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  useGetPurachaseInvoicePaymentApproval,
  usePurchaseInvoicePaymentApprovalMutations,
} from "./tanstack-function";
import { dataAttributes } from "./interface";
import { useDownloadFile } from "@/component/download-tanstack/download-tanstack";
import { downloadInvoiceFile } from "../../Party/raw-material-receipt/tanstack-function";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import { VerticalModalForm } from "@/component/ModalForm";
import { ActionButton } from "@/component/Button";
import {
  PaymentAndReceiptDetailsData,
  PurchaseInvoiceDetailsData,
  PurchaseInvoiceItemData,
  SupplierDetailsData,
} from "./dataform";
import { showToast } from "nextjs-toast-notify";
export default function PurchaseInvoicePaymentApproval() {
  const [selected, setSelected] = useState<dataAttributes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<dataAttributes | null>(null);

  //   // Fetch Purachase Invoice payment Approval
  const {
    data: PurachaseInvoicePaymentApprovalData,
    isLoading: isPurachaseInvoicePaymentApprovalLoading,
  } = useGetPurachaseInvoicePaymentApproval();

  //Update
  const { updatePurchaseInvoicePaymentApproval, isLoading } =
    usePurchaseInvoicePaymentApprovalMutations({
      onSuccess: (data: any) => {
        showToast.success(data.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
      setIsModalOpen(false);

      },
      onError: (error: any) => {
        showToast.error(error?.data?.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
      },
    });

  const PurachaseInvoicePaymentApprovalDataGetData =
    PurachaseInvoicePaymentApprovalData?.data || [];

  const filteredData: dataAttributes[] = useMemo(() => {
    if (!PurachaseInvoicePaymentApprovalDataGetData) return [];
    if (!searchQuery.trim()) return PurachaseInvoicePaymentApprovalDataGetData;

    const query = searchQuery.toLowerCase();
    return PurachaseInvoicePaymentApprovalDataGetData.filter(
      (PurachaseInvoicePaymentApprovalData) =>
        PurachaseInvoicePaymentApprovalData.supplier.name
          .toLowerCase()
          .includes(query) ||
        PurachaseInvoicePaymentApprovalData.supplier.cidNo
          .toLowerCase()
          .includes(query) ||
        PurachaseInvoicePaymentApprovalData.supplier.email
          .toLowerCase()
          .includes(query)
    );
  }, [PurachaseInvoicePaymentApprovalDataGetData, searchQuery]);

  const columns: Column<dataAttributes>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      render: (_, row) => row.supplier?.name || "-",
    },
    {
      header: "Email",
      render: (_, row) => row.supplier?.email || "-",
    },
    {
      header: "Total",
      render: (_, row) =>
        row.purchaseInvoice?.purchaseInvoiceDetails?.map((item) => item.total) ||
        "-",
    },
  ];
  const { mutate: downloadMou, isPending: isDownloading } = useDownloadFile();

  const getActions = (): ActionConfig<dataAttributes>[] => {
    return [
      {
        label: "Download",
        icon: <Download className="h-4 w-4" />,
        onClick: (row, event) => {
          event?.stopPropagation(); // ✅ prevent row click
          downloadMou(downloadInvoiceFile(row.id));
        },
      },
    ];
  };
  //   // Edit function - Opens dialog with role data
const handleApproved = () => {
  if (!selectedRow) {
    console.error("No row selected");
    return;
  }

  const invoiceId = selectedRow.id; // ✅ keep as string

  const confirmed = window.confirm(
    `⚠️ Are you sure you want to approve this invoice? This action cannot be undone.`
  );
  if (!confirmed) return;

  updatePurchaseInvoicePaymentApproval({ id: invoiceId }); // pass string
};

  // Delete function
  const handleReject = () => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the role "? This action cannot be undone.`
    );
  };

  return (
    <div className="min-h-screen w-full p-6">
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>
      </div>
      <DataTable
        data={filteredData}
        columns={columns.filter((col) => col.header !== "Download File")} // Remove download column
        actions={getActions()} // Add actions dropdown
        onRowClick={(row) => {
          setSelectedRow(row);
          setIsModalOpen(true);
        }}
        selectable
        onSelectionChange={setSelected}
        pageSize={10}
      />

      {Array.isArray(filteredData) &&
        filteredData.length === 0 &&
        searchQuery && (
          <div className="text-center py-8 text-gray-500">
            No invoices found matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}

      <VerticalModalForm
        title="Purchase Invoice Payment"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedRow && (
          <>
            <DisplayForm
              title="Payment / Receipt Details"
              data={selectedRow}
              fields={PaymentAndReceiptDetailsData}
            />
            <DisplayForm
              title="Supplier Details"
              data={selectedRow.supplier}
              fields={SupplierDetailsData}
            />

            <DisplayForm
              title="Purchase Invoice Details"
              data={selectedRow.purchaseInvoice}
              fields={PurchaseInvoiceDetailsData}
            />
            {selectedRow?.purchaseInvoice?.purchaseInvoiceDetails?.map(
              (item, index) => (
                <DisplayForm
                  key={item.id}
                  title={`Purchase Invoice Item`}
                  data={item}
                  fields={PurchaseInvoiceItemData}
                />
              )
            )}
          </>
        )}

        <div className="flex gap-4 mt-4">
          <ActionButton
            label="Verified"
            type="submit"
            variant="verified"
            onClick={handleApproved}
            icon={<CheckCircle size={18} />}
          />

          <ActionButton
            onClick={handleReject}
            label="Rejected"
            type="submit"
            variant="rejected"
            icon={<XCircle size={18} />}
          />
        </div>
      </VerticalModalForm>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, FileText, Package } from "lucide-react";

import { Column, DataTable } from "@/component/table";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import { VerticalModalForm } from "@/component/ModalForm";
import { showToast } from "nextjs-toast-notify";
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { invoiceFields } from "../../../sales-receipt/dataform/displayform";
import { DataAttributes } from "../../../sales/interface";
import { useGetSaleInvoice } from "../../../sales/tanstack-function";
import { TopPriceListFieldsForms } from "../dataform";
import { PriceListInputFormvalues } from "../interface";
import { usePriceListMutations } from "../tanstack-query";



// Import your other component here
// import YourOtherComponent from "./YourOtherComponent";

// Separate component for Purchase Invoices Tab
export default function PriceListTabsComponent() {
  const [selected, setSelected] = useState<DataAttributes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataAttributes | null>(null);
  //getData
  const { data: SaleInvoiceData, isLoading: isSaleInvoiceLoading } =
    useGetSaleInvoice();
  const SaleInvoiceGetData = SaleInvoiceData?.data || [];
  //getData

    const { createPriceList } = usePriceListMutations({
      onSuccess: (data) => {
        showToast.success(data.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
        setIsModalOpen(false);
      },
      onError: (error) => {
        showToast.error(error?.data?.message || "Something went wrong", {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
      },
    });
  //filtered Data
  const filteredData: DataAttributes[] = useMemo(() => {
    if (!SaleInvoiceGetData) return [];
    if (!searchQuery.trim()) return SaleInvoiceGetData;

    const query = searchQuery.toLowerCase();
    return SaleInvoiceGetData.filter(
      (SaleInvoiceGetDataData) =>
        SaleInvoiceGetDataData.customer.name.toLowerCase().includes(query) ||
        SaleInvoiceGetDataData.customer.identification_no
          .toLowerCase()
          .includes(query)
    );
  }, [SaleInvoiceGetData, searchQuery]);
  const columns: Column<DataAttributes>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      render: (_, row) => row.customer?.name || "-",
    },
    {
      header: "CID No#",
      render: (_, row) => row.customer.identification_no || "-",
    },
    {
      header: "Invoice N0#",
      render: (_, row) => row.invoiceNumber || "-",
    },
    {
      header: "Total Cost",
      render: (_, row) => row.totalAmount || "-",
    },

    {
      header: "Status",
      render: (_, row) => row.status || "-",
    },
  ];

  const handleCreateSubmit = (values: Record<string, any>) => {
   const {items,effective_date,...dataWithoutItems} = values
   const payload={
    sales_invoice_id:selectedRow?.id,
    ...dataWithoutItems
   }
   console.log("Payload",payload)
   createPriceList(payload as PriceListInputFormvalues)
  };

  return (
    <>
      {/* Header with Search */}
      <div className="min-h-screen w-full p-6 bg-gray-50 ">
      <div className="mb-3 gap-4">
        <div className="relative w-1/3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
          <Input
            type="text"
            placeholder="Search by Invoice No or CID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
          />
        </div>
      </div>

      <DataTable
        data={filteredData}
        columns={columns}
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
            No sale invoices found matching &ldquo;{searchQuery}&rdquo;
          </div>
        )}

      <VerticalModalForm
        title="Price List "
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {selectedRow && (
          <>
            <DisplayForm
              fields={[
                { name: "name", label: "Name", type: "text" },
                { name: "phone_no", label: "Phone No", type: "text" },
                { name: "email", label: "Email", type: "text" },
                {
                  name: "identification_no",
                  label: "CID Number",
                  type: "text",
                },
                { name: "credit_limit", label: "Credit Limit", type: "text" },
                { name: "credit_terms", label: "Credit Terms", type: "text" },
              ]}
              data={selectedRow.customer}
              title="Customer Details"
            />
            <DisplayForm
              fields={invoiceFields}
              data={{
                invoiceNumber: selectedRow.invoiceNumber,
                invoiceDate: selectedRow.invoiceDate,
                dueDate: selectedRow.dueDate,
                totalAmount: selectedRow.totalAmount,
                taxAmount: selectedRow.taxAmount,
                status: selectedRow.status,
              }}
              title="Price List Details"
            />
          </>
        )}

        <DynamicArrayForm
          title="Price List Form"
          topFields={TopPriceListFieldsForms}
          initialValues={{
            product_type:"",
            size:"",
            price:0,
            effective_date:""
          }}
          onSubmit={handleCreateSubmit}
          buttonTitle="Submit"
        />
      </VerticalModalForm>
      </div>
    </>
  );
}

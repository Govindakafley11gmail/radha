/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, FileText, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Column, DataTable } from "@/component/table";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import { VerticalModalForm } from "@/component/ModalForm";
import { showToast } from "nextjs-toast-notify";
import DynamicArrayForm, {
  FieldConfig,
} from "@/common-component/Dynamic_Array_Form";
import {
  useGetSaleInvoice,
  useSaleInvoiceMutations,
} from "./tanstack-function";
import { DataAttributes, SaleInvoiceInputValues } from "./interface";
import { TopSaleInvoiceFieldsForms } from "./dataform";
import * as Yup from "yup";
import { useGetRawMaterialss } from "../../master/raw-materials/tanstack-function";

// Separate component for Purchase Invoices Tab
export default function SalesInvoicesComponent() {
  const [selected, setSelected] = useState<DataAttributes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataAttributes | null>(null);
  //getData
  const { data: SaleInvoiceData, isLoading: isSaleInvoiceLoading } =
    useGetSaleInvoice();
  const SaleInvoiceGetData = SaleInvoiceData?.data || [];
  //POST dATA
  const { createSalesInvoice } = useSaleInvoiceMutations({
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
  // Get Raw Materials Data
  const { data: RawMeterialData, isLoading: isFetching } =
    useGetRawMaterialss();
  const RawMeterial = RawMeterialData?.data || [];
  const productTypeOptions = useMemo(() => {
    return RawMeterial.map((item: any) => ({
      label: item.name, // Display name in dropdown
      value: item.id, // Store ID as value
    }));
  }, [RawMeterial]);

  const dynamicBottomInvoiceForm: FieldConfig[] = useMemo(
    () => [
      {
        name: "productId",
        label: "Product Code",
        type: "text",
        validation: Yup.string().required("Product Code is required"),
      },
      {
        name: "productType",
        label: "Product Type",
        type: "select",
        storeLabel: true,
        options: productTypeOptions,
      },
      {
        name: "size",
        label: "Size",
        type: "text",
        validation: Yup.string().required("Size is Required"),
      },
      {
        name: "price",
        label: "Price",
        type: "number",
        validation: Yup.number().min(0, "Min 0").required("Required"),
      },
      {
        name: "quantity",
        label: "Quantity",
        type: "number",
        validation: Yup.number().min(0).required("Required"),
      },
      {
        name: "total",
        label: "Total",
        type: "number",
        calc: { multiply: ["price", "quantity"] }, // auto total = price * quantity
        validation: Yup.number().min(0).required("Total is Required"),
      },
      {
        name: "taxAmount",
        label: "Tax Amount",
        type: "number",
        calc: { percentageOf: "total" }, // auto 5% GST for example
        validation: Yup.number().min(0).required("Tax Amount is Required"),
      },
    ],
    [productTypeOptions]
  );

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
    const PayLoad = {
      customerId: selectedRow?.customer.customer_id,
      invoiceNumber: values.invoiceNumber,
      invoiceDate: values.invoiceDate,
      dueDate: values.dueDate,
      totalAmount: values.totalAmount,
      taxAmount: values.taxAmount,
      details: values.details?.map(({ productType, ...rest }: any) => ({
        ...rest,
        productType:
          typeof productType === "string"
            ? productType
            : productType?.label ?? "",
      })),
    };

    console.log("Payload sent to API:", PayLoad);
    createSalesInvoice(PayLoad as SaleInvoiceInputValues);
  };

  return (
    <>
      <div className="min-h-screen w-full p-6">
        {/* Header with Search */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
            />
          </div>
           <Button
          onClick={() => {
            setSelectedRow(null); // create mode
            setIsModalOpen(true);
          }}
          className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md"
        >
          Create Sales Invoice
        </Button>
       
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
          title="Sales Invoice"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {selectedRow && (
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
          )}

          <DynamicArrayForm
            title="Invoice Form"
            arrayFieldName="details"
            topFields={TopSaleInvoiceFieldsForms}
                  topContainerClassName="grid grid-cols-2 md:grid-cols-8 gap-x-4 gap-y-4 p-4 rounded-xl border border-gray-200 bg-gray-50/50"

            initialValues={{
              invoiceNumber: selectedRow?.invoiceNumber || 0,
              invoiceDate: selectedRow?.invoiceDate || "",
              dueDate: selectedRow?.dueDate || "",
              details: [
                {
                  productId: "",
                  productType: "",
                  size: "",
                  quantity: 0,
                  price: 0,
                  total: 0,
                  taxAmount: 0,
                },
              ],
            }}
            arrayFields={dynamicBottomInvoiceForm} // Use dynamic form with API data
            onSubmit={handleCreateSubmit} buttonTitle={"Submit"}          />
        </VerticalModalForm>
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable, Column, ActionConfig } from "@/component/table";
import { Delete, Edit, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import Loader from "@/common-component/loader";
import { showToast } from "nextjs-toast-notify";
import { useGetPriceList, usePriceListMutations } from "../tanstack-query";
import { DataAtrributes, PriceListInputFormvalues } from "../interface";
import { VerticalModalForm } from "@/component/ModalForm";
import { DisplayForm } from "@/common-component/DisplayFormForm";
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { TopPriceListFieldsForms } from "../dataform";

export default function OtherComponentTabs() {
  const [selected, setSelected] = useState<DataAtrributes[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingRole, setEditingRole] = useState<DataAtrributes | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataAtrributes | null>(null);

  const { updatePriceList, deletePriceList, isLoading } = usePriceListMutations(
    {
      onSuccess: (data) => {
        showToast.success(data.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
        setIsModalOpen(false);
        setEditingRole(null);
      },
      onError: (error) => {
        showToast.error(error?.data?.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
      },
    }
  );

  const { data: PriceListData, isLoading: isPriceListLoading } =
    useGetPriceList();
  const PriceListGetData = PriceListData?.data || [];

  const filteredData: DataAtrributes[] = useMemo(() => {
    // Make sure we have an array
    if (!Array.isArray(PriceListGetData)) return [];

    if (!searchQuery.trim()) return PriceListGetData;

    const query = searchQuery.toLowerCase();
    return PriceListGetData.filter((item) =>
      item.product_type?.toLowerCase().includes(query)
    );
  }, [PriceListGetData, searchQuery]);

  const columns: Column<DataAtrributes>[] = [
    {
      header: "S.No",
      render: (_, row) => {
        // Find index of row in filteredData
        const rowIndex = filteredData.findIndex((r) => r.id === row.id);
        return rowIndex + 1;
      },
    },
    {
      header: "Product Type",
      render: (_, row) => row.product_type || "-",
    },
    {
      header: "Size",
      render: (_, row) => row.size || "-",
    },
    {
      header: "Price",
      render: (_, row) => row.price || "-",
    },
  ];

  // Dynamic actions based on editing state
  const getActions = (): ActionConfig<DataAtrributes>[] => {
    return [
      {
        label: "Edit",
        icon: <Edit className="h-4 w-4" />,
        onClick: handleEdit,
      },
      {
        label: "Delete",
        icon: <Delete className="h-4 w-4" />,
        onClick: handleDelete,
      },
    ];
  };

  // Edit function - Opens dialog with role data
  const handleEdit = (row: DataAtrributes) => {
    setEditingRole(row);
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Delete function
  const handleDelete = (row: DataAtrributes) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the price list "${row.product_type} - ${row.size}"? This action cannot be undone.`
    );

    if (!confirmed) return;
    deletePriceList(row.id);
  };

 const handleCreateSubmit = (values: Record<string, any>) => {
    const { product_type, size, price, effective_date } = values;

    const payload = {
        product_type,
        size,
        price:Number(price),
        effective_date
    };

    if (selectedRow?.id && editingRole) {
        updatePriceList({ id: selectedRow.id, data: payload as PriceListInputFormvalues});
    }
};

  return (
    <>
      {(isLoading || isPriceListLoading) && <Loader fullScreen size="lg" />}

      <div className="min-h-screen w-full ">
        <div className="flex justify-between items-center gap-4 pb-3">
          {/* Search input wrapper */}
          <div className="relative w-1/3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <Input
              type="text"
              placeholder="Search by product type..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
            />
          </div>
        </div>

        <DataTable
          data={filteredData}
          columns={columns}
          actions={getActions()}
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
          !isPriceListLoading && (
            <div className="text-center py-8 text-gray-500">
              No price list items found
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          )}
      </div>

      <VerticalModalForm
        title="Price List Details"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRole(null);
          setSelectedRow(null);
        }}
      >
        {selectedRow && (
          <>

            <DynamicArrayForm
              title="Update Price List"
              arrayFieldName="details"
              topFields={TopPriceListFieldsForms}
              initialValues={{
                product_type: selectedRow.product_type || "",
                size: selectedRow.size || "",
                price: selectedRow.price || 0,
              }}
              buttonTitle="Update Price List"
              onSubmit={handleCreateSubmit}
            />
          </>
        )}
      </VerticalModalForm>
    </>
  );
}
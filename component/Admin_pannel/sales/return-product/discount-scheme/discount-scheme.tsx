/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, FileText, Package, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { DiscountSchemeData, DiscountSchemeInputValues } from "./interface";
import { CustomDialog } from "@/common-component/customDialogbox";
import {
  useDiscountSchemeMutations,
  useGetDiscountScheme,
} from "./tanstack-function";
import { DiscountSchemeFields } from "./dataform";

// Import your other component here
// import YourOtherComponent from "./YourOtherComponent";

// Separate component for Purchase Invoices Tab
export default function DiscountSchemeComponent() {
  const [selected, setSelected] = useState<DiscountSchemeData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<DiscountSchemeData | null>(
    null
  );
  //getData
  const { data: SaleDiscountScheme, isLoading: isDiscountSchemeLoading } =
    useGetDiscountScheme();
  const SaleDiscountSchemeGetData = SaleDiscountScheme?.data || [];
  //getData

  const { createDiscountScheme, updateDiscountScheme, deleteDiscountScheme } =
    useDiscountSchemeMutations({
      onSuccess: (data) => {
        showToast.success(data.message, {
          duration: 5000,
          position: "top-right",
          transition: "topBounce",
          icon: "",
          sound: true,
        });
        setIsDialogOpen(false);
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
  const filteredData: DiscountSchemeData[] = useMemo(() => {
    if (!SaleDiscountSchemeGetData) return [];
    if (!searchQuery.trim()) return SaleDiscountSchemeGetData;

    const query = searchQuery.toLowerCase();
    return SaleDiscountSchemeGetData.filter(
      (SaleDiscountScheme) =>
        SaleDiscountScheme.product_type.toLowerCase().includes(query) ||
        SaleDiscountScheme.discount_type.toLowerCase().includes(query)
    );
  }, [SaleDiscountSchemeGetData, searchQuery]);
  const columns: Column<DiscountSchemeData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Discount Type ",
      render: (_, row) => row.discount_type || "-",
    },
    {
      header: "Product Type",
      render: (_, row) => row.product_type || "-",
    },
    {
      header: "Value",
      render: (_, row) => row.value || "-",
    },
    {
      header: "Valid From",
      render: (_, row) => row.valid_from || "-",
    },

    {
      header: "Valid To",
      render: (_, row) => row.valid_to || "-",
    },
  ];
  const getActions = (): ActionConfig<DiscountSchemeData>[] => {
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
  const handleEdit = (row: DiscountSchemeData) => {
    setEditingRole(row);
    setIsDialogOpen(true);
  };

  // Delete function
  const handleDelete = (row: DiscountSchemeData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the role "${row.id}"? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteDiscountScheme(row.id);
  };
  const handleCreateSubmit = (values: Record<string, any>) => {
    if (editingRole?.id) {
      // Update existing role
      updateDiscountScheme({
        id: editingRole.id,
        data: values as DiscountSchemeInputValues,
      });
    } else {
      // Create new role
      createDiscountScheme(values as DiscountSchemeInputValues);
    }
  };
  const dialogDefaultValues = useMemo(() => {
    if (!editingRole) {
      return {
        product_type: "",
        discount_type: "",
        value: 0,
        valid_from: "",
        valid_to: "",
      };
    }

    // When editing, convert permissions array to array of IDs
    // From: permissions: [{id: 1, name: "..."}, {id: 2, name: "..."}]
    // To: permissionIds: [1, 2]
    return {
      product_type: editingRole.product_type,
      discount_type: editingRole.discount_type,
      value: editingRole.value,
      valid_from: editingRole.valid_from,
      valid_to: editingRole.valid_to,
    };
  }, [editingRole]);
  return (
    <>
      {/* Header with Search */}
      <div className="min-h-screen w-full p-6 bg-gray-50 ">
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

        {/* Create button */}
        <Button
          onClick={() => {
            setEditingRole(null);
            setIsDialogOpen(true);
          }}
          className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md"
        >
          Create Discount Scheme
        </Button>
      </div>

        <DataTable
          data={filteredData}
          columns={columns}
         
          actions={getActions()}
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
        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={editingRole ? "Edit Discount Scheme" : "Create Discount Scheme"}
          fields={DiscountSchemeFields}
          defaultValues={dialogDefaultValues}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle={editingRole ? "Update Discount Scheme" : "Create Discount Scheme"}
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1
        "
        />
      </div>
    </>
  );
}

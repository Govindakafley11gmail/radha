/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { CustomDialog } from "@/common-component/customDialogbox";
import {
  RawMaterialInventoryData,
  RawMaterialInventoryInputFormValues,
} from "./interface";
import {
  useGetRawMaterialInventory,
  useRawMaterialInventoryMutations,
} from "./tanstack-function";
import { useGetRawMaterialss } from "@/component/Admin_pannel/master/raw-materials/tanstack-function";
import { RawMaterialInventoryFields } from "./dataform";

export default function RawMaterialInventoryComponent() {
  const [selected, setSelected] = useState<RawMaterialInventoryData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] =
    useState<RawMaterialInventoryData | null>(null);

  // Get Machine Cost Data
  const {
    data: RawMaterialInventoryData,
    isLoading: isRawMaterialInventoryLoading,
  } = useGetRawMaterialInventory();
  const RawMaterialInventoryDataGetData = RawMaterialInventoryData?.data || [];

  // Get Machine Data for dropdown
  // Get Production Batch Data for dropdown
  const { data: RawMeterialData, isLoading: isFetching } =
    useGetRawMaterialss();
  const RawMeterialDataOptions = useMemo(
    () =>
      (RawMeterialData?.data || []).map((RawMeterialData: any) => ({
        label: RawMeterialData.name,
        value: RawMeterialData.id,
      })),
    [RawMeterialData],
  );

  const fields = useMemo(
    () => RawMaterialInventoryFields(RawMeterialDataOptions),
    [RawMeterialDataOptions],
  );
  // Use the correct mutation hooks for Machine Cost
  const {
    createRawMaterialInventory,
    deleteRawMaterialInventory,
  } = useRawMaterialInventoryMutations({
    onSuccess: (data) => {
      showToast.success(data.message, {
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
        icon: "",
        sound: true,
      });
      setIsDialogOpen(false);
      setEditingRole(null);
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

  // Filtered Data
  const filteredData: RawMaterialInventoryData[] = useMemo(() => {
    if (!RawMaterialInventoryDataGetData) return [];
    if (!searchQuery.trim()) return RawMaterialInventoryDataGetData;

    const query = searchQuery.toLowerCase();
    return RawMaterialInventoryDataGetData.filter(
      (data) =>
        data.valuation_method.toLowerCase().includes(query) ||
        data.rawMaterial.name.toLowerCase().includes(query),
    );
  }, [RawMaterialInventoryDataGetData, searchQuery]);

  const columns: Column<RawMaterialInventoryData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Raw Material Name",
      render: (_, row) => row.rawMaterial.name || "-",
    },

    {
      header: "Valuation Method",
      render: (_, row) => row.valuation_method || "-",
    },

    {
      header: "Quantity On Hand",
      render: (_, row) => row.quantity_on_hand || "-",
    },
    {
      header: "Reorder Level",
      render: (_, row) => row.reorder_level || "-",
    },
  ];

  const getActions = (): ActionConfig<RawMaterialInventoryData>[] => {
    return [
      {
        label: "Delete",
        icon: <Delete className="h-4 w-4" />,
        onClick: handleDelete,
      },
    ];
  };

  // Delete function
  const handleDelete = (row: RawMaterialInventoryData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this Leave Types record? This action cannot be undone.`,
    );

    if (!confirmed) return;
    deleteRawMaterialInventory(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
    // Create new record
    createRawMaterialInventory(values as RawMaterialInventoryInputFormValues);
  };

  return (
    <>
      <div className="min-h-screen w-full p-6 bg-gray-50">
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
            Create Raw Material Inventory
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
              No Raw Material Inventory records found matching &ldquo;
              {searchQuery}
              &rdquo;
            </div>
          )}

        {isRawMaterialInventoryLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading Raw Material Inventory data...
          </div>
        )}

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={"Create Raw Material Inventory"}
          fields={fields}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle="Create Raw Material Inventory"
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
        />
      </div>
    </>
  );
}

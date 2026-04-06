/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { CustomDialog } from "@/common-component/customDialogbox";

import { useGetProductionBatch } from "../production-batch/tanstck-function";

import {
  OtherProductionCostData,
  OtherProductionCostInputFormValues,
} from "./interface";
import {
  useGetOtherProductionCost,
  useOtherProductionCostMutations,
} from "./tanstack-function";
import { OtherProductionCostFields } from "./dataforms";

export default function OtherProductionCostComponent() {
  const [selected, setSelected] = useState<OtherProductionCostData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] =
    useState<OtherProductionCostData | null>(null);

  // Get Machine Cost Data
  const {
    data: OtherProductionCostCost,
    isLoading: isOtherProductionCostCostLoading,
  } = useGetOtherProductionCost();
  const OtherProductionCostCostGetData = OtherProductionCostCost?.data || [];

  // Get Machine Data for dropdown
  // Get Production Batch Data for dropdown
  const { data: ProductionBatch, isLoading: isProductionBatchLoading } =
    useGetProductionBatch();

  const batchOptions = useMemo(
    () =>
      (ProductionBatch?.data || []).map((batch: any) => ({
        label: batch.batchNumber,
        value: batch.id,
      })),
    [ProductionBatch]
  );

  const fields = useMemo(
    () => OtherProductionCostFields(batchOptions),
    [batchOptions]
  );

  // Use the correct mutation hooks for Machine Cost
  const {
    createOtherProductionCost,
    updateOtherProductionCost,
    deleteOtherProductionCost,
  } = useOtherProductionCostMutations({
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
  const filteredData: OtherProductionCostData[] = useMemo(() => {
    if (!OtherProductionCostCostGetData) return [];
    if (!searchQuery.trim()) return OtherProductionCostCostGetData;

    const query = searchQuery.toLowerCase();
    return OtherProductionCostCostGetData.filter((cost) =>
      cost.costType.toLowerCase().includes(query)
    );
  }, [OtherProductionCostCostGetData, searchQuery]);

  const columns: Column<OtherProductionCostData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Cost Type",
      render: (_, row) => row.costType || "-",
    },
    {
      header: "Batch",
      render: (_, row) => row.batch?.batchNumber || "-",
    },
    {
      header: "Amount",
      render: (_, row) => row.amount || "-",
    },
    {
      header: "transaction Date",
      render: (_, row) => row.transactionDate.split("T")[0] || "-",
    },
  ];

  const getActions = (): ActionConfig<OtherProductionCostData>[] => {
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
  const handleEdit = (row: OtherProductionCostData) => {
    setEditingRole(row);
    setIsDialogOpen(true);
  };

  // Delete function
  const handleDelete = (row: OtherProductionCostData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this machine cost record? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteOtherProductionCost(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
    if (editingRole?.id) {
      // Update existing record
      updateOtherProductionCost({
        id: editingRole.id,
        data: values as OtherProductionCostInputFormValues,
      });
    } else {
      // Create new record
      createOtherProductionCost(values as OtherProductionCostInputFormValues);
    }
  };

  const dialogDefaultValues = useMemo(() => {
    if (!editingRole) {
      return {
        costType: "",
        batchId: "",
        amount: 0,
        transactionDate: "",
      };
    }

    // Safe access with optional chaining and fallback to direct ID
    return {
      costType: editingRole.costType || "",
      batchId: editingRole.batch?.id || "",
      amount: editingRole.amount,
      transactionDate: editingRole.transactionDate
        ? editingRole.transactionDate.split("T")[0]
        : "",
    };
  }, [editingRole]);

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
            Create Machine Cost
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
              No Labour Cost records found matching &ldquo;{searchQuery}&rdquo;
            </div>
          )}

        {isOtherProductionCostCostLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading Other Production Cost data...
          </div>
        )}

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={
            editingRole
              ? "Edit Other Production Cost"
              : "Create Other Production Cost"
          }
          fields={fields}
          defaultValues={dialogDefaultValues}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle={
            editingRole
              ? "Update Other Production Cost"
              : "Create Other Production Cost"
          }
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
        />
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { CustomDialog } from "@/common-component/customDialogbox";
import { MachineCostFields } from "./dataform";
import { useGetMachineCost, useMachineCostMutations } from "./tanstack-function";
import { MachineCostData, MachineCostInputFormValues } from "./interface";
import { useGetMachine } from "../machines/tanstack-function";
import { useGetProductionBatch } from "../production-batch/tanstck-function";

export default function MachinesCostComponent() {
  const [selected, setSelected] = useState<MachineCostData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<MachineCostData | null>(null);

  // Get Machine Cost Data
  const { data: MachineCost, isLoading: isMachineCostLoading } = useGetMachineCost();
  const MachineCostGetData = MachineCost?.data || [];

  // Get Machine Data for dropdown
  const { data: SaleMachine, isLoading: isMachineLoading } = useGetMachine();

  // Get Production Batch Data for dropdown
  const { data: ProductionBatch, isLoading: isProductionBatchLoading } = useGetProductionBatch();

  const machineOptions = useMemo(
    () =>
      (SaleMachine?.data || []).map((machine: any) => ({
        label: machine.name,
        value: machine.id,
      })),
    [SaleMachine]
  );

  const batchOptions = useMemo(
    () =>
      (ProductionBatch?.data || []).map((batch: any) => ({
        label: batch.batchNumber,
        value: batch.id,
      })),
    [ProductionBatch]
  );

  const fields = useMemo(
    () => MachineCostFields(machineOptions, batchOptions),
    [machineOptions, batchOptions]
  );

  // Use the correct mutation hooks for Machine Cost
  const { createMachineCost, updateMachineCost, deleteMachineCost } = useMachineCostMutations({
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
  const filteredData: MachineCostData[] = useMemo(() => {
    if (!MachineCostGetData) return [];
    if (!searchQuery.trim()) return MachineCostGetData;

    const query = searchQuery.toLowerCase();
    return MachineCostGetData.filter((cost) =>
      cost.operatingCost?.toString().toLowerCase().includes(query) ||
      cost.hoursUsed?.toString().toLowerCase().includes(query) ||
      cost.maintenanceCost?.toString().toLowerCase().includes(query)
    );
  }, [MachineCostGetData, searchQuery]);

  const columns: Column<MachineCostData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Machine",
      render: (_, row) => row.machine?.name || "-",
    },
    {
      header: "Batch",
      render: (_, row) => row.batch?.batchNumber|| "-",
    },
    {
      header: "Hours Used",
      render: (_, row) => row.hoursUsed || "-",
    },
    {
      header: "Operating Cost",
      render: (_, row) => row.operatingCost || "-",
    },
    {
      header: "Maintenance Cost",
      render: (_, row) => row.maintenanceCost || "-",
    },
    {
      header: "Depreciation",
      render: (_, row) => row.depreciation || "-",
    },
    {
      header: "Power Cost",
      render: (_, row) => row.powerCost || "-",
    },
  ];

  const getActions = (): ActionConfig<MachineCostData>[] => {
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
  const handleEdit = (row: MachineCostData) => {
    setEditingRole(row);
    setIsDialogOpen(true);
  };

  // Delete function
  const handleDelete = (row: MachineCostData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this machine cost record? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteMachineCost(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
    const payload = {
      ...values,
      hoursUsed: parseFloat(values.hoursUsed) || 0,
      operatingCost: parseFloat(values.operatingCost) || 0,
      maintenanceCost: parseFloat(values.maintenanceCost) || 0,
      depreciation: parseFloat(values.depreciation) || 0,
      powerCost: parseFloat(values.powerCost) || 0,
    };

    if (editingRole?.id) {
      // Update existing record
      updateMachineCost({
        id: editingRole.id,
        data: payload as MachineCostInputFormValues
      });
    } else {
      // Create new record
      createMachineCost(payload as MachineCostInputFormValues);
    }
  };

  const dialogDefaultValues = useMemo(() => {
    if (!editingRole) {
      return {
        machineId: "",
        batchId: "",
        hoursUsed: "",
        operatingCost: "",
        maintenanceCost: "",
        depreciation: "",
        powerCost: "",
      };
    }

    // Safe access with optional chaining and fallback to direct ID
    return {
      machineId: editingRole.machine?.id  || "",
      batchId: editingRole.batch?.id  || "",
      hoursUsed: editingRole.hoursUsed?.toString() || "",
      operatingCost: editingRole.operatingCost?.toString() || "",
      maintenanceCost: editingRole.maintenanceCost?.toString() || "",
      depreciation: editingRole.depreciation?.toString() || "",
      powerCost: editingRole.powerCost?.toString() || "",
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
              No machine cost records found matching &ldquo;{searchQuery}&rdquo;
            </div>
          )}

        {isMachineCostLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading machine cost data...
          </div>
        )}

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={editingRole ? "Edit Machine Cost" : "Create Machine Cost"}
          fields={fields}
          defaultValues={dialogDefaultValues}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle={editingRole ? "Update Machine Cost" : "Create Machine Cost"}
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
        />
      </div>
    </>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { CustomDialog } from "@/common-component/customDialogbox";

import { useGetMachine } from "../machines/tanstack-function";
import { useGetProductionBatch } from "../production-batch/tanstck-function";
import { useGetMachineCost, useMachineCostMutations } from "../machines-costs/tanstack-function";
import { MachineCostFields } from "../machines-costs/dataform";
import { LabourCostData, LabourCostInputFormValues } from "./interface";
import { useGetLabourCost, useLabourCostMutations } from "./tanstack-function";
import { LabourCostFields } from "./dataform";
import { useGetLabour } from "../labour/tanstack-function";

export default function LabourCostComponent() {
  const [selected, setSelected] = useState<LabourCostData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<LabourCostData | null>(null);

  // Get Machine Cost Data
  const { data: LabourCost, isLoading: isLabourCostLoading } = useGetLabourCost();
  const LabourCostGetData = LabourCost?.data || [];

  // Get Machine Data for dropdown
  const { data: Labour, isLoading: isLabourLoading } = useGetLabour();
  // Get Production Batch Data for dropdown
  const { data: ProductionBatch, isLoading: isProductionBatchLoading } = useGetProductionBatch();

  const LabourOptions = useMemo(
    () =>
      (Labour?.data || []).map((machine: any) => ({
        label: machine.name,
        value: machine.id,
      })),
    [Labour]
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
    () => LabourCostFields(LabourOptions, batchOptions),
    [LabourOptions, batchOptions]
  );

  // Use the correct mutation hooks for Machine Cost
  const { createLabourCost, updateLabourCost, deleteLabourCost } = useLabourCostMutations({
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
  const filteredData: LabourCostData[] = useMemo(() => {
    if (!LabourCostGetData) return [];
    if (!searchQuery.trim()) return LabourCostGetData;

    const query = searchQuery.toLowerCase();
    return LabourCostGetData.filter((cost) =>
      cost.labor.name.toLowerCase().includes(query) ||
      cost.labor.identificationNo.toLowerCase().includes(query) 
    );
  }, [LabourCostGetData, searchQuery]);

  const columns: Column<LabourCostData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      render: (_, row) => row.labor.name || "-",
    },
    {
      header: "Batch",
      render: (_, row) => row.batch?.batchNumber|| "-",
    },
    {
      header: "Hours Worked",
      render: (_, row) => row.hoursWorked || "-",
    },
    {
      header: "Hourly Rate Snapshot ",
      render: (_, row) => row.hourlyRateSnapshot || "-",
    },
   
  ];

  const getActions = (): ActionConfig<LabourCostData>[] => {
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
  const handleEdit = (row: LabourCostData) => {
    setEditingRole(row);
    setIsDialogOpen(true);
  };

  // Delete function
  const handleDelete = (row: LabourCostData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this machine cost record? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteLabourCost(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
  

    if (editingRole?.id) {
      // Update existing record
      updateLabourCost({
        id: editingRole.id,
        data: values as LabourCostInputFormValues
      });
    } else {
      // Create new record
      createLabourCost(values as LabourCostInputFormValues);
    }
  };

  const dialogDefaultValues = useMemo(() => {
    if (!editingRole) {
      return {
        laborId: "",
        batchId: "",
        hoursWorked: 0,
        hourlyRateSnapshot: "",
    
      };
    }

    // Safe access with optional chaining and fallback to direct ID
    return {
      laborId: editingRole.labor.id  || "",
      batchId: editingRole.batch?.id  || "",
      hoursWorked: editingRole.hoursWorked,
      hourlyRateSnapshot: editingRole.hourlyRateSnapshot,
    
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

        {isLabourCostLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading Labour Cost data...
          </div>
        )}

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={editingRole ? "Edit Labour Cost" : "Create Labour Cost"}
          fields={fields}
          defaultValues={dialogDefaultValues}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle={editingRole ? "Update Labour Cost" : "Create Labour Cost"}
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
        />
      </div>
    </>
  );
}
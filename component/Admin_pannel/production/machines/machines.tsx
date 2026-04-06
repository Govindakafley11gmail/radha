/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, FileText, Package, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { CustomDialog } from "@/common-component/customDialogbox";
import { MachineData, MachineInputFormValues } from "./interface";
import { useGetMachine, useMachineMutations } from "./tanstack-function";
import { MachineFields } from "./dataform";

// Separate component for Purchase Invoices Tab
export default function MachinesComponent() {
  const [selected, setSelected] = useState<MachineData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<MachineData | null>(
    null
  );
  //getData
  const { data: SaleMachine, isLoading: isMachineLoading } =
    useGetMachine();
  const SaleMachineGetData = SaleMachine?.data || [];
  //getData

  const { createMachine, updateMachine, deleteMachine } =
    useMachineMutations({
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
  const filteredData: MachineData[] = useMemo(() => {
    if (!SaleMachineGetData) return [];
    if (!searchQuery.trim()) return SaleMachineGetData;

    const query = searchQuery.toLowerCase();
    return SaleMachineGetData.filter(
      (Machine) =>
        Machine.name.toLowerCase().includes(query) 
    );
  }, [SaleMachineGetData, searchQuery]);
  const columns: Column<MachineData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      render: (_, row) => row.name || "-",
    },
    {
      header: "Purchase Cost",
      render: (_, row) => row.purchaseCost || "-",
    },
    {
      header: "Depreciation Method",
      render: (_, row) => row.depreciationMethod || "-",
    },
    {
      header: "Useful Life",
      render: (_, row) => row.usefulLife || "-",
    },

   
  ];
  const getActions = (): ActionConfig<MachineData>[] => {
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
  const handleEdit = (row: MachineData) => {
    setEditingRole(row);
    setIsDialogOpen(true);
  };

  // Delete function
  const handleDelete = (row: MachineData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the role "${row.id}"? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteMachine(row.id);
  };
  const handleCreateSubmit = (values: Record<string, any>) => {
     const payload = {
    ...values,
    purchaseCost: parseFloat(values.purchaseCost),
  };
    if (editingRole?.id) {
      // Update existing role
      updateMachine({
        id: editingRole.id,
        data: payload as MachineInputFormValues,
      });
    } else {
      // Create new role
      createMachine(payload as MachineInputFormValues);
    }
  };
  const dialogDefaultValues = useMemo(() => {
    if (!editingRole) {
      return {
        name: "",
        purchaseCost: "",
        value: 0,
        depreciationMethod: "",
        usefulLife: "",
      };
    }

    // When editing, convert permissions array to array of IDs
    // From: permissions: [{id: 1, name: "..."}, {id: 2, name: "..."}]
    // To: permissionIds: [1, 2]
    return {
      name: editingRole.name,
      purchaseCost: editingRole.purchaseCost,
      depreciationMethod: editingRole.depreciationMethod,
      usefulLife: editingRole.usefulLife,
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
          Create Machine
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
          title={editingRole ? "Edit Machine" : "Create Machine"}
          fields={MachineFields}
          defaultValues={dialogDefaultValues}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle={editingRole ? "Update Machine" : "Create Machine"}
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1
        "
        />
      </div>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { CustomDialog } from "@/common-component/customDialogbox";
import { LeaveTypeData, LeaveTypesInputFormValues } from "./interface";
import { useGetLeaveTypes, useLeaveTypesMutations } from "./tanstack-function";
import { LeaveTypesFields } from "./dataform";

export default function LeaveTypesComponent() {
  const [selected, setSelected] = useState<LeaveTypeData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<LeaveTypeData | null>(null);

  // Get Machine Cost Data
  const { data: LeaveTypes, isLoading: isLeaveTypesLoading } =
    useGetLeaveTypes();
  const LeaveTypesGetData = LeaveTypes?.data || [];

  // Get Machine Data for dropdown
  // Get Production Batch Data for dropdown

  // Use the correct mutation hooks for Machine Cost
  const { createLeaveTypes, updateLeaveTypes, deleteLeaveTypes } =
    useLeaveTypesMutations({
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
  const filteredData: LeaveTypeData[] = useMemo(() => {
    if (!LeaveTypesGetData) return [];
    if (!searchQuery.trim()) return LeaveTypesGetData;

    const query = searchQuery.toLowerCase();
    return LeaveTypesGetData.filter(
      (data) =>
        data.max_days.toString().toLowerCase().includes(query) ||
        data.name.toLowerCase().includes(query)
    );
  }, [LeaveTypesGetData, searchQuery]);

  const columns: Column<LeaveTypeData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Leave Name",
      render: (_, row) => row.name || "-",
    },
    {
      header: "Leave Description",
      render: (_, row) => row.description || "-",
    },
    {
      header: "Maximum Day",
      render: (_, row) => row.max_days || "-",
    },
  ];

  const getActions = (): ActionConfig<LeaveTypeData>[] => {
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
  const handleEdit = (row: LeaveTypeData) => {
    setEditingRole(row);
    setIsDialogOpen(true);
  };

  // Delete function
  const handleDelete = (row: LeaveTypeData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this Leave Types record? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteLeaveTypes(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
    if (editingRole?.id) {
      // Update existing record
      updateLeaveTypes({
        id: editingRole.id,
        data: values as LeaveTypesInputFormValues,
      });
    } else {
      // Create new record
      createLeaveTypes(values as LeaveTypesInputFormValues);
    }
  };

  const dialogDefaultValues = useMemo(() => {
    if (!editingRole) {
      return {
        name: "",
        description: "",
        max_days: 0,
      };
    }

    // Safe access with optional chaining and fallback to direct ID
    return {
      name: editingRole.name || "",
      description: editingRole.description,
      max_days: editingRole.max_days,
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
            Create Leave Types
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
              No Leave Types records found matching &ldquo;{searchQuery}&rdquo;
            </div>
          )}

        {isLeaveTypesLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading Leave Types data...
          </div>
        )}

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={editingRole ? "Edit Leave Types" : "Create Leave Types"}
          fields={LeaveTypesFields}
          defaultValues={dialogDefaultValues}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle={
            editingRole ? "Update Leave Types" : "Create Leave Types"
          }
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
        />
      </div>
    </>
  );
}

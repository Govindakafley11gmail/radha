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
  LeaveEncashmentData,
  LeaveEncashmentInputFormValues,
} from "./interface";
import {
  useGetLeaveEncashment,
  useLeaveEncashmentMutations,
} from "./tanstack-function";
import { useGetLeaveTypes } from "../leave-types/tanstack-function";
import { LeaveEncashmetFields } from "./dataform";

export default function LeaveEncashmentComponent() {
  const [selected, setSelected] = useState<LeaveEncashmentData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<LeaveEncashmentData | null>(
    null,
  );

  // Get Machine Cost Data
  const { data: LeaveEncashment, isLoading: isLeaveEncashmentLoading } =
    useGetLeaveEncashment();
  const LeaveEncashmentGetData = LeaveEncashment?.data || [];

  // Get Machine Data for dropdown
  // Get Production Batch Data for dropdown
  const { data: LeaveTypes, isLoading: isLeaveTypesLoading } =
    useGetLeaveTypes();
  const LeaveTypesOptions = useMemo(
    () =>
      (LeaveTypes?.data || []).map((LeaveTypes: any) => ({
        label: LeaveTypes.name,
        value: LeaveTypes.id,
      })),
    [LeaveTypes],
  );

  const fields = useMemo(
    () => LeaveEncashmetFields(LeaveTypesOptions),
    [LeaveTypesOptions],
  );
  // Use the correct mutation hooks for Machine Cost
  const { createLeaveEncashment, deleteLeaveEncashment } =
    useLeaveEncashmentMutations({
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
  const filteredData: LeaveEncashmentData[] = useMemo(() => {
    if (!LeaveEncashmentGetData) return [];
    if (!searchQuery.trim()) return LeaveEncashmentGetData;

    const query = searchQuery.toLowerCase();
    return LeaveEncashmentGetData.filter(
      (data) =>
        data.status.toLowerCase().includes(query) ||
        data.employee.name.toLowerCase().includes(query),
    );
  }, [LeaveEncashmentGetData, searchQuery]);

  const columns: Column<LeaveEncashmentData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Leave Name",
      render: (_, row) => row.employee.name || "-",
    },

    {
      header: "Total Days",
      render: (_, row) => row.days || "-",
    },

    {
      header: "Status",
      render: (_, row) => row.status || "-",
    },
  ];

  const getActions = (): ActionConfig<LeaveEncashmentData>[] => {
    return [
      {
        label: "Delete",
        icon: <Delete className="h-4 w-4" />,
        onClick: handleDelete,
      },
    ];
  };

  // Delete function
  const handleDelete = (row: LeaveEncashmentData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this Leave Types record? This action cannot be undone.`,
    );

    if (!confirmed) return;
    deleteLeaveEncashment(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
    const payload = {
      status: "PENDING",
      ...values,
    };

    // Create new record
    createLeaveEncashment(payload as LeaveEncashmentInputFormValues);
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
            Create Leave Encashment
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
              No Leave Encashment records found matching &ldquo;{searchQuery}
              &rdquo;
            </div>
          )}

        {isLeaveEncashmentLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading Leave Encashment data...
          </div>
        )}

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={"Create Leave Encashment"}
          fields={fields}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle="Create Leave Encashment"
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
        />
      </div>
    </>
  );
}

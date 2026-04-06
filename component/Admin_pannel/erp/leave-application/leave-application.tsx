/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import {
  LeaveApplicationData,
  LeaveApplicationInputFormValues,
} from "./interface";
import { useGetLeaveTypes } from "../leave-types/tanstack-function";
import {
  useGetLeaveApplication,
  useLeaveApplicationMutations,
} from "./tanstack-function";
import { LeaveApplicationFields } from "./dataform";
import DynamicArrayForm from "@/common-component/Dynamic_Array_Form";
import { VerticalModalForm } from "@/component/ModalForm";

export default function LeaveApplicationComponent() {
  const [selected, setSelected] = useState<LeaveApplicationData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<LeaveApplicationData | null>(
    null,
  );

  // Get Leave Types Data
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
    () => LeaveApplicationFields(LeaveTypesOptions),
    [LeaveTypesOptions],
  );

  // Use the correct mutation hooks for Leave Application
  const {
    createLeaveApplication,
    updateLeaveApplication,
    deleteLeaveApplication,
  } = useLeaveApplicationMutations({
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
      showToast.error(error?.data?.message || "Something went wrong", {
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
        icon: "",
        sound: true,
      });
    },
  });

  // Get leave application
  const { data: LeaveApplication, isLoading: isLeaveApplicationLoading } =
    useGetLeaveApplication();
  const LeaveApplicationGetData = LeaveApplication?.data || [];

  // Filtered Data
  const filteredData: LeaveApplicationData[] = useMemo(() => {
    if (!LeaveApplicationGetData) return [];
    if (!searchQuery.trim()) return LeaveApplicationGetData;

    const query = searchQuery.toLowerCase();
    return LeaveApplicationGetData.filter(
      (data) =>
        data.status.toLowerCase().includes(query) ||
        data.leaveType.name.toLowerCase().includes(query) ||
        data.employee.name.toLowerCase().includes(query),
    );
  }, [LeaveApplicationGetData, searchQuery]);

  const columns: Column<LeaveApplicationData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      render: (_, row) => row.employee.name || "-",
    },
    {
      header: "Leave Type",
      render: (_, row) => row.leaveType.name || "-",
    },
    {
      header: "Leave Description",
      render: (_, row) => row.reason || "-",
    },
    {
      header: "Total Days",
      render: (_, row) => row.total_days || "-",
    },
  ];

  const getActions = (): ActionConfig<LeaveApplicationData>[] => {
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
  const handleEdit = (row: LeaveApplicationData) => {
    setEditingRole(row);
    setIsModalOpen(true);
  };

  // Delete function
  const handleDelete = (row: LeaveApplicationData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this Leave Application record? This action cannot be undone.`,
    );

    if (!confirmed) return;
    deleteLeaveApplication(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
    if (editingRole?.id) {
      // Update existing record
      updateLeaveApplication({
        id: editingRole.id,
        data: values as LeaveApplicationInputFormValues,
      });
    } else {
      // Create new record
      createLeaveApplication(values as LeaveApplicationInputFormValues);
    }
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
              setIsModalOpen(true);
            }}
            className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md"
          >
            Create Leave Application
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
              No Leave Application records found matching &ldquo;{searchQuery}
              &rdquo;
            </div>
          )}

        {isLeaveApplicationLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading Leave Application data...
          </div>
        )}
        <VerticalModalForm
          title="Leave Application"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <DynamicArrayForm
            title="Leave Application Form"
            topFields={fields}
            initialValues={{
              leaveTypeId: editingRole?.leaveType?.id || "",
              start_date: editingRole?.start_date || "",
              end_date: editingRole?.end_date || "",
              total_days: editingRole?.total_days || 0,
              reason: editingRole?.reason || "",
            }}
            buttonTitle={editingRole ? "Update Leave" : "Create Leave"}
            onSubmit={handleCreateSubmit}
          />
        </VerticalModalForm>
      </div>
    </>
  );
}

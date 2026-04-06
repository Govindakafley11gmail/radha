/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { showToast } from "nextjs-toast-notify";
import { CustomDialog } from "@/common-component/customDialogbox";

import { LaborInputFormValues, LabourData } from "./interface";
import { useGetLabour, useLabourMutations } from "./tanstack-function";
import { LabourFields } from "./dataform";

export default function LabourComponent() {
  const [selected, setSelected] = useState<LabourData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<LabourData | null>(null);

  // Get Machine Cost Data
  const { data: Labour, isLoading: isLabourLoading } = useGetLabour();
  const LabourGetData = Labour?.data || [];

  // Get Machine Data for dropdown


  // Use the correct mutation hooks for Machine Cost
  const { createLabour, updateLabour, deleteLabour } = useLabourMutations({
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
  const filteredData: LabourData[] = useMemo(() => {
    if (!LabourGetData) return [];
    if (!searchQuery.trim()) return LabourGetData;

    const query = searchQuery.toLowerCase();
    return LabourGetData.filter((labour) =>
      labour.name.toLowerCase().includes(query) ||
      labour.identificationNo.toString().toLowerCase().includes(query) 
    );
  }, [LabourGetData, searchQuery]);

  const columns: Column<LabourData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      render: (_, row) => row.name || "-",
    },
    {
      header: "Indentification/CID No",
      render: (_, row) => row.identificationNo|| "-",
    },
    {
      header: "Mobile No",
      render: (_, row) => row.mobileNo || "-",
    },
    
    {
      header: "Age",
      render: (_, row) => row.age || "-",
    },
  
  ];

  const getActions = (): ActionConfig<LabourData>[] => {
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
  const handleEdit = (row: LabourData) => {
    setEditingRole(row);
    setIsDialogOpen(true);
  };

  // Delete function
  const handleDelete = (row: LabourData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete this machine cost record? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteLabour(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {


    if (editingRole?.id) {
      // Update existing record
      updateLabour({
        id: editingRole.id,
        data: values as LaborInputFormValues
      });
    } else {
      // Create new record
      createLabour(values as LaborInputFormValues);
    }
  };

  const dialogDefaultValues = useMemo(() => {
    if (!editingRole) {
      return {
        name: "",
        identificationNo: "",
        mobileNo: "",
        gender: "",
        age: 0,
        dzongkhag: "",
        type: "",
        hourlyRate:0
      };
    }

    // Safe access with optional chaining and fallback to direct ID
    return {
      name: editingRole.name || "",
      identificationNo: editingRole.identificationNo  || "",
      mobileNo: editingRole.mobileNo || "",
      gender: editingRole.gender || "",
      age: editingRole.age,
      dzongkhag: editingRole.dzongkhag || "",
      type: editingRole.type || "",
      hourlyRate:editingRole.hourlyRate 
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
            Create Labour
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
              No Labour  records found matching &ldquo;{searchQuery}&rdquo;
            </div>
          )}

        {isLabourLoading && (
          <div className="text-center py-8 text-gray-500">
            Loading Labour  data...
          </div>
        )}

        <CustomDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          title={editingRole ? "Edit Labour" : "Create Labour"}
          fields={LabourFields}
          defaultValues={dialogDefaultValues}
          onSubmit={handleCreateSubmit}
          OnSubmitTitle={editingRole ? "Update Labour" : "Create Labour"}
          CustomDialogBoxStyle="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-5 overflow-y-auto flex-1"
        />
      </div>
    </>
  );
}
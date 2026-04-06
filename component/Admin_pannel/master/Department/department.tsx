/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable, Column, ActionConfig } from "@/component/table";
import { Delete, Edit, Save, X, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomDialog } from "@/common-component/customDialogbox";
import { showToast } from "nextjs-toast-notify";
import Loader from "@/common-component/loader";

import { Departmentfields } from "./formdata";
import { Department, DepartmentFormValues } from "./interface";
import { useDepartmentMutations, useGetDepartments } from "./tanstack";
import { useGetBranchs } from "../Branch/tanstack-function";

export default function DepartmentComponent() {
  const [selected, setSelected] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [rowValues, setRowValues] = useState<Partial<Department>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccountType, setEditingAccountType] =
    useState<Department | null>(null);
  // =================== Fetch Departments ===================
  const { data: departmentData, isLoading: isFetching } = useGetDepartments();
  const departments = departmentData?.data || [];

  //Fetch
  const { data: branchData, isLoading: isBranchFetching } = useGetBranchs();
  const branches = branchData?.data || [];
  const branchesGroupOptions = branches.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  const fieldsWithAccountGroup = useMemo(() => {
    return Departmentfields.map((field) =>
      field.name === "branchId"
        ? { ...field, options: branchesGroupOptions }
        : field
    );
  }, [branchesGroupOptions]);
  // =================== Mutations ===================
  const {
    createDepartment,
    updateDepartment,
    deleteDepartment,
    isLoading: isMutating,
  } = useDepartmentMutations({
    onSuccess: (data) => {
      showToast.success(data.message, {
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
      });
      setIsDialogOpen(false);
      setEditingRowId(null);
      setRowValues({});
    },
    onError: (error) => {
      showToast.error(error?.data?.message, {
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
      });
    },
  });

  // =================== Filtered Data ===================
  const filteredData: Department[] = useMemo(() => {
    if (!departments) return [];
    if (!searchQuery.trim()) return departments;

    const query = searchQuery.toLowerCase();
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(query) ||
        dept.code.toLowerCase().includes(query) ||
        dept.branch.name.toLowerCase().includes(query) // search by nested branch name
    );
  }, [departments, searchQuery]);

  // =================== Edit / Cancel / Save ===================
  const handleEdit = (row: Department) => {
    setEditingAccountType(row);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setRowValues({});
  };

  const handleSave = () => {
    if (!rowValues.id) return;
    updateDepartment({
      id: rowValues.id,
      data: {
        name: rowValues.name || "",
        code: rowValues.code || "",
      } as DepartmentFormValues,
    });
  };

  const handleDelete = (row: Department) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the department "${row.name}"?`
    );
    if (!confirmed) return;
    deleteDepartment(row.id);
  };

  // =================== Columns ===================
  const columns: Column<Department>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Code",
      accessor: "code",
    },
    {
      header: "Branch Options",
      render: (_, row) => row.branch.id, // show branch name
    },
  ];
  const dialogDefaultValues = useMemo(() => {
    if (!editingAccountType) {
      return {
        name: "",
        code: "",
        description: "",
        groupId: "",
      };
    }

    return {
      name: editingAccountType.name,
      code: editingAccountType.code,
      branchId: editingAccountType.branch.id ?? "", // ✅ FIX
      // 🔥 CRITICAL
    };
  }, [editingAccountType]);
  // =================== Dynamic Actions ===================
  const getActions = (): ActionConfig<Department>[] => {
    if (editingRowId === null) {
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
    } else {
      return [
        {
          label: "Save",
          icon: <Save className="h-4 w-4" />,
          onClick: handleSave,
          show: (row) => row.id === editingRowId,
        },
        {
          label: "Cancel",
          icon: <X className="h-4 w-4" />,
          onClick: handleCancel,
          show: (row) => row.id === editingRowId,
        },
      ];
    }
  };

  // =================== Create Department ===================
  const handleCreateSubmit = (values: Record<string, any>) => {
    if (editingAccountType?.id) {
      updateDepartment({
        id: editingAccountType.id,
        data: values as DepartmentFormValues,
      });
    } else {
      createDepartment(values as DepartmentFormValues);
    }
  };

  // =================== Render ===================
  return (
    <>
      {(isFetching || isMutating) && <Loader fullScreen size="lg" />}

      <div className="min-h-screen w-full p-6">
        <div className="flex justify-between items-center gap-4 pb-3">
          <div className="relative w-1/3">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <Input
              type="text"
              placeholder="Search by name, code, or branch..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
              disabled={editingRowId !== null}
            />
          </div>

          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={editingRowId !== null}
          >
            Create Department
          </Button>
        </div>

        {editingRowId !== null && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-center justify-between">
            <span>
              💡 You are currently editing a department. Save or cancel to
              enable other actions.
            </span>
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              className="text-blue-800 hover:bg-blue-100"
            >
              Cancel Editing
            </Button>
          </div>
        )}

        <DataTable
          data={filteredData}
          columns={columns}
          actions={getActions()}
          selectable
          onSelectionChange={setSelected}
          pageSize={5}
        />

        {Array.isArray(filteredData) &&
          filteredData.length === 0 &&
          searchQuery && (
            <div className="text-center py-8 text-gray-500">
              No departments found matching &ldquo;{searchQuery}&ldquo;
            </div>
          )}
      </div>

    <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingAccountType(null);
        }}
        title={editingAccountType ? "Edit Department" : "Create Department"}
        fields={fieldsWithAccountGroup}
        defaultValues={dialogDefaultValues}
        onSubmit={handleCreateSubmit}
        OnSubmitTitle={editingAccountType ? "Update" : "Create"}
                      CustomDialogBoxStyle="px-8 py-6 flex flex-col gap-5 overflow-y-auto flex-1"

      />
    </>
  );
}

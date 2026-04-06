/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable, Column, ActionConfig } from "@/component/table";
import { Delete, Edit, Save, X, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomDialog } from "@/common-component/customDialogbox";
import { Branchfields } from "./formdata";
import { showToast } from "nextjs-toast-notify";
import Loader from "@/common-component/loader";
import { useBranchMutations, useGetBranchs } from "./tanstack-function";
import { BranchData, BranchesFormValues } from "./interface";

export default function BranchComponent() {
  const [selected, setSelected] = useState<BranchData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [rowValues, setRowValues] = useState<Partial<BranchData>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // =================== Fetch Branches ===================
  const { data: branchData, isLoading: isFetching } = useGetBranchs();
  const branches = branchData?.data || [];

  // =================== Mutations ===================
  const { createBranch, updateBranch, deleteBranch, isLoading: isMutating } =
    useBranchMutations({
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
  const filteredData: BranchData[] = useMemo(() => {
    if (!branches) return [];
    if (!searchQuery.trim()) return branches;

    const query = searchQuery.toLowerCase();
    return branches.filter(
      (branch) =>
        branch.name.toLowerCase().includes(query) ||
        branch.code.toLowerCase().includes(query) ||
        branch.address.toLowerCase().includes(query)
    );
  }, [branches, searchQuery]);

  // =================== Edit / Cancel / Save ===================
  const handleEdit = (row: BranchData) => {
    setEditingRowId(row.id);
    setRowValues({ ...row });
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setRowValues({});
  };

  const handleSave = () => {
    if (!rowValues.id) return;
    updateBranch({
      id: rowValues.id,
      data: {
        name: rowValues.name || "",
        code: rowValues.code || "",
        address: rowValues.address || "",
      },
    });
  };

  const handleDelete = (row: BranchData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the branch "${row.name}"?`
    );
    if (!confirmed) return;
    deleteBranch(row.id);
  };

  // =================== Columns ===================
  const columns: Column<BranchData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      accessor: "name",
      render: (_, row) =>
        editingRowId === row.id ? (
          <Input
            value={rowValues.name || ""}
            onChange={(e) =>
              setRowValues({ ...rowValues, name: e.target.value })
            }
            placeholder="Enter branch name"
          />
        ) : (
          row.name
        ),
    },
    {
      header: "Code",
      accessor: "code",
      render: (_, row) =>
        editingRowId === row.id ? (
          <Input
            value={rowValues.code || ""}
            onChange={(e) =>
              setRowValues({ ...rowValues, code: e.target.value })
            }
            placeholder="Enter branch code"
          />
        ) : (
          row.code
        ),
    },
    {
      header: "Address",
      accessor: "address",
      render: (_, row) =>
        editingRowId === row.id ? (
          <Input
            value={rowValues.address || ""}
            onChange={(e) =>
              setRowValues({ ...rowValues, address: e.target.value })
            }
            placeholder="Enter branch address"
          />
        ) : (
          row.address
        ),
    },
  ];

  // =================== Dynamic Actions ===================
  const getActions = (): ActionConfig<BranchData>[] => {
    if (editingRowId === null) {
      return [
        { label: "Edit", icon: <Edit className="h-4 w-4" />, onClick: handleEdit },
        { label: "Delete", icon: <Delete className="h-4 w-4" />, onClick: handleDelete },
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

  // =================== Create Branch ===================
  const handleCreateSubmit = (values: Record<string, any>) => {
    createBranch(values as BranchesFormValues);
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
              placeholder="Search by name, code, or address..."
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
            Create Branch
          </Button>
        </div>

        {editingRowId !== null && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-center justify-between">
            <span>💡 You are currently editing a branch. Save or cancel to enable other actions.</span>
            <Button onClick={handleCancel} variant="ghost" size="sm" className="text-blue-800 hover:bg-blue-100">Cancel Editing</Button>
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

        {Array.isArray(filteredData) && filteredData.length === 0 && searchQuery && (
          <div className="text-center py-8 text-gray-500">
            No branches found matching &ldquo;{searchQuery}&ldquo;
          </div>
        )}
      </div>

      <CustomDialog
              CustomDialogBoxStyle="px-8 py-6 flex flex-col gap-5 overflow-y-auto flex-1"

        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Create Branch"
        fields={Branchfields}
        OnSubmitTitle="Create"
        onSubmit={handleCreateSubmit}
      />
    </>
  );
}

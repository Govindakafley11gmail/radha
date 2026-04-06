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

import { AccountGroupfields } from "./formdata";
import { AccountGroupData, AccountGroupFormValues } from "./interface";
import {
  useAccountGroupMutation,
  useGetAccountGroup,
} from "./tanstack-function";

export default function AccountGroupComponent() {
  const [selected, setSelected] = useState<AccountGroupData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [rowValues, setRowValues] = useState<Partial<AccountGroupData>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // =================== Fetch Branches ===================
  const { data: AccountGroupData, isLoading: isFetching } =
    useGetAccountGroup();
  const AccountGroup = AccountGroupData?.data || [];

  // =================== Mutations ===================
  const {
    createAccountGroup,
    updateAccountGroup,
    deleteAccountGroup,
    isLoading: isMutating,
  } = useAccountGroupMutation({
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
  const filteredData: AccountGroupData[] = useMemo(() => {
    if (!AccountGroup) return [];
    if (!searchQuery.trim()) return AccountGroup;

    const query = searchQuery.toLowerCase();
    return AccountGroup.filter(
      (AccountGroup) =>
        AccountGroup.name.toLowerCase().includes(query) ||
        AccountGroup.description.toLowerCase().includes(query)
    );
  }, [AccountGroup, searchQuery]);

  // =================== Edit / Cancel / Save ===================
  const handleEdit = (row: AccountGroupData) => {
    setEditingRowId(row.id);
    setRowValues({ ...row });
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setRowValues({});
  };

  const handleSave = () => {
    if (!rowValues.id) return;
    updateAccountGroup({
      id: rowValues.id,
      data: {
        name: rowValues.name || "",
        description: rowValues.description || "",
      },
    });
  };

  const handleDelete = (row: AccountGroupData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the branch "${row.name}"?`
    );
    if (!confirmed) return;
    deleteAccountGroup(row.id);
  };

  // =================== Columns ===================
  const columns: Column<AccountGroupData>[] = [
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
      header: "Description",
      accessor: "description",
      render: (_, row) =>
        editingRowId === row.id ? (
          <Input
            value={rowValues.description || ""}
            onChange={(e) =>
              setRowValues({ ...rowValues, description: e.target.value })
            }
            placeholder="Enter branch code"
          />
        ) : (
          row.description
        ),
    },
  ];

  // =================== Dynamic Actions ===================
  const getActions = (): ActionConfig<AccountGroupData>[] => {
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

  // =================== Create Branch ===================
  const handleCreateSubmit = (values: Record<string, any>) => {
    createAccountGroup(values as AccountGroupFormValues);
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
            Create Account Group
          </Button>
        </div>

        {editingRowId !== null && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 flex items-center justify-between">
            <span>
              💡 You are currently editing a branch. Save or cancel to enable
              other actions.
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
              No Account Group found matching &ldquo;{searchQuery}&ldquo;
            </div>
          )}
      </div>

      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Create Branch"
        fields={AccountGroupfields}
        OnSubmitTitle="Create"
        onSubmit={handleCreateSubmit}
        CustomDialogBoxStyle="px-8 py-6 flex flex-col gap-5 overflow-y-auto flex-1"
      />
    </>
  );
}

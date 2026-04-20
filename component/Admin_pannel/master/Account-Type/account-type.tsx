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
import { AccountTypeFields } from "./formdata";
import { AccountTypeData, AccountTypeFormValues, GroupData } from "./interface";
import { useAccountTypeMutations, useGetAccountTypes } from "./tanstack";
import { useGetAccountGroup } from "../Account-Group/tanstack-function";

export default function AccountTypeComponent() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccountType, setEditingAccountType] =
    useState<AccountTypeData | null>(null);
  const [selected, setSelected] = useState<AccountTypeData[]>([]);
  const [rowValues, setRowValues] = useState<Partial<AccountTypeData>>({});

  // =================== Fetch Departments ===================
  const { data: AccountGroupData, isLoading: isFetching } =
    useGetAccountGroup();
  const AccountGroup = AccountGroupData?.data || [];
  const { data: AccountTypesData, isLoading: isFetchingccountTypesData } =
    useGetAccountTypes();
  const AccountTypes = AccountTypesData?.data || [];

  const accountGroupOptions = AccountGroup.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
  const fieldsWithAccountGroup = useMemo(() => {
    return AccountTypeFields.map((field) =>
      field.name === "groupId"
        ? { ...field, options: accountGroupOptions }
        : field
    );
  }, [accountGroupOptions]);

  const {
    createAccountType,
    updateAccountType,
    deleteAccountType,
    isLoading: isMutating,
  } = useAccountTypeMutations({
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
  const filteredData: AccountTypeData[] = useMemo(() => {
    if (!AccountTypes) return [];
    if (!searchQuery.trim()) return AccountTypes;

    const query = searchQuery.toLowerCase();
    return AccountTypes.filter(
      (AccountTypes) =>
        AccountTypes.name.toLowerCase().includes(query) ||
        AccountTypes.code.toLowerCase().includes(query) ||
        AccountTypes.description.toLowerCase().includes(query) // search by nested branch name
    );
  }, [AccountTypes, searchQuery]);

  // =================== Edit / Cancel / Save ===================
  const handleEdit = (row: AccountTypeData) => {
    setEditingAccountType(row);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setRowValues({});
  };

  const handleSave = () => {
    if (!rowValues.id) return;
    updateAccountType({
      id: rowValues.id,
      data: {
        name: rowValues.name || "",
        code: rowValues.code || "",
        description: rowValues.description,
      } as AccountTypeFormValues,
    });
  };

  const handleDelete = (row: AccountTypeData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the department "${row.name}"?`
    );
    if (!confirmed) return;
    deleteAccountType(row.id);
  };

  // =================== Columns ===================
  const columns: Column<AccountTypeData>[] = [
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
      header: "Description",
      accessor: "description",
    },
    {
      header: "Account Group",
      render: (_, row) => row.group?.name || "-",
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
      description: editingAccountType.description,
      groupId: editingAccountType.group.id ?? "", // ✅ FIX
      // 🔥 CRITICAL
    };
  }, [editingAccountType]);

  // =================== Dynamic Actions ===================
  const getActions = (): ActionConfig<AccountTypeData>[] => {
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
      updateAccountType({
        id: editingAccountType.id,
        data: values as AccountTypeFormValues,
      });
    } else {
      createAccountType(values as AccountTypeFormValues);
    }
  };

  // =================== Render ===================
  return (
    <>
      {(isFetchingccountTypesData || isMutating) && (
        <Loader fullScreen size="lg" />
      )}

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
            Create Account Type
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
              No Account Type found matching &ldquo;{searchQuery}&ldquo;
            </div>
          )}
      </div>

      <CustomDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingAccountType(null);
        }}
        title={editingAccountType ? "Edit Account Type" : "Create Account Type"}
        fields={fieldsWithAccountGroup}
        defaultValues={dialogDefaultValues}
        onSubmit={handleCreateSubmit}
        OnSubmitTitle={editingAccountType ? "Update" : "Create"}
        CustomDialogBoxStyle="grid grid-cols-1 md:grid-cols-2 p-6 gap-4"
      />
    </>
  );
}

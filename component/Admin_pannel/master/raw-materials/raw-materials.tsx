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
import { RawMaterialsfields } from "./formdata";
import {
  useGetRawMaterialss,
  useRawMaterialsMutations,
} from "./tanstack-function";
import { RawMaterialsData, RawMaterialsFormValues } from "./interface";

export default function RawMaterialComponent() {
  const [selected, setSelected] = useState<RawMaterialsData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [rowValues, setRowValues] = useState<Partial<RawMaterialsData>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAccountType, setEditingAccountType] =
    useState<RawMaterialsData | null>(null);
  // =================== Fetch Departments ===================
  const { data: RawMeterialData, isLoading: isFetching } =
    useGetRawMaterialss();
  const RawMeterial = RawMeterialData?.data || [];

  //Fetch
  // const { data: CategoryData, isLoading: isCategoryFetching } =
  //   useGetCategorys();
  // const category = CategoryData?.data || [];
  // const categoryGroupOptions = category.map((item: any) => ({
  //   label: item.name,
  //   value: item.id,
  // }));
  // const fieldsWithAccountGroup = useMemo(() => {
  //   return RawMaterialsfields.map((field) =>
  //     field.name === "categoryId"
  //       ? { ...field, options: categoryGroupOptions }
  //       : field
  //   );
  // }, [categoryGroupOptions]);
  // =================== Mutations ===================
  const {
    createRawMaterials,
    updateRawMaterials,
    deleteRawMaterials,
    isLoading: isMutating,
  } = useRawMaterialsMutations({
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
      console.log(error, "Ëroor");
      // showToast.error(error?.data?.message, {
      //   duration: 5000,
      //   position: "top-right",
      //   transition: "topBounce",
      // });
    },
  });

  // =================== Filtered Data ===================
  const filteredData: RawMaterialsData[] = useMemo(() => {
    if (!RawMeterial) return [];
    if (!searchQuery.trim()) return RawMeterial;

    const query = searchQuery.toLowerCase();
    return RawMeterial.filter((Raw) => Raw.name.toLowerCase().includes(query));
  }, [RawMeterial, searchQuery]);

  // =================== Edit / Cancel / Save ===================
  const handleEdit = (row: RawMaterialsData) => {
    setEditingAccountType(row);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingRowId(null);
    setRowValues({});
  };

  const handleSave = () => {
    if (!rowValues.id) return;

    updateRawMaterials({
      id: rowValues.id,
      data: {
        name: rowValues.name || "",
        unit: rowValues.unit || "",
        standard_cost:
          rowValues.standard_cost === undefined
            ? undefined
            : Number(rowValues.standard_cost),
      },
    });
  };

  const handleDelete = (row: RawMaterialsData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the RawMaterialsData "${row.name}"?`
    );
    if (!confirmed) return;
    deleteRawMaterials(row.id);
  };

  // =================== Columns ===================
  const columns: Column<RawMaterialsData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Unit",
      accessor: "unit",
    },
    {
      header: "standard Cost",
      accessor: "standard_cost",
    },
    // {
    //   header: "Raw Materials Options",
    //   render: (_, row) => row.id, // show branch name
    // },
  ];
  const dialogDefaultValues = useMemo(() => {
    if (!editingAccountType) {
      return {
        name: "",
        code: "",
        description: "",
        // groupId: "",
      };
    }

    return {
      name: editingAccountType.name,
      unit: editingAccountType.unit,
      standard_cost: editingAccountType.standard_cost,
      // branchId: editingAccountType.id ?? "", // ✅ FIX
      // 🔥 CRITICAL
    };
  }, [editingAccountType]);
  // =================== Dynamic Actions ===================
  const getActions = (): ActionConfig<RawMaterialsData>[] => {
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
    const payload: RawMaterialsFormValues = {
      name: String(values.name),
      unit: String(values.unit),
      standard_cost:
        values.standard_cost !== "" && values.standard_cost !== undefined
          ? Number(values.standard_cost)
          : undefined,
    };
    console.log(payload, "payload<><><><>???");

    if (editingAccountType?.id) {
      updateRawMaterials({
        id: editingAccountType.id,
        data: payload,
      });
    } else {
      createRawMaterials(payload);
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
            Create Raw Materials
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
        fields={RawMaterialsfields}
        defaultValues={dialogDefaultValues}
        onSubmit={handleCreateSubmit}
        OnSubmitTitle={editingAccountType ? "Update" : "Create"}
        CustomDialogBoxStyle="px-8 py-6 flex flex-col gap-5 overflow-y-auto flex-1"
      />
    </>
  );
}

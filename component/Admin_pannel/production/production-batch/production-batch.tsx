/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Delete, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ActionConfig, Column, DataTable } from "@/component/table";
import { VerticalModalForm } from "@/component/ModalForm";
import { showToast } from "nextjs-toast-notify";
import DynamicArrayForm, {
  FieldConfig,
} from "@/common-component/Dynamic_Array_Form";

import * as Yup from "yup";
import { useGetRawMaterialss } from "../../master/raw-materials/tanstack-function";
import {
  useGetProductionBatch,
  useProductionBatchMutations,
} from "./tanstck-function";
import { ProductionBatchData } from "./interface";
import { TopProductionBatchFieldsForms } from "./dataform";
import { normalizePayload } from "./helper";

// Separate component for Purchase Invoices Tab
export default function ProductionBatchComponent() {
  const [selected, setSelected] = useState<ProductionBatchData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProductionBatchData | null>(
    null
  );
  //getData
  const { data: ProductionBatch, isLoading: isProductionBatchLoading } =
    useGetProductionBatch();
  const ProductionBatchGetData = ProductionBatch?.data || [];

  //POST dATA
  const {
    createProductionBatch,
    updateProductionBatch,
    deleteProductionBatch,
  } = useProductionBatchMutations({
    onSuccess: (data) => {
      showToast.success(data.message, {
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
        icon: "",
        sound: true,
      });
      setIsModalOpen(false);
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
  const filteredData: ProductionBatchData[] = useMemo(() => {
    if (!ProductionBatchGetData) return [];
    if (!searchQuery.trim()) return ProductionBatchGetData;

    const query = searchQuery.toLowerCase();
    return ProductionBatchGetData.filter(
      (ProductionBatchData) =>
        ProductionBatchData.productType.toLowerCase().includes(query) ||
        ProductionBatchData.batchNumber.toLowerCase().includes(query)
    );
  }, [ProductionBatchGetData, searchQuery]);
  // Get Raw Materials Data
  const { data: RawMeterialData, isLoading: isFetching } =
    useGetRawMaterialss();
  const RawMeterial = RawMeterialData?.data || [];
  const productTypeOptions = useMemo(() => {
    return RawMeterial.map((item: any) => ({
      label: item.name, // Display name in dropdown
      value: item.id, // Store ID as value
    }));
  }, [RawMeterial]);

  const dynamicBottomProductionBatchForm: FieldConfig[] = useMemo(
    () => [
      {
        name: "rawMaterialId",
        label: "Raw Material",
        type: "select",
        storeLabel: true,
        options: productTypeOptions,
      },

      {
        name: "usedQuantity",
        label: "Quantity",
        type: "number",
        validation: Yup.number().min(0, "Min 0").required("Required"),
      },
    ],
    [productTypeOptions]
  );

  const columns: Column<ProductionBatchData>[] = [
    {
      header: "S.No",
      render: (_, row) => filteredData.findIndex((r) => r.id === row.id) + 1,
    },
    {
      header: "Product Type",
      render: (_, row) => row.productType || "-",
    },
    {
      header: "Production Date",
      render: (_, row) => row.productionDate || "-",
    },
    {
      header: "Quantity Produced",
      render: (_, row) => row.quantityProduced || "-",
    },
  ];
  const getActions = (): ActionConfig<ProductionBatchData>[] => {
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
  const handleEdit = (row: ProductionBatchData) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  // Delete function
  const handleDelete = (row: ProductionBatchData) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete the role "${row.productType}"? This action cannot be undone.`
    );

    if (!confirmed) return;
    deleteProductionBatch(row.id);
  };

  const handleCreateSubmit = (values: Record<string, any>) => {
    const payload = normalizePayload(values);

    if (selectedRow) {
      updateProductionBatch({
        id: selectedRow.id,
        data: payload,
      });
    } else {
      createProductionBatch(payload);
    }
  };
  const normalizeRawMaterialCosts = (rawMaterialCosts: any) => {
    if (!rawMaterialCosts) return [];

    // if API returns single object
    if (!Array.isArray(rawMaterialCosts)) {
      return [
        {
          rawMaterialId: {
            label: rawMaterialCosts.rawMaterial?.name ?? "",
            value: rawMaterialCosts.rawMaterial?.id ?? "",
          },
          usedQuantity: rawMaterialCosts.usedQuantity ?? 0,
        },
      ];
    }

    // if API returns array
    return rawMaterialCosts.map((item: any) => ({
      rawMaterialId: {
        label: item.rawMaterial?.name ?? "",
        value: item.rawMaterial?.id ?? "",
      },
      usedQuantity: item.usedQuantity ?? 0,
    }));
  };

  return (
    <>
      <div className="min-h-screen w-full p-6">
        {/* Header with Search */}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 h-12 rounded-md border-slate-200 bg-white text-sm text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
            />
          </div>
          <Button
            onClick={() => {
              setSelectedRow(null);
              setIsModalOpen(true);
            }}
            className="bg-orange-500 text-white hover:bg-orange-600 h-12 px-6 rounded-md shadow-md"
          >
            Create Prodution Batch
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

        <VerticalModalForm
          title="Production Batch"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <DynamicArrayForm
            key={selectedRow?.id || "create"}
            title="Production Batch Form"
            arrayFieldName="rawMaterialCosts"
            topFields={TopProductionBatchFieldsForms}
            initialValues={{
              productType: selectedRow?.productType || "",
              productionDate: selectedRow?.productionDate || "",
              quantityProduced: selectedRow?.quantityProduced || "",
              rawMaterialCosts: normalizeRawMaterialCosts(
                selectedRow?.rawMaterialCosts
              ),
            }}
            arrayFields={dynamicBottomProductionBatchForm}
            onSubmit={handleCreateSubmit}
            buttonTitle={
              selectedRow
                ? "Update Production Batch"
                : "Submit Production Batch"
            }
          />
        </VerticalModalForm>
      </div>
    </>
  );
}

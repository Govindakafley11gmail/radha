/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useGetsuppliers } from "../../Supplier/tanstack";
import { useGetRawMaterialss } from "../../../master/raw-materials/tanstack-function";
import { getDynamicBottomInvoiceForm } from "../dataform/purchaseInvoiceInputFields";

export function useSupplierData() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: supplierRes } = useGetsuppliers();
  const { data: rawRes } = useGetRawMaterialss();

  const suppliers = supplierRes?.data ?? [];
  const rawMaterials = rawRes?.data ?? [];
  const productTypeOptions = useMemo(
    () =>
      rawMaterials.map((i: any) => ({
        label: i.name,      value: String(i.id), // ✅ convert to string

      })),
    [rawMaterials]
  );
  console.log("productTypeOptions", productTypeOptions);


  const filteredSuppliers = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return suppliers;

    return suppliers.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.cidNo?.toLowerCase().includes(q)
    );
  }, [suppliers, searchQuery]);

  const dynamicBottomInvoiceForm = useMemo(
    () => getDynamicBottomInvoiceForm(productTypeOptions),
    [productTypeOptions]
  );

  return {
    suppliers,
    filteredSuppliers,
    searchQuery,
    setSearchQuery,
    productTypeOptions,
    dynamicBottomInvoiceForm,
  };
}
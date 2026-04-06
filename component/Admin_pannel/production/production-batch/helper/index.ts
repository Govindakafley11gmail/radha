import { ProductionBatchInputFormvalues } from "../interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
  export const normalizePayload = (values: any): ProductionBatchInputFormvalues => ({
  productType:
    typeof values.productType === "string"
      ? values.productType
      : values.productType?.label ?? "",

  productionDate: values.productionDate,
  quantityProduced: Number(values.quantityProduced),

  rawMaterialCosts: (values.rawMaterialCosts || []).map((item: any) => ({
    // Convert object to string
    rawMaterialId:
      typeof item.rawMaterialId === "object"
        ? String(item.rawMaterialId.value)
        : String(item.rawMaterialId), // fallback if already string
    usedQuantity: Number(item.usedQuantity),
  })),
});
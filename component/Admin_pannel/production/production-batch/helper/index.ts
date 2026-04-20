import { ProductionBatchInputFormvalues } from "../interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
  export const normalizePayload = (values: any): ProductionBatchInputFormvalues => ({


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
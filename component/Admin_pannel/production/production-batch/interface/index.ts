/* eslint-disable @typescript-eslint/no-explicit-any */
export interface rawMaterialCosts {
  rawMaterialId: string;
  usedQuantity: number;
}
export interface ProductionBatchInputFormvalues {
  productionDate: string;
  productType: string;
  quantityProduced: number;
  rawMaterialCosts: rawMaterialCosts;
}
export interface ProductionBatchCreateResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface rawMaterialData {
  id: string;
  name: string;
  unit: string;
  standard_cost: string;
  description: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string; // ISO date string
  updated_at: string;
}
export interface rawMaterialCostsData {
  id: number;
  rawMaterial: rawMaterialData;
  usedQuantity: string;
  costAmount: string;
}

export interface ProductionBatchData {
  id: string;
  batchNumber: string;
  productionDate: string; // YYYY-MM-DD
  productType: string;
  quantityProduced: string;
  createdBy: string;
  updatedBy: string;
  rawMaterialCosts: rawMaterialCostsData;
}
export interface ProductionBatchGetResponse {
  success: boolean;
  message: string;
  data: ProductionBatchData[];
  statusCode: number;
}

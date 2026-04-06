/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProductUnitCostFormValues {
  batchId: string;
  costPerKg: number;
  costPerBox: number;
  costPerNail: number;
  processCuttingCost: number;
  processHeadingCost: number;
  processPolishingCost: number;
  processPackingCost: number;
}

export interface ProductUnitCostCreateResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface BatchData {
  id: string;
  batchNumber: string;
  productionDate: string; // YYYY-MM-DD
  productType: string;
  quantityProduced: string;
}

export interface ProductUnitCostData {
  id: string;
  batch:BatchData,
  costPerKg: number;
  costPerBox: number;
  costPerNail: number;
  processCuttingCost: number;
  processHeadingCost: number;
  processPolishingCost: number;
  processPackingCost: number;
}
export interface ProductUnitCostGetResponse {
  success: boolean;
  message: string;
  data: ProductUnitCostData[];
  statusCode: number;
}

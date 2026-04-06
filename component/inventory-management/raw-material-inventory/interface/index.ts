/* eslint-disable @typescript-eslint/no-explicit-any */
//  'FIFO' | 'LIFO' | 'Weighted Average';
export interface RawMaterialInventoryInputFormValues {
  raw_material_id: string;
  quantity_on_hand: number;
  value: number;
  valuation_method: string;
  reorder_level: number;
}
export interface RawMaterialInventoryCreateResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface RawMaterialData {
  id: string;
  name: string;
  unit: string;
  standard_cost: string;
  description: string;
}

export interface RawMaterialInventoryData {
  id: string;
  rawMaterial: RawMaterialData;
  raw_material_id: string;
  quantity_on_hand: string;
  value: string;
  valuation_method: string;
  reorder_level: string;
  receipts: any[];
}
export interface RawMaterialInventoryGetResponse {
  success: boolean;
  message: string;
  data: RawMaterialInventoryData[];
  statusCode: number;
}
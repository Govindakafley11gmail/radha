/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WIPInventoryPostDataAttributes {
  batchId: string;
  quantity: number;
  cost: number;
}

export interface WIPInventoryCreateResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}
//Get Response

interface BatchAttributes {
  id: string;
  batchNumber: string;
  productionDate: string; // ISO date string (e.g., "2026-04-08")
  productType: string;
  quantityProduced: string; //
}

export interface WIPInventoryData{
    id:string;
    batch:BatchAttributes;
    quantity: number;
    cost: string;
}

export interface WIPInventoryGetResponse {
  success: boolean;
  message: string;
  data: WIPInventoryData[];
  statusCode: number;
}
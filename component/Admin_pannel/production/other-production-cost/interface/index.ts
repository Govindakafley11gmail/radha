/* eslint-disable @typescript-eslint/no-explicit-any */
// "RENT" | "UTILITIES" | "TRANSPORT" | "OTHER"
export interface OtherProductionCostInputFormValues {
  batchId: string;
  costType: string;
  amount: number;
  transactionDate: string; // ISO date string (YYYY-MM-DD)
}

export interface OtherProductionCostCreateRespone {
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

export interface OtherProductionCostData{
    id:string,
    batch:BatchData,
    costType:string,
    amount:string,
    transactionDate:string
}
export interface OtherProductionCostGetRespone {
  success: boolean;
  message: string;
  data: OtherProductionCostData[];
  statusCode: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LabourCostInputFormValues {
  laborId: string;
  batchId: string;
  hoursWorked: number;
  hourlyRateSnapshot: number;
}
export interface LabourCostCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface BatchData {
  id: string;
  batchNumber: string;
  productionDate: string; // ISO date string
  productType: string;
  quantityProduced: string;
}

export interface LabourData {
  id: string;
  name: string;
  identificationNo: string;
  mobileNo: string;
  gender: string;
  age: number;
  dzongkhag: string;
  type: string;
  hourlyRate: string;
}
export interface LabourCostData{
    id:number,
    labor:LabourData
    batch:BatchData
    hoursWorked:string
    hourlyRateSnapshot:string
    totalCost:string
    transactionDate:string
}

export interface LabourCostGetRespone {
  success: boolean;
  message: string;
  data: LabourCostData[];
  statusCode: number;
}


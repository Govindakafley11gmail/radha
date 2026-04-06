/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MachineCostInputFormValues {
  machineId: string; // UUID of the machine
  batchId: string; // UUID of the batch
  hoursUsed: number; // Number of hours the machine was used
  operatingCost: number; // Cost of operating the machine
  maintenanceCost: number; // Maintenance cost for the machine
  depreciation: number; // Depreciation cost
  powerCost: number;
}
export interface MachineCostCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface BatchData {
  id: string; // UUID of the batch
  batchNumber: string; // Batch code or number
  productionDate: string; // Date of production in YYYY-MM-DD format
  productType: string; // Type of product produced
  quantityProduced: string;
}

export interface MachineData {
  id: string; // UUID of the machine
  name: string; // Name of the machine
  purchaseCost: string; // Purchase cost as string, e.g., "25000.50"
  depreciationMethod: string;
  usefulLife: number;
}

export interface MachineCostData {
  id: string;
  machine: MachineData;
  batch: BatchData;
  hoursUsed: number; // Number of hours the machine was used
  operatingCost: string; // Cost of operating the machine
  maintenanceCost: string; // Maintenance cost for the machine
  depreciation: string; // Depreciation cost
  powerCost: string; // Cost of power consumed
}

export interface MachineCostGetRespone {
  success: boolean;
  message: string;
  data: MachineCostData[];
  statusCode: number;
}

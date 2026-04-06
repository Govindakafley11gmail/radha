/* eslint-disable @typescript-eslint/no-explicit-any */
//  "STRAIGHT_LINE" | "DECLINING_BALANCE" | "UNITS_OF_PRODUCTION"
export interface MachineInputFormValues {
  name: string;
  purchaseCost: number;
  depreciationMethod: string; // example common methods
  usefulLife: number; // in years
}
export interface MachineCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}
export interface MachineData {
  id: string;
  name: string;
  purchaseCost: number;
  depreciationMethod: string; // example common methods
  usefulLife: number;
  usageCosts: any;
}
export interface MachineGetReponse {
  success: boolean;
  message: string;
  data: MachineData[];
  statusCode: number;
}

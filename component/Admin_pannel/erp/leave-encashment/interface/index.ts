/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LeaveEncashmentInputFormValues {
  leaveTypeId: string;
  days: number;
  amount: number;
  status: string;
}

export interface LeaveEncashmentCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}


export interface LeaveEncashmentData {
  id: string;
  employee: EmployeeData;
  permissions: any;
  leaveTypeId: string; // YYYY-MM-DD
  days: number;
  reason: string;
  status: string;
  amount: number;
  approved_by: number | null;
}
export interface EmployeeData{
  id:number,
  name:string

}

export interface LeaveEncashmentGetRespone {
  success: boolean;
  message: string;
  data: LeaveEncashmentData[];
  statusCode: number;
}

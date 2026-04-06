import { LeaveTypeData } from "../../leave-types/interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LeaveApplicationInputFormValues {
  leaveTypeId: string;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  total_days: number;
  reason: string;
}

export interface LeaveApplicationCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface LeaveApplicationData {
  id: string;
  employee: EmployeeData;
  permissions: any;
  leaveType: LeaveTypeData;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
  total_days: number;
  reason: string;
  status: string;
  created_by: number;
  approved_by: number | null;
}
export interface EmployeeData{
  id:number,
  name:string

}

export interface LeaveApplicationGetRespone {
  success: boolean;
  message: string;
  data: LeaveApplicationData[];
  statusCode: number;
}

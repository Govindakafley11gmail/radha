/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LeaveTypesInputFormValues{
    name:string,
    description:string,
    max_days:number
}

export interface LeaveTypesCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface LeaveTypeData{
     id: string;
  name: string;
  description: string;
  max_days: number;
  is_paid: boolean;
}

export interface LeaveTypesGetRespone {
  success: boolean;
  message: string;
  data: LeaveTypeData[];
  statusCode: number;
}

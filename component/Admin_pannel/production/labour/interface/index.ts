/* eslint-disable @typescript-eslint/no-explicit-any */
// "MALE" | "FEMALE" | "OTHER";
export interface LaborInputFormValues {
  name: string;
  identificationNo: string;
  mobileNo: string;
  gender: string;
  age: number;
  dzongkhag: string;
  //    "DIRECT" | "INDIRECT";
  type: string;
  hourlyRate: number;
}

export interface LabourCreateRespone {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface LabourData {
  id: string; // UUID
  name: string;
  identificationNo: string;
  mobileNo: string;
  gender: string;
  age: number;
  dzongkhag: string;
  type: string;
  hourlyRate: number;
}


export interface LabourGetRespone {
  success: boolean;
  message: string;
  data: LabourData[];
  statusCode: number;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { File } from "buffer";

export interface  SupplierFormValues{
    name:string,
    phone_no:string,
    email:string,
    gender:string,
    nationality:string,
    cidNo:string,
    status:string,
    paymentTerms:string,
    mouFile:string,
    mouDate:string,
    expireDate:string
}

export  interface SupplierData {
  supplier_id: string;
  name: string;
  phone_no: string;
  email: string;
  gender: string
  nationality: string;
  cidNo: string;
  status: string
  paymentTerms: string;
  mouFile: string; // could be file URL or null
  mouDate: string; // ISO date string
  expireDate: string; // ISO date string
  isDeleted: boolean;// ISO date string
  purchaseInvoices: any[]; // replace with proper type if known
  rawMaterialReceipts: any[]; // replace with proper type if known
}

export interface SupplierCreateResponse {
  success: boolean;
  message: string;
  data: SupplierData;
  statusCode: number;
}
export interface SupplierFetchResponse {
  success: boolean;
  message: string;
  data: SupplierData[];
  statusCode: number;
}

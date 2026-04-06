/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldConfig, FieldType } from "@/common-component/customDialogbox";
// Permission form field interface
export interface PermssionForm extends FieldConfig {
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  Icon?: React.ComponentType<any>;
  validation?: any;
  defaultValue?: any;
}

export interface PermissionFormValues {
  name: string;
  description: string;
}

// Permission API response interface
interface data{
  id:number;
  name:string;
  description:string;
}
export interface PermissionResponse {
  suscess: boolean;
  message: string;
  data: data;
  statausCode: number;
}

export interface GetPermissionsListResponse { 
  success: boolean;
  message: string;
  data: data[];
  statusCode: number;
}
//getting Permission List response interface
export interface errorResponse {
  data: {
    success: boolean;
    message: string;
    errors: string;
    statusCode: number;
  };
}

export interface Permission {
  id: number;
  name: string;
  description: string;
}

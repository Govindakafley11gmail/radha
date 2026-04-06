/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldConfig, FieldType } from "@/common-component/customDialogbox";

//forminterface
export type PermssionForm = FieldConfig & {
  label: string;
  placeholder?: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  Icon?: React.ComponentType<any>;
  validation?: any;
  defaultValue?: any;
  optionGroups?:any[];
};
//sending form values interface
export interface RoleFormValues {
  name: string;
  description: string;
  permissionIds: number[];
}

//Mutation and Query Response Interface

export interface RolesValues {
  id: number;
  name: string;
  description: string;


}

export interface RoleData {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  permissions: RolesValues[];
}

export interface CreateRoleResponse {
  success: boolean;
  message: string;
  data: RoleData;
  statusCode: number;
}
export interface GetRolesResponse {
  success: boolean;
  message: string;
  data: RoleData[];
  statusCode: number;
}
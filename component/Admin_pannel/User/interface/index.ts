
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserFormData {
    name: string;
    email: string;
    password: string;
    acceptTerms: boolean;
    roleIds: number[];
    permissionIds: number[];
}

export interface UserCreateDataResponse {
    success: boolean;
    message: string;
    data: any;
    statusCode: number;
}
export  interface RoleValues {
    id: number;
    name: string;
    description: string;
}
export interface PermissionValues {
    id: number;
    name: string;
    description: string;
}
export interface UserData {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    roles: RoleValues[];
    permissions: PermissionValues[];
}

export interface GetUserDataResponse {
    success: boolean;
    message: string;
    data: UserData[];
    statusCode: number;
}

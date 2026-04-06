export interface DepartmentFormValues{
    name?:string;
    code?:string;
    branchId?:string;
}

//Create 

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;

}

export interface Department {
  id: string;
  name: string;
  code: string;
  branch: Branch;
  
}

export interface DepartmentCreateResponse {
  success: boolean;
  message: string;
  data: Department;
  statusCode: number;
}

export interface DepartmentsFetchResponse {
  success: boolean;
  message: string;
  data: Department[];
  statusCode: number;
}
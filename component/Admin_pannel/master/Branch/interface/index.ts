export interface BranchesFormValues{
    name:string;
    code:string;
    address:string;
    isActive?:boolean
}

export interface BranchCreateResponse {
  success: boolean;
  message: string;
  data: BranchData;
  statusCode: number;
}

export interface BranchData {
  id: string;
  name: string;
  code: string;
  address: string;
}

//fetch 
export interface BranchesFetchResponse {
  success: boolean;
  message: string;
  data: BranchFetchDta[];
  statusCode: number;
}

export interface BranchFetchDta {
  id: string;
  name: string;
  code: string;
  address: string;

}

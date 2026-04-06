export interface AccountGroupFormValues{
    name:string;
    description:string
}

export interface AccountGroupData{
    id:string,
    name:string;
    description:string
}
export interface AccountGroupCreateResponse{
    success:boolean;
    message:string;
    data:AccountGroupData
    statusCode:number
}

export interface AccountGroupFetchResponse{
    success:boolean;
    message:string;
    data:AccountGroupData[]
    statusCode:number
}


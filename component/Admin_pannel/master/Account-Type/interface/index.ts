export interface AccountTypeFormValues{
    groupId:string;
    name:string;
    description:string;
    code:string;
}

//create response
export interface GroupData{
    groupId?:string;
    id:string;
    name:string;
    description:string;
    code:string
}
export interface AccountTypeData{
     id:string;
    name:string;
    description:string;
    code:string
    group:GroupData
}
export interface AccountTypeCreateResponse{
    success:string;
    message:string;
    data:AccountTypeData
    statusCode:number
}
// fetch data
export interface AccountTypeFetchResponse{
     success:string;
    message:string;
    data:AccountTypeData[]
    statusCode:number
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// "PERCENTAGE" | "FIXED"
export interface DiscountSchemeInputValues {
  product_type: string; // e.g., "PLYWOOD"
  discount_type: string; // if only these two types are allowed
  value: number; // discount value, e.g., 10
  valid_from: string; // date string in YYYY-MM-DD format
  valid_to: string; // date string in YYYY-MM-DD format
}

export interface DiscountSchemeCreateResponse{
    success:boolean,
    message:string,
    data:any,
    statusCode:number
}
export interface DiscountSchemeData{
    id:string,
      product_type: string; // e.g., "PLYWOOD"
  discount_type: string; // if only these two types are allowed
  value: number; // discount value, e.g., 10
  valid_from: string; // date string in YYYY-MM-DD format
  valid_to: string; // date string in YYYY-MM-DD format
}


export interface DiscountSchemeGetResponse{
     success:boolean,
    message:string,
    data:DiscountSchemeData[],
    statusCode:number
}
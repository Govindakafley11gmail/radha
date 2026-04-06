/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PriceListInputFormvalues {
  product_type: string;
  size: string;
  price: number;
  effective_date: string; // ISO date string (YYYY-MM-DD)
  sales_invoice_id: string; // UUID
}
export interface PriceListCreateResponse{
    success:boolean,
    message:string,
    data:any,
    statusCode:number



}


export interface SalesInvoiceData {
  id: string; // UUID
  invoiceNumber: string;
  invoiceDate: string; // ISO date (YYYY-MM-DD)
  dueDate: string; // ISO date (YYYY-MM-DD)
  totalAmount: string; // comes as string from API
  taxAmount: string; // comes as string from API
  status: string;
}

export interface DataAtrributes {
  id: string; // UUID
  product_type: string;
  size: string;
  price: string;
  salesInvoice: SalesInvoiceData;
}

export interface PricelistGetResponse {
  success: boolean;
  message: string;
  data: DataAtrributes[];
  statusCode: number;
}

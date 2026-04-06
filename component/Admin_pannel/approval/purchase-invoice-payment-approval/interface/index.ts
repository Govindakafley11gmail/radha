export interface purchaseInvoiceDetailsAttributes{
     id: string;
  productId: string;
  productType: string;
  productCode: string;
  size: string;        // size seems like a string
  price: string;       // if you want number use: number
  quantity: string;    // if you want number use: number
  total: string;       // if you want number use: number
  taxAmount: string;
}
export interface purchaseInvoiceAttributes{
      id: string;
  invoiceNo: string;
  materialTypes: string;
  freightCost: string;    // could be number if parsed
  importDuty: string;     // could be number if parsed
  scrapCost: string;      // could be number if parsed
  materialCost: string;   // could be number if parsed
  otherCharges: string;   // could be number if parsed
  finalCost: string;      // could be number if parsed
  supplierId: string;
  purchaseInvoiceDetails:purchaseInvoiceDetailsAttributes[]
}
export interface Supplier {
  supplier_id: string;
  name: string;
  phone_no: string;
  email: string;
  gender: string; // "M" | "F" could be used if you want stricter typing
  nationality: string;
  cidNo: string;
  status: string; // "active" | "inactive" etc. if you want stricter typing
  paymentTerms: string; // e.g., "weekly", "monthly"
  mouFile: string;
  mouDate: string;    // could be Date if you parse it
}
export interface dataAttributes{
    id:string
    supplier:Supplier;
    purchaseInvoice:purchaseInvoiceAttributes;
      payment_remarks: string;
  received_date: string  // can be Date if you parse it
  is_deleted: boolean;
  receipt_no: string;
  created_at: string; // can be Date if parsed
  updated_at: string; // can be Date if parsed
  documentPath: string;
  status: string 

    
}
export interface PurchaseInvoiceGetResponseAttributes{
    success:boolean,
    message:string,
    data:dataAttributes[]
    statusCode:number
}
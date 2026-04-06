export interface InvoiceDetail {
  productId: string;
  productType: string;
  productCode?: string;
  size?: string;
  price: number;
  quantity: number;
  total: number;
  taxAmount: number;
}

export interface InvoiceInputValues {
  supplierId: string;
  invoiceNo: string;
  invoiceDate: string; // Could use Date if you plan to parse it
  freightCost: number;
  materialTypes:string
  GStTaxAmount: number;
  importDuty: number;
  totalAmount: number;
  description: string;
  status: string;
  details: InvoiceDetail[];
}


//response create
export interface Supplier {
  supplier_id: string;
  name: string;
  phone_no: string;
  email: string;
  gender: string;
  nationality: string;
  cidNo: string;
  status: string;
  paymentTerms: string;
  mouFile: string | null;
  mouDate: string | null;
  expireDate: string | null;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceData {
  id: string;
  invoiceNo: string;
  freightCost: string; // sometimes numeric values come as string in API
  importDuty: string;
  scrapCost: string;
  materialCost: string;
  otherCharges: string;
  finalCost: string;
  supplier: Supplier;
  supplierId: string;
  invoiceDate: string;
  taxAmount: number;
  description: string | null;
  invoiceFile: string | null;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseInvoiceResponse {
  success: boolean;
  message: string;
  data: InvoiceData;
  statusCode: number;
}
//GET


export interface PurchaseInvoice {
  id: string;
  invoiceNo: string;
  freightCost: string;
  importDuty: string;
  scrapCost: string;
  materialCost: string;
  otherCharges: string;
  finalCost: string;
  supplier: Supplier;
  supplierId: string;
  invoiceDate: string;     // ISO date
  taxAmount: string;
  description: string | null;
  invoiceFile: string | null;
  status: string;
     // ISO datetime
}
export interface PurchaseInvoiceFetchResponse {
  success: boolean;
  message: string;
  data: PurchaseInvoice[];
  statusCode: number;
}
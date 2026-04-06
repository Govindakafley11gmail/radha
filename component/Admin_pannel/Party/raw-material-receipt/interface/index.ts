export interface SupplierData {
  supplier_id: string;
  name: string;
  phone_no: string;
  email: string;
  gender: string;
  nationality: string;
  cidNo: string;
  status: string;
  paymentTerms: string;
}
export interface PuchaseInvoiceData {
  id: string;
  invoiceNo: string;
  materialTypes: string;
  freightCost: string;
  importDuty: string;
  scrapCost: string;
  materialCost: string;
  otherCharges: string;
  finalCost: string;
  supplierId: string;
  invoiceDate: string; // ISO date
  taxAmount: string;
  description: string;
  invoiceFile: string;
  status: string;
}

export interface RawMaterialReceipt {
  id: string;
  supplier: SupplierData;
  purchaseInvoice: PuchaseInvoiceData;
  payment_remarks: string;
  received_date: string | null;
  is_deleted: boolean;
  receipt_no: string;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
  documentPath: string;
}
export interface RawMaterialReceiptCreateResponse {
  success: boolean;
  message: string;
  data: RawMaterialReceipt;
  statusCode: number;
}
export interface RawMaterialReceiptGetResponse {
  success: boolean;
  message: string;
  data: RawMaterialReceipt[];
  statusCode: number;
}

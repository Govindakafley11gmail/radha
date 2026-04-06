export interface InvoiceDataAttributes {
  id: string;
  invoiceNo: string;
  materialTypes: string; // extend if more enum values exist
  freightCost: string; // kept as string since API returns string
  importDuty: string;
  scrapCost: string;
  materialCost: string;
  otherCharges: string;
  finalCost: string;
  supplierId: string;
  invoiceDate: string; // ISO date (YYYY-MM-DD)
  taxAmount: string;
  description: string;
  invoiceFile: string;
  status: string; // adjust as per backend
}
export interface SupplierDataAttributes {
  supplier_id: string;
  name: string;
  phone_no: string;
  email: string;
  gender: string;
  nationality: string;
  cidNo: string;
  status: string;
  paymentTerms: string;
  mouFile: string;
  mouDate: string; // ISO date (YYYY-MM-DD)
  expireDate: string; // ISO date (YYYY-MM-DD)
}
// "Bank" | "Cash" | "Cheque" |
export interface rawMaterialReceipt {
  id: string;
  payment_remarks: string;
  received_date: string; // ISO date string or null
  paymentMode: string;
  is_deleted: boolean;
  receipt_no: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  total_cost: number;
  documentPath: string;
  status: string;
}

export interface SupplierandInvoiceDataAttributes {
  id: string;
  amount: string;
  paymentMode: string;
  status: string;
  invoice: InvoiceDataAttributes;
  referenceNumber: string;
  supplier: SupplierDataAttributes;
  description: string;
  accountNo: string;
  rawMaterialReceipt: rawMaterialReceipt;
  documentPath: string;
}
export interface DataAttributes {
  data: SupplierandInvoiceDataAttributes[];
}

export interface PurchaseInvoicePaymentGetResponse {
  statusCode: number;
  message: string;
  data: DataAttributes;
}

export interface GroupData {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface AccountTypeData {
  id: string;
  name: string;
  code: string;
  description: string;
  group: GroupData;
}

export interface MainDataAttributes {
  id: string;
  amount: string;
  paymentDate: string;
  paymentMode: string;
  status: string;
  invoice: InvoiceDataAttributes;
  accountType: AccountTypeData;
  referenceNumber: string;
  supplierId: string;
  description: string;
}

export interface PaymentCreateResponse {
  success: boolean;
  message: string;
  data: MainDataAttributes;
  statusCode: number;
}

export interface PaymentRecieptSendData {
  id: string;
  amount: number;
  paymentDate: string; // YYYY-MM-DD
  paymentMode: string;
  invoiceId: string;
  referenceNumber: string;
  description: string;
}

//PaymentSettlementGet data interface PaymentSettlementInvoiceDataAttributes {

export interface PaymentSettlementInvoiceDataAttributes {
  id: string;
  amount: string;
  paymentMode: string;
  status: string;
  invoice: InvoiceDataAttributes;
  referenceNumber: string;
  supplierId: string;
  supplier: SupplierDataAttributes;
  description: string;
  accountNo: string;
  rawMaterialReceipt: rawMaterialReceipt;
  isDeleted: boolean;
  documentPath: string;
}
export interface PaymentSettlementData {
  data: PaymentSettlementInvoiceDataAttributes[];
}
export interface PaymentSettlementGetResponse {
  success: boolean;
  message: string;
  data: PaymentSettlementData;
  statusCode: number;
}

export interface CustomerDataAttributes {
  customer_id: string;
  name: string;
  identification_no: string;
  address: string;
  email: string;
  phone_no: string;
  tax_id: string;
  credit_limit: number; // backend expects number
  credit_terms: string;
}
export interface ProductDataAttributes {
  id: string;
  productId: string;
  productType: string;
  size: string;
  price: number; // should be number
  quantity: number;
  total: number; // should be number
}

export interface TaxInvoicesData {
  id: string;
  customerId: string;
  invoiceNumber: string;
  invoiceDate: string;
  totalAmount: string;
  taxAmount: string;
}

export interface DataAttributes {
  id: string;
  customer: CustomerDataAttributes;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: string;
  taxAmount: string;
  status: string;
  details: ProductDataAttributes[];
  taxInvoices: TaxInvoicesData[];
}
export interface SalesInvoiceGetResponse {
  success: boolean;
  message: string;
  data: DataAttributes[];
  statusCode: number;
}

export interface Invoice {
  id: string;
  customer: {
    customer_id: string;
  };
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  totalAmount: number;
  taxAmount: number;
  status: string;
  isDeleted: boolean;
}

export interface SalesInvoiceCreateResponse {
  success: boolean;
  message: string;
  data: Invoice;
  statusCode: number;
}

export interface SaleInvoiceDetail {
  productId: string;
  productType: string;
  productCode?: string;
  size?: string;
  price: number;
  quantity: number;
  total: number;
  taxAmount: number;
}

export interface SaleInvoiceInputValues {
  customerId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string; // Could use Date if you plan to parse it
  totalAmount: number;
  taxAmount: number;

  details: SaleInvoiceDetail[];
}

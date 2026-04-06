/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SaLesReceiptCreateResponse {
  success: boolean;
  message: string;
  data: any;
  statusCode: number;
}

export interface SalesInvoiceReceiptInputFormValues {
  sales_invoice_id: string; // ID of the sales invoice
  customer_id: string; // ID of the customer
  receipt_date: string; // Date of the receipt in YYYY-MM-DD format
  amount_received: number; // Amount received
  payment_method: string; // Payment method (you can add more types if needed)
  status: string; // Status of the receipt (adjust as per your app)
}

export interface Receipt {
  id: string;
  receipt_number: string;
  sales_invoice_id: string;
  receipt_date: string; // YYYY-MM-DD
  amount_received: string; // Amount as string (e.g., "1000.00")
  payment_method: string; // Add more if needed
  status: string; // Adjust to your app
  isDeleted: boolean;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

// Full API response
export interface ReceiptsGetResponse {
  success: boolean;
  message: string;
  data: Receipt[];
  statusCode: number;
}

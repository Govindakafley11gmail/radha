export interface CustomerInputFormValues {
  name: string;
  identification_no: string;
  address: string;
  email: string;
  phone_no: string;
  tax_id: string;
  credit_limit: number;
  credit_terms: string;
}

export interface CustomerCreateResponse {
  id:string
  customer_id: string;
  name: string;
  identification_no: string;
  address: string;
  email: string;
  phone_no: string;
  tax_id: string;
  credit_limit: string; // comes as string from API
  credit_terms: string;
//   invoices: Invoice[];  // empty array for now
  isDeleted: boolean;
//   badDebts: BadDebt[];  // empty array for now
}
export interface CustomerGetResponse{
      data: CustomerCreateResponse[],

}
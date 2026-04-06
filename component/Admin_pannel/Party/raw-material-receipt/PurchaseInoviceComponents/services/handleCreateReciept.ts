/* eslint-disable @typescript-eslint/no-explicit-any */
// services/handleCreateReceipt.ts

export const buildReceiptFormData = (
  values: Record<string, any>,
  selectedRow: any,
) => {
  const { items, ...data } = values;
  console.log("Data", data);
  const formData = new FormData();

  formData.append("supplier_id", selectedRow?.supplier.supplier_id);
  formData.append("purchase_invoice_id", selectedRow?.id);
  formData.append("accountNo", data.accountNo);
  formData.append("paymentMode", data.paymentMode);
  formData.append("payment_remarks", data.payment_remarks);
  formData.append("received_date", data.received_date);
  formData.append("total_cost", data.total_cost);

  if (data.documentPath instanceof File) {
    formData.append("documentPath", data.documentPath);
  }

  return formData;
};

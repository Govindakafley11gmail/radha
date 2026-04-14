/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildSupplierFormData = (values: any) => {
  const formData = new FormData();

  formData.append("name", values.name ?? "");
  formData.append("phone_no", values.phone_no ?? "");
  formData.append("email", values.email ?? "");
  formData.append("gender", values.gender ?? "");
  formData.append("nationality", values.nationality ?? "");
  formData.append("cidNo", values.cidNo ?? "");
  formData.append("status", values.status ?? "");
  formData.append("paymentTerms", values.paymentTerms ?? "");
  formData.append("mouDate", values.mouDate ?? "");
  formData.append("expireDate", values.expireDate ?? "");

  if (values.mouFile instanceof File) {
    formData.append("mouFile", values.mouFile);
  }

  // 🔥 IMPORTANT FIX: append details
  if (values.details && Array.isArray(values.details)) {
    
    formData.append("details", JSON.stringify(values.details));
  }

  return formData;
};
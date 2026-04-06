/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/mapInvoicePayload.ts
export const buildInvoicePayload = (
  supplierId: string,
  values: Record<string, any>
) => ({
  supplierId,
  ...values,
  details: values.details?.map(({ productType, ...rest }: any) => ({
    ...rest,
    productType: productType?.label ?? "",
    productId: productType?.value ??"",
  })),
  invoiceNo: values.invoiceNo || "",
  invoiceDate: values.invoiceDate || "",
  freightCost: values.freightCost || 0,
  materialTypes: values.materialTypes || "",
  GStTaxAmount: values.GStTaxAmount || 0,
  importDuty: values.importDuty || 0,
  totalAmount: values.totalAmount || 0,
  description: values.description || "",
  status: values.status || "",
});
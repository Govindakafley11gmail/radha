/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildPaymentPayload = (
  invoiceId: string,
  id: string ,
  values: Record<string, any>,
) => {
  const { items, ...dataWithoutItems } = values;
  console.log(values)
  return {
    ...dataWithoutItems,
    amount: Number(dataWithoutItems.amount),
    invoiceId: String(invoiceId),
    id: String(id),
  };
};

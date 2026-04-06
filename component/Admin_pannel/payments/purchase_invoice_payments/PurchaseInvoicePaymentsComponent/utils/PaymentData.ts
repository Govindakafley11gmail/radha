/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildPaymentPayload = (
  invoiceId: string,
  values: Record<string, any>,
) => {
  const { items, ...dataWithoutItems } = values;

  return {
    ...dataWithoutItems,
    amount: Number(dataWithoutItems.amount),
    id: invoiceId,
  };
};

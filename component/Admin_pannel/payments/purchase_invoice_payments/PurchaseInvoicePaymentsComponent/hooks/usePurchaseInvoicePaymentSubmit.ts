/* eslint-disable @typescript-eslint/no-explicit-any */
import { showToast } from "nextjs-toast-notify";
import type { PaymentRecieptSendData } from "../../interface";
import { usePaymnetMutations } from "../../tanstack-function";
import { useCallback } from "react";
import { buildPaymentPayload } from "../utils/PaymentData";

export function usePurchaseInvoicePaymentSubmit(
  selectedRow: PaymentRecieptSendData | null,
  onSuccessClose?: () => void,
) {
  const { createPaymentReceipt } = usePaymnetMutations({
    onSuccess: (data) => {
      showToast.success(data.message, {
        duration: 5000,
        position: "top-right",
        transition: "topBounce",
        icon: "",
        sound: true,
      });
      onSuccessClose?.();
    },
    onError: (error: any) => {
      showToast.error(error?.data?.message || "Something went wrong");
    },
  });
  const handleSubmit = useCallback(
    (values: Record<string, any>) => {
      if (!selectedRow?.id) {
        showToast.error("Please select a supplier first");
        return;
      }

      const payload = buildPaymentPayload(selectedRow.id, values);

      createPaymentReceipt(payload as PaymentRecieptSendData);
    },
    [selectedRow, createPaymentReceipt],
  );
  return {
    handleSubmit,
  };
}

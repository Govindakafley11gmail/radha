/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { showToast } from "nextjs-toast-notify";
import { usePuchaseInvoiceMutations } from "../tanstack-form";
import { SupplierData } from "../../Supplier/interface";
import { buildInvoicePayload } from "../dataform/mapInvoicePayload";

export function useInvoiceSubmit(selectedRow: SupplierData | null,  onSuccessClose?: () => void
) {
  
  const { createPuchaseInvoice } = usePuchaseInvoiceMutations({
    onSuccess: (data) => {
      showToast.success(data.message);
            onSuccessClose?.();
    },
    onError: (error: any) => {
      showToast.error(error?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = useCallback(
    (values: Record<string, any>) => {
      
      if (!selectedRow?.supplier_id) {
        showToast.error("Please select a supplier first");
        return;
      }

      const payload = buildInvoicePayload(
        selectedRow.supplier_id,
        values
      );
      
      createPuchaseInvoice(payload);
    },
    [selectedRow, createPuchaseInvoice]
  );

  return {
    handleSubmit,
  };
}
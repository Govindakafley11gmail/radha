import apiClient from "@/api-folder/api-client";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PaymentCreateResponse,
  PaymentRecieptSendData,
  PaymentSettlementGetResponse,
  PurchaseInvoicePaymentGetResponse,
} from "../interface";
import API_RADDHA_URL from "@/api-folder/api";

const getPurchaseInvoicePayment =
  async (): Promise<PurchaseInvoicePaymentGetResponse> => {
    const response = await apiClient.get(API_RADDHA_URL.payment);

    if (response.data?.success === false) {
      throw { data: response.data };
    }

    return response.data;
  };

export const useGetPurchaseInvoicePayment = () => {
  return useQuery<PurchaseInvoicePaymentGetResponse, errorResponse>({
  queryKey: ["purchase-invoice-payment"], // ✅ change this
    queryFn: getPurchaseInvoicePayment,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};



/* eslint-disable @typescript-eslint/no-explicit-any */
interface MutationOptions {
  onSuccess?: (data: PaymentCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create RawMaterials
const createPayment = async (data: PaymentRecieptSendData) => {
  const response = await apiClient.post(API_RADDHA_URL.payment, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

export const usePaymnetMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    PaymentCreateResponse,
    errorResponse,
    PaymentRecieptSendData
  >({
    mutationFn: createPayment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PurchaseInvoice-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    createPaymentReceipt: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};


const getPurchaseInvoicePaymentSettlement =
  async (): Promise<PaymentSettlementGetResponse> => {
    const response = await apiClient.get("http://localhost:3000/api/v1/payment/settled");
      console.log("Response response",response)
    if (response.data?.success === false) {
      throw { data: response.data };
    }

    return response.data;
  };

export const useGetPurchaseInvoicePaymentSettlement = () => {
  return useQuery<PaymentSettlementGetResponse, errorResponse>({
    queryKey: ["PurchaseInvoice-payment-settlement-list"],
    queryFn: getPurchaseInvoicePaymentSettlement,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
import apiClient from "@/api-folder/api-client";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import API_RADDHA_URL from "@/api-folder/api";
import type { FixedAssetPaymentCreateResponse, FixedAssetsPaymentFormValues, FixedAssetsPaymentGetResponse } from "../interface";

const getFixedAssetPayment =
  async (): Promise<FixedAssetsPaymentGetResponse> => {
    const response = await apiClient.get(API_RADDHA_URL.fixedAssetsPayment);

    if (response.data?.success === false) {
      throw { data: response.data };
    }

    return response.data;
  };

export const useGetFixedAssetPayment = () => {
  return useQuery<FixedAssetsPaymentGetResponse, errorResponse>({
  queryKey: ["fixed-assets-payment"], // ✅ change this
    queryFn: getFixedAssetPayment,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};



/* eslint-disable @typescript-eslint/no-explicit-any */
interface MutationOptions {
  onSuccess?: (data: FixedAssetPaymentCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create RawMaterials
const createFixedAssetPayment = async (data: FixedAssetsPaymentFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.fixedAssetsPayment, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

export const useFixedAssetPaymentMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    FixedAssetPaymentCreateResponse,
    errorResponse,
    FixedAssetsPaymentFormValues
  >({
    mutationFn: createFixedAssetPayment,
    onSuccess: async(data) => {
      await queryClient.invalidateQueries({ queryKey: ["fixed-assets-payment"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    createFixedAssetPayment: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};


// const getFixedAssetPaymentSettlement =
//   async (): Promise<PaymentSettlementGetResponse> => {
//     const response = await apiClient.get(API_RADDHA_URL.paymentSettlement);
//       console.log("Response response",response)
//     if (response.data?.success === false) {
//       throw { data: response.data };
//     }

//     return response.data;
//   };

// export const useGetFixedAssetPaymentSettlement = () => {
//   return useQuery<PaymentSettlementGetResponse, errorResponse>({
//     queryKey: ["PurchaseInvoice-payment-settlement-list"],
//     queryFn: getFixedAssetPaymentSettlement,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };
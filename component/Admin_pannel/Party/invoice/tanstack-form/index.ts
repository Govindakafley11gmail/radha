/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  InvoiceInputValues,
  PurchaseInvoiceFetchResponse,
  PurchaseInvoiceResponse,

} from "../interface";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";

interface MutationOptions {
  onSuccess?: (data: PurchaseInvoiceResponse) => void;
  onError?: (error: errorResponse) => void;
}

// Create Permission
const createPuchaseInvoice = async (data: InvoiceInputValues) => {
  const response = await apiClient.post(API_RADDHA_URL.purchaseInvoice, data);
  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

export const usePuchaseInvoiceMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    PurchaseInvoiceResponse,
    errorResponse,
    InvoiceInputValues
  >({
    mutationFn: createPuchaseInvoice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["PuchaseInvoice-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });



 
  return {
    createPuchaseInvoice: createMutation.mutate,
    isCreating: createMutation.isPending,
    
};

}

const getSuppliers = async (): Promise<PurchaseInvoiceFetchResponse> => {
const response = await apiClient.get(API_RADDHA_URL.purchaseInvoice, {
  params: {
    status: "under_process",
  },
});
  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

export const useGetPuchaseInvoice = () => {
  return useQuery<PurchaseInvoiceFetchResponse, errorResponse>({
    queryKey: ["PuchaseInvoice-list"],
    queryFn: getSuppliers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
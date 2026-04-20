/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { RawMaterialReceiptCreateResponse, RawMaterialReceiptGetResponse } from "../interface";
import { showToast } from "nextjs-toast-notify";

interface MutationOptions {
  onSuccess?: (data: RawMaterialReceiptCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// Create RawMaterials
const createRawMaterialReceipt = async (data: FormData) => {
  const response = await apiClient.post(API_RADDHA_URL.rawMaterialReceipt, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};



// Get RawMaterialReceipts List
const getRawMaterialReceipt = async (): Promise<RawMaterialReceiptGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.rawMaterialReceipt);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

//generatemateriaterials receipt 
// ============= HOOKS =============

// Hook for all RawMaterialReceipt mutations
export const useRawMaterialReceiptMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    RawMaterialReceiptCreateResponse,
    errorResponse,
    FormData
  >({
    mutationFn: createRawMaterialReceipt,
    onSuccess: async(data) => {
      await queryClient.invalidateQueries({ queryKey: ["PuchaseInvoice-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    createRawMaterialReceipt: createMutation.mutate,
    isCreating: createMutation.isPending,
    
  };
};

// Hook for getting RawMaterialReceipts
export const useGetRawMaterialReceipt = () => {
  return useQuery<RawMaterialReceiptGetResponse, errorResponse>({
    queryKey: ["RawMaterialReceipt-list"],
    queryFn: getRawMaterialReceipt,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const downloadInvoiceFile = (invoiceId: string) => 
  `${API_RADDHA_URL.rawMaterialReceipt}/download/${invoiceId}`;

export const generateMaterialReceipt = (id:string)=>{
 return `${API_RADDHA_URL.rawMaterialReceipt}/download/${id}`;
}
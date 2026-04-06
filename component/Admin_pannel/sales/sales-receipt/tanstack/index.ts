/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { ReceiptsGetResponse, SalesInvoiceReceiptInputFormValues, SaLesReceiptCreateResponse } from "../interface/interface";

interface MutationOptions {
  onSuccess?: (data: SaLesReceiptCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createSalesReceipt = async (data: SalesInvoiceReceiptInputFormValues) => {
  const response = await apiClient.post(API_RADDHA_URL.receipt, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};



// Get RawMaterialReceipts List
const getSaleReceipt = async (): Promise<ReceiptsGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.receipt);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useSaleReceiptMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    SaLesReceiptCreateResponse,
    errorResponse,
    SalesInvoiceReceiptInputFormValues
  >({
    mutationFn: createSalesReceipt,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["SaleReceipt-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    createSalesReceipt: createMutation.mutate,
    isCreating: createMutation.isPending,
    
  };
};

// Hook for getting RawMaterialReceipts
export const useGetSaleReceipt = () => {
  return useQuery<ReceiptsGetResponse, errorResponse>({
    queryKey: ["SaleReceipt-list"],
    queryFn: getSaleReceipt,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// export const downloadReceiptFile = (invoiceId: string) => 
//   `${API_RADDHA_URL.rawMaterialReceipt}/download/${invoiceId}`;

export const generateSaleReceipt = (id:string)=>{
 return `${API_RADDHA_URL.receipt}/${id}/generate`;
}
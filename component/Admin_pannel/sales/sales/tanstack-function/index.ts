/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { SaleInvoiceInputValues, SalesInvoiceCreateResponse, SalesInvoiceGetResponse } from "../interface";

interface MutationOptions {
  onSuccess?: (data: SalesInvoiceCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createSalesInvoice = async (data: SaleInvoiceInputValues) => {
  const response = await apiClient.post(API_RADDHA_URL.salesInvoice, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};



// Get RawMaterialReceipts List
const getSaleInvoice = async (): Promise<SalesInvoiceGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.salesInvoice);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useSaleInvoiceMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    SalesInvoiceCreateResponse,
    errorResponse,
    SaleInvoiceInputValues
  >({
    mutationFn: createSalesInvoice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["SaleInvoice-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  return {
    createSalesInvoice: createMutation.mutate,
    isCreating: createMutation.isPending,
    
  };
};

// Hook for getting RawMaterialReceipts
export const useGetSaleInvoice = () => {
  return useQuery<SalesInvoiceGetResponse, errorResponse>({
    queryKey: ["SaleInvoice-list"],
    queryFn: getSaleInvoice,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// export const downloadInvoiceFile = (invoiceId: string) => 
//   `${API_RADDHA_URL.rawMaterialReceipt}/download/${invoiceId}`;

// export const generateMaterialReceipt = (id:string)=>{
//  return `${API_RADDHA_URL.rawMaterialReceipt}/generate/${id}`;
// }
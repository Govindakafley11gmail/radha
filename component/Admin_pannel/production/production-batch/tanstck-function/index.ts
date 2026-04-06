/* eslint-disable @typescript-eslint/no-explicit-any */
import API_RADDHA_URL from "@/api-folder/api";
import apiClient from "@/api-folder/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorResponse } from "@/component/Admin_pannel/permission/interface";
import { ProductionBatchCreateResponse, ProductionBatchGetResponse, ProductionBatchInputFormvalues } from "../interface";

interface MutationOptions {
  onSuccess?: (data: ProductionBatchCreateResponse) => void;
  onError?: (error: errorResponse) => void;
}

// ============= API CALLS =============

// // Create RawMaterials
const createProductionBatch = async (data: ProductionBatchInputFormvalues) => {
  const response = await apiClient.post(API_RADDHA_URL.productionBatch, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};
const updateProductionBatch = async ({
  id,
  data,
}: {
  id:  string;
  data: ProductionBatchInputFormvalues;
}) => {
  const response = await apiClient.patch(`${API_RADDHA_URL.productionBatch}/${id}`, data);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Delete ProductionBatch
const deleteProductionBatch = async (id: number | string) => {
  const response = await apiClient.delete(`${API_RADDHA_URL.productionBatch}/${id}`);

  if (response.data?.success === false) {
    throw { data: response.data };
  }
  return response.data;
};

// Get RawMaterialReceipts List
const getProductionBatch = async (): Promise<ProductionBatchGetResponse> => {
  const response = await apiClient.get(API_RADDHA_URL.productionBatch);

  if (response.data?.success === false) {
    throw { data: response.data };
  }

  return response.data;
};

// Hook for all RawMaterialReceipt mutations
export const useProductionBatchMutations = (options?: MutationOptions) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<
    ProductionBatchCreateResponse,
    errorResponse,
    ProductionBatchInputFormvalues
  >({
    mutationFn: createProductionBatch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ProductionBatch-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
  const updateMutation = useMutation<
    ProductionBatchCreateResponse,
    errorResponse,
    { id: string; data: ProductionBatchInputFormvalues }
  >({
    mutationFn: updateProductionBatch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ProductionBatch-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });

  const deleteMutation = useMutation<
    ProductionBatchCreateResponse,
    errorResponse,
    number | string
  >({
    mutationFn: deleteProductionBatch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ProductionBatch-list"] });
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      console.log(error, "Eroor laso");
      options?.onError?.(error);
    },
  });

  return {
    createProductionBatch: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateProductionBatch: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteProductionBatch: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};

export const useGetProductionBatch = () => {
  return useQuery<ProductionBatchGetResponse, errorResponse>({
    queryKey: ["ProductionBatch-list"],
    queryFn: getProductionBatch,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
